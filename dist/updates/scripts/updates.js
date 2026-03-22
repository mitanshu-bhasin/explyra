// updates.js - Logic for fetching and rendering updates

document.addEventListener('DOMContentLoaded', () => {
    fetchUpdates();
});

async function fetchUpdates() {
    const grid = document.getElementById('updates-grid');
    const loader = document.getElementById('updates-loader');
    const noUpdates = document.getElementById('no-updates');

    // Wait for window.db to be initialized
    if (!window.db) {
        console.log("Waiting for firebase-config...");
        setTimeout(fetchUpdates, 100);
        return;
    }

    try {
        // Query only published updates (no orderBy here to avoid index error)
        const snapshot = await window.db.collection('updates')
            .where('published', '==', true)
            .get();

        loader.style.display = 'none';

        if (snapshot.empty) {
            noUpdates.style.display = 'block';
            return;
        }

        // Sort client-side (Newest to Oldest)
        const updates = [];
        snapshot.forEach(doc => {
            updates.push({ id: doc.id, ...doc.data() });
        });

        updates.sort((a, b) => {
            const dateA = a.date ? a.date.seconds : 0;
            const dateB = b.date ? b.date.seconds : 0;
            return dateB - dateA;
        });

        updates.forEach(update => {
            const card = createUpdateCard(update.id, update);
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching updates:", error);
        loader.innerHTML = `<p style="color: red;">Error loading updates. Please try again later.</p>`;
    }
}

function createUpdateCard(id, update) {
    const date = update.date ? new Date(update.date.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Just now';

    const category = update.category || 'Update';
    const badgeClass = `badge-${category.toLowerCase()}`;

    const card = document.createElement('div');
    card.className = 'update-card';

    card.innerHTML = `
        <img src="${update.thumbnail || 'https://placehold.co/600x340/e2e8f0/586070?text=Explyra+Update'}" alt="${update.title}" class="card-thumb">
        <div class="card-content">
            <div class="card-meta">
                <span class="badge ${badgeClass}">${category}</span>
                <span class="card-date">${date}</span>
            </div>
            <h3 class="card-title">${update.title}</h3>
            <p class="card-summary">${update.summary}</p>
            <div class="card-actions">
                <a href="post.html?id=${id}" class="btn-read">Read More →</a>
                <button class="btn-share" onclick="shareUpdate('${id}', '${update.title.replace(/'/g, "\\\\'")}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                </button>
            </div>
        </div>
    `;

    return card;
}

function shareUpdate(id, title) {
    const url = `${window.location.origin}${window.location.pathname.replace('index.html', '')}post.html?id=${id}`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this update from Explyra: ${title}`,
            url: url,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}
