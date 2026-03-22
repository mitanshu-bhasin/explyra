// js/emp-calls.js
import { collection, query, where, getDoc, doc, onSnapshot, serverTimestamp, addDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

let localStream = null;
let peerConnection = null;
let currentCallDoc = null;
let incomingCallUnsub = null;
let activeCallUnsub = null;

const servers = {
    iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
    ]
};

window.listenForCalls = () => {
    if (!window.userData || !window.userData.docId) return;
    if (incomingCallUnsub) { incomingCallUnsub(); incomingCallUnsub = null; }

    const db = window.db;
    const q = query(
        collection(db, "calls"),
        where("receiver", "==", window.userData.docId),
        where("companyId", "==", window.companyId),
        where("status", "==", "calling")
    );


    incomingCallUnsub = onSnapshot(q, (snapshot) => {
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (data.status === 'calling') {
                showIncomingCallUI(docSnap.id, data);
            }
        });
    });
};

function showIncomingCallUI(callId, data) {
    currentCallDoc = callId;
    document.getElementById('incoming-caller-name').textContent = data.callerName || 'Unknown';
    document.getElementById('incoming-call-type').textContent = data.type === 'video' ? 'Video' : 'Voice';

    // Show caller photo
    const photoEl = document.getElementById('incoming-caller-photo');
    if (photoEl) {
        if (data.callerPhotoUrl) {
            photoEl.innerHTML = `<img src="${data.callerPhotoUrl}" class="w-full h-full object-cover">`;
        } else {
            const initial = (data.callerName || '?')[0].toUpperCase();
            photoEl.innerHTML = initial;
        }
    }

    document.getElementById('modal-incoming-call').classList.remove('hidden');
    setTimeout(() => {
        const c = document.getElementById('modal-incoming-call-content');
        if (c) {
            c.classList.remove('scale-95', 'opacity-0');
            c.classList.add('scale-100', 'opacity-100');
        }
    }, 10);

    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.play().catch(() => {});
}

