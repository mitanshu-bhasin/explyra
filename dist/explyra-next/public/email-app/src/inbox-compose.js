import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: (window.EXPLYRA_CONFIG?.firebase?.apiKey || ""),
  authDomain: "explyras.firebaseapp.com",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

const OUTBOUND_WORKER_URL = "https://email-worker.mfskufgu.workers.dev";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const inboxList = document.getElementById("inboxList");
const emailView = document.getElementById("emailView");
const composeForm = document.getElementById("composeForm");
const fromSelect = document.getElementById("fromSelect");
const toEmailInput = document.getElementById("toEmail");
const subjectInput = document.getElementById("subject");
const htmlContentInput = document.getElementById("htmlContent");

let unsubscribers = [];
let inboxItems = [];

function clearSubscriptions() {
  unsubscribers.forEach((unsub) => unsub());
  unsubscribers = [];
  inboxItems = [];
  renderInbox();
}

function chunk(values, size) {
  const out = [];
  for (let i = 0; i < values.length; i += size) out.push(values.slice(i, i + size));
  return out;
}

function renderInbox() {
  inboxList.innerHTML = "";
  inboxItems
    .sort((a, b) => b.receivedAt - a.receivedAt)
    .forEach((item) => {
      const li = document.createElement("li");
      li.className = "border rounded-lg p-3 cursor-pointer hover:bg-slate-50";
      li.innerHTML = `
        <p class="font-medium truncate">${item.subject || "(No Subject)"}</p>
        <p class="text-xs text-slate-500 truncate">From: ${item.from}</p>
        <p class="text-xs text-slate-500 truncate">To: ${item.toEmail}</p>
      `;
      li.addEventListener("click", () => {
        const htmlBody = item.bodyHtml || `<pre>${item.bodyText || ""}</pre>`;
        emailView.innerHTML = `
          <p><strong>From:</strong> ${item.from}</p>
          <p><strong>To:</strong> ${item.toEmail}</p>
          <p><strong>Subject:</strong> ${item.subject}</p>
          <hr class="my-3">
          <div>${htmlBody}</div>
        `;
      });
      inboxList.appendChild(li);
    });
}

function subscribeInboxForMailboxEmails(mailboxEmails) {
  clearSubscriptions();
  if (mailboxEmails.length === 0) return;

  chunk(mailboxEmails, 10).forEach((group) => {
    const q = query(collection(db, "received_emails"), where("toEmail", "in", group));
    const unsub = onSnapshot(q, (snap) => {
      const nextMap = new Map(inboxItems.map((x) => [x.id, x]));
      snap.forEach((docItem) => {
        const d = docItem.data();
        nextMap.set(docItem.id, {
          id: docItem.id,
          from: d.from || "",
          toEmail: d.toEmail || "",
          subject: d.subject || "",
          bodyHtml: d.bodyHtml || "",
          bodyText: d.bodyText || "",
          receivedAt: d.receivedAt?.toDate ? d.receivedAt.toDate().getTime() : 0
        });
      });
      inboxItems = Array.from(nextMap.values());
      renderInbox();
    });
    unsubscribers.push(unsub);
  });
}

function setFromOptions(mailboxes) {
  fromSelect.innerHTML = "";
  if (mailboxes.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No custom mailbox found";
    fromSelect.appendChild(opt);
    return;
  }

  mailboxes.forEach((box) => {
    const opt = document.createElement("option");
    opt.value = box.email;
    opt.textContent = box.email;
    fromSelect.appendChild(opt);
  });
}

onAuthStateChanged(auth, (user) => {
  clearSubscriptions();
  if (!user) {
    alert("Please sign in first to open inbox and compose.");
    window.location.href = "./index.html";
    return;
  }

  const mailboxesQuery = query(collection(db, "mailboxes"), where("userId", "==", user.uid));
  onSnapshot(mailboxesQuery, (snap) => {
    const mailboxes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setFromOptions(mailboxes);
    subscribeInboxForMailboxEmails(mailboxes.map((x) => x.email));
  });
});

composeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    fromEmail: fromSelect.value,
    fromName: "Explyra Mail",
    toEmail: toEmailInput.value.trim(),
    subject: subjectInput.value.trim(),
    htmlContent: htmlContentInput.value
  };

  if (!payload.fromEmail || !payload.toEmail || !payload.subject || !payload.htmlContent) {
    return alert("All compose fields are required.");
  }

  const response = await fetch(OUTBOUND_WORKER_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    return alert(`Send failed: ${data.error || "Unknown error"}`);
  }

  alert("Email sent successfully.");
  toEmailInput.value = "";
  subjectInput.value = "";
  htmlContentInput.value = "";
});
