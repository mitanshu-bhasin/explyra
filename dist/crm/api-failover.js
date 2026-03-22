/**
 * crm/api-failover.js
 * High-Availability Failover Logic for Explyra CRM
 * Implements a retry wrapper around Firebase operations.
 */

window.CrmApi = {
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 1000,

    /**
     * Executes a Firebase promise-based operation with exponential backoff retry.
     * @param {Function} operation - Function returning a promise (e.g., () => addDoc(...))
     * @param {String} context - Description of the operation for logging
     */
    async withRetry(operation, context = 'Firebase Operation') {
        let attempt = 0;
        let lastError = null;

        while (attempt < this.MAX_RETRIES) {
            try {
                if (!window.navigator.onLine) {
                    // Firebase handles offline writes automatically if persistence is enabled,
                    // but we log it for the CRM context.
                    console.warn(`[CRM Failover] Device offline, operation '${context}' will be queued by Firebase.`);
                    // We still execute the operation so Firebase can queue it locally.
                    return await operation();
                }

                return await operation();

            } catch (error) {
                lastError = error;
                attempt++;

                // If it's a permission error, don't retry, it won't fix itself
                if (error.code === 'permission-denied') {
                    console.error(`[CRM Failover] Permission denied for '${context}'. Check Firestore rules.`);
                    throw error;
                }

                console.warn(`[CRM Failover] Attempt ${attempt} failed for '${context}'. Retrying in ${this.RETRY_DELAY_MS * attempt}ms...`, error);

                if (attempt < this.MAX_RETRIES) {
                    await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY_MS * attempt));
                }
            }
        }

        console.error(`[CRM Failover] All ${this.MAX_RETRIES} attempts failed for '${context}'.`);

        // Show user-facing error via toast
        if (window.showToast) {
            window.showToast(`Operation failed: ${context}. Please check your connection.`, 'error');
        }

        throw lastError;
    },

    /**
     * Helper to enable offline persistence if supported
     */
    enablePersistence() {
        if (!window.db) return;

        try {
            firebase.firestore().enablePersistence({
                synchronizeTabs: true
            })
                .then(() => {
                    console.log("[CRM Failover] Firestore offline persistence enabled (multi-tab).");
                })
                .catch((err) => {
                    if (err.code == 'failed-precondition') {
                        console.warn("[CRM Failover] Persistence failed: Multiple tabs open.");
                    } else if (err.code == 'unimplemented') {
                        console.warn("[CRM Failover] Persistence not supported by browser.");
                    }
                });
        } catch (e) {
            // Already enabled or other error
            console.log("[CRM Failover] Persistence status: ", e.message);
        }
    }
};

// Initialize persistence on load
document.addEventListener("DOMContentLoaded", () => {
    // Wait for Firebase to initialize fully
    setTimeout(() => {
        window.CrmApi.enablePersistence();
    }, 1500);
});
