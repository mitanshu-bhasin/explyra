/**
 * crm/Contacts.js
 * Contact Directory for client data display
 */

window.CrmContacts = {
    contacts: [],
    unsubscribe: null,

    init() {
        if (!window.companyId) return;
        this.listenToContacts();

        const searchInput = document.getElementById('search-contacts');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderContactsGrid(e.target.value);
            });
        }
    },

    openContactModal(contactData = null, options = {}) {
        if (window.crmOpenModalWithHistory && !options.skipHistory) {
            return window.crmOpenModalWithHistory(
                'modal-contact',
                () => this.openContactModal(contactData, { ...options, skipHistory: true }),
                options
            );
        }

        const modal = document.getElementById('modal-contact');
        const content = document.getElementById('modal-contact-content');

        document.getElementById('contact-form').reset();
        document.getElementById('contact-id').value = '';
        document.getElementById('modal-contact-title').innerHTML = `<i class="fa-solid fa-address-book text-blue-500"></i> New Contact`;

        if (contactData) {
            document.getElementById('contact-id').value = contactData.id || '';
            document.getElementById('contact-name').value = contactData.name || '';
            document.getElementById('contact-email').value = contactData.email || '';
            document.getElementById('contact-phone').value = contactData.phone || '';
            document.getElementById('contact-company').value = contactData.company || '';
            document.getElementById('modal-contact-title').innerHTML = `<i class="fa-solid fa-pen text-blue-500"></i> Edit Contact`;
        }

        modal.classList.add('show');
        setTimeout(() => content.classList.remove('entering'), 10);
    },

    closeContactModal(options = {}) {
        if (window.crmCloseModalWithHistory && !options.skipHistory) {
            return window.crmCloseModalWithHistory(
                'modal-contact',
                () => this.closeContactModal({ ...options, skipHistory: true }),
                options
            );
        }

        const modal = document.getElementById('modal-contact');
        const content = document.getElementById('modal-contact-content');
        content.classList.add('entering');
        setTimeout(() => modal.classList.remove('show'), 300);
    },

    async saveContact() {
        const id = document.getElementById('contact-id').value;
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const company = document.getElementById('contact-company').value.trim();

        if (!name) {
            alert("Name is required.");
            return;
        }

        const docData = {
            name, email, phone, company,
            companyId: window.companyId,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            if (id) {
                await window.CrmApi.withRetry(() => window.db.collection('crm_contacts').doc(id).update(docData), 'Update Contact');
            } else {
                docData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await window.CrmApi.withRetry(() => window.db.collection('crm_contacts').add(docData), 'Create Contact');
            }
            this.closeContactModal();
            if (window.showToast) window.showToast("Contact saved!", "success");
        } catch (e) {
            alert("Error saving contact: " + e.message);
        }
    },

    listenToContacts() {
        if (this.unsubscribe) this.unsubscribe();

        // Contact directory will read from a dedicated 'crm_contacts' collection
        const q = window.db.collection('crm_contacts')
            .where('companyId', '==', window.companyId)
        // .orderBy('name', 'asc') // Exclude orderBy to prevent index requirement issues at launch

        this.unsubscribe = q.onSnapshot((snapshot) => {
            this.contacts = [];
            snapshot.forEach(doc => {
                this.contacts.push({ id: doc.id, ...doc.data() });
            });
            // Client side sort
            this.contacts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            this.renderContactsGrid();
            if (window.updateDashboardStats) window.updateDashboardStats();
        }, (error) => {
            console.error("[CRM Contacts] Error fetching contacts:", error);
        });
    },

    renderContactsGrid(searchTerm = '') {
        const grid = document.getElementById('contacts-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const filtered = this.contacts.filter(contact => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            return (contact.name && contact.name.toLowerCase().includes(term)) ||
                (contact.company && contact.company.toLowerCase().includes(term)) ||
                (contact.email && contact.email.toLowerCase().includes(term));
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="col-span-fulltext-center py-12 text-slate-500"><i class="fa-solid fa-address-book text-4xl mb-3 opacity-20 block"></i> No contacts found. Add your first client to start building relationships.</div>`;
            return;
        }

        filtered.forEach(contact => {
            const card = document.createElement('div');
            card.className = "rounded-xl p-5 transition-all group overflow-hidden relative cursor-pointer";
            card.style.cssText = `background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-md);`;
            card.onmouseover = function() { this.style.borderColor = 'var(--text-secondary)'; this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; };
            card.onmouseout = function() { this.style.borderColor = 'var(--border-color)'; this.style.transform = 'none'; this.style.boxShadow = 'var(--card-shadow)'; };

            card.addEventListener('click', () => {
                this.openContactModal(contact);
            });

            card.innerHTML = `
                <div class="relative z-10 flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style="background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary);">
                        ${contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-bold text-sm truncate pr-2" style="color: var(--text-primary);">${contact.name || 'Unknown'}</h4>
                        <p class="text-[10px] font-semibold uppercase tracking-wider mt-0.5 truncate" style="color: var(--text-secondary);">${contact.company || 'Independent'}</p>
                    </div>
                </div>
                
                <div class="mt-4 space-y-1.5 relative z-10">
                    <p class="text-xs flex items-center gap-2 truncate" style="color: var(--text-secondary);">
                        <i class="fa-solid fa-envelope w-4 text-center" style="opacity: 0.5;"></i>
                        <a href="mailto:${contact.email}" class="truncate" style="color: var(--text-primary);">${contact.email || '--'}</a>
                    </p>
                    <p class="text-xs flex items-center gap-2 truncate" style="color: var(--text-secondary);">
                        <i class="fa-solid fa-phone w-4 text-center" style="opacity: 0.5;"></i>
                        <a href="tel:${contact.phone}" class="truncate" style="color: var(--text-primary);">${contact.phone || '--'}</a>
                    </p>
                    ${contact.linkedProjectId ? `
                    <p class="text-[10px] mt-3 pt-3 font-bold flex items-center gap-1.5" style="border-top: 1px solid var(--border-color); color: #10b981;">
                        <i class="fa-solid fa-link"></i> Linked to Project
                    </p>
                    ` : ''}
                </div>
            `;
            grid.appendChild(card);
        });

        // Motion One Stagger Animation
        if (window.Motion && filtered.length > 0) {
            window.Motion.animate(
                grid.children,
                { opacity: [0, 1], scale: [0.95, 1] },
                { duration: 0.4, delay: window.Motion.stagger(0.03), easing: [0.22, 1, 0.36, 1] }
            );
        }
    },

    importFromGoogle(sync = false) {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then(async (result) => {
            const token = result.credential.accessToken;

            if (window.showToast) window.showToast("Successfully connected to Google. Fetching contacts...", "info");

            try {
                const response = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                const connections = data.connections;

                if (!connections || connections.length === 0) {
                    if (window.showToast) window.showToast("No contacts found in your Google account.", "warning");
                    return;
                }

                let newContacts = 0;
                let updatedContacts = 0;

                for (const person of connections) {
                    const crmContact = this._mapGoogleContactToCrmContact(person);

                    if (!crmContact.email) continue; // Skip contacts without email

                    const existingContact = this.contacts.find(c => c.email === crmContact.email);

                    if (existingContact) {
                        if (sync) {
                            // Update existing contact
                            await window.CrmApi.withRetry(() => window.db.collection('crm_contacts').doc(existingContact.id).update(crmContact), 'Update Contact');
                            updatedContacts++;
                        }
                    } else {
                        // Add new contact
                        await window.CrmApi.withRetry(() => window.db.collection('crm_contacts').add(crmContact), 'Create Contact');
                        newContacts++;
                    }
                }

                if (window.showToast) window.showToast(`Import complete! Added ${newContacts} new contacts and updated ${updatedContacts} contacts.`, "success");

            } catch (err) {
                console.error("Error fetching contacts:", err);
                if (window.showToast) window.showToast("Error fetching contacts. See console for details.", "error");
            }

        }).catch((error) => {
            console.error("Google Sign-In Error:", error);
            if (window.showToast) window.showToast("Google Sign-In Failed: " + error.message, "error");
        });
    },

    syncWithGoogle() {
        this.importFromGoogle(true);
    },

    _mapGoogleContactToCrmContact(googleContact) {
        const name = this._getPrimaryValue(googleContact.names, 'displayName');
        const email = this._getPrimaryValue(googleContact.emailAddresses, 'value');
        const phone = this._getPrimaryValue(googleContact.phoneNumbers, 'value');
        const company = this._getPrimaryValue(googleContact.organizations, 'name');

        const crmContact = {
            name: name || '',
            email: email || '',
            phone: phone || '',
            company: company || '',
            companyId: window.companyId,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        return crmContact;
    },

    _getPrimaryValue(field, valueKey) {
        if (!field || field.length === 0) {
            return null;
        }
        const primaryField = field.find(f => f.metadata.primary);
        return primaryField ? primaryField[valueKey] : field[0][valueKey];
    }
};
