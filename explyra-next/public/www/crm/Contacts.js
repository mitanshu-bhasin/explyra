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

    openContactModal(contactData = null) {
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

        modal.classList.remove('hidden');
        setTimeout(() => content.classList.remove('opacity-0', 'scale-95'), 10);
    },

    closeContactModal() {
        const modal = document.getElementById('modal-contact');
        const content = document.getElementById('modal-contact-content');
        content.classList.add('opacity-0', 'scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
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
            card.className = "bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 hover:shadow-soft transition-all group overflow-hidden relative cursor-pointer";

            card.addEventListener('click', () => {
                this.openContactModal(contact);
            });

            card.innerHTML = `
                <div class="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
                
                <div class="relative z-10 flex items-start gap-4">
                    <div class="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-blue-500 font-bold text-lg flex-shrink-0">
                        ${contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-lg truncate pr-2">${contact.name || 'Unknown'}</h4>
                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5 truncate">${contact.company || 'Independent'}</p>
                    </div>
                </div>
                
                <div class="mt-5 space-y-2 relative z-10">
                    <p class="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 truncate">
                        <i class="fa-solid fa-envelope w-4 text-center text-slate-400"></i>
                        <a href="mailto:${contact.email}" class="hover:text-blue-500 hover:underline truncate">${contact.email || '--'}</a>
                    </p>
                    <p class="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 truncate">
                        <i class="fa-solid fa-phone w-4 text-center text-slate-400"></i>
                        <a href="tel:${contact.phone}" class="hover:text-blue-500 hover:underline truncate">${contact.phone || '--'}</a>
                    </p>
                    ${contact.linkedProjectId ? `
                    <p class="text-xs mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
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
    }
};
