// js/emp-vault.js
import { collection, query, where, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

window.personalData = [];
window.vaultUnsub = null;

window.fetchPersonalVault = () => {
    if (!window.currentUser || !window.userData) return;

    if (window.vaultUnsub) {
        window.vaultUnsub();
        window.vaultUnsub = null;
    }

    const list = document.getElementById('expenses-list');
    if (list) list.innerHTML = '<div class="text-center text-slate-400 mt-4"><i class="fa-solid fa-circle-notch fa-spin"></i> Syncing Vault...</div>';

    const db = window.db;
    const q = query(
        collection(db, "personal_vault"),
        where("uid", "==", window.currentUser.uid)
    );

    window.vaultUnsub = onSnapshot(q, (snapshot) => {
        window.personalData = [];
        let currentMonthUsed = 0;
        const now = new Date();
        const curM = now.getMonth();
        const curY = now.getFullYear();

        if (snapshot.empty) {
            window.renderPersonalList([]);
            window.updatePersonalStats(0);
            return;
        }

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const d = data.createdAt?.toDate ? data.createdAt.toDate() : (data.date ? new Date(data.date) : now);
            if (d.getMonth() === curM && d.getFullYear() === curY) {
                currentMonthUsed += parseFloat(data.price) || 0;
            }
            window.personalData.push({ id: docSnap.id, ...data });
        });

        window.personalData.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.date || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.date || 0);
            return dateB - dateA;
        });

        window.renderPersonalList(window.personalData);
        window.updatePersonalStats(currentMonthUsed);
    });
};

window.updatePersonalStats = (used) => {
    const el = document.getElementById('stat-personal-used');
    if (el) el.textContent = `₹${used.toLocaleString()}`;
};

