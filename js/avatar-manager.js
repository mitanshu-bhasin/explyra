// js/avatar-manager.js
// Avatar Management System - Handles user avatar upload, storage, and display

class AvatarManager {
    constructor() {
        this.storageKey = 'explyra_user_avatar';
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        this.avatarDefaults = {
            logo: 'https://explyra.me/assets/images/explyra_logo.png',
            placeholder: '?'
        };
    }

    /**
     * Get user's avatar URL
     * @param {string} userId - User ID
     * @returns {string} Avatar URL or default
     */
    getAvatarUrl(userId = null) {
        const id = userId || (window.userData?.docId);
        if (!id) return this.avatarDefaults.logo;

        try {
            const stored = localStorage.getItem(`${this.storageKey}_${id}`);
            if (stored && this.isValidDataUrl(stored)) {
                return stored;
            }
        } catch (e) {
            console.warn('Avatar storage error:', e);
        }
        return this.avatarDefaults.logo;
    }

    /**
     * Get user's avatar as initials
     * @param {string} name - User name
     * @returns {string} Initials
     */
    getAvatarInitials(name = null) {
        const fullName = name || window.userData?.name || '?';
        if (fullName === '?') return '?';
        const parts = fullName.trim().split(/\s+/);
        if (parts.length > 1) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return fullName.substring(0, 2).toUpperCase();
    }

    /**
     * Get avatar background color based on initials
     * @param {string} name - User name
     * @returns {string} RGB color
     */
    getAvatarColor(name = null) {
        const fullName = name || window.userData?.name || 'User';
        const colors = [
            'rgb(59, 130, 246)',   // Blue
            'rgb(34, 197, 94)',    // Green
            'rgb(249, 115, 22)',   // Orange
            'rgb(168, 85, 247)',   // Purple
            'rgb(236, 72, 153)',   // Pink
            'rgb(14, 165, 233)',   // Sky
            'rgb(16, 185, 129)',   // Teal
            'rgb(244, 63, 94)',    // Rose
        ];
        const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    }

    /**
     * Validate data URL
     * @param {string} dataUrl - Data URL
     * @returns {boolean}
     */
    isValidDataUrl(dataUrl) {
        return typeof dataUrl === 'string' && dataUrl.startsWith('data:image/');
    }

    /**
     * Upload and save avatar
     * @param {File} file - Image file
     * @param {string} userId - User ID
     * @returns {Promise<boolean>}
     */
    async uploadAvatar(file, userId = null) {
        const id = userId || window.userData?.docId;
        if (!id) {
            console.error('No user ID available');
            return false;
        }

        // Validate file
        if (!this.allowedTypes.includes(file.type)) {
            throw new Error('Only JPEG, PNG, and WebP images are allowed');
        }

        if (file.size > this.maxFileSize) {
            throw new Error('File size must be less than 5MB');
        }

        try {
            // Compress and convert to data URL
            const dataUrl = await this.compressImage(file);
            
            // Save to localStorage
            localStorage.setItem(`${this.storageKey}_${id}`, dataUrl);
            
            // Also save metadata to Firestore if available
            if (window.db && window.userData) {
                const { doc, updateDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');
                try {
                    const userRef = doc(window.db, 'users', id);
                    await updateDoc(userRef, {
                        avatarUrl: dataUrl,
                        avatarUpdatedAt: serverTimestamp()
                    });
                } catch (e) {
                    console.warn('Failed to save avatar to Firestore:', e);
                }
            }

            this.updateAllAvatarDisplays();
            return true;
        } catch (e) {
            console.error('Avatar upload error:', e);
            throw e;
        }
    }

    /**
     * Compress image and convert to data URL
     * @param {File} file - Image file
     * @returns {Promise<string>} Data URL
     */
    async compressImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set max dimensions (200x200)
                    const maxSize = 200;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxSize || height > maxSize) {
                        if (width > height) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        } else {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to data URL with quality reduction
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                img.onerror = () => reject(new Error('Invalid image'));
                img.src = e.target.result;
            };
            
