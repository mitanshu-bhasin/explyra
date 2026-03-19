
class CustomModal {
    constructor() {
        this.init();
    }

    init() {
        const injectHTML = () => {
            if (!document.getElementById('custom-modal-overlay')) {
                const modalHTML = `
                <div id="custom-modal-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4 transition-opacity duration-300 opacity-0">
                    <div id="custom-modal-box" class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform scale-95 transition-transform duration-300">
                        <div id="custom-modal-icon" class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm"></div>
                        <h3 id="custom-modal-title" class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2"></h3>
                        <p id="custom-modal-message" class="text-sm text-slate-500 dark:text-slate-400 mb-6"></p>
                        
                        <div id="custom-modal-input-container" class="hidden mb-6">
                            <input type="text" id="custom-modal-input" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all dark:text-slate-200" placeholder="Type here...">
                        </div>

                        <div id="custom-modal-actions" class="flex gap-3 justify-center">
                            <button id="custom-modal-cancel" class="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-bold transition hidden">Cancel</button>
                            <button id="custom-modal-confirm" class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-green-200 dark:shadow-none">OK</button>
                        </div>
                    </div>
                </div>
                `;
                document.body.insertAdjacentHTML('beforeend', modalHTML);
            }

            this.overlay = document.getElementById('custom-modal-overlay');
            this.box = document.getElementById('custom-modal-box');
            this.title = document.getElementById('custom-modal-title');
            this.message = document.getElementById('custom-modal-message');
            this.inputContainer = document.getElementById('custom-modal-input-container');
            this.input = document.getElementById('custom-modal-input');
            this.icon = document.getElementById('custom-modal-icon');
            this.cancelBtn = document.getElementById('custom-modal-cancel');
            this.confirmBtn = document.getElementById('custom-modal-confirm');
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectHTML);
        } else {
            injectHTML();
        }
    }

    show(type, title, message, hasInput = false, confirmText = 'OK', cancelText = 'Cancel', iconClass = 'fa-info') {
        return new Promise((resolve) => {
            // Reset state
            this.inputContainer.classList.add('hidden');
            this.cancelBtn.classList.add('hidden');
            this.input.value = '';

            // Set Content
            this.title.textContent = title;
            this.message.textContent = message;
            this.confirmBtn.textContent = confirmText;
            this.cancelBtn.textContent = cancelText;

            // Icon Styling
            this.icon.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm ' +
                (type === 'error' ? 'bg-red-50 text-red-500' :
                    type === 'success' ? 'bg-green-50 text-green-500' :
                        type === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500');

            this.icon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

            // Input Logic
            if (hasInput) {
                this.inputContainer.classList.remove('hidden');
                setTimeout(() => this.input.focus(), 100);
            }

            // Buttons
            if (type === 'confirm' || type === 'prompt') {
                this.cancelBtn.classList.remove('hidden');
            }

            // Event Handlers
            const handleConfirm = () => {
                close();
                resolve(hasInput ? this.input.value : true);
            };

            const handleCancel = () => {
                close();
                resolve(hasInput ? null : false);
            };

            const close = () => {
                this.overlay.classList.remove('opacity-100');
                this.box.classList.remove('scale-100');
                this.box.classList.add('scale-95');
                setTimeout(() => {
                    this.overlay.classList.add('hidden');
                    this.confirmBtn.removeEventListener('click', handleConfirm);
                    this.cancelBtn.removeEventListener('click', handleCancel);
                    this.input.onkeydown = null;
                }, 300);
            };

            this.confirmBtn.onclick = handleConfirm;
            this.cancelBtn.onclick = handleCancel;

            if (hasInput) {
                this.input.onkeydown = (e) => {
                    if (e.key === 'Enter') handleConfirm();
                    if (e.key === 'Escape') handleCancel();
                };
            }

            // Show
            this.overlay.classList.remove('hidden');
            // Force reflow
            void this.overlay.offsetWidth;
            this.overlay.classList.add('opacity-100');
            this.box.classList.remove('scale-95');
            this.box.classList.add('scale-100');
        });
    }
}

const modalSystem = new CustomModal();

// Window overrides
window.alert = async (message) => {
    await modalSystem.show('alert', 'Notification', message, false, 'OK', '', 'fa-bell');
};

