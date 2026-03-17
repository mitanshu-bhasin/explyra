import { doc, onSnapshot, updateDoc, setDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

let peer = null;
let localStream = null;
let screenStream = null;
let connections = {}; // peerId -> MediaConnection
let activeGroupId = null;
let activeCallUnsub = null;

window.addEventListener('load', () => {
    // Initialize peer lazily when user clicks start/join call
});

async function initPeerJS() {
    return new Promise((resolve) => {
        if (peer) return resolve(peer);
        const myUserId = window.userData ? window.userData.docId : 'user_' + Math.floor(Math.random() * 100000);
        // Using Explyra random ID or precise user ID
        peer = new Peer(myUserId + '_' + Date.now(), {
            debug: 2
        });

        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            resolve(peer);
        });

        peer.on('call', (call) => {
            console.log('Receiving call from', call.peer);
            call.answer(localStream);
            
            call.on('stream', (remoteStream) => {
                addVideoStream(call.peer, remoteStream);
            });

            call.on('close', () => {
                removeVideoStream(call.peer);
            });

            connections[call.peer] = call;
        });

        peer.on('error', (err) => {
            console.error('PeerJS error:', err);
            window.showToast("P2P Connection Error: " + err.type, "error");
        });
    });
}

async function getLocalStream() {
    if (localStream && localStream.active) return localStream;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = localStream;
        }
        return localStream;
    } catch (e) {
        console.error("Failed to get local stream", e);
        if (e.name === 'NotAllowedError') {
            window.showToast("Camera/Mic access denied. Please allow permissions in your browser settings (look for the lock icon in the address bar).", "error");
        } else {
            window.showToast("Could not access camera/microphone: " + e.message, "error");
        }
        throw e;
    }
}

window.startGroupCall = async () => {
    if (!window.currentChatContext || !window.currentChatContext.startsWith('group_')) {
        window.showToast("Video calls are currently supported in groups", "info");
        return;
    }

    const groupId = window.currentChatContext.replace('group_', '');
    activeGroupId = groupId;

    document.getElementById('modal-video-call').classList.remove('hidden');
    
    try {
        await getLocalStream();
        await initPeerJS();

        const db = window.db;
        const groupRef = doc(db, "group_chats", groupId);

        // Register my peerId to the group's active metadata
        const updateObj = {};
        updateObj[`activeCall.${window.userData.docId}`] = peer.id;
        await updateDoc(groupRef, updateObj);

        // Listen for new peers joining the active call
        activeCallUnsub = onSnapshot(groupRef, (docSnap) => {
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const activeCallData = data.activeCall || {};

            // Connect to peers that are in the call but not in my connections
            for (const [userId, targetPeerId] of Object.entries(activeCallData)) {
                if (userId === window.userData.docId) continue; // Skip myself
                if (!connections[targetPeerId] && targetPeerId) {
                    initiateCallToTarget(targetPeerId);
                }
            }

            // Cleanup peers that left (exist in connections but not in activeCallData)
            const activePeerIds = Object.values(activeCallData);
            for (const connectedPeerId of Object.keys(connections)) {
                if (!activePeerIds.includes(connectedPeerId)) {
                    removeVideoStream(connectedPeerId);
                    connections[connectedPeerId].close();
                    delete connections[connectedPeerId];
                }
            }
        });

    } catch (e) {
        console.error("Start call failed", e);
        window.leaveVideoCall();
    }
};

function initiateCallToTarget(targetPeerId) {
    if (!peer || !localStream) return;
    console.log('Initiating call to', targetPeerId);
    
    const call = peer.call(targetPeerId, localStream);
    
    call.on('stream', (remoteStream) => {
        addVideoStream(targetPeerId, remoteStream);
    });

    call.on('close', () => {
        removeVideoStream(targetPeerId);
    });

    call.on('error', (err) => {
        console.error('Call error with peer', targetPeerId, err);
        removeVideoStream(targetPeerId);
    });

    connections[targetPeerId] = call;
}

function addVideoStream(peerId, stream) {
    const grid = document.getElementById('video-grid');
    if (!grid) return;

    let videoWrapper = document.getElementById('wrapper_' + peerId);
    if (!videoWrapper) {
        videoWrapper = document.createElement('div');
        videoWrapper.id = 'wrapper_' + peerId;
        videoWrapper.className = 'w-[80vw] md:w-auto h-full md:h-64 aspect-video bg-black rounded-xl overflow-hidden relative shrink-0 snap-center border border-[#333] shadow-lg';
        
        const video = document.createElement('video');
        video.id = 'video_' + peerId;
        video.autoplay = true;
        video.playsInline = true;
        video.className = 'w-full h-full object-cover';
        
        const label = document.createElement('div');
        label.className = 'absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm';
        label.textContent = "Peer..."; // Could map back to name if we looked it up

        videoWrapper.appendChild(video);
        videoWrapper.appendChild(label);
        grid.appendChild(videoWrapper);
    }
    
    const vid = document.getElementById('video_' + peerId);
    if (vid) vid.srcObject = stream;
}

function removeVideoStream(peerId) {
    const wrapper = document.getElementById('wrapper_' + peerId);
    if (wrapper) wrapper.remove();
}

// Controls
window.toggleAudio = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        const btn = document.getElementById('btn-toggle-audio');
        if (audioTrack.enabled) {
            btn.classList.remove('bg-red-500', 'text-white');
            btn.classList.add('bg-[#222]', 'text-white');
            btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        } else {
            btn.classList.remove('bg-[#222]', 'text-white');
            btn.classList.add('bg-red-500', 'text-white');
            btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        }
    }
};

