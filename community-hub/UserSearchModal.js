const UserSearchModal = {
    render: function (app) {
        this.close();

        const pID = 'user-search-modal-container';
        let overlay = document.createElement('div');
        overlay.id = pID;
        overlay.className = 'fixed inset-0 z-[100] flex justify-center sm:items-start pt-0 sm:pt-20 p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in translate-y-full sm:translate-y-0';

        overlay.innerHTML = `
            <div class="glass-panel w-full sm:w-[500px] h-full sm:h-[600px] sm:max-h-[85vh] sm:rounded-2xl flex flex-col relative bg-dark-bg/95 border-dark-border sm:border shadow-2xl overflow-hidden" id="usm-inner">
                <!-- Search Header -->
                <div class="p-4 border-b border-dark-border flex items-center gap-3">
                    <button id="usm-close" class="w-8 h-8 rounded-full bg-dark-surfaceHover flex items-center justify-center text-dark-textMuted hover:text-white transition-colors shrink-0 sm:hidden">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <div class="flex-1 relative">
                        <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-dark-textMuted"></i>
                        <input type="text" id="usm-input" class="w-full bg-dark-surfaceHover/50 border border-dark-border rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-dark-textMuted focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all text-sm" placeholder="Search people by name or @username..." autocomplete="off">
                    </div>
                    <button class="text-xs font-semibold text-dark-textMuted hover:text-white hidden sm:block shrink-0 px-2" onclick="document.getElementById('${pID}').remove()">Cancel</button>
                </div>
                
                <!-- Search Results -->
                <div class="flex-1 overflow-y-auto p-4 space-y-2" id="usm-results">
                    <div class="text-center py-10 px-4">
                        <i class="fa-solid fa-users text-4xl text-dark-textMuted mb-4 opacity-50"></i>
                        <p class="text-dark-textMuted text-sm">Find members, experts, and founders.</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        const inner = document.getElementById('usm-inner');

        requestAnimationFrame(() => {
            overlay.classList.remove('translate-y-full');
            document.getElementById('usm-input').focus();
        });

        const closeBtn = document.getElementById('usm-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        this.attachLogic(app);
    },

    attachLogic: function (app) {
        const input = document.getElementById('usm-input');
        const resultsContainer = document.getElementById('usm-results');
        let searchTimeout;

        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            const query = input.value.trim().toLowerCase();

            if (!query) {
                resultsContainer.innerHTML = `
                    <div class="text-center py-10 px-4">
                        <i class="fa-solid fa-users text-4xl text-dark-textMuted mb-4 opacity-50"></i>
                        <p class="text-dark-textMuted text-sm">Type a name or username to start searching.</p>
                    </div>
                `;
                return;
            }

            resultsContainer.innerHTML = `
                <div class="flex justify-center items-center py-8">
                    <div class="w-6 h-6 border-2 border-dark-border border-t-brand-blue rounded-full animate-spin"></div>
                </div>
            `;

            searchTimeout = setTimeout(async () => {
                try {
                    // Firebase doesn't support full-text easily, so we fallback to a limit query and frontend filter for a small community,
                    // OR we query by username/name start strings. Currently we'll fetch a batch of active users and match.

                    const snap = await app.db.collection('users').limit(100).get();
                    let hits = [];

                    snap.forEach(doc => {
                        const data = doc.data();
                        const un = data.username ? data.username.toLowerCase() : '';
                        const nm = (data.displayName || data.name || '').toLowerCase();

                        // Check if query matches username or name
                        if (un.includes(query) || nm.includes(query)) {
                            hits.push({ id: doc.id, ...data });
                        }
                    });

                    if (hits.length === 0) {
                        resultsContainer.innerHTML = `
                            <div class="text-center py-10 px-4">
                                <p class="text-dark-textMuted text-sm">No members found matching "${input.value}".</p>
                            </div>
                        `;
                        return;
                    }

                    resultsContainer.innerHTML = '';
                    hits.forEach(user => {
                        const avatarHtml = user.avatarUrl
                            ? `<img src="${user.avatarUrl}" class="w-full h-full object-cover">`
                            : `<i class="fa-solid fa-user text-dark-textMuted text-xs"></i>`;

                        let roleTagStr = '';
                        if (user.role === 'Founder') {
                            roleTagStr = '<span class="px-1.5 py-0.5 rounded bg-brand-purp/20 text-brand-purp text-[0.6rem] uppercase tracking-wider font-bold ml-2 border border-brand-purp/30">Founder</span>';
                        }

                        const el = document.createElement('div');
                        el.className = 'flex items-center gap-3 p-3 rounded-xl bg-dark-bg/40 border border-dark-border glass-hover cursor-pointer transition-all';
                        el.innerHTML = `
                            <div class="w-10 h-10 rounded-full bg-dark-surfaceHover flex items-center justify-center overflow-hidden shrink-0 border border-dark-border">
                                ${avatarHtml}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center">
                                    <p class="text-sm font-bold text-white truncate">${user.displayName || user.name || 'Anonymous'}</p>
                                    ${roleTagStr}
                                </div>
                                <p class="text-xs text-brand-blue font-mono truncate">@${user.username || 'unregistered'}</p>
                            </div>
                        `;

                        el.addEventListener('click', () => {
                            this.close();
                            if (window.UserProfileModal && user.username) {
                                window.UserProfileModal.render(app, user.username);
                            } else {
                                alert("This user has not set a unique username yet.");
                            }
                        });

                        resultsContainer.appendChild(el);
                    });

                } catch (e) {
                    console.error("Search failed", e);
                    resultsContainer.innerHTML = `<p class="text-rose-400 text-xs text-center py-4">Search error.</p>`;
                }
            }, 300);
        });
    },

    close: function () {
        const modal = document.getElementById('user-search-modal-container');
        if (modal) {
            modal.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => modal.remove(), 300);
        }
    }
};

window.UserSearchModal = UserSearchModal;
export default UserSearchModal;
