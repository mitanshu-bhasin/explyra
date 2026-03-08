const Feed = {
    unsubscribe: null,

    render: function (container, app) {
        // Cleanup previous listeners
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        const categoryTitle = app.category ? app.category.charAt(0).toUpperCase() + app.category.slice(1) : 'All Discussions';
        const modeDesc = app.isCompanyHub ? '🏢 Company Hub' : '🌍 Global Hub';

        container.innerHTML = `
            <div class="max-w-4xl mx-auto xl:mx-0">
                <header class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 class="text-3xl font-serif font-bold text-white mb-2">
                            ${categoryTitle}
                        </h2>
                        <p class="text-sm text-dark-textMuted flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded text-xs bg-dark-surfaceHover text-white/70">${modeDesc}</span>
                            Real-time flowing conversations.
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button class="px-3 py-1.5 text-xs font-medium bg-dark-surfaceHover hover:bg-white/10 rounded-lg transition-colors text-white" id="filter-latest">Latest</button>
                        <button class="px-3 py-1.5 text-xs font-medium text-dark-textMuted hover:bg-dark-surfaceHover rounded-lg transition-colors" id="filter-top">Top</button>
                    </div>
                </header>

                <div id="posts-container" class="space-y-4 pb-20">
                    <!-- Loading Skeletons -->
                    <div class="glass-panel p-5 rounded-2xl animate-pulse flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-dark-surfaceHover shrink-0"></div>
                        <div class="flex-1 space-y-3">
                            <div class="h-4 bg-dark-surfaceHover rounded w-1/4"></div>
                            <div class="h-4 bg-dark-surfaceHover rounded w-3/4"></div>
                            <div class="h-20 bg-dark-surfaceHover rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.subscribeToFeed(app);
    },

    subscribeToFeed: function (app) {
        let query = app.db.collection('community_posts');

        // Apply Mode filter
        if (app.isCompanyHub && app.companyId) {
            query = query.where('companyId', '==', app.companyId);
        } else {
            // Global hub -> only posts meant for public OR empty companyId
            // A simple implementation: we just assume isGlobal: true
            query = query.where('isGlobal', '==', true);
        }

        // Apply Category filter
        if (app.category) {
            query = query.where('category', '==', app.category);
        }

        // Apply sort
        query = query.orderBy('createdAt', 'desc').limit(50);

        this.unsubscribe = query.onSnapshot((snapshot) => {
            const container = document.getElementById('posts-container');
            if (!container) return; // View changed

            if (snapshot.empty) {
                container.innerHTML = `
                    <div class="text-center py-20 px-4">
                        <div class="w-20 h-20 mx-auto rounded-full bg-dark-surfaceHover flex items-center justify-center text-dark-textMuted text-2xl mb-4">
                            <i class="fa-solid fa-wind"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">It's quiet here...</h3>
                        <p class="text-sm text-dark-textMuted mb-6">Be the first to start a conversation in this area.</p>
                        <button onclick="CommunityApp.navigate('create')" class="px-5 py-2 rounded-xl text-white bg-brand-blue hover:bg-blue-500 transition-colors text-sm font-medium">Create Post</button>
                    </div>
                `;
                return;
            }

            container.innerHTML = '';

            snapshot.forEach(doc => {
                const data = doc.data();
                const id = doc.id;

                // Author tag rendering
                let authorTagStr = '';
                if (data.authorRole === 'Founder') {
                    authorTagStr = '<span class="px-1.5 py-0.5 rounded bg-brand-purp/20 text-brand-purp text-[0.6rem] uppercase tracking-wider font-bold ml-2 border border-brand-purp/30">Founder</span>';
                } else if (data.authorRole === 'Admin') {
                    authorTagStr = '<span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[0.6rem] uppercase tracking-wider font-bold ml-2 border border-amber-500/30">Admin</span>';
                }

                const dateStr = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Just now';

                // Determine raw text excerpt
                let excerpt = data.content;
                // Strip markdown for excerpt roughly
                excerpt = excerpt ? excerpt.replace(/[#_*~`]/g, '') : '';

                // Allow our @mention to stay but strip the rest of the span if any HTML was saved
                excerpt = excerpt.replace(/<[^>]+>/g, '');

                if (excerpt && excerpt.length > 200) excerpt = excerpt.substring(0, 200) + '...';

                const postEl = document.createElement('div');
                postEl.className = 'glass-panel p-5 rounded-2xl glass-hover cursor-pointer transition-all flex gap-4 lg:gap-5 group';
                postEl.onclick = (e) => {
                    // Prevent navigation if clicking upvote
                    if (e.target.closest('.upvote-btn')) return;
                    app.navigate('thread', null, id);
                };

                postEl.innerHTML = `
                    <!-- Vote cluser -->
                    <div class="flex flex-col items-center gap-1 shrink-0 pt-1">
                        <button class="upvote-btn w-8 h-8 rounded-lg flex items-center justify-center text-dark-textMuted hover:text-white hover:bg-dark-surfaceHover transition-colors ${data.upvotes && data.upvotes.includes(app.currentUser?.uid) ? 'text-brand-blue' : ''}" data-id="${id}">
                            <i class="fa-solid fa-chevron-up"></i>
                        </button>
                        <span class="text-xs font-bold text-white px-1 id="score-${id}">${(data.upvotes ? data.upvotes.length : 0)}</span>
                        <button class="downvote-btn w-8 h-8 rounded-lg flex items-center justify-center text-dark-textMuted hover:text-white hover:bg-dark-surfaceHover transition-colors" data-id="${id}">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                    
                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2 text-xs">
                            <span class="font-bold text-white truncate max-w-[150px] sm:max-w-[200px] hover:text-brand-blue z-10 block" onclick="event.stopPropagation(); if(window.UserProfileModal) window.UserProfileModal.render(window.CommunityApp, '${data.authorUsername || data.authorName}')">${data.authorName || 'Anonymous'}</span>
                            ${authorTagStr}
                            <span class="text-dark-textMuted">•</span>
                            <span class="text-dark-textMuted">${dateStr}</span>
                            ${data.category ? `<span class="text-dark-textMuted hidden sm:inline">•</span><span class="px-1.5 py-0.5 rounded bg-dark-bg border border-dark-border text-dark-textMuted capitalize hidden sm:inline">${data.category}</span>` : ''}
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-brand-blue transition-colors">${data.title}</h3>
                        <p class="text-sm text-dark-textMuted mb-4 leading-relaxed">${excerpt}</p>
                        
                        <div class="flex items-center gap-4 text-xs font-medium text-dark-textMuted">
                            <span class="flex items-center gap-1.5 hover:text-white transition-colors">
                                <i class="fa-regular fa-comment"></i> ${data.commentCount || 0} Comments
                            </span>
                            <span class="flex items-center gap-1.5 hover:text-white transition-colors">
                                <i class="fa-solid fa-share-nodes"></i> Share
                            </span>
                        </div>
                    </div>
                `;

                container.appendChild(postEl);
            });

            // Attach upvote handlers
            container.querySelectorAll('.upvote-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const postId = btn.dataset.id;
                    const docRef = app.db.collection('community_posts').doc(postId);

                    try {
                        await app.db.runTransaction(async (transaction) => {
                            const postDoc = await transaction.get(docRef);
                            if (!postDoc.exists) return;

                            let upvotes = postDoc.data().upvotes || [];
                            const uid = app.currentUser.uid;

                            if (upvotes.includes(uid)) {
                                upvotes = upvotes.filter(id => id !== uid); // Toggle off
                            } else {
                                upvotes.push(uid); // Toggle on
                            }

                            transaction.update(docRef, { upvotes });
                        });
                    } catch (err) {
                        console.error("Upvote failed", err);
                    }
                });
            });

        }, (error) => {
            console.error("Feed error:", error);
            // Ignore index building errors natively unless strict debug
        });
    }
};

export default Feed;
