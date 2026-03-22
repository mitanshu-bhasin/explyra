/**
 * js/gdrive-service.js
 * Handles Google Drive OAuth2 & File Upload Permissions for Explyra Admin/Emp Chat Attachments.
 */

const GDriveService = {
    // Replace this with the actual client ID generated in Google Cloud Console
    // The user needs to set this up themselves.
    CLIENT_ID: window.EXPLYRA_CONFIG?.googleDrive?.clientId || '411853553644-tpf4p1f6co6gvtb3p3jnc574ncghu21l.apps.googleusercontent.com',
    API_KEY: window.EXPLYRA_CONFIG?.firebase?.apiKey || (window.EXPLYRA_CONFIG?.firebase?.apiKey || ""),
    SCOPES: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar.events',
    DISCOVERY_DOCS: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        'https://sheets.googleapis.com/$discovery/rest?version=v4',
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ],

    tokenClient: null,
    gapiInited: false,
    gisInited: false,
    accessToken: null,

    init() {
        if (!window.gapi || !window.google) {
            console.error("Google APIs not loaded yet in GDriveService.init");
            return;
        }

        // Initialize gapi client
        gapi.load('client', async () => {
            try {
                await gapi.client.init({
                    apiKey: this.API_KEY,
                    discoveryDocs: this.DISCOVERY_DOCS,
                });
                this.gapiInited = true;
                this.checkReady();
            } catch (err) {
                console.error('Error initializing GAPI client', err);
            }
        });

        // Initialize Google Identity Services
        this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    this.accessToken = tokenResponse.access_token;
                    this.saveConnectionState(true);
                    
                    // Trigger UI update
                    const event = new CustomEvent('gdrive-connected');
                    window.dispatchEvent(event);
                    
                    if (this.pendingAction) {
                        const action = this.pendingAction;
                        this.pendingAction = null;
                        action();
                    }
                }
            },
            error_callback: (err) => {
                console.error("Token client error:", err);
                if (window.showToast) window.showToast("Failed to connect Google Drive", "error");
            }
        });
        this.gisInited = true;
        this.checkReady();
        
        // Restore existing token if available
        const storedToken = localStorage.getItem('gdrive_access_token');
        if (storedToken) {
           this.accessToken = storedToken;
           // If we already have a token, signal connection
           setTimeout(() => {
               window.dispatchEvent(new CustomEvent('gdrive-connected'));
           }, 500);
        }
    },

    checkReady() {
        if (this.gapiInited && this.gisInited) {
        }
    },

    saveConnectionState(isConnected) {
        localStorage.setItem('gdrive_connected', isConnected ? 'true' : 'false');
        if (this.accessToken) {
             localStorage.setItem('gdrive_access_token', this.accessToken);
        } else {
             localStorage.removeItem('gdrive_access_token');
        }

        // External sync callback if provided
        if (this.onStateChange) {
            this.onStateChange(isConnected);
        }
    },

    // Set a callback to handle external persistence (e.g. Firestore)
    setOnStateChange(callback) {
        this.onStateChange = callback;
    },

    // Manually set connection state from external source (e.g. on load)
    restoreConnection(isConnected) {
        if (isConnected && !this.accessToken) {
            // We are marked as connected in Firestore but don't have a token (new device)
            // We set the flag so the UI shows "Connected", but we'll need a user click to get a fresh token
            // because browser security prevents popups without user action.
            localStorage.setItem('gdrive_connected', 'true');
        }
        
        // Signal UI update
        if (isConnected) {
            setTimeout(() => window.dispatchEvent(new CustomEvent('gdrive-connected')), 100);
        }
    },

    isConnected() {
        return localStorage.getItem('gdrive_connected') === 'true' && !!this.accessToken;
    },

    disconnect() {
        this.accessToken = null;
        this.saveConnectionState(false);
        
        const event = new CustomEvent('gdrive-disconnected');
        window.dispatchEvent(event);
        
        if (window.showToast) window.showToast("Google Drive Disconnected", "success");
    },

    async authenticate(actionContent = null, force = false) {
        if (this.isConnected() && !force) {
            if (actionContent) actionContent();
            return;
        }

        if (!this.tokenClient) {
            if (window.showToast) window.showToast("Drive service not ready yet. Please ensure Client ID is set.", "error");
            return;
        }

        this.pendingAction = actionContent;
        // Prompt the user to select an account and grant consent.
        this.tokenClient.requestAccessToken({prompt: 'consent'});
    },

    async uploadFile(file, progressCallback = null) {
        if (!this.isConnected()) {
             throw new Error("Google Drive is not connected. Please connect from your Profile first.");
        }

        if (window.showToast) window.showToast(`Uploading ${file.name} to Drive...`, 'info');

        try {
            // Using multipart upload for Google Drive API
            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            const metadata = {
                'name': file.name,
                // 'mimeType': file.type // Optional, Drive can infer it
            };

            const base64Data = await this.fileToBase64(file);

            const multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + file.type + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink,thumbnailLink', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                },
                body: multipartRequestBody
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Drive upload error detail:", errorData);
                // Handle token expiry
                if (response.status === 401) {
                    this.disconnect();
                    throw new Error("Google Drive connection expired. Please reconnect.");
                }
                throw new Error("Upload failed: " + response.statusText);
            }

            const result = await response.json();
            
            // Now set permission to public ("Anyone with the link")
            await this.setPublicPermission(result.id);
            
            if (window.showToast) window.showToast('Upload successful!', 'success');
            
            return {
                id: result.id,
                name: result.name,
                url: result.webViewLink,
                downloadUrl: result.webContentLink,
                previewUrl: result.thumbnailLink,
                mimeType: file.type
            };
            
        } catch (error) {
            console.error("Error uploading to Drive:", error);
            if (window.showToast) window.showToast(error.message || "Failed to upload file", "error");
            throw error;
        }
    },

    async setPublicPermission(fileId) {
        try {
            const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'anyone',
                    role: 'reader'
                })
            });
            if (!response.ok) {
               console.error("Permission set error", await response.json());
               throw new Error("Failed to set file permissions.");
            }
        } catch (error) {
            console.error("Error setting public permission:", error);
            console.warn("File was uploaded but permission might not be public.");
        }
    },
    
    // Convert a File object to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    },

    async createSpreadsheet(title, headers, rows) {
        if (!this.isConnected()) {
            throw new Error("Google Drive is not connected. Please connect from your Profile first.");
        }

        if (window.showToast) window.showToast(`Creating Google Sheet: ${title}...`, 'info');

        try {
            // Create a new spreadsheet
            const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    properties: { title: title }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Sheets create error detail:", errorData);
                throw new Error("Sheet creation failed: " + response.statusText);
            }

            const spreadsheet = await response.json();
            const spreadsheetId = spreadsheet.spreadsheetId;
            const sheetName = spreadsheet.sheets[0]?.properties?.title || 'Sheet1';

            // Update with headers and data
            const valueRange = {
                range: `${sheetName}!A1`,
                majorDimension: 'ROWS',
                values: [headers, ...rows]
            };

            const updateResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1?valueInputOption=RAW`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueRange)
            });

            if (!updateResponse.ok) {
                const updateErr = await updateResponse.json();
                console.error("Sheets update error detail:", updateErr);
                throw new Error("Data population failed: " + (updateErr.error?.message || updateResponse.statusText));
            }

            // Set public permission (optional, but same as file upload)
            await this.setPublicPermission(spreadsheetId);

            if (window.showToast) window.showToast('Google Sheet created successfully!', 'success');

            return {
                id: spreadsheetId,
                name: title,
                url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
            };
        } catch (error) {
            console.error("Error creating Google Sheet:", error);
            if (window.showToast) window.showToast(error.message || "Failed to create Google Sheet", "error");
            throw error;
        }
    },

    async createMeetLink(meetingTitle) {
        if (!this.isConnected()) {
            throw new Error('Google account not connected. Please connect from your Profile first.');
        }

        if (window.showToast) window.showToast('Creating meeting link...', 'info');

        try {
            const now = new Date();
            const end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour

            const event = {
                summary: meetingTitle || 'Explyra Team Meeting',
                start: { dateTime: now.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
                end: { dateTime: end.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
                conferenceData: {
                    createRequest: {
                        requestId: 'explyra-meet-' + Date.now(),
                        conferenceSolutionKey: { type: 'hangoutsMeet' }
                    }
                }
            };

            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Meet creation error:', errorData);
                if (response.status === 401) {
                    this.disconnect();
                    throw new Error('Connection expired. Please reconnect Google.');
                }
                throw new Error('Meet creation failed: ' + (errorData.error?.message || response.statusText));
            }

            const result = await response.json();
            const meetUrl = result.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video')?.uri;

            if (!meetUrl) {
                throw new Error('Meeting created but no Meet link was generated.');
            }

            if (window.showToast) window.showToast('Meeting link created!', 'success');

            return {
                meetUrl: meetUrl,
                eventUrl: result.htmlLink,
                title: result.summary,
                startTime: result.start.dateTime
            };
        } catch (error) {
            console.error('Error creating Meet link:', error);
            if (window.showToast) window.showToast(error.message || 'Failed to create meeting', 'error');
            throw error;
        }
    },

    /**
     * Upload DOCX file to Google Drive
     */
    async uploadDocxToDrive(blob, filename) {
        if (!this.isConnected()) {
            throw new Error("Google Drive is not connected. Please connect from your Profile first.");
        }

        try {
            if (window.showToast) window.showToast(`Uploading to Google Drive: ${filename}...`, 'info');

            const metadata = {
                name: filename,
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            };

            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', blob);

            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,name', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                body: form
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Google Drive upload error:', errorData);
                if (response.status === 401) {
                    this.disconnect();
                    throw new Error('Connection expired. Please reconnect Google.');
                }
                throw new Error('Upload failed: ' + (errorData.error?.message || response.statusText));
            }

            const result = await response.json();
            if (window.showToast) window.showToast(`Document saved to Google Drive! 📄`, 'success');

            return {
                fileId: result.id,
                fileLink: result.webViewLink,
                fileName: result.name
            };
        } catch (error) {
            console.error('Error uploading DOCX:', error);
            if (window.showToast) window.showToast(error.message || 'Failed to upload document', 'error');
            throw error;
        }
    }
};

// Expose to window - upload function wrapper
window.uploadExpenseToGoogleDrive = async (expense, expenseId, portalLabel, downloadedBy) => {
    try {
        if (!window.docx || !window.Packer) {
            if (window.showToast) window.showToast('DOCX library not loaded. Please refresh.', 'error');
            return;
        }

        if (!GDriveService.isConnected()) {
            if (window.showToast) window.showToast('Please connect Google Drive from settings first.', 'warning');
            return;
        }

        // Create DOCX using the docx-export utilities
        const doc = window.buildExpenseDocx(expense, expenseId, portalLabel, downloadedBy);
        if (!doc) {
            if (window.showToast) window.showToast('Failed to create document.', 'error');
            return;
        }

        const blob = await window.Packer.toBlob(doc);
        const filename = `expense_detail_${expenseId}_${new Date().toISOString().split('T')[0]}.docx`;

        const result = await GDriveService.uploadDocxToDrive(blob, filename);
        if (window.showToast) {
            window.showToast(`Expense saved to Google Drive!\n<a href="${result.fileLink}" target="_blank" class="text-blue-500 underline">Open Document</a>`, 'success');
        }
    } catch (err) {
        console.error('Failed to upload to Google Drive:', err);
        if (window.showToast) window.showToast('Failed to save to Google Drive: ' + err.message, 'error');
    }
};

// Expose GDriveService to window
window.GDriveService = GDriveService;

// Load GAPI and GIS scripts dynamically if not already loaded
if (!window.gdriveInitStarted) {
    window.gdriveInitStarted = true;
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => {
        const gisScript = document.createElement('script');
        gisScript.src = 'https://accounts.google.com/gsi/client';
        gisScript.onload = () => {
           // Both loaded, initialize our service mapping
           GDriveService.init();
        };
        document.head.appendChild(gisScript);
    };
    document.head.appendChild(gapiScript);
}
