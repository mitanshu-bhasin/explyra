// ============================================
// Authentication Service
// ============================================

const AuthService = {
  // Current user state
  currentUser: null,

  // Listen for auth state changes
  onAuthStateChanged(callback) {
    return csAuth.onAuthStateChanged(async (user) => {
      this.currentUser = user;
      console.log("Auth state changed. User:", user ? user.uid : "None");
      if (user) {
        try {
          // Ensure user doc exists
          const userRef = csDb.collection('cs_users').doc(user.uid);
          console.log("Attempting to get user doc for UID:", user.uid);
          const userDoc = await userRef.get();
          if (!userDoc.exists) {
            console.log("User doc missing. Creating...");
            await userRef.set({
              email: user.email,
              displayName: user.displayName || user.email.split('@')[0],
              photoURL: user.photoURL || null,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              companyId: null
            });
            console.log("User doc created successfully.");
          } else {
            console.log("User doc found.");
          }
        } catch (error) {
          console.error("DEBUG: Error ensuring user document:", error.code, error.message);
          if (error.code === 'permission-denied') {
            console.warn("CRITICAL: Firestore permission denied despite rules being set to 'if true'. This usually means the wrong database instance is being targeted.");
          }
        }
      }
      callback(user);
    });
  },

  // Email/Password Signup
  async signup(email, password, displayName) {
    try {
      const cred = await csAuth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: displayName || email.split('@')[0] });

      // Create user doc
      await csDb.collection('cs_users').doc(cred.user.uid).set({
        email: email,
        displayName: displayName || email.split('@')[0],
        photoURL: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        companyId: null
      });

      return { success: true, user: cred.user };
    } catch (error) {
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  // Email/Password Login
  async login(email, password) {
    try {
      const cred = await csAuth.signInWithEmailAndPassword(email, password);
      return { success: true, user: cred.user };
    } catch (error) {
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  // Google Sign In
  async googleSignIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const cred = await csAuth.signInWithPopup(provider);

      // Ensure user doc
      const userRef = csDb.collection('cs_users').doc(cred.user.uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        await userRef.set({
          email: cred.user.email,
          displayName: cred.user.displayName,
          photoURL: cred.user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          companyId: null
        });
      }

      return { success: true, user: cred.user };
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Sign-in cancelled' };
      }
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  // Logout
  async logout() {
    await csAuth.signOut();
  },

  // Get current user data from Firestore
  async getUserData() {
    if (!this.currentUser) return null;
    const doc = await csDb.collection('cs_users').doc(this.currentUser.uid).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  // Friendly error messages
  _friendlyError(code) {
    const messages = {
      'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
      'auth/invalid-credential': 'Invalid email or password. Please try again.'
    };
    return messages[code] || 'An unexpected error occurred. Please try again.';
  }
};

window.AuthService = AuthService;
