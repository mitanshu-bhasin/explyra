
window.compressImage = async (file) => {
    try {
        const { getStorage, ref, uploadBytesResumable, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js");
        const path = `uploads/${window.userData?.docId || 'anon'}_${Date.now()}_${file.name}`;
        const storageRef = ref(window.storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await new Promise((resolve, reject) => uploadTask.on('state_changed', null, reject, resolve));
        return await getDownloadURL(uploadTask.snapshot.ref);
    } catch (err) {
        console.error("Storage upload failed", err);
        throw err;
    }
};
