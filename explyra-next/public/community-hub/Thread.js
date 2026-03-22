import MentionTagger from './MentionTagger.js';

const Thread = {
    unsubscribePost: null,
    unsubscribeComments: null,

    render: function (container, app, threadId) {
        if (!threadId) {
            app.navigate('feed');
            return;
        }

        // Cleanup
        if (this.unsubscribePost) this.unsubscribePost();
        if (this.unsubscribeComments) this.unsubscribeComments();

        container.innerHTML = `
            <div class="max-w-4xl mx-auto xl:mx-0 pb-24">
                <button onclick="CommunityApp.navigate('feed')" class="flex items-center gap-2 text-sm text-dark-textMuted hover:text-white transition-colors mb-6 cursor-pointer bg-dark-surfaceHover px-3 py-1.5 rounded-lg inline-flex">
                    <i class="fa-solid fa-arrow-left"></i> Back to Feed
                </button>
                
                <div id="thread-content" class="min-h-[200px] mb-8 relative">
                    <div class="absolute inset-0 flex p-6 justify-center items-center">
                        <div class="w-8 h-8 border-2 border-dark-border border-t-brand-blue rounded-full animate-spin"></div>
                    </div>
                </div>

                <!-- Comment Input Area -->
                <div class="glass-panel p-4 md:p-6 rounded-2xl mb-8 relative overflow-hidden">
                    <h4 class="text-sm font-bold text-white mb-3">Add a Comment</h4>
                    <textarea id="comment-input" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-4 text-sm text-white placeholder-dark-textMuted focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all min-h-[100px] resize-y" placeholder="What are your thoughts? You can use markdown."></textarea>
                    <div class="flex justify-between items-center mt-3">
                        <div class="text-[0.65rem] text-dark-textMuted uppercase font-semibold flex items-center gap-2">
                           <i class="fa-brands fa-markdown text-base"></i> Markdown Supported
                        </div>
                        <button id="post-comment-btn" class="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-brand-blue to-brand-purp hover:from-blue-600 hover:to-purple-600 transition-colors text-sm font-bold shadow-lg shadow-brand-blue/20">
                            Reply
                        </button>
                    </div>
                </div>

                <!-- Comments Tree -->
                <div id="comments-container" class="space-y-4"></div>
            </div>
        `;

        MentionTagger.attach('comment-input', app);
        this.loadThread(app, threadId);
    },

    loadThread: function (app, threadId) {
        const postRef = app.db.collection('community_posts').doc(threadId);

        // 1. Listen to Post Details
        this.unsubscribePost = postRef.onSnapshot((doc) => {
            if (!doc.exists) {
                document.getElementById('thread-content').innerHTML = `
                    <div class="glass-panel p-8 rounded-2xl text-center">
                        <p class="text-dark-textMuted mb-4">This post has been deleted or does not exist.</p>
                    </div>
                `;
                return;
            }

            const data = doc.data();
            const dateStr = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : '';

            let authorTagStr = '';
            if (data.authorRole === 'Founder') {
                authorTagStr = '<span class="px-1.5 py-0.5 rounded bg-brand-purp/20 text-brand-purp text-[0.6rem] uppercase tracking-wider font-bold ml-2 border border-brand-purp/30">Founder</span>';
            }

            // Parse markdown using DOMPurify and marked
            let htmlContent = marked.parse(data.content || '');

            // Parse mentions (e.g., @username) before sanitization to allow our specific classes
            htmlContent = htmlContent.replace(/@([a-zA-Z0-9_]{3,20})/g, '<span class="mention text-brand-blue cursor-pointer font-semibold hover:underline" data-username="$1">@$1</span>');

            const parsedContent = DOMPurify.sanitize(htmlContent, { ADD_ATTR: ['data-username'] });

            document.getElementById('thread-content').innerHTML = `
                <div class="glass-panel p-5 md:p-8 rounded-2xl border-l-[3px] border-l-brand-blue relative">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-10 h-10 rounded-full bg-dark-surfaceHover flex items-center justify-center font-bold text-white border border-dark-border">
                            ${(data.authorName || 'A')[0]}
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center">
                                <span class="font-bold text-white text-sm">${data.authorName || 'Anonymous'}</span>
                                ${authorTagStr}
                            </div>
                            <div class="text-[0.7rem] text-dark-textMuted">
                                ${dateStr} ${data.category ? `in <span class="capitalize text-brand-blue font-medium">${data.category}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <h1 class="text-2xl md:text-3xl font-serif font-bold text-white mb-6">${data.title}</h1>
                    
                    <div class="prose prose-invert prose-sm md:prose-base max-w-none text-dark-textMuted prose-pre:bg-dark-bg prose-pre:border prose-pre:border-dark-border prose-a:text-brand-blue" id="thread-markdown-content">
                        ${parsedContent}
                    </div>
                    
                    ${data.imageUrl ? `
                    <div class="mt-6 rounded-xl overflow-hidden border border-dark-border max-w-2xl bg-dark-bg">
                        <img src="${data.imageUrl}" class="w-full h-auto" loading="lazy" />
                    </div>
                    ` : ''}
                    
                    <div class="flex items-center gap-6 mt-8 pt-4 border-t border-dark-border">
                        <button class="flex items-center gap-2 text-sm font-semibold transition-colors ${data.upvotes && data.upvotes.includes(app.currentUser?.uid) ? 'text-brand-blue' : 'text-dark-textMuted hover:text-white'}" id="thread-upvote-btn">
                            <i class="fa-solid fa-chevron-up text-lg"></i>
                            <span>${data.upvotes ? data.upvotes.length : 0} Upvotes</span>
                        </button>
                        <span class="flex items-center gap-2 text-sm font-semibold text-dark-textMuted">
                            <i class="fa-regular fa-comment text-lg"></i>
                            <span>${data.commentCount || 0} Comments</span>
                        </span>
                    </div>
                </div>
            `;

            // Attach Mention Listeners
            document.querySelectorAll('.mention').forEach(m => {
                m.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.UserProfileModal) {
                        window.UserProfileModal.render(app, m.dataset.username);
                    }
                });
            });

            // Add upvote listener for thread
            const upBtn = document.getElementById('thread-upvote-btn');
            if (upBtn) {
                upBtn.addEventListener('click', async () => {
                    app.db.runTransaction(async (transaction) => {
                        const postDoc = await transaction.get(postRef);
                        let upvotes = postDoc.data().upvotes || [];
                        const uid = app.currentUser.uid;
                        if (upvotes.includes(uid)) upvotes = upvotes.filter(id => id !== uid);
                        else upvotes.push(uid);
                        transaction.update(postRef, { upvotes });
                    });
                });
            }
        });

        // 2. Listen to Comments (Flat for now, nesting logic via parentId can be added in rendering step)
        const commentsRef = postRef.collection('comments').orderBy('createdAt', 'asc');
        this.unsubscribeComments = commentsRef.onSnapshot((snapshot) => {
            const container = document.getElementById('comments-container');
            if (!container) return;

            container.innerHTML = '';

            if (snapshot.empty) {
                container.innerHTML = `<p class="text-sm text-dark-textMuted italic text-center p-4">No comments yet. Be the first to share your thoughts!</p>`;
                return;
            }

            snapshot.forEach(doc => {
                const cData = doc.data();
                const cId = doc.id;
                const cDateTimeStr = cData.createdAt ? new Date(cData.createdAt.toDate()).toLocaleDateString() : '';

                let cHtml = marked.parse(cData.text || '');
                cHtml = cHtml.replace(/@([a-zA-Z0-9_]{3,20})/g, '<span class="mention text-brand-blue cursor-pointer font-semibold hover:underline" data-username="$1">@$1</span>');

                const cParsed = DOMPurify.sanitize(cHtml, { ADD_ATTR: ['data-username'] });

                const commentEl = document.createElement('div');
                commentEl.className = 'glass-panel p-4 rounded-xl flex gap-4';
                commentEl.innerHTML = `
                    <div class="flex flex-col items-center">
                        <div class="w-8 h-8 rounded-full bg-dark-bg flex items-center justify-center text-xs font-bold text-white border border-dark-border">
                            ${(cData.authorName || 'A')[0]}
                        </div>
                        <!-- Line connecting threads could go here -->
                        <div class="flex-1 w-px bg-dark-border mt-2 mb-1"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1 text-xs">
                            <span class="font-bold text-white hover:text-brand-blue cursor-pointer" onclick="if(window.UserProfileModal) window.UserProfileModal.render(window.CommunityApp, '${cData.authorUsername || cData.authorName}')">${cData.authorName || 'Anonymous'}</span>
                            <span class="text-dark-textMuted">${cDateTimeStr}</span>
                        </div>
                        <div class="prose prose-sm prose-invert max-w-none text-dark-textMuted prose-p:my-1 mb-2">
                            ${cParsed}
                        </div>
                        <div class="flex items-center gap-4 mt-2 text-xs font-medium text-dark-textMuted">
                            <button class="hover:text-white transition-colors flex items-center gap-1">
                                <i class="fa-solid fa-chevron-up"></i> ${cData.upvotes?.length || 0}
                            </button>
                            <button class="hover:text-white transition-colors">Reply</button>
                        </div>
                    </div>
                `;
                container.appendChild(commentEl);
            });

            // Attach Mention Listeners for comments
            document.querySelectorAll('#comments-container .mention').forEach(m => {
                m.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.UserProfileModal) {
                        window.UserProfileModal.render(app, m.dataset.username);
                    }
                });
            });
        });

        // 3. Setup post comment action
        document.getElementById('post-comment-btn').addEventListener('click', async () => {
            const input = document.getElementById('comment-input');
            const text = input.value.trim();
            if (!text) return;

            input.disabled = true;
            document.getElementById('post-comment-btn').innerText = 'Posting...';

            try {
                // Batch write: Add comment, increment counter
                const batch = app.db.batch();

                const newCommentRef = postRef.collection('comments').doc();
                batch.set(newCommentRef, {
                    text: text,
                    authorId: app.currentUser.uid,
                    authorName: document.getElementById('user-name').innerText,
                    authorUsername: app.currentUsername,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    upvotes: []
                });

                batch.update(postRef, {
                    commentCount: firebase.firestore.FieldValue.increment(1)
                });

                await batch.commit();

                input.value = '';
            } catch (err) {
                console.error("Failed to post comment", err);
                alert("Could not post comment.");
            } finally {
                input.disabled = false;
                document.getElementById('post-comment-btn').innerText = 'Reply';
            }
        });
    }
};

export default Thread;