            reader.onerror = () => reject(new Error('File read error'));
            reader.readAsDataURL(file);
        });
    }

    /**
     * Remove avatar and revert to default
     * @param {string} userId - User ID
     * @returns {Promise<boolean>}
     */
    async removeAvatar(userId = null) {
        const id = userId || window.userData?.docId;
        if (!id) return false;

        try {
            localStorage.removeItem(`${this.storageKey}_${id}`);
            
            // Update Firestore
            if (window.db && window.userData) {
                const { doc, updateDoc, serverTimestamp, deleteField } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');
                try {
                    const userRef = doc(window.db, 'users', id);
                    await updateDoc(userRef, {
                        avatarUrl: deleteField(),
                        avatarUpdatedAt: serverTimestamp()
                    });
                } catch (e) {
                    console.warn('Failed to remove avatar from Firestore:', e);
                }
            }

            this.updateAllAvatarDisplays();
            return true;
        } catch (e) {
            console.error('Avatar removal error:', e);
            throw e;
        }
    }

    /**
     * Update all avatar displays on page
     */
    updateAllAvatarDisplays() {
        // Update sidebar avatar
        this.updateAvatarDisplay('sidebar-user-avatar');
        
        // Update header avatar
        this.updateAvatarDisplay('header-profile-avatar');
        
        // Update any other avatar displays
        document.querySelectorAll('[data-avatar-display]').forEach(el => {
            this.updateAvatarDisplay(el.id);
        });
    }

    /**
     * Update avatar display element
     * @param {string} elementId - Element ID
     */
    updateAvatarDisplay(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const avatarUrl = this.getAvatarUrl();
        const initials = this.getAvatarInitials();
        const bgColor = this.getAvatarColor();

        if (this.isValidDataUrl(avatarUrl)) {
            // Show custom avatar image
            el.innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width:100%;height:100%;border-radius:inherit;object-fit:cover;">`;
            el.style.background = 'none';
        } else {
            // Show default logo or initials
            el.style.background = `linear-gradient(135deg, ${bgColor}, rgba(255,255,255,0.1))`;
            el.innerHTML = `<span style="font-weight:600;font-size:14px;color:#fff;">${initials}</span>`;
        }
    }

    /**
     * Create avatar picker modal
     * @returns {HTMLElement}
     */
    createAvatarPickerModal() {
        const modal = document.createElement('div');
        modal.id = 'modal-avatar-picker';
        modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 hidden flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col animate-[slideUp_0.2s] border border-slate-100 dark:border-slate-800">
                <!-- Header -->
                <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 class="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">
                        <i class="fa-solid fa-image mr-2"></i>Change Profile Avatar
                    </h3>
                    <button type="button" onclick="document.getElementById('modal-avatar-picker').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-6">
                    <!-- Current Avatar Preview -->
                    <div class="flex items-center justify-center gap-4">
                        <div class="text-center">
                            <div id="avatar-current-preview" class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-2">
                                ${this.getAvatarInitials()}
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Current</p>
                        </div>
                    </div>

                    <!-- Upload Section -->
                    <div class="space-y-3">
                        <label class="block text-[10px] font-bold text-slate-500 uppercase mb-2">Upload from Gallery</label>
                        <label class="receipt-label cursor-pointer p-6 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition">
                            <input type="file" id="avatar-file-input" class="hidden" accept="image/jpeg,image/png,image/webp">
                            <div class="text-center">
                                <i class="fa-solid fa-cloud-arrow-up text-2xl text-slate-400 mb-2"></i>
                                <p class="text-xs font-bold text-slate-600 dark:text-slate-300">Click to upload or drag & drop</p>
                                <p class="text-[10px] text-slate-400 mt-1">JPEG, PNG, WebP (Max 5MB)</p>
                            </div>
                        </label>
                    </div>

                    <!-- Preview Before Upload -->
                    <div id="avatar-preview-container" class="hidden">
                        <label class="block text-[10px] font-bold text-slate-500 uppercase mb-2">Preview</label>
                        <div class="flex items-center justify-center gap-4">
                            <div id="avatar-new-preview" class="w-24 h-24 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden shadow"></div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <button type="button" onclick="document.getElementById('modal-avatar-picker').classList.add('hidden')"
                            class="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition hover:bg-slate-200 dark:hover:bg-slate-600">
                            Cancel
                        </button>
                        <button id="btn-avatar-upload" type="button" onclick="window.avatarManager?.uploadFromInput()"
                            class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            Upload Avatar
                        </button>
                        <button id="btn-avatar-remove" type="button" onclick="window.avatarManager?.removeAvatarConfirm()"
                            class="flex-1 px-4 py-2.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold transition hover:bg-red-200 dark:hover:bg-red-900/40">
                            Reset to Default
                        </button>
                    </div>

                    <!-- Info Text -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p class="text-[10px] text-blue-800 dark:text-blue-300 leading-relaxed">
                            <i class="fa-solid fa-info-circle mr-1"></i>Your avatar will be displayed across the platform. You can change it anytime from your profile settings.
                        </p>
                    </div>
                </div>
            </div>
        `;

        return modal;
    }

    /**
     * Setup avatar file input handler
     */
    setupFileInputHandler() {
        const fileInput = document.getElementById('avatar-file-input');
        if (!fileInput) return;

        fileInput.addEventListener('change', (e) => this.previewAvatar(e.target.files[0]));

        // Drag and drop
        const dropZone = fileInput.closest('.receipt-label');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('bg-blue-50', 'dark:bg-blue-900/20');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    fileInput.dispatchEvent(new Event('change'));
                }
            });
        }
    }

    /**
     * Preview avatar before upload
     * @param {File} file - Image file
     */
    async previewAvatar(file) {
        if (!file) return;

        try {
            const previewContainer = document.getElementById('avatar-preview-container');
            const previewImage = document.getElementById('avatar-new-preview');
            const uploadBtn = document.getElementById('btn-avatar-upload');

            if (!previewImage) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;">`;
                previewContainer.classList.remove('hidden');
                uploadBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        } catch (e) {
            console.error('Preview error:', e);
        }
    }

    /**
     * Upload avatar from file input
     */
    async uploadFromInput() {
        const fileInput = document.getElementById('avatar-file-input');
        const uploadBtn = document.getElementById('btn-avatar-upload');
        
        if (!fileInput?.files[0]) {
            alert('Please select an image first');
            return;
        }

        const file = fileInput.files[0];
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i>Uploading...';

        try {
            await this.uploadAvatar(file);
            window.showToast?.('Avatar updated successfully!', 'success');
            document.getElementById('modal-avatar-picker')?.classList.add('hidden');
            fileInput.value = '';
        } catch (error) {
            window.showToast?.(error.message || 'Failed to upload avatar', 'error');
            console.error(error);
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.innerHTML = 'Upload Avatar';
        }
    }

    /**
     * Remove avatar with confirmation
     */
    async removeAvatarConfirm() {
        const ok = confirm('Remove your custom avatar? Your profile will show default initials.');
        if (!ok) return;

        try {
            await this.removeAvatar();
            window.showToast?.('Avatar removed. Default avatar restored.', 'success');
            document.getElementById('avatar-preview-container')?.classList.add('hidden');
            document.getElementById('avatar-file-input').value = '';
            location.reload();
        } catch (e) {
            window.showToast?.(e.message || 'Failed to remove avatar', 'error');
        }
    }

    /**
     * Initialize avatar system
     */
    async init() {
        try {
            // Create and inject avatar picker modal
            const modal = this.createAvatarPickerModal();
            if (!document.getElementById('modal-avatar-picker')) {
                document.body.appendChild(modal);
            }

            // Setup file input with delay for DOM readiness
            setTimeout(() => {
                this.setupFileInputHandler();
                // Update displays on init
                this.updateAllAvatarDisplays();
            }, 100);

            // Listen for user data changes
            document.addEventListener('userDataLoaded', () => {
                this.updateAllAvatarDisplays();
            });

            // Make methods globally accessible
            window.openAvatarPickerModal = () => {
                const modal = document.getElementById('modal-avatar-picker');
                if (modal) {
                    modal.classList.remove('hidden');
                } else {
                    console.error('Avatar picker modal not found');
                }
            };

        } catch (error) {
            console.warn('Avatar manager setup warning:', error);
        }
    }
}

// Initialize globally
window.avatarManager = new AvatarManager();

// Setup initialization
const initAvatarSystem = () => {
    if (window.avatarManager) {
        window.avatarManager.init();
    }
};

// Try to initialize as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarSystem);
} else {
    setTimeout(initAvatarSystem, 100);
}

// Fallback on window load
window.addEventListener('load', initAvatarSystem);

window.AvatarManager = AvatarManager;
