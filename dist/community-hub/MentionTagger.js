const MentionTagger = {
    attach: function (textareaId, app) {
        const textarea = document.getElementById(textareaId);
        if (!textarea) return;

        // Container for dropdown
        const wrapper = document.createElement('div');
        wrapper.className = 'relative w-full';
        textarea.parentNode.insertBefore(wrapper, textarea);
        wrapper.appendChild(textarea);

        const dropdown = document.createElement('div');
        dropdown.className = 'absolute z-50 w-64 max-h-48 overflow-y-auto bg-dark-surfaceHover border border-dark-border rounded-xl shadow-2xl hidden';
        dropdown.id = `mention-dropdown-${textareaId}`;
        wrapper.appendChild(dropdown);

        let searchTimeout = null;
        let isDropdownOpen = false;
        let activeMentionIndex = -1;
        let currentSearchQuery = '';
        let matchStartIndex = -1;

        const closeDropdown = () => {
            dropdown.classList.add('hidden');
            dropdown.innerHTML = '';
            isDropdownOpen = false;
            activeMentionIndex = -1;
        };

        const insertMention = (username) => {
            const text = textarea.value;
            const before = text.substring(0, matchStartIndex);
            // Replace the @[query] with @username
            const after = text.substring(textarea.selectionStart);
            textarea.value = before + '@' + username + ' ' + after;
            closeDropdown();
            textarea.focus();

            // Move cursor to after the inserted mention
            const newCursorPos = matchStartIndex + username.length + 2;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        };

        // Keyboard navigation
        textarea.addEventListener('keydown', (e) => {
            if (!isDropdownOpen) return;

            const items = dropdown.querySelectorAll('.mention-item');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeMentionIndex = (activeMentionIndex + 1) % items.length;
                updateHighlight(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeMentionIndex = activeMentionIndex <= 0 ? items.length - 1 : activeMentionIndex - 1;
                updateHighlight(items);
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (activeMentionIndex >= 0 && activeMentionIndex < items.length) {
                    e.preventDefault();
                    items[activeMentionIndex].click();
                }
            } else if (e.key === 'Escape') {
                closeDropdown();
            }
        });

        const updateHighlight = (items) => {
            items.forEach((item, idx) => {
                if (idx === activeMentionIndex) {
                    item.classList.add('bg-dark-bg', 'border-l-2', 'border-brand-blue');
                } else {
                    item.classList.remove('bg-dark-bg', 'border-l-2', 'border-brand-blue');
                }
            });
            if (items[activeMentionIndex]) {
                items[activeMentionIndex].scrollIntoView({ block: 'nearest' });
            }
        };

        textarea.addEventListener('input', () => {
            const text = textarea.value;
            const cursorPos = textarea.selectionStart;

            // Check if cursor is immediately after an @word
            const beforeCursor = text.substring(0, cursorPos);
            const match = beforeCursor.match(/@([a-zA-Z0-9_]*)$/);

            if (match) {
                matchStartIndex = match.index;
                currentSearchQuery = match[1].toLowerCase();

                // Position dropdown roughly (a proper implementation uses getCaretCoordinates package, 
                // but for simplicity we place it at bottom of the textarea or fixed relative position).
                dropdown.style.bottom = '100%'; // place above input usually works best for long textareas
                dropdown.style.left = '0px';
                dropdown.style.marginBottom = '8px';

                performSearch(currentSearchQuery);
            } else {
                closeDropdown();
            }
        });

        // Hide when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                closeDropdown();
            }
        });

        const performSearch = (query) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                try {
                    const snap = await app.db.collection('users').limit(50).get();
                    let hits = [];
                    snap.forEach(doc => {
                        const data = doc.data();
                        if (data.username && data.username.toLowerCase().includes(query)) {
                            hits.push({ id: doc.id, ...data });
                        }
                    });

                    if (hits.length === 0) {
                        closeDropdown();
                        return;
                    }

                    dropdown.innerHTML = '';
                    dropdown.classList.remove('hidden');
                    isDropdownOpen = true;
                    activeMentionIndex = 0; // Select first by default

                    hits.slice(0, 8).forEach((user, idx) => {
                        const item = document.createElement('div');
                        item.className = 'mention-item p-2 hover:bg-dark-bg cursor-pointer flex items-center gap-2 transition-colors text-sm border-b border-dark-border last:border-0';
                        const avatarHtml = user.avatarUrl
                            ? `<img src="${user.avatarUrl}" class="w-6 h-6 rounded-full object-cover">`
                            : `<div class="w-6 h-6 rounded-full bg-dark-bg flex items-center justify-center border border-dark-border"><i class="fa-solid fa-user text-[0.5rem] text-dark-textMuted"></i></div>`;

                        item.innerHTML = `
                            ${avatarHtml}
                            <div class="flex flex-col">
                                <span class="font-bold text-white leading-none">${user.displayName || user.name || 'Anonymous'}</span>
                                <span class="text-[0.65rem] text-brand-blue">@${user.username}</span>
                            </div>
                        `;

                        item.onclick = (e) => {
                            e.preventDefault();
                            insertMention(user.username);
                        };

                        dropdown.appendChild(item);
                    });

                    updateHighlight(dropdown.querySelectorAll('.mention-item'));

                } catch (e) {
                    console.error("Mention search error", e);
                }
            }, 200);
        };
    }
};

export default MentionTagger;
