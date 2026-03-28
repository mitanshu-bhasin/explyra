importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    // Service workers run without window/document. Keep config static here.
    apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9",
    measurementId: "G-TFBZ5GZ22C"
};

let messaging = null;
try {
    firebase.initializeApp(firebaseConfig);
    messaging = firebase.messaging();
} catch (err) {
    console.error('[firebase-messaging-sw.js] Firebase init failed:', err);
}

if (messaging && typeof messaging.onBackgroundMessage === 'function') {
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);

        const notificationTitle = payload.notification?.title || 'Explyra Notification';
        const notificationOptions = {
            body: payload.notification?.body || '',
            icon: '/assets/images/explyra_logo.png',
            badge: '/assets/images/explyra_logo.png',
            vibrate: [200, 100, 200],
            tag: payload.data?.type || 'general',
            data: payload.data || {}
        };

        // For incoming calls, use a more prominent notification.
        if (payload.data?.type === 'incoming_call') {
            notificationOptions.requireInteraction = true;
            notificationOptions.tag = 'incoming-call';
            notificationOptions.vibrate = [300, 100, 300, 100, 300];
        }

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(urlToOpen) && 'focus' in client) {
                    return client.focus();
                }
            }
            return clients.openWindow(urlToOpen);
        })
    );
});