window.renderPersonalList = (items) => {
    const list = document.getElementById('expenses-list');
    if (!list) return;
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = `<div class="text-center py-12">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                <i class="fa-solid fa-vault text-2xl"></i>
            </div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">Vault is empty</p>
        </div>`;
        return;
    }

    const categoryIcons = { 'Food': '🍔', 'Transport': '🚗', 'Shopping': '🛍️', 'Bills': '💡', 'Health': '💊', 'Entertainment': '🎬', 'Groceries': '🥛', 'Education': '📚', 'Other': '📦' };

    items.forEach(data => {
        const div = document.createElement('div');
        div.className = 'bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition group animate-[slideUp_0.1s] mb-3';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-xl shadow-inner">
                        ${categoryIcons[data.category] || '📦'}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm">${data.expenseName}</h4>
                        <p class="text-[10px] text-slate-500 mt-0.5"><i class="fa-regular fa-calendar"></i> ${data.date}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-xs font-bold text-slate-800 dark:text-slate-100">₹${(data.price || 0).toLocaleString()}</p>
                        <span class="text-[8px] uppercase font-bold text-slate-400">${data.category}</span>
                    </div>
                    <div class="flex flex-col gap-1 transition">
                        <button onclick="window.deletePersonalExpense('${data.id}')" class="w-6 h-6 rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center" title="Delete"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
};

window.createPersonalVaultEntry = () => {
    document.getElementById('modal-personal-create').classList.remove('hidden');
    document.getElementById('pv-name').value = '';
    document.getElementById('pv-description').value = '';
    document.getElementById('pv-line-items').innerHTML = '';
    document.getElementById('pv-running-total').textContent = '₹0';
    document.getElementById('pv-item-count').textContent = '0 items';
    window.addPvLineItem();
};

let pvItemCounter = 0;
window.addPvLineItem = () => {
    pvItemCounter++;
    const container = document.getElementById('pv-line-items');
    const row = document.createElement('div');
    row.id = `pv-item-${pvItemCounter}`;
    row.className = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 animate-[slideUp_0.2s] relative mb-2';
    row.innerHTML = `
        <button type="button" onclick="window.removePvLineItem('pv-item-${pvItemCounter}')" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center text-[9px] transition shadow-sm" title="Remove"><i class="fa-solid fa-xmark"></i></button>
        <div class="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
            <input type="text" placeholder="Item name" class="pv-item-name bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-700 dark:text-slate-200" required>
            <select class="pv-item-cat bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-700 dark:text-slate-200 w-24">
                <option value="Food">🍔 Food</option>
                <option value="Transport">🚗 Travel</option>
                <option value="Shopping">🛍️ Shop</option>
                <option value="Bills">💡 Bills</option>
                <option value="Health">💊 Health</option>
                <option value="Entertainment">🎬 Fun</option>
                <option value="Groceries">🥛 Grocery</option>
                <option value="Education">📚 Edu</option>
                <option value="Other">📦 Other</option>
            </select>
            <div class="relative">
                <span class="absolute left-2 top-2 text-slate-400 text-xs font-bold">₹</span>
                <input type="number" placeholder="0" class="pv-item-price bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 pl-5 text-xs text-slate-700 dark:text-slate-200 w-20" oninput="window.updatePvTotal()" required>
            </div>
        </div>
    `;
    container.appendChild(row);
    window.updatePvTotal();
};

window.removePvLineItem = (id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
    window.updatePvTotal();
};

window.updatePvTotal = () => {
    const prices = document.querySelectorAll('.pv-item-price');
    let total = 0;
    let count = 0;
    prices.forEach(p => {
        const val = parseFloat(p.value) || 0;
        if (val > 0) count++;
        total += val;
    });
    const totalEl = document.getElementById('pv-running-total');
    const countEl = document.getElementById('pv-item-count');
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString();
    if (countEl) countEl.textContent = count + ' item' + (count !== 1 ? 's' : '');
};

window.submitPersonalExpense = async (e) => {
    if (e) e.preventDefault();
    const btn = document.getElementById('btn-pv-submit');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...'; btn.disabled = true; }

    try {
        const name = document.getElementById('pv-name').value.trim();
        const description = document.getElementById('pv-description').value.trim();
        if (!name) throw new Error('Expense name is required.');

        const itemRows = document.querySelectorAll('#pv-line-items > div');
        const lineItems = [];
        let totalPrice = 0;
        itemRows.forEach(row => {
            const itemName = row.querySelector('.pv-item-name')?.value?.trim() || '';
            const itemCat = row.querySelector('.pv-item-cat')?.value || 'Other';
            const itemPrice = parseFloat(row.querySelector('.pv-item-price')?.value) || 0;
            if (itemName && itemPrice > 0) {
                lineItems.push({ name: itemName, category: itemCat, price: itemPrice });
                totalPrice += itemPrice;
            }
        });

        if (lineItems.length === 0) throw new Error('Add at least one item.');

        const catTotals = {};
        lineItems.forEach(i => { catTotals[i.category] = (catTotals[i.category] || 0) + i.price; });
        const primaryCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0][0];

        await addDoc(collection(window.db, "personal_vault"), {
            expenseName: name,
            description: description || '',
            category: primaryCategory,
            price: totalPrice,
            lineItems: lineItems,
            itemCount: lineItems.length,
            date: new Date().toISOString().split('T')[0],
            notes: description || '',
            uid: window.currentUser.uid, // Always personal
            createdAt: serverTimestamp()
        });

        window.showToast("Saved to personal vault!", "success");
        window.closeModal('modal-personal-create');
    } catch (err) {
        window.showToast(err.message, "error");
    } finally {
        if (btn) { btn.innerHTML = origHtml; btn.disabled = false; }
    }
};

window.deletePersonalExpense = async (id) => {
    if (await window.showInputPromise("Delete Personal Expense", "Remove this from your personal vault?", "", "none")) {
        try {
            await deleteDoc(doc(window.db, "personal_vault", id));
            window.showToast("Item removed from vault", "success");
        } catch (e) {
            window.showToast("Error deleting: " + e.message, "error");
        }
    }
};