window.initiateCall = async (type) => {
    if (window.currentChatContext === 'global' || !window.currentChatUser) {
        return window.showToast("Select a user to call", "error");
    }

    try {
        // Reuse stream if already active and matches type
        if (!localStream) {
            localStream = await navigator.mediaDevices.getUserMedia({ video: type === 'video', audio: true });
        } else if (type === 'video' && localStream.getVideoTracks().length === 0) {
            // If we have an audio-only stream but want video, we need a new one
            localStream.getTracks().forEach(t => t.stop());
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        }

        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = localStream;
            if (type === 'voice') localVideo.classList.add('hidden');
            else localVideo.classList.remove('hidden');
        }

        showActiveCallUI(window.currentChatUser.name || 'User', type, window.currentChatUser.photoUrl || '');

        // Play outgoing ringing sound
        const outRinger = document.getElementById('outgoing-ringtone');
        if (outRinger) outRinger.play().catch(() => {});

        const db = window.db;
        peerConnection = new RTCPeerConnection(servers);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        const callDocRef = doc(collection(db, "calls"));
        currentCallDoc = callDocRef.id;

        const offerCandidates = collection(callDocRef, "offerCandidates");
        const answerCandidates = collection(callDocRef, "answerCandidates");

        peerConnection.onicecandidate = event => {
            if (event.candidate) addDoc(offerCandidates, event.candidate.toJSON());
        };

        peerConnection.ontrack = event => {
            document.getElementById('remote-video').srcObject = event.streams[0];
            if (type === 'video') document.getElementById('remote-video').classList.remove('opacity-0');
            else document.getElementById('remote-audio-indicator').classList.remove('hidden');
        };

        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);

        await setDoc(callDocRef, {
            offer: { type: offerDescription.type, sdp: offerDescription.sdp },
            caller: window.userData.docId,
            callerName: window.userData.name || window.userData.email,
            callerPhotoUrl: window.userData.photoUrl || '',
            receiver: window.currentChatUser.docId,
            receiverName: window.currentChatUser.name || '',
            type: type,
            status: 'calling',
            companyId: window.companyId, // INJECT COMPANY ID!
            createdAt: serverTimestamp()
        });

        // Chat Log for Call
        try {
            const combinedId = window.userData.docId < window.currentChatUser.docId ?
                `chat_${window.userData.docId}_${window.currentChatUser.docId}` :
                `chat_${window.currentChatUser.docId}_${window.userData.docId}`;

            const callLogMsg = {
                text: `📞 Started ${type === 'video' ? 'Video' : 'Voice'} Call`,
                sender: window.userData.name || window.userData.email,
                email: window.userData.email,
                role: window.userData.role,
                createdAt: serverTimestamp(),
                companyId: window.companyId,
                type: 'system'
            };
            await addDoc(collection(db, "chats", combinedId, "messages"), callLogMsg);
            await setDoc(doc(db, "chats", combinedId), {
                lastMessage: `📞 ${type === 'video' ? 'Video' : 'Voice'} Call`,
                lastMessageAt: serverTimestamp(),
                lastSender: window.userData.docId,
                users: [window.userData.docId, window.currentChatUser.docId],
                companyId: window.companyId
            }, { merge: true });
        } catch (ce) { console.error("Call log error", ce); }

        activeCallUnsub = onSnapshot(callDocRef, snapshot => {
            const data = snapshot.data();
            if (data && data.status === 'answered') {
                const outR = document.getElementById('outgoing-ringtone');
                if (outR) { outR.pause(); outR.currentTime = 0; }
                switchToConnectedUI();
                if (!peerConnection.currentRemoteDescription && data.answer) {
                    const answerDescription = new RTCSessionDescription(data.answer);
                    peerConnection.setRemoteDescription(answerDescription).catch(e => console.error(e));
                }
            }
            if (data && data.status === 'ended') {
                cleanupCall();
            }
        });

        onSnapshot(answerCandidates, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    peerConnection.addIceCandidate(candidate).catch(e => console.error(e));
                }
            });
        });

    } catch (e) {
        console.error(e);
        if (e.name === 'NotAllowedError' || e.message?.toLowerCase().includes('permission denied')) {
            window.showToast("Camera/Mic permission denied. Please click the lock icon in your browser address bar to allow access.", "error");
        } else {
            window.showToast("Failed to start call: " + e.message, "error");
        }
    }
};

window.acceptCall = async () => {
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.pause();
    const incModal = document.getElementById('modal-incoming-call');
    if (incModal) incModal.classList.add('hidden');

    try {
        const db = window.db;
        const callDocRef = doc(db, "calls", currentCallDoc);
        const callSnap = await getDoc(callDocRef);
        if (!callSnap.exists()) throw new Error("Call ended");
        const callData = callSnap.data();

        try {
            if (!localStream) {
                localStream = await navigator.mediaDevices.getUserMedia({ video: callData.type === 'video', audio: true });
            }
        } catch (mediaErr) {
            console.warn("Media access denied on accept, answering without media", mediaErr);
            window.showToast("Answering without camera/mic (Permission denied)", "info");
            localStream = new MediaStream(); // Empty stream to allow connection
        }

        const localVideo = document.getElementById('local-video');
        if (localVideo && localStream.getVideoTracks().length > 0) {
            localVideo.srcObject = localStream;
            if (callData.type === 'voice') localVideo.classList.add('hidden');
            else localVideo.classList.remove('hidden');
        }

        showActiveCallUI(callData.callerName || 'User', callData.type, callData.callerPhotoUrl || '');
        setTimeout(() => switchToConnectedUI(), 300);

        peerConnection = new RTCPeerConnection(servers);
        if (localStream) {
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        }

        const offerCandidates = collection(callDocRef, "offerCandidates");
        const answerCandidates = collection(callDocRef, "answerCandidates");

        peerConnection.onicecandidate = event => {
            if (event.candidate) addDoc(answerCandidates, event.candidate.toJSON());
        };

        peerConnection.ontrack = event => {
            document.getElementById('remote-video').srcObject = event.streams[0];
            if (callData.type === 'video') document.getElementById('remote-video').classList.remove('opacity-0');
            else document.getElementById('remote-audio-indicator').classList.remove('hidden');
        };

        const offerDescription = callData.offer;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);

        await updateDoc(callDocRef, {
            answer: { type: answerDescription.type, sdp: answerDescription.sdp },
            status: 'answered'
        });

        onSnapshot(offerCandidates, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    peerConnection.addIceCandidate(new RTCIceCandidate(data)).catch(e => console.error(e));
                }
            });
        });

        activeCallUnsub = onSnapshot(callDocRef, snapshot => {
            const data = snapshot.data();
            if (data && data.status === 'ended') {
                cleanupCall();
            }
        });

    } catch (e) {
        console.error(e);
        window.showToast("Accepting call failed: " + e.message, "error");
    }
};

