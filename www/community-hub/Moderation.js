const Moderation = {
    unsubscribe: null,

    render: function (container, app) {
        if (!app.currentUser) return;

        // Basic check, assume setup blocks non-admins from clicking via UI, 
        // but we double check
        if (app.currentUser) {
            app.db.collection('users').doc(app.currentUser.uid).get().then(doc => {
                if (doc.exists) {
                    const role = doc.data().role;
                    if (role !== 'Admin' && role !== 'SuperAdmin' && role !== 'Founder') {
                        container.innerHTML = `
                            <div class="text-center py-20">
                                <i class="fa-solid fa-lock text-4xl text-rose-500 mb-4"></i>
                                <h2 class="text-2xl font-bold text-white mb-2">Access Denied</h2>
                                <p class="text-dark-textMuted">You do not have permission to view the Moderation panel.</p>
                            </div>
                        `;
                        return;
                    }
                }
            });
        }

        if (this.unsubscribe) this.unsubscribe();

        container.innerHTML = `
            <div class="max-w-5xl mx-auto xl:mx-0 pb-20">
                <header class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 class="text-3xl font-serif font-bold text-rose-400 mb-2 flex items-center gap-3">
                            <i class="fa-solid fa-shield-halved"></i> Moderation Panel
                        </h2>
                        <p class="text-sm text-dark-textMuted">
                            Review flagged content, manage spam, and keep the community healthy.
                        </p>
                    </div>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="glass-panel p-5 rounded-2xl border-l-[3px] border-l-brand-blue">
                        <p class="text-xs text-dark-textMuted font-bold uppercase tracking-wider mb-1">Total Posts</p>
                        <h3 class="text-3xl font-bold text-white" id="stat-total">-</h3>
                    </div>
                    <div class="glass-panel p-5 rounded-2xl border-l-[3px] border-l-amber-500">
                        <p class="text-xs text-dark-textMuted font-bold uppercase tracking-wider mb-1">Flagged</p>
                        <h3 class="text-3xl font-bold text-white" id="stat-flagged">0</h3>
                    </div>
                    <div class="glass-panel p-5 rounded-2xl border-l-[3px] border-l-rose-500">
                        <p class="text-xs text-dark-textMuted font-bold uppercase tracking-wider mb-1">Deleted</p>
                        <h3 class="text-3xl font-bold text-white" id="stat-deleted">0</h3>
                    </div>
                </div>

                <div class="glass-panel rounded-2xl overflow-hidden border border-dark-border">
                    <div class="px-6 py-4 border-b border-dark-border flex justify-between items-center bg-dark-surfaceHover/50">
                        <h3 class="font-bold text-white">Recent Posts</h3>
                        
                        <select id="mod-filter" class="bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                            <option value="active">Active</option>
                            <option value="flagged">Flagged</option>
                            <option value="deleted">Deleted</option>
                        </select>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="text-xs font-bold text-dark-textMuted uppercase tracking-wider bg-dark-bg/30">
                                    <th class="px-6 py-3 border-b border-dark-border">Content</th>
                                    <th class="px-6 py-3 border-b border-dark-border hidden md:table-cell">Author</th>
                                    <th class="px-6 py-3 border-b border-dark-border">Date</th>
                                    <th class="px-6 py-3 border-b border-dark-border text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="mod-table-body" class="text-sm divide-y divide-dark-border">
                                <tr>
                                    <td colspan="4" class="px-6 py-8 text-center text-dark-textMuted">Loading posts...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.loadPosts(app, 'active');

        document.getElementById('mod-filter').addEventListener('change', (e) => {
            this.loadPosts(app, e.target.value);
        });

        // Basic Stats Load
        app.db.collection('community_posts').get().then(snap => {
            document.getElementById('stat-total').textContent = snap.size;
            let deleted = 0;
            snap.forEach(d => { if (d.data().status === 'deleted') deleted++; });
            document.getElementById('stat-deleted').textContent = deleted;
        });
    },

    loadPosts: function (app, statusFilter) {
        if (this.unsubscribe) this.unsubscribe();

        const query = app.db.collection('community_posts')
            .where('status', 'in', statusFilter === 'deleted' ? ['deleted'] : [statusFilter, null])
            .orderBy('createdAt', 'desc')
            .limit(50);

        this.unsubscribe = query.onSnapshot(snapshot => {
            const tbody = document.getElementById('mod-table-body');
            if (!tbody) return;

            if (snapshot.empty) {
                tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-dark-textMuted italic">No ${statusFilter} posts found.</td></tr>`;
                return;
            }

            tbody.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const id = doc.id;
                const dtf = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleString() : 'Just now';

                const tr = document.createElement('tr');
                tr.className = "hover:bg-dark-surfaceHover/50 transition-colors";

                let actionBtns = '';
                if (statusFilter !== 'deleted') {
                    actionBtns += `<button data-action="delete" data-id="${id}" class="px-3 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors font-medium text-xs"><i class="fa-solid fa-trash mr-1"></i> Delete</button>`;
                } else {
                    actionBtns += `<button data-action="restore" data-id="${id}" class="px-3 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors font-medium text-xs"><i class="fa-solid fa-rotate-left mr-1"></i> Restore</button>`;
                }

                tr.innerHTML = `
                    <td class="px-6 py-4 max-w-xs">
                        <p class="font-bold text-white truncate mb-1">${data.title}</p>
                        <p class="text-xs text-dark-textMuted line-clamp-2">${data.content?.substring(0, 100) || ''}</p>
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        <span class="font-medium text-white">${data.authorName || 'Anonymous'}</span><br>
                        <span class="text-[0.65rem] text-dark-textMuted font-mono">${data.authorId || ''}</span>
                    </td>
                    <td class="px-6 py-4 text-xs text-dark-textMuted whitespace-nowrap">
                        ${dtf}
                    </td>
                    <td class="px-6 py-4 text-right">
                        ${actionBtns}
                        <button onclick="CommunityApp.navigate('thread', null, '${id}')" class="px-3 py-1 ml-2 bg-dark-bg text-dark-textMuted hover:text-white border border-dark-border hover:border-brand-blue rounded-lg transition-colors font-medium text-xs"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Action listeners
            tbody.querySelectorAll('button[data-action]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const action = btn.dataset.action;
                    const id = btn.dataset.id;
                    try {
                        await app.db.collection('community_posts').doc(id).update({
                            status: action === 'delete' ? 'deleted' : 'active'
                        });
                    } catch (err) {
                        console.error("Action failed", err);
                        alert("Failed to update post status.");
                    }
                });
            });
        });
    }
};

export default Moderation;
