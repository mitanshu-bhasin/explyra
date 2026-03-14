const cloudflareService = {
    async createRecord(type, name, content, ttl = 1, proxied = false) {
        try {
            const response = await fetch('/api/dns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, name, content, ttl: parseInt(ttl), proxied })
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
        // Records are fetched from Firestore in this app
        return [];
    },

    async deleteRecord(recordId) {
        try {
            const response = await fetch(`/api/dns?id=${recordId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error("[DNS Delete Error]", error);
            throw error;
        }
    },

    async updateRecord(recordId, type, name, content, ttl = 1, proxied = false) {
        try {
            const response = await fetch(`/api/dns?id=${recordId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, name, content, ttl: parseInt(ttl), proxied })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            return data;
        } catch (error) {
            console.error("[DNS Update Error]", error);
            throw error;
        }
    }
};

window.cloudflareService = cloudflareService;
