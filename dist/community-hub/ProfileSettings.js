const ProfileSettings = {
    unsubscribe: null,

    render: function (container, app) {
        if (!app.currentUser) {
            app.navigate('feed');
            return;
        }

        container.innerHTML = `
            <div class="max-w-3xl mx-auto xl:mx-0 pb-20">
                <header class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 class="text-3xl font-serif font-bold text-white mb-2">
                            Profile Settings
                        </h2>
                        <p class="text-sm text-dark-textMuted">
                            Customize your presence in the Community Hub.
                        </p>
                    </div>
                </header>

                <div class="glass-panel p-6 md:p-8 rounded-2xl relative">
                    <!-- Loading Overlay -->
                    <div id="ps-loading" class="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl hidden">
                        <div class="w-10 h-10 border-4 border-dark-border border-t-brand-blue rounded-full animate-spin"></div>
                    </div>

                    <form id="profile-settings-form" class="space-y-6">
                        
                        <!-- Avatar Section -->
                        <div class="flex flex-col md:flex-row gap-6 items-center">
                            <div class="relative group">
                                <div class="w-24 h-24 rounded-full bg-dark-surfaceHover border-2 border-dark-border overflow-hidden flex items-center justify-center" id="ps-avatar-preview">
                                    <i class="fa-solid fa-user text-3xl text-dark-textMuted"></i>
                                </div>
                            </div>
                            <div class="flex-1 w-full text-center md:text-left">
                                <h3 class="text-white font-bold text-lg mb-1">Profile Picture</h3>
                                <p class="text-xs text-dark-textMuted mb-3">Paste a direct image URL (e.g. from postimg.cc)</p>
                                <input type="url" id="ps-avatar-url" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all font-mono mb-2" placeholder="https://...">
                                <button type="button" id="ps-remove-avatar" class="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors hidden">Remove Image</button>
                            </div>
                        </div>

                        <hr class="border-dark-border">

                        <!-- Username -->
                        <div>
                            <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider mb-2">Unique Username</label>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-dark-textMuted font-bold">@</span>
                                <input type="text" id="ps-username" required pattern="[A-Za-z0-9_]{3,20}" title="3-20 characters, alphanumeric and underscores only" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 pl-9 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all font-mono" placeholder="username">
                            </div>
                            <p id="ps-username-hint" class="text-[0.65rem] mt-2 text-dark-textMuted">This will be used for mentions and profile URLs.</p>
                        </div>

                        <!-- Display Name -->
                        <div>
                            <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider mb-2">Display Name</label>
                            <input type="text" id="ps-displayname" required class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all" placeholder="Your Name">
                        </div>

                        <!-- Bio -->
                        <div>
                            <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider mb-2">Bio</label>
                            <textarea id="ps-bio" maxLength="160" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all min-h-[100px] resize-y" placeholder="Tell us about yourself..."></textarea>
                            <div class="text-right text-[0.65rem] text-dark-textMuted mt-1"><span id="ps-bio-count">0</span>/160</div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center justify-end pt-4 border-t border-dark-border gap-4">
                            <button type="button" onclick="CommunityApp.navigate('feed')" class="px-5 py-2 rounded-xl text-dark-textMuted hover:text-white transition-colors text-sm font-medium">Cancel</button>
                            <button type="submit" id="ps-submit-btn" class="px-8 py-2.5 rounded-xl text-white bg-gradient-to-r from-brand-blue to-brand-purp hover:from-blue-600 hover:to-purple-600 transition-colors text-sm font-bold shadow-lg shadow-brand-blue/20">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.attachLogic(app);
    },

    attachLogic: async function (app) {
        const form = document.getElementById('profile-settings-form');
        const unInput = document.getElementById('ps-username');
        const unHint = document.getElementById('ps-username-hint');
        const bioInput = document.getElementById('ps-bio');
        const nameInput = document.getElementById('ps-displayname');
        const avatarPreview = document.getElementById('ps-avatar-preview');
        const removeAvatarBtn = document.getElementById('ps-remove-avatar');
        const avatarUrlInput = document.getElementById('ps-avatar-url');
        let currentUsername = null;
        let currentAvatarUrl = null;

        // Load existing data
        try {
            const userDoc = await app.db.collection('users').doc(app.currentUser.uid).get();
            if (userDoc.exists) {
                const data = userDoc.data();
                if (data.username) {
                    currentUsername = data.username;
                    unInput.value = data.username;
                }
                if (data.displayName || data.name) nameInput.value = data.displayName || data.name;
                if (data.bio) {
                    bioInput.value = data.bio;
                    document.getElementById('ps-bio-count').textContent = data.bio.length;
                }
                if (data.avatarUrl) {
                    currentAvatarUrl = data.avatarUrl;
                    avatarPreview.innerHTML = `<img src="${data.avatarUrl}" class="w-full h-full object-cover">`;
                    removeAvatarBtn.classList.remove('hidden');
                }
            }
        } catch (e) {
            console.error(e);
        }

        // Bio counter
        bioInput.addEventListener('input', () => {
            document.getElementById('ps-bio-count').textContent = bioInput.value.length;
        });

        // Username checker
        let timeout = null;
        unInput.addEventListener('input', () => {
            clearTimeout(timeout);
            const val = unInput.value.trim().toLowerCase();

            if (!val || val === currentUsername) {
                unHint.textContent = "This will be used for mentions and profile URLs.";
                unHint.classList.replace('text-rose-400', 'text-dark-textMuted');
                unHint.classList.replace('text-emerald-400', 'text-dark-textMuted');
                unInput.setCustomValidity('');
                return;
            }

            unHint.textContent = "Checking availability...";
            unHint.classList.replace('text-rose-400', 'text-dark-textMuted');
            unHint.classList.replace('text-emerald-400', 'text-dark-textMuted');

            timeout = setTimeout(async () => {
                const checkDoc = await app.db.collection('usernames').doc(val).get();
                if (checkDoc.exists) {
                    unHint.textContent = "Username is already taken.";
                    unHint.classList.replace('text-dark-textMuted', 'text-rose-400');
                    unHint.classList.replace('text-emerald-400', 'text-rose-400');
                    unInput.setCustomValidity('Taken');
                } else {
                    unHint.textContent = "Username available!";
                    unHint.classList.replace('text-dark-textMuted', 'text-emerald-400');
                    unHint.classList.replace('text-rose-400', 'text-emerald-400');
                    unInput.setCustomValidity('');
                }
            }, 600);
        });

        // Image upload preview
        const imgInput = document.getElementById('ps-avatar-upload');
        imgInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                pendingAvatarFile = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
                    removeAvatarBtn.classList.remove('hidden');
                }
                reader.readAsDataURL(pendingAvatarFile);
            }
        });

        removeAvatarBtn.addEventListener('click', () => {
            pendingAvatarFile = null;
            currentAvatarUrl = null;
            imgInput.value = '';
            avatarPreview.innerHTML = `<i class="fa-solid fa-user text-3xl text-dark-textMuted"></i>`;
            removeAvatarBtn.classList.add('hidden');
        });

        // Form Submit
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            document.getElementById('ps-loading').classList.remove('hidden');

            const newUsername = unInput.value.trim().toLowerCase();
            const newName = nameInput.value.trim();
            const newBio = bioInput.value.trim();

            try {
                let finalAvatarUrl = avatarUrlInput.value.trim() || null;

                // 2. Transaction for Username change
                if (newUsername !== currentUsername && newUsername.length > 0) {
                    const newUsernameRef = app.db.collection('usernames').doc(newUsername);
                    const oldUsernameRef = currentUsername ? app.db.collection('usernames').doc(currentUsername) : null;
                    const userRef = app.db.collection('users').doc(app.currentUser.uid);

                    await app.db.runTransaction(async (transaction) => {
                        const checkDoc = await transaction.get(newUsernameRef);
                        if (checkDoc.exists) throw new Error("Username taken");

                        // Add new
                        transaction.set(newUsernameRef, { uid: app.currentUser.uid });
                        // Delete old
                        if (oldUsernameRef) transaction.delete(oldUsernameRef);
                        // Update user
                        transaction.update(userRef, {
                            username: newUsername,
                            displayName: newName,
                            bio: newBio,
                            avatarUrl: finalAvatarUrl
                        });
                    });
                } else {
                    // Just update profile fields
                    await app.db.collection('users').doc(app.currentUser.uid).set({
                        displayName: newName,
                        bio: newBio,
                        avatarUrl: finalAvatarUrl
                    }, { merge: true });
                }

                // Refresh app state
                await app.fetchUserProfile(app.currentUser.uid);

                // Show success logic silently then nav back
                app.navigate('feed');

            } catch (err) {
                console.error("Profile save error", err);
                alert("Could not save profile: " + err.message);
                document.getElementById('ps-loading').classList.add('hidden');
            }
        });
    }
};

export default ProfileSettings;
