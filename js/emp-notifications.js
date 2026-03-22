// js/emp-notifications.js
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";
import { collection, query, where, orderBy, limit, onSnapshot, updateDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const VAPID_KEY = 'BOsOeRaI8phgZF1FNFk3ruTzQJh15l0QA2vYzuwJ3ZS59jSSFRxfWRWpzWGriIGhaaLwxASNtvrRCdYO-Zs2B-s';

window.empNotifications = [];
window.notifUnsub = null;

window.initNotifications = async () => {
    if (!window.userData || !window.userData.docId || !window.companyId) return;

    const db = window.db;
    const auth = window.auth;
    const app = auth.app;

    // 1. FCM Setup
    try {
        const messaging = getMessaging(app);
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY }).catch(() => null);
            if (currentToken) {
                await updateDoc(doc(db, "users", window.userData.docId), {
                    fcmToken: currentToken,
                    lastTokenSync: new Date()
                });
            }
        }

        onMessage(messaging, (payload) => {
            window.showToast(payload.notification.title + ": " + payload.notification.body, 'info');
            // Show dot
            const dot = document.getElementById('header-notif-dot');
            if (dot) dot.classList.remove('hidden');
        });
    } catch (e) {
        console.warn('FCM not supported or failed:', e);
    }

    // 2. Firestore Notification Listener (with Multi-tenancy)
    const notifQ = query(
        collection(db, "notifications"),
        where("companyId", "in", [window.companyId, 'GLOBAL']),
        where("targetUserId", "in", [window.userData.docId, 'ALL']),
        orderBy("createdAt", "desc"),
        limit(30)
    );

    let isInitialLoad = true;
    window.notifUnsub = onSnapshot(notifQ, (snapshot) => {
        // Rebuild full list every time
        window.empNotifications = [];
        snapshot.forEach(docSnap => {
            window.empNotifications.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Show dot if there are unread
        const hasUnread = window.empNotifications.some(n => !n.readBy || !n.readBy.includes(window.userData.docId));
        const dot = document.getElementById('header-notif-dot');
        if (dot) {
            if (hasUnread) dot.classList.remove('hidden');
            else dot.classList.add('hidden');
        }

        if (isInitialLoad) { isInitialLoad = false; return; }
        if (snapshot.metadata.hasPendingWrites) return;

        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const d = change.doc.data();
                if (Notification.permission === 'granted') {
                    const opts = {
                        body: d.body,
                        icon: 'assets/images/explyra_logo.png',
                        tag: change.doc.id,
                        requireInteraction: true
                    };
                    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                        navigator.serviceWorker.ready.then(reg => reg.showNotification(d.title, opts));
                    } else {
                        new Notification(d.title, opts);
                    }
                }
                window.showToast(`New: ${d.title}`, 'info');
            }
        });
    }, (err) => {
        console.warn('Notification listener error:', err);
    });
};

// -------- Notification List UI --------

window.openNotifList = () => {
    const modal = document.getElementById('modal-notif-list');
    if (!modal) return;
    modal.classList.remove('hidden');

    // If we already have notifications in memory, render them
    if (window.empNotifications && window.empNotifications.length > 0) {
        window.renderNotifList(window.empNotifications);
    } else {
        // Show empty state
        const container = document.getElementById('notif-list-container');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-16">
                    <div class="w-16 h-16 bg-gray-50 dark:bg-[#111] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#eaeaea] dark:border-[#333]">
                        <i class="fa-solid fa-bell-slash text-gray-300 dark:text-gray-700 text-xl"></i>
                    </div>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">No notifications yet</p>
                    <p class="text-[10px] text-gray-400 mt-1">You'll see alerts for claims, tasks & announcements here.</p>
                </div>`;
        }
    }
};

window.renderNotifList = (notifications) => {
    const container = document.getElementById('notif-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-gray-50 dark:bg-[#111] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#eaeaea] dark:border-[#333]">
                    <i class="fa-solid fa-bell-slash text-gray-300 dark:text-gray-700 text-xl"></i>
                </div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">No notifications</p>
            </div>`;
        return;
    }

    notifications.forEach(n => {
        const isRead = n.readBy && n.readBy.includes(window.userData.docId);
        const date = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
        const timeAgo = getTimeAgo(date);

        const icon = getNotifIcon(n.type || 'info');

        const div = document.createElement('div');
        div.className = `flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all group ${isRead ? 'opacity-60 hover:opacity-100' : 'bg-gray-50 dark:bg-[#111] border border-[#eaeaea] dark:border-[#333]'} hover:bg-gray-100 dark:hover:bg-[#111]`;
        div.onclick = () => window.openNotifPdp(n);
        div.innerHTML = `
            <div class="w-10 h-10 rounded-xl ${icon.bg} flex items-center justify-center shrink-0 mt-0.5">
                <i class="fa-solid ${icon.icon} ${icon.color} text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-black dark:text-white truncate">${n.title || 'Notification'}</p>
                <p class="text-xs text-gray-500 line-clamp-2 mt-0.5">${n.body || ''}</p>
                <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">${timeAgo}</span>
                    ${!isRead ? '<span class="w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>' : ''}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};

window.openNotifPdp = async (n) => {
    const modal = document.getElementById('modal-notif-pdp');
    if (!modal) return;
    if (typeof window.openModalWithHistory === 'function') {
        window.openModalWithHistory('modal-notif-pdp');
    } else {
        modal.classList.remove('hidden');
    }

    document.getElementById('pdp-notif-title').textContent = n.title || 'Notification';
    document.getElementById('pdp-notif-sender').textContent = n.senderName || n.sender || 'System';
    document.getElementById('pdp-notif-body').textContent = n.body || 'No details available.';

    const date = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
    document.getElementById('pdp-notif-date').textContent = date.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Mark as read
    if (n.id && window.userData?.docId) {
        try {
            const currentReadBy = n.readBy || [];
            if (!currentReadBy.includes(window.userData.docId)) {
                const { arrayUnion } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
                await updateDoc(doc(window.db, "notifications", n.id), {
                    readBy: arrayUnion(window.userData.docId)
                });
            }
        } catch (e) {
            console.warn('Failed to mark as read:', e);
        }
    }
};

// -------- Helpers --------

function getTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function getNotifIcon(type) {
    const map = {
        'approval': { icon: 'fa-stamp', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
        'rejection': { icon: 'fa-xmark', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
        'task': { icon: 'fa-list-check', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        'payment': { icon: 'fa-indian-rupee-sign', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        'message': { icon: 'fa-comment-dots', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        'warning': { icon: 'fa-triangle-exclamation', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        'info': { icon: 'fa-circle-info', color: 'text-gray-600', bg: 'bg-gray-50 dark:bg-[#111]' },
    };
    return map[type] || map['info'];
}
