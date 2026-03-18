import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
  authDomain: "explyras.firebaseapp.com",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const addDomainForm = document.getElementById("addDomainForm");
const domainInput = document.getElementById("domainInput");
const domainList = document.getElementById("domainList");
const mailboxForm = document.getElementById("mailboxForm");
const prefixInput = document.getElementById("prefixInput");
const verifiedDomainSelect = document.getElementById("verifiedDomainSelect");
const mailboxList = document.getElementById("mailboxList");
const dnsModal = document.getElementById("dnsModal");
const dnsDomainText = document.getElementById("dnsDomainText");

document.getElementById("closeDnsModal").addEventListener("click", () => dnsModal.close());

let currentUser = null;
let domains = [];

function normalizeDomain(value) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*/, "");
}

function renderDomainList() {
  domainList.innerHTML = "";
  domains.forEach((item) => {
    const li = document.createElement("li");
    li.className = "border rounded-lg p-3 flex items-center justify-between";
    li.innerHTML = `
      <div>
        <p class="font-medium">${item.domain}</p>
        <p class="text-xs ${item.verified ? "text-emerald-600" : "text-amber-600"}">
          ${item.verified ? "Verified" : "Pending DNS verification"}
        </p>
      </div>
      <button data-domain="${item.domain}" class="show-dns px-3 py-1 border rounded">DNS</button>
    `;
    domainList.appendChild(li);
  });

  domainList.querySelectorAll(".show-dns").forEach((btn) => {
    btn.addEventListener("click", () => {
      dnsDomainText.textContent = btn.dataset.domain;
      dnsModal.showModal();
    });
  });
}

function renderVerifiedDomains() {
  verifiedDomainSelect.innerHTML = "";
  const verified = domains.filter((x) => x.verified);
  if (verified.length === 0) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "No verified domains available";
    verifiedDomainSelect.appendChild(empty);
    return;
  }

  verified.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.domain;
    verifiedDomainSelect.appendChild(option);
  });
}

function subscribeMailboxes(uid) {
  const q = query(collection(db, "mailboxes"), where("userId", "==", uid));
  onSnapshot(q, (snap) => {
    mailboxList.innerHTML = "";
    snap.forEach((docItem) => {
      const li = document.createElement("li");
      li.className = "border rounded-lg p-3";
      li.textContent = docItem.data().email;
      mailboxList.appendChild(li);
    });
  });
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (!user) return;

  const q = query(collection(db, "custom_domains"), where("userId", "==", user.uid));
  onSnapshot(q, (snap) => {
    domains = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    renderDomainList();
    renderVerifiedDomains();
  });

  subscribeMailboxes(user.uid);
});

addDomainForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return alert("Please sign in first.");

  const domain = normalizeDomain(domainInput.value);
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return alert("Please enter a valid domain.");
  }

  await addDoc(collection(db, "custom_domains"), {
    userId: currentUser.uid,
    domain,
    verified: false,
    createdAt: serverTimestamp()
  });

  domainInput.value = "";
  dnsDomainText.textContent = domain;
  dnsModal.showModal();
});

mailboxForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return alert("Please sign in first.");

  const prefix = prefixInput.value.trim().toLowerCase();
  const domainId = verifiedDomainSelect.value;
  const selected = domains.find((x) => x.id === domainId);

  if (!selected?.verified) {
    return alert("Select a verified domain.");
  }
  if (!/^[a-z0-9._%+-]+$/.test(prefix)) {
    return alert("Invalid mailbox prefix.");
  }

  const email = `${prefix}@${selected.domain}`;
  const existsQ = query(collection(db, "mailboxes"), where("email", "==", email));
  const existsSnap = await getDocs(existsQ);
  if (!existsSnap.empty) return alert("Mailbox already exists.");

  await addDoc(collection(db, "mailboxes"), {
    domainId,
    userId: currentUser.uid,
    email,
    createdAt: serverTimestamp()
  });

  prefixInput.value = "";
});
