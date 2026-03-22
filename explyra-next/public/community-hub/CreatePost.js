import MentionTagger from './MentionTagger.js';

const CreatePost = {
    render: function (container, app) {
        container.innerHTML = `
            <div class="max-w-3xl mx-auto xl:mx-0 pb-20">
                <button onclick="CommunityApp.navigate('feed')" class="flex items-center gap-2 text-sm text-dark-textMuted hover:text-white transition-colors mb-6 cursor-pointer bg-dark-surfaceHover px-3 py-1.5 rounded-lg inline-flex">
                    <i class="fa-solid fa-arrow-left"></i> Cancel
                </button>
                
                <div class="glass-panel p-6 md:p-8 rounded-2xl">
                    <h2 class="text-2xl font-serif font-bold text-white mb-1">Create a Post</h2>
                    <p class="text-xs text-dark-textMuted mb-8">Share your ideas, ask questions, or post code snippets to the community.</p>
                    
                    <form id="create-post-form" class="space-y-6">
                        
                        <!-- Title -->
                        <div>
                            <input type="text" id="post-title" required class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-4 text-white text-lg font-bold placeholder-dark-textMuted/50 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all" placeholder="An interesting title...">
                        </div>
                        
                        <!-- Category & Options -->
                        <div class="flex flex-wrap gap-4">
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider mb-2">Category</label>
                                <select id="post-category" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-blue/50 transition-all appearance-none cursor-pointer">
                                    <option value="general">General Discussion</option>
                                    <option value="dev">Dev Talk &amp; Code snippets</option>
                                    <option value="business">Business &amp; Growth</option>
                                </select>
                            </div>
                            
                            <div class="flex-1 min-w-[200px]">
                                <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider mb-2">Visibility</label>
                                <div class="bg-dark-bg/50 border border-dark-border rounded-xl p-3 text-sm flex items-center gap-3">
                                    <div class="w-3 h-3 rounded-full ${app.isCompanyHub ? 'bg-amber-400' : 'bg-emerald-400'} shadow-md"></div>
                                    <span class="text-white font-medium">${app.isCompanyHub ? 'Company Only' : 'Global (Public)'}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Editor -->
                        <div>
                            <div class="flex justify-between items-end mb-2">
                                <label class="block text-xs font-semibold text-dark-textMuted uppercase tracking-wider">Content</label>
                                <span class="text-[0.65rem] text-dark-textMuted font-medium"><i class="fa-brands fa-markdown leading-none text-sm"></i> Markdown enabled</span>
                            </div>
                            <!-- Simple Textarea for Markdown -->
                            <textarea id="post-content" required class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-4 text-sm text-white placeholder-dark-textMuted/50 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all min-h-[300px] resize-y font-mono" placeholder="# Hello World\n\nWrite your thoughts here..."></textarea>
                        </div>
                        
                        <!-- Actions -->
                        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-dark-border">
                            <div class="flex-1 w-full max-w-sm">
                                <label class="sr-only">Image URL (Optional)</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="fa-solid fa-link text-dark-textMuted"></i>
                                    </div>
                                    <input type="url" id="image-url-input" class="w-full bg-dark-bg/50 border border-dark-border rounded-xl p-3 pl-10 text-sm text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all font-mono" placeholder="Paste Image URL (optional)">
                                </div>
                            </div>
                            
                            <button type="submit" id="submit-post-btn" class="w-full sm:w-auto px-8 py-3 rounded-xl text-white bg-gradient-to-r from-brand-blue to-brand-purp hover:from-blue-600 hover:to-purple-600 transition-colors text-sm font-bold shadow-lg shadow-brand-blue/20 flex justify-center items-center gap-2 shrink-0">
                                Post to Community <i class="fa-solid fa-paper-plane text-white/70"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        MentionTagger.attach('post-content', app);

        document.getElementById('create-post-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-post-btn');
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            btn.disabled = true;

            try {
                let imageUrl = document.getElementById('image-url-input').value.trim() || null;

                const postData = {
                    title: document.getElementById('post-title').value.trim(),
                    content: document.getElementById('post-content').value.trim(),
                    category: document.getElementById('post-category').value,
                    isGlobal: !app.isCompanyHub,
                    companyId: app.isCompanyHub ? app.companyId : null,
                    authorId: app.currentUser.uid,
                    authorName: document.getElementById('user-name').innerText,
                    authorUsername: app.currentUsername || null,
                    authorRole: document.getElementById('user-role').innerText,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    upvotes: [],
                    commentCount: 0,
                    status: 'active',
                    imageUrl: imageUrl
                };

                await app.db.collection('community_posts').add(postData);

                app.navigate('feed', postData.category);

            } catch (err) {
                console.error("Error creating post", err);
                alert("Failed to create post: " + err.message);
                btn.innerHTML = 'Post to Community <i class="fa-solid fa-paper-plane text-white/70"></i>';
                btn.disabled = false;
            }
        });
    }
};

export default CreatePost;
