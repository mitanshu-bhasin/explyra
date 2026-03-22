// post.js - Logic for fetching and displaying a single update

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const updateId = urlParams.get('id');

    if (updateId) {
        fetchPost(updateId);
    } else {
        window.location.href = 'index.html';
    }

    if (navigator.share) {
        document.getElementById('web-share-btn').style.display = 'flex';
    }
});

async function fetchPost(id) {
    const loader = document.getElementById('post-loader');
    const container = document.getElementById('post-content-container');

    // Wait for window.db
    if (!window.db) {
        setTimeout(() => fetchPost(id), 100);
        return;
    }

    try {
        const doc = await window.db.collection('updates').doc(id).get();

        if (!doc.exists) {
            loader.innerHTML = '<p>Update not found.</p>';
            return;
        }

        const update = doc.data();

        // Populate content
        document.getElementById('post-title').textContent = update.title;
        document.title = `${update.title} — Explyra`;

        const date = update.date ? new Date(update.date.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'Just now';
        document.getElementById('post-date').textContent = date;

        const category = update.category || 'Update';
        const categoryEl = document.getElementById('post-category');
        categoryEl.textContent = category;
        categoryEl.className = `badge badge-${category.toLowerCase()}`;

        document.getElementById('post-thumbnail').src = update.thumbnail || 'https://via.placeholder.com/1200x600?text=Explyra+Update';
        document.getElementById('post-thumbnail').alt = update.title;

        document.getElementById('post-body').innerHTML = update.content || update.summary;

        // Show container, hide loader
        loader.style.display = 'none';
        container.style.display = 'block';

    } catch (error) {
        console.error("Error fetching post:", error);
        loader.innerHTML = '<p style="color: red;">Error loading the update. Please check your connection.</p>';
    }
}

function shareSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.getElementById('post-title').textContent);
    let shareUrl = '';

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
    });
}

function webShare() {
    const title = document.getElementById('post-title').textContent;
    const url = window.location.href;

    navigator.share({
        title: title,
        url: url,
    }).catch(err => console.log('Error sharing:', err));
}