window.toggleVideo = () => {
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        const btn = document.getElementById('btn-toggle-video');
        if (videoTrack.enabled) {
            btn.classList.remove('bg-red-500', 'text-white');
            btn.classList.add('bg-[#222]', 'text-white');
            btn.innerHTML = '<i class="fa-solid fa-video"></i>';
        } else {
            btn.classList.remove('bg-[#222]', 'text-white');
            btn.classList.add('bg-red-500', 'text-white');
            btn.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
        }
    }
};

window.toggleScreenShare = async () => {
    if (!peer) return;

    const btn = document.getElementById('btn-screen-share');

    if (screenStream) {
        // Stop screen share and revert to camera
        screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;

        const videoTrack = localStream.getVideoTracks()[0];
        
        // Replace track for all active connections
        for (const connId in connections) {
            const call = connections[connId];
            const sender = call.peerConnection.getSenders().find((s) => s.track.kind === videoTrack.kind);
            if (sender) sender.replaceTrack(videoTrack);
        }
        
        document.getElementById('local-video').srcObject = localStream;
        
        btn.classList.remove('bg-green-500', 'text-black');
        btn.classList.add('bg-blue-600', 'text-white');
        return;
    }

    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        // Replace track for all active connections
        for (const connId in connections) {
            const call = connections[connId];
            const sender = call.peerConnection.getSenders().find((s) => s.track.kind === screenTrack.kind);
            if (sender) sender.replaceTrack(screenTrack);
        }

        document.getElementById('local-video').srcObject = screenStream;

        screenTrack.onended = () => {
            window.toggleScreenShare(); // automatic revert if forced closed
        };

        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-green-500', 'text-black');
        
    } catch (e) {
        console.error("Screen sharing failed", e);
        window.showToast("Could not start screen share", "error");
    }
};

window.leaveVideoCall = async () => {
    document.getElementById('modal-video-call').classList.add('hidden');
    
    // Stop local media tracks
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;
    }

    // Unsubscribe from firestore active call listener
    if (activeCallUnsub) {
        activeCallUnsub();
        activeCallUnsub = null;
    }

    // Close all P2P connections
    Object.values(connections).forEach(call => call.close());
    connections = {};

    const grid = document.getElementById('video-grid');
    if (grid) grid.innerHTML = '';

    // Remove self from Firestore activeCall if group was active
    if (activeGroupId && window.db && window.userData) {
        try {
            const groupRef = doc(window.db, "group_chats", activeGroupId);
            const updateObj = {};
            updateObj[`activeCall.${window.userData.docId}`] = deleteField();
            await updateDoc(groupRef, updateObj);
        } catch (e) {
            console.error("Failed to remove peer from active call DB", e);
        }
    }
    
    activeGroupId = null;

    if (peer) {
        peer.destroy();
        peer = null;
    }
    
    // Reset buttons UI
    const audioBtn = document.getElementById('btn-toggle-audio');
    if (audioBtn) {
        audioBtn.className = 'w-12 h-12 rounded-full bg-[#222] hover:bg-[#333] text-white flex items-center justify-center transition shadow-lg';
        audioBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    }
    const videoBtn = document.getElementById('btn-toggle-video');
    if (videoBtn) {
        videoBtn.className = 'w-12 h-12 rounded-full bg-[#222] hover:bg-[#333] text-white flex items-center justify-center transition shadow-lg';
        videoBtn.innerHTML = '<i class="fa-solid fa-video"></i>';
    }
    const screenBtn = document.getElementById('btn-screen-share');
    if (screenBtn) {
        screenBtn.className = 'w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-lg';
    }
};
window.showAddMemberToCallModal = async () => {
    const modal = document.getElementById('modal-add-member-call');
    const container = document.getElementById('call-member-list');
    if (!modal || !container) return;

    modal.classList.remove('hidden');
    showToast("Loading members...", "info");
    try {
        const users = window.adminChatUsers || window.chatUsers || [];
        if (users.length === 0) {
            container.innerHTML = '<p class="text-sm text-slate-500 text-center p-4">No users found</p>';
            return;
        }

        container.innerHTML = users.map(u => `
            <div onclick="window.addMemberToGroupCall('${u.docId}')" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer mb-1 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 overflow-hidden text-xs">
                    ${u.photoUrl ? `<img src="${u.photoUrl}" class="w-full h-full object-cover">` : (u.name || u.email || '?')[0].toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">${u.name || u.email}</p>
                    <p class="text-[10px] text-slate-500 truncate">${u.role || 'User'}</p>
                </div>
                <i class="fa-solid fa-plus text-green-500 opacity-0 group-hover:opacity-100 transition"></i>
            </div>
        `).join('');

    } catch (e) {
        console.error("Failed to load users for call", e);
        container.innerHTML = '<p class="text-xs text-red-500 p-4">Error loading users</p>';
    }
};

window.addMemberToGroupCall = async (userId) => {
    if (!activeGroupId) return;
    
    try {
        const groupRef = doc(window.db, "group_chats", activeGroupId);
        const groupSnap = await window.safeFirebaseFetch(window.getDoc(groupRef));
        
        if (groupSnap.exists()) {
            const data = groupSnap.data();
            const members = data.users || [];
            
            if (!members.includes(userId)) {
                members.push(userId);
                await updateDoc(groupRef, { users: members });
                window.showToast("Member invited to call", "success");
            } else {
                window.showToast("User is already in this group", "info");
            }
        }
        document.getElementById('modal-add-member-call').classList.add('hidden');
    } catch (e) {
        console.error("Failed to add member to call", e);
        window.showToast("Failed to invite member", "error");
    }
};
