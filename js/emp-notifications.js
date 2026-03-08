// js/emp-notifications.js
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";
import { collection, query, where, orderBy, limit, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const VAPID_KEY = 'BOsOeRaI8phgZF1FNFk3ruTzQJh15l0QA2vYzuwJ3ZS59jSSFRxfWRWpzWGriIGhaaLwxASNtvrRCdYO-Zs2B-s';

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
            console.log('FCM Message:', payload);
            window.showToast(payload.notification.title + ": " + payload.notification.body, 'info');
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
        limit(10)
    );

    let isInitialLoad = true;
    onSnapshot(notifQ, (snapshot) => {
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
                window.showToast(`New Notification: ${d.title}`, 'info');
            }
        });
    });
};
