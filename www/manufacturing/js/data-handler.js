class DataHandler {
    static async fetchData(fileName) {
        try {
            // Check localStorage first
            const localData = localStorage.getItem(`mfg_${fileName}`);
            if (localData) return JSON.parse(localData);

            // Fallback to JSON and initialize localStorage
            const response = await fetch(`./data/${fileName}.json`);
            if (!response.ok) throw new Error(`Could not fetch ${fileName}`);
            const data = await response.json();
            localStorage.setItem(`mfg_${fileName}`, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async saveData(fileName, data) {
        localStorage.setItem(`mfg_${fileName}`, JSON.stringify(data));
        // Dispatch event for reactive updates in same-page components if needed
        window.dispatchEvent(new CustomEvent('mfg-data-updated', { detail: { fileName } }));
    }

    static async addItem(fileName, item) {
        const data = await this.fetchData(fileName);
        data.push(item);
        await this.saveData(fileName, data);
        return data;
    }

    static async deleteItem(fileName, key, value) {
        let data = await this.fetchData(fileName);
        const originalLength = data.length;
        data = data.filter(item => String(item[key]) !== String(value));
        if (data.length < originalLength) {
            await this.saveData(fileName, data);
            return true;
        }
        return false;
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
        // Simulating daily production data based on current production JS
        return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [650, 780, 720, 840, 910, 500, 420] // In a real app, this would be historical from Firestore
        };
    }

    static async getInventoryChartData() {
        const inventory = await this.fetchData('inventory');
        const available = inventory.filter(i => i.quantity >= i.reorderLevel).length;
        const low = inventory.filter(i => i.quantity < i.reorderLevel).length;
        
        return [available, 10, low]; // Available, Reserved (mock), Low
    }

    static formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
}
window.DataHandler = DataHandler;
