/**
 * js/gdrive-service.js
 * Handles Google Drive OAuth2 & File Upload Permissions for Explyra Admin/Emp Chat Attachments.
 */

const GDriveService = {
    // Replace this with the actual client ID generated in Google Cloud Console
    // The user needs to set this up themselves.
    CLIENT_ID: window.EXPLYRA_CONFIG?.googleDrive?.clientId || '411853553644-tpf4p1f6co6gvtb3p3jnc574ncghu21l.apps.googleusercontent.com',
    API_KEY: window.EXPLYRA_CONFIG?.googleDrive?.apiKey || 'YOUR_GOOGLE_API_KEY_HERE',
    SCOPES: 'https://www.googleapis.com/auth/drive.file',
    DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],

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
            console.log("Google Drive Service Ready");
        }
    },

    saveConnectionState(isConnected) {
        localStorage.setItem('gdrive_connected', isConnected ? 'true' : 'false');
        if (this.accessToken) {
             localStorage.setItem('gdrive_access_token', this.accessToken);
        } else {
             localStorage.removeItem('gdrive_access_token');
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

    async authenticate(actionContent = null) {
        if (this.isConnected()) {
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
    }
};

// Expose to window
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
