class DataHandler {
    static get db() {
        return window.db; // From firebase-config.js
    }

    static async fetchData(fileName) {
        if (!window.companyId) {
            console.warn("Waiting for company context...");
            return [];
        }

        try {
            // Check cache for instant load
            const cacheKey = `mfg_${fileName}_${window.companyId}`;
            const cached = localStorage.getItem(cacheKey);
            
            // Background fetch from Firestore
            const snapshot = await this.db.collection(`mfg_${fileName}`)
                .where('companyId', '==', window.companyId)
                .get();
            
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Update cache
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(`Error fetching ${fileName}:`, error);
            const cacheKey = `mfg_${fileName}_${window.companyId}`;
            return JSON.parse(localStorage.getItem(cacheKey) || '[]');
        }
    }

    static async addItem(fileName, item) {
        if (!window.companyId) throw new Error("Unauthorized: No company context");

        const dataToSave = {
            ...item,
            companyId: window.companyId,
            createdAt: new Date().toISOString()
        };

        const docRef = await this.db.collection(`mfg_${fileName}`).add(dataToSave);
        
        // Update local cache manually for reactivity
        const cacheKey = `mfg_${fileName}_${window.companyId}`;
        const currentData = JSON.parse(localStorage.getItem(cacheKey) || '[]');
        currentData.push({ id: docRef.id, ...dataToSave });
        localStorage.setItem(cacheKey, JSON.stringify(currentData));

        window.dispatchEvent(new CustomEvent('mfg-data-updated', { detail: { fileName } }));
        return docRef.id;
    }

    static async deleteItem(fileName, id) {
        try {
            await this.db.collection(`mfg_${fileName}`).doc(id).delete();
            
            const cacheKey = `mfg_${fileName}_${window.companyId}`;
            let currentData = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            currentData = currentData.filter(item => item.id !== id);
            localStorage.setItem(cacheKey, JSON.stringify(currentData));
            
            return true;
        } catch (error) {
            console.error("Delete error:", error);
            return false;
        }
    }

    static async getDashboardStats() {
        const [production, machines, orders, inventory] = await Promise.all([
            this.fetchData('production'),
            this.fetchData('machines'),
            this.fetchData('orders'),
            this.fetchData('inventory')
        ]);

        const totalProductionToday = production.reduce((acc, curr) => {
            const target = isNaN(curr.target) ? 0 : curr.target;
            const progress = isNaN(curr.progress) ? 0 : curr.progress;
            return acc + (progress === 100 ? target : (target * progress / 100));
        }, 0);
        
        const activeMachines = machines.filter(m => m.status === 'active').length;
        const totalMachines = machines.length;
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        
        // Calculate efficiency based on Machine OEE or Production Progress
        const validProduction = production.filter(p => !isNaN(p.progress));
        const avgProgress = validProduction.length 
            ? validProduction.reduce((acc, curr) => acc + curr.progress, 0) / validProduction.length 
            : 0;

        return {
            productionToday: Math.round(totalProductionToday),
            activeMachines: `${activeMachines} / ${totalMachines}`,
            pendingOrders: pendingOrders,
            efficiency: `${avgProgress.toFixed(1)}%`
        };
    }

    static async getProductionChartData() {
        return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [0, 0, 0, 0, 0, 0, 0] 
        };
    }

    static async getInventoryChartData() {
        const inventory = await this.fetchData('inventory');
        const available = inventory.filter(i => i.quantity >= i.reorderLevel).length;
        const low = inventory.filter(i => i.quantity < i.reorderLevel).length;
        
        return [available, 0, low]; // Available, Reserved, Low
    }

    static formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
}
window.DataHandler = DataHandler;