window.confirm = async (message) => {
    return await modalSystem.show('confirm', 'Confirmation', message, false, 'Yes, Proceed', 'Cancel', 'fa-question');
};

window.prompt = async (message, defaultValue = '') => {
    const result = await modalSystem.show('prompt', 'Input Required', message, true, 'Submit', 'Cancel', 'fa-keyboard');
    return result;
};

// Expose internal method for custom usages
window.customModal = modalSystem;

// Handle Google Drive Chat Attachments
window.handleChatAttachmentSelect = async (inputElement, targetInputId) => {
    const file = inputElement.files[0];
    if (!file) return;

    if (!window.GDriveService) {
        if (window.showToast) window.showToast('Google Drive Service not loaded.', 'error');
        return;
    }

    if (!window.GDriveService.isConnected()) {
        const connect = await confirm("Google Drive is not connected. Connect now to send attachments?");
        if (connect) {
            window.GDriveService.authenticate(() => {
                // Retry after connect
                window.handleChatAttachmentSelect(inputElement, targetInputId);
            });
        }
        inputElement.value = ''; // Reset
        return;
    }

    // Indicate upload in progress on the submit button
    const form = inputElement.closest('form');
    let submitBtn = null;
    let originalBtnHTML = '';
    if (form) {
        submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
            submitBtn.disabled = true;
        }
    }
    
    // Also disable the paperclip button
    const attachBtn = inputElement.nextElementSibling;
    let origAttachClass = attachBtn ? attachBtn.className : '';
    if (attachBtn) {
        attachBtn.classList.add('opacity-50', 'cursor-not-allowed');
        attachBtn.classList.remove('hover:bg-slate-200', 'dark:hover:bg-slate-800');
    }

    try {
        const uploadResult = await window.GDriveService.uploadFile(file);
        
        // Append the Drive link to the chat input value
        const targetInput = document.getElementById(targetInputId);
        if (targetInput) {
            const linkText = ` [📎 Attachment: ${file.name}](${uploadResult.url}) `;
            // Automatically submit if it's empty, or just append
            if (targetInput.value.trim() === '') {
                 targetInput.value = linkText;
                 // Manually trigger form submit
                 if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            } else {
                 targetInput.value += linkText;
                 targetInput.focus();
            }
        }
    } catch (e) {
        console.error("Attachment upload failed", e);
        // Error toast is handled in gdrive-service.js
    } finally {
        inputElement.value = ''; // Reset input to allow selecting same file again
        
        // Restore buttons
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
        }
        if (attachBtn) {
            attachBtn.className = origAttachClass;
        }
    }
};

