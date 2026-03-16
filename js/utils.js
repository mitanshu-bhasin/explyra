
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
        const connect = confirm("Google Drive is not connected. Connect now to send attachments?");
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
    const div = document.createElement('div');
    div.innerText = text;
    let safeText = div.innerHTML;

    // Then convert markdown links [text](url) to HTML links
    safeText = safeText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
        const safeUrl = url.replace(/"/g, '&quot;');
        // Also if it's an image attachment link
        if (label.includes('📎 Attachment:')) {
            return `<a href="${safeUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 mt-1 bg-brand-50/20 text-brand-600 dark:text-brand-300 dark:bg-black/20 hover:bg-brand-50 dark:hover:bg-black/40 rounded-lg text-xs font-bold transition border border-brand-100 dark:border-white/10" style="text-decoration: none;"><i class="fa-solid fa-file-arrow-down"></i> ${label.replace('📎 Attachment: ', '')}</a>`;
        }
        return `<a href="${safeUrl}" target="_blank" class="underline hover:opacity-80 transition">${label}</a>`;
    });

    return safeText;
};