window.declineCall = async () => {
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.pause();
    const incModal = document.getElementById('modal-incoming-call');
    if (incModal) incModal.classList.add('hidden');

    if (currentCallDoc) {
        try {
            await updateDoc(doc(window.db, "calls", currentCallDoc), { status: 'ended', reason: 'declined' });
        } catch (e) { console.error(e); }
        currentCallDoc = null;
    }
};

window.endCall = async () => {
    if (currentCallDoc) {
        try {
            await updateDoc(doc(window.db, "calls", currentCallDoc), { status: 'ended', reason: 'manually_ended' });
        } catch (e) { console.error(e); }
    }
    cleanupCall();
};

function cleanupCall() {
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) { ringer.pause(); ringer.currentTime = 0; }
    const outRinger = document.getElementById('outgoing-ringtone');
    if (outRinger) { outRinger.pause(); outRinger.currentTime = 0; }

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (activeCallUnsub) { activeCallUnsub(); activeCallUnsub = null; }

    document.getElementById('modal-active-call').classList.add('hidden');
    document.getElementById('modal-incoming-call').classList.add('hidden');
    document.getElementById('local-video').srcObject = null;
    document.getElementById('remote-video').srcObject = null;
    currentCallDoc = null;
}

function showActiveCallUI(name, type, photoUrl) {
    document.getElementById('active-call-name').textContent = name;
    document.getElementById('ringing-name').textContent = name;

    const avatar = document.getElementById('call-avatar');
    const ringAvatar = document.getElementById('ringing-avatar');
    if (avatar) {
        if (photoUrl) avatar.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover">`;
        else avatar.innerHTML = name[0].toUpperCase();
    }
    if (ringAvatar) {
        if (photoUrl) ringAvatar.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover">`;
        else ringAvatar.innerHTML = name[0].toUpperCase();
    }

    document.getElementById('modal-active-call').classList.remove('hidden');
    switchToRingingUI();
}

function switchToRingingUI() {
    document.getElementById('call-ringing-screen').classList.remove('hidden');
    document.getElementById('call-connected-screen').classList.add('hidden');
}

function switchToConnectedUI() {
    document.getElementById('call-ringing-screen').classList.add('hidden');
    document.getElementById('call-connected-screen').classList.remove('hidden');
    document.getElementById('call-status-text').textContent = "Connected";
}

window.toggleMic = () => {
    if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            const btn = document.getElementById('btn-toggle-mic');
            btn.innerHTML = audioTrack.enabled ? '<i class="fa-solid fa-microphone"></i>' : '<i class="fa-solid fa-microphone-slash"></i>';
        }
    }
};

window.toggleCam = () => {
    if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            const btn = document.getElementById('btn-toggle-cam');
            btn.innerHTML = videoTrack.enabled ? '<i class="fa-solid fa-video"></i>' : '<i class="fa-solid fa-video-slash"></i>';
        }
    }
};