// Utility to parse markdown links in chat
window.parseChatLinks = (text) => {
    if (!text) return '';
    
    // First escape HTML to prevent XSS
    const tempDiv = document.createElement('div');
    tempDiv.innerText = text;
    let safeText = tempDiv.innerHTML;

    // 1. Detection for Google Maps raw links
    // Format: 📍 Shared Location: https://www.google.com/maps?q=lat,lng
    const mapsRegex = /https:\/\/www\.google\.com\/maps\?q=(-?\d+\.?\d*),(-?\d+\.?\d*)/g;
    safeText = safeText.replace(mapsRegex, (match, lat, lng) => {
        const isEnabled = localStorage.getItem('google_maps_enabled') === 'true';
        const apiKey = window.EXPLYRA_CONFIG?.firebase?.apiKey || '';
        
        if (!isEnabled) {
            return `<div class="mt-2 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5 flex flex-col gap-2 italic text-[10px] text-slate-500">
                <div class="flex items-center gap-2"><i class="fa-solid fa-location-dot"></i> Logged location shared</div>
                <button onclick="window.enableMaps && window.enableMaps()" class="text-explyra-blue font-bold hover:underline text-left">Enable Google Maps preview</button>
            </div>`;
        }

        const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`;
        
        return `
            <div class="mt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-white dark:bg-black/40 max-w-sm">
                <div class="h-44 w-full relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <iframe width="100%" height="100%" frameborder="0" style="border:0" src="${embedUrl}" allowfullscreen></iframe>
                    <div class="absolute top-2 right-2 flex gap-1">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" class="px-2.5 py-1.5 bg-white/95 dark:bg-black/90 backdrop-blur rounded-xl text-[10px] font-extrabold text-blue-600 shadow-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all border border-blue-100 dark:border-blue-900/30">
                            <i class="fa-solid fa-diamond-turn-right"></i> Start Navigation
                        </a>
                    </div>
                </div>
                <div class="p-3 flex items-center justify-between border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-600/20 text-blue-600 flex items-center justify-center text-xs shadow-inner"><i class="fa-solid fa-location-arrow"></i></div>
                        <div class="flex flex-col">
                            <span class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Live Location</span>
                            <span class="text-[8px] text-slate-400 font-bold -mt-0.5">${lat.slice(0,7)}, ${lng.slice(0,7)}</span>
                        </div>
                    </div>
                    <a href="${match}" target="_blank" class="text-[10px] text-blue-600 font-black hover:underline uppercase tracking-widest bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded-lg">Full Map</a>
                </div>
            </div>`;
    });

    // 1b. Detection for Google Meet links
    const meetRegex = /https:\/\/meet\.google\.com\/[a-z\-]+/g;
    safeText = safeText.replace(meetRegex, (match) => {
        const meetCode = match.split('/').pop();
        return `
            <div class="mt-2 rounded-2xl overflow-hidden border border-green-200 dark:border-green-800/40 shadow-lg bg-white dark:bg-black/40 max-w-sm">
                <div class="p-4 flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                    <div class="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-lg flex-shrink-0">
                        <i class="fa-solid fa-video text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <span class="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">Google Meet</span>
                        <p class="text-[9px] text-slate-500 font-mono truncate">${meetCode}</p>
                    </div>
                </div>
                <div class="p-3 flex items-center gap-2 border-t border-green-100 dark:border-green-900/30 bg-white/80 dark:bg-black/60">
                    <a href="${match}" target="_blank" class="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[10px] font-extrabold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-lg active:scale-95" style="text-decoration:none;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Join Meeting
                    </a>
                    <button onclick="navigator.clipboard.writeText('${match}');window.showToast && window.showToast('Link copied!','success')" class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1">
                        <i class="fa-solid fa-copy"></i> Copy
                    </button>
                </div>
            </div>`;
    });

    // 2. Convert markdown links [text](url) to HTML links
    safeText = safeText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
        const safeUrl = url.replace(/"/g, '&quot;');
        
        // Detection for media types (check URL first, then label)
        const getExt = (str) => str.split('.').pop().split(/[?#]/)[0].toLowerCase();
        let extension = getExt(url);
        // If URL doesn't have it (common for GDrive), check label
        if (extension.length > 4 || url.includes('/file/d/')) {
            extension = getExt(label);
        }

        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
        const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(extension);

        // Also if it's an image attachment link
        if (label.includes('📎 Attachment:')) {
            const fileName = label.replace('📎 Attachment: ', '');
            let previewHtml = '';
            
            if (isImage) {
                 previewHtml = `<div class="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 max-w-xs shadow-sm bg-slate-100 dark:bg-slate-900"><img src="${safeUrl.replace('/view', '/thumbnail?sz=w600')}" class="w-full h-auto cursor-pointer hover:opacity-90 transition object-contain" style="max-height:180px" onclick="window.open('${safeUrl}', '_blank')" alt="${fileName}" onerror="this.parentElement.style.display='none'"></div>`;
            } else if (isVideo) {
                 previewHtml = `<div class="mt-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <i class="fa-solid fa-video text-2xl text-slate-400"></i>
                    <div class="text-[10px] text-slate-500 font-medium">Video preview available at Drive link</div>
                 </div>`;
            }

            return `
                <div class="flex flex-col gap-1 my-2">
                    <a href="${safeUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50/20 text-brand-600 dark:text-brand-300 dark:bg-black/20 hover:bg-brand-50 dark:hover:bg-black/40 rounded-lg text-xs font-bold transition border border-brand-100 dark:border-white/10" style="text-decoration: none;">
                        <i class="fa-solid fa-file-arrow-down"></i> ${fileName}
                    </a>
                    ${previewHtml}
                </div>`;
        }
        
        if (isImage) {
            return `<div class="mt-1"><img src="${safeUrl}" class="max-w-full rounded-lg border border-slate-200 dark:border-white/10 shadow-sm" alt="Image" onerror="this.outerHTML='<a href=&quot;${safeUrl}&quot; target=&quot;_blank&quot;>${label}</a>'"><br><a href="${safeUrl}" target="_blank" class="text-[10px] opacity-70 underline">Open Original</a></div>`;
        }
        
        return `<a href="${safeUrl}" target="_blank" class="underline hover:opacity-80 transition">${label}</a>`;
    });

    // 3. Mentions (@username or @meet)
    safeText = safeText.replace(/(@[A-Za-z0-9_]+)/g, '<span class="text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-1 rounded mx-0.5">$1</span>');

    return safeText;
};

// Global Integrations UI Update helper
window.updateGDriveUI = () => {
    const isDriveConnected = window.GDriveService && window.GDriveService.isConnected();
    const isMapsEnabled = localStorage.getItem('google_maps_enabled') === 'true';
    
    // IDs to check for Drive/Sheets/Calendar/Meet
    const driveStatusIds = ['gdrive-status-text', 'gsheets-status-text', 'gcalendar-status-text', 'gmeet-status-text', 'emp-gdrive-status-text', 'emp-gsheets-status-text', 'emp-gcalendar-status-text', 'emp-gmeet-status-text'];
    const driveBtnIds = ['btn-gdrive-connect', 'btn-gsheets-connect', 'btn-gcalendar-connect', 'btn-gmeet-connect', 'btn-emp-gdrive-connect', 'btn-emp-gsheets-connect', 'btn-emp-gcalendar-connect', 'btn-emp-gmeet-connect'];
    
    // IDs for Maps
    const mapStatusIds = ['maps-status-text', 'emp-maps-status-text'];
    const mapBtnIds = ['btn-maps-connect', 'btn-emp-maps-connect'];
    
    driveStatusIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = isDriveConnected ? 'Connected' : 'Not connected';
            el.className = isDriveConnected ? 'text-[9px] text-green-500 font-bold' : 'text-[9px] text-slate-500 font-medium';
        }
    });
    
    driveBtnIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (isDriveConnected) {
                el.innerHTML = '<i class="fa-solid fa-check-circle"></i> Connected';
                el.classList.add('bg-green-50', 'dark:bg-green-900/20', 'text-green-600', 'dark:text-green-400', 'border-green-200', 'dark:border-green-800/30');
                el.classList.remove('text-slate-700', 'dark:text-slate-300');
                
                // Add disconnect button if not exists
                const dId = id + '-disconnect';
                if (!document.getElementById(dId)) {
                    const db = document.createElement('button');
                    db.id = dId;
                    db.className = 'ml-2 text-[10px] text-red-500 hover:text-red-700 font-bold uppercase transition';
                    db.innerHTML = '<i class="fa-solid fa-unlink"></i>';
                    db.onclick = (e) => { e.stopPropagation(); window.GDriveService.disconnect(); };
                    el.after(db);
                }
            } else {
                el.innerHTML = '<i class="fa-solid fa-link"></i> Connect';
                el.classList.remove('bg-green-50', 'dark:bg-green-900/20', 'text-green-600', 'dark:text-green-400', 'border-green-200', 'dark:border-green-800/30');
                el.classList.add('text-slate-700', 'dark:text-slate-300');
                const d = document.getElementById(id + '-disconnect');
                if (d) d.remove();
            }
        }
    });

    // Handle Maps
    mapStatusIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = isMapsEnabled ? 'Active' : 'Not active';
            el.className = isMapsEnabled ? 'text-[9px] text-blue-500 font-bold' : 'text-[9px] text-slate-500 font-medium';
        }
    });

    mapBtnIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (isMapsEnabled) {
                el.innerHTML = '<i class="fa-solid fa-check"></i> Active';
                el.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-600', 'dark:text-blue-400', 'border-blue-200', 'dark:border-blue-800/30');
                el.classList.remove('text-slate-700', 'dark:text-slate-300');
                
                // Add disable button
                const dId = id + '-disable';
                if (!document.getElementById(dId)) {
                    const db = document.createElement('button');
                    db.id = dId;
                    db.className = 'ml-2 text-[10px] text-red-500 hover:text-red-700 font-bold uppercase transition';
                    db.innerHTML = '<i class="fa-solid fa-power-off"></i>';
                    db.onclick = (e) => { e.stopPropagation(); localStorage.setItem('google_maps_enabled', 'false'); window.updateGDriveUI(); };
                    el.after(db);
                }
            } else {
                el.innerHTML = '<i class="fa-solid fa-power-off"></i> Enable';
                el.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-600', 'dark:text-blue-400', 'border-blue-200', 'dark:border-blue-800/30');
                el.classList.add('text-slate-700', 'dark:text-slate-300');
                const d = document.getElementById(id + '-disable');
                if (d) d.remove();
            }
        }
    });
};

window.enableMaps = () => {
    localStorage.setItem('google_maps_enabled', 'true');
    window.updateGDriveUI();
    if (window.showToast) window.showToast("Google Maps services enabled!", "success");
};

// Listen for connection events globally
window.addEventListener('gdrive-connected', window.updateGDriveUI);
window.addEventListener('gdrive-disconnected', window.updateGDriveUI);

// Check status on load
document.addEventListener('DOMContentLoaded', () => {
    // Initial check
    setTimeout(() => {
        if (window.updateGDriveUI) window.updateGDriveUI();
    }, 1000);
});

// Shared accessibility enhancements for legacy modal patterns across portals.
window.initModalAccessibility = () => {
    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    let activeModal = null;
    let lastFocused = null;

    const getModalCandidates = () => Array.from(document.querySelectorAll(
        '[id^="modal-"], #user-modal, #project-modal, #delete-modal, #global-modal, #input-modal'
    )).filter((node) => node && node.classList && node.classList.contains('fixed'));

    const isVisibleModal = (el) => el && !el.classList.contains('hidden') && getComputedStyle(el).display !== 'none';

    const decorateModal = (modal) => {
        if (!modal || modal.dataset.a11yDecorated === 'true') return;
        modal.dataset.a11yDecorated = 'true';
        modal.setAttribute('role', modal.getAttribute('role') || 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', modal.classList.contains('hidden') ? 'true' : 'false');
    };

    const decorateIconButtons = () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn) => {
            const hasLabel = btn.getAttribute('aria-label');
            const text = (btn.textContent || '').trim();
            const iconOnly = !text;
            if (!hasLabel && iconOnly) {
                const icon = btn.querySelector('i');
                if (!icon) return;
                const cls = icon.className || '';
                if (cls.includes('fa-xmark') || cls.includes('fa-times')) btn.setAttribute('aria-label', 'Close');
                else if (cls.includes('fa-moon')) btn.setAttribute('aria-label', 'Toggle theme');
                else if (cls.includes('fa-bell')) btn.setAttribute('aria-label', 'Open notifications');
                else if (cls.includes('fa-search') || cls.includes('fa-magnifying-glass')) btn.setAttribute('aria-label', 'Search');
            }
            const icon = btn.querySelector('i');
            if (icon) icon.setAttribute('aria-hidden', 'true');
        });
    };

    const handleTrap = (event) => {
        if (!activeModal || !isVisibleModal(activeModal) || event.key !== 'Tab') return;
        const focusables = Array.from(activeModal.querySelectorAll(focusableSelector))
            .filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const syncActiveModal = () => {
        const visible = getModalCandidates().filter(isVisibleModal);
        visible.forEach((m) => m.setAttribute('aria-hidden', 'false'));
        getModalCandidates().filter((m) => !isVisibleModal(m)).forEach((m) => m.setAttribute('aria-hidden', 'true'));

        const next = visible[visible.length - 1] || null;
        if (next && activeModal !== next) {
            lastFocused = document.activeElement;
            activeModal = next;
            const focusables = Array.from(activeModal.querySelectorAll(focusableSelector));
            if (focusables.length) setTimeout(() => focusables[0].focus(), 20);
        } else if (!next && activeModal) {
            activeModal = null;
            if (lastFocused && typeof lastFocused.focus === 'function') {
                setTimeout(() => lastFocused.focus(), 10);
            }
        }
    };

    getModalCandidates().forEach(decorateModal);
    decorateIconButtons();
    syncActiveModal();

    const mo = new MutationObserver(() => {
        getModalCandidates().forEach(decorateModal);
        decorateIconButtons();
        syncActiveModal();
    });
    mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-label'] });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeModal) {
            const closeButton = activeModal.querySelector('button[aria-label="Close"], button i.fa-xmark, button i.fa-times');
            if (closeButton) {
                const btn = closeButton.tagName === 'BUTTON' ? closeButton : closeButton.closest('button');
                if (btn) btn.click();
            }
        }
        handleTrap(event);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof window.initModalAccessibility === 'function') {
            window.initModalAccessibility();
        }
    }, 150);
});
