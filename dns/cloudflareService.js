const cloudflareService = {
    async createRecord(type, name, content, ttl = 1, proxied = false) {
        try {
            const response = await fetch('/api/dns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, name, content, ttl, proxied })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error("[DNS Error]", error);
            throw error;
        }
    },

    async listRecords() {
        // Implementing list via backend if needed, for now just returning empty or handling error
        // Note: Full management should also move to backend for security
        return [];
    },

    async updateRecord(recordId, type, name, content, ttl = 1, proxied = false) {
        // Implementation would follow the same pattern if required
        throw new Error("Update not implemented via backend yet");
    },

    async deleteRecord(recordId) {
        // Implementation would follow the same pattern if required
        throw new Error("Delete not implemented via backend yet");
    }
};

window.cloudflareService = cloudflareService;
