document.addEventListener('DOMContentLoaded', () => {
    const auth = window.auth;
    const db = window.db;

    // UI Elements
    const elements = {
        userName: document.getElementById('userName'),
        userInitial: document.getElementById('userInitial'),
        subdomainCount: document.getElementById('subdomainCount'),
        dnsRecordCount: document.getElementById('dnsRecordCount'),
        activityTable: document.getElementById('activityTable'),
        subdomainsTable: document.getElementById('subdomainsTable'),
        dnsRecordsTable: document.getElementById('dnsRecordsTable'),
        subdomainSelector: document.getElementById('subdomainSelector'),
        logoutBtn: document.getElementById('logoutBtn'),
        createSubdomainBtn: document.getElementById('createSubdomainBtn'),
        subdomainInput: document.getElementById('subdomainInput'),
        subdomainStatus: document.getElementById('subdomainStatus'),
        addRecordBtn: document.getElementById('addRecordBtn'),
        dnsStatus: document.getElementById('dnsStatus')
    };

    let userData = {
        uid: null,
        subdomains: [],
        currentSubdomain: null
    };

    // 1. Auth & Data Init
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        userData.uid = user.uid;
        updateProfileUI(user);
        await refreshUserData();
        initDefaultView();
    });

    const updateProfileUI = (user) => {
        elements.userName.textContent = user.displayName || user.email.split('@')[0];
        elements.userInitial.textContent = (user.displayName || user.email)[0].toUpperCase();
    };

    const refreshUserData = async () => {
        // Fetch Subdomains
        const subsSnapshot = await db.collection("subdomains").where("uid", "==", userData.uid).get();
        userData.subdomains = subsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        elements.subdomainCount.textContent = userData.subdomains.length;
        
        // Populate Subdomain Selector for DNS Manager
        elements.subdomainSelector.innerHTML = userData.subdomains.map(s => 
            `<option value="${s.subdomain}" ${s.subdomain === userData.currentSubdomain ? 'selected' : ''}>${s.subdomain}.mitanshu.tech</option>`
        ).join('') || '<option value="">No subdomains</option>';

        if (userData.subdomains.length > 0 && !userData.currentSubdomain) {
            userData.currentSubdomain = userData.subdomains[0].subdomain;
        }

        // Fetch DNS records count (sum of all subdomains)
        let totalRecords = 0;
        for (const sub of userData.subdomains) {
            try {
                const records = await window.listDnsRecords(sub.subdomain);
                totalRecords += records.length;
            } catch (e) { console.error(e); }
        }
        elements.dnsRecordCount.textContent = totalRecords;

        // Refresh currently active view
        const activeView = document.querySelector('.page-view.active').id.replace('View', '');
        renderView(activeView);
    };

    // 2. View Rendering
    const renderView = (view) => {
        switch(view) {
            case 'dashboard': renderDashboard(); break;
            case 'subdomains': renderSubdomains(); break;
            case 'dns': renderDNS(); break;
        }
    };

    const renderDashboard = () => {
        elements.activityTable.innerHTML = userData.subdomains.length ? 
            userData.subdomains.slice(0, 5).map(s => `
                <tr>
                    <td>${s.subdomain}.mitanshu.tech</td>
                    <td><span class="status-badge status-active">Primary</span></td>
                    <td>Active</td>
                    <td>${s.createdAt ? new Date(s.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}</td>
                </tr>
            `).join('') :
            '<tr><td colspan="4" style="text-align: center; color: var(--text-dim);">No recent activity.</td></tr>';
    };

    const renderSubdomains = () => {
        elements.subdomainsTable.innerHTML = userData.subdomains.length ?
            userData.subdomains.map(s => `
                <tr>
                    <td style="font-weight: 600;">${s.subdomain}.mitanshu.tech</td>
                    <td>${s.createdAt ? new Date(s.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>
                        <button class="btn btn-ghost" onclick="window.manageDns('${s.subdomain}')">Manage DNS</button>
                    </td>
                </tr>
            `).join('') :
            '<tr><td colspan="4" style="text-align: center; color: var(--text-dim);">You have no subdomains yet.</td></tr>';
    };

    const renderDNS = async () => {
        if (!userData.currentSubdomain) {
            elements.dnsRecordsTable.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-dim);">Please select or create a subdomain first.</td></tr>';
            return;
        }

        elements.dnsRecordsTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">Loading records...</td></tr>';
        
        try {
            const records = await window.listDnsRecords(userData.currentSubdomain);
            elements.dnsRecordsTable.innerHTML = records.length ?
                records.map(rec => `
                    <tr>
                        <td><span class="status-badge" style="border: 1px solid var(--border); color: var(--text-dim);">${rec.type}</span></td>
                        <td style="font-family: monospace;">${rec.name}</td>
                        <td style="font-family: monospace; font-size: 0.8rem;">${rec.content}</td>
                        <td>${rec.ttl || 'Auto'}</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-ghost" style="padding: 4px 8px;" onclick="window.deleteRecord('${rec.id}', '${rec.cloudflareId}')">
                                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('') :
                '<tr><td colspan="5" style="text-align: center; color: var(--text-dim);">No records found for this subdomain.</td></tr>';
        } catch (e) {
            elements.dnsRecordsTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ef4444;">Error: ${e.message}</td></tr>`;
        }
    };

    // 3. Actions
    elements.logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'index.html');
    });

    elements.createSubdomainBtn.addEventListener('click', async () => {
        const val = elements.subdomainInput.value.trim().toLowerCase();
        if (!val) {
            elements.subdomainStatus.textContent = "Please enter a name";
            elements.subdomainStatus.style.color = "#ef4444";
            return;
        }

        try {
            elements.createSubdomainBtn.disabled = true;
            elements.createSubdomainBtn.textContent = "Processing...";
            await window.createSubdomain(val);
            elements.subdomainStatus.textContent = "Success! Reloading...";
            elements.subdomainStatus.style.color = "#22c55e";
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            elements.subdomainStatus.textContent = error.message;
            elements.subdomainStatus.style.color = "#ef4444";
            elements.createSubdomainBtn.disabled = false;
            elements.createSubdomainBtn.textContent = "Claim Domain";
        }
    });

    elements.addRecordBtn.addEventListener('click', async () => {
        const type = document.getElementById('recordType').value;
        const name = document.getElementById('recordName').value.trim();
        const content = document.getElementById('recordContent').value.trim();
        const ttl = document.getElementById('recordTTL').value;

        if (!name || !content) {
            elements.dnsStatus.textContent = "Fill all fields";
            elements.dnsStatus.style.color = "#ef4444";
            return;
        }

        try {
            elements.addRecordBtn.disabled = true;
            elements.addRecordBtn.textContent = "Adding...";
            await window.createDnsRecord(name, type, content, userData.currentSubdomain, ttl);
            elements.dnsStatus.textContent = "Record added!";
            elements.dnsStatus.style.color = "#22c55e";
            document.getElementById('recordName').value = '';
            document.getElementById('recordContent').value = '';
            await refreshUserData();
        } catch (error) {
            console.error("[DNS] Add Record Error:", error);
            elements.dnsStatus.textContent = error.message;
            elements.dnsStatus.style.color = "#ef4444";
        } finally {
            elements.addRecordBtn.disabled = false;
            elements.addRecordBtn.textContent = "Add Record";
            // Ensure data is refreshed
            await refreshUserData();
        }
    });

    elements.subdomainSelector.addEventListener('change', (e) => {
        userData.currentSubdomain = e.target.value;
        renderDNS();
    });

    document.getElementById('refreshDns').addEventListener('click', () => renderDNS());

    // Global Action Helpers
    window.manageDns = (subdomain) => {
        userData.currentSubdomain = subdomain;
        elements.subdomainSelector.value = subdomain;
        document.querySelector('[data-view="dns"]').click();
    };

    window.deleteRecord = async (fid, cid) => {
        if (!confirm("Delete this record?")) return;
        try {
            await window.deleteDnsRecord(fid, cid);
            await refreshUserData();
        } catch (e) {
            alert(e.message);
        }
    };

    window.onNavigate = (viewId) => {
        renderView(viewId);
    };

    const initDefaultView = () => {
        const activeNav = document.querySelector('.nav-item.active');
        if (activeNav) renderView(activeNav.dataset.view);
    };
});
