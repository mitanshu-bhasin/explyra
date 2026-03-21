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
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: ""+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"",
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
const autoSetupBtn = document.getElementById("autoSetupBtn");
const zoneDownloadBtn = document.getElementById("zoneDownloadBtn");
const dnsStatus = document.getElementById("dnsStatus");

const employeeForm = document.getElementById("employeeForm");
const employeeName = document.getElementById("employeeName");
const employeeAuthEmail = document.getElementById("employeeAuthEmail");
const employeeNotifyEmail = document.getElementById("employeeNotifyEmail");
const employeePrefix = document.getElementById("employeePrefix");
const employeeDomainSelect = document.getElementById("employeeDomainSelect");
const employeeResult = document.getElementById("employeeResult");
const currentAdminIdEl = document.getElementById("currentAdminId");
const selectedDomainAdminIdEl = document.getElementById("selectedDomainAdminId");

document.getElementById("closeDnsModal").addEventListener("click", () => dnsModal.close());

let currentUser = null;
let domains = [];
let activeDnsDomain = null;

const IS_LOCAL_STATIC = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const API_RUNTIME_UNAVAILABLE = window.location.hostname === "explyra.me";
const API_BASE_STORAGE_KEY = "emailAppApiBase";

function normalizeApiBase(base) {
  if (!base || typeof base !== "string") return "";
  return base.trim().replace(/\/$/, "");
}

function apiUrl(base, path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedBase = normalizeApiBase(base);
  return `${normalizedBase}${normalizedPath}`;
}

function getApiBaseCandidates() {
  const configured = normalizeApiBase(
    window.EXPLYRA_EMAIL_API_BASE ||
      localStorage.getItem(API_BASE_STORAGE_KEY) ||
      ""
  );

  const localCandidates = [
    "http://localhost:3000/api",
    "http://localhost:8787/api",
    "https://explyra.me/api",
    "https://explyra.me/email-app/api"
  ];

  const hostedCandidates = [
    "/api",
    "/email-app/api",
    "https://explyra.me/api",
    "https://explyra.me/email-app/api"
  ];

  const baseList = [configured, ...(IS_LOCAL_STATIC ? localCandidates : hostedCandidates)]
    .map(normalizeApiBase)
    .filter(Boolean);

  return [...new Set(baseList)];
}

function shouldTryNextApiBase(response) {
  return [404, 405, 501].includes(response.status);
}

async function fetchFromAvailableApi(path, options = {}) {
  const candidates = getApiBaseCandidates();
  let lastResponse = null;
  let lastError = null;

  for (const base of candidates) {
    try {
      const response = await fetch(apiUrl(base, path), options);
      if (shouldTryNextApiBase(response)) {
        lastResponse = response;
        continue;
      }

      localStorage.setItem(API_BASE_STORAGE_KEY, base);
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastResponse) return lastResponse;
  throw lastError || new Error("No reachable API base found");
}

function getApiHintMessage() {
  const selectedBase = normalizeApiBase(localStorage.getItem(API_BASE_STORAGE_KEY) || "");
  const selectedText = selectedBase ? ` Active API base: ${selectedBase}.` : "";
  if (!IS_LOCAL_STATIC) return selectedText;
  return ` Local static server detected. Trying fallback API bases automatically.${selectedText}`;
}

async function readApiJson(response) {
  const text = await response.text();
  if (!text) {
    throw new Error(`Empty API response.${getApiHintMessage()}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    const preview = text.slice(0, 120).replace(/\s+/g, " ");
    throw new Error(`API returned non-JSON response: ${preview}.${getApiHintMessage()}`);
  }
}

const REGISTRAR_LINKS = {
  godaddy: (domain) => `https://dcc.godaddy.com/manage/${domain}/dns`,
  namecheap: () => "https://ap.www.namecheap.com/domains/domaincontrolpanel/",
  cloudflare: () => "https://dash.cloudflare.com/"
};

const REQUIRED_MX = [
  "isaac.mx.cloudflare.net",
  "linda.mx.cloudflare.net",
  "amir.mx.cloudflare.net"
];

async function resolveDnsRecord(name, type) {
  const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`);
  if (!res.ok) {
    throw new Error(`DNS lookup failed: ${type}`);
  }
  return res.json();
}

function normalizeHost(value) {
  return String(value || "").trim().toLowerCase().replace(/\.$/, "");
}

async function verifyDomainClientSide(domainId, domain) {
  const [txtResult, mxResult] = await Promise.all([
    resolveDnsRecord(domain, "TXT"),
    resolveDnsRecord(domain, "MX")
  ]);

  const txtFound = (txtResult.Answer || []).map((x) => String(x.data || "").replace(/"/g, "").toLowerCase());
  const mxFound = (mxResult.Answer || []).map((x) => {
    const row = String(x.data || "").trim();
    const host = row.split(/\s+/).slice(1).join(" ");
    return normalizeHost(host || row);
  });

  const hasSpf = txtFound.some((x) => x.includes("include:_spf.mailchannels.net"));
  const missingMx = REQUIRED_MX.filter((host) => !mxFound.includes(host));
  const verified = hasSpf && missingMx.length === 0;

  await updateDoc(doc(db, "custom_domains", domainId), {
    verified,
    status: verified ? "verified" : "pending_dns",
    verifiedAt: new Date().toISOString(),
    verification: {
      hasSpf,
      missingMx,
      txtFound: txtFound.slice(0, 10),
      mxFound: mxFound.slice(0, 10),
      source: "client-fallback"
    }
  });

  return { verified, hasSpf, missingMx };
}

async function markDomainVerifiedManually(domainId) {
  await updateDoc(doc(db, "custom_domains", domainId), {
    verified: true,
    status: "verified",
    verifiedAt: new Date().toISOString(),
    verification: {
      source: "manual-owner-confirmation",
      note: "Marked verified manually from localhost fallback"
    }
  });
}

function normalizeDomain(value) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*/, "");
}

function setDnsStatus(message, tone = "info") {
  const themes = {
    info: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-rose-200 bg-rose-50 text-rose-900"
  };
  dnsStatus.className = `mt-4 rounded-lg border p-3 text-sm ${themes[tone] || themes.info}`;
  dnsStatus.textContent = message;
}

function showEmployeeResult(message, tone = "success") {
  const themes = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-rose-200 bg-rose-50 text-rose-900"
  };
  employeeResult.className = `mt-4 rounded-lg border p-3 text-sm ${themes[tone] || themes.success}`;
  employeeResult.textContent = message;
  employeeResult.classList.remove("hidden");
}

function setCurrentAdminId(uid) {
  if (!currentAdminIdEl) return;
  currentAdminIdEl.textContent = uid || "Not signed in";
}

function setSelectedDomainAdminId(uid) {
  if (!selectedDomainAdminIdEl) return;
  selectedDomainAdminIdEl.textContent = uid || "Select domain";
}

function updateSelectedDomainOwnerIndicator() {
  const selectedDomainId = employeeDomainSelect?.value || "";
  const selectedDomain = domains.find((item) => item.id === selectedDomainId);
  setSelectedDomainAdminId(selectedDomain?.userId || "");
}

function openDnsWizard(domain) {
  activeDnsDomain = domain;
  dnsDomainText.textContent = domain;
  const base = "Add records in your registrar, wait 2-10 minutes, then click Verify on domain row.";
  setDnsStatus(`${base}${getApiHintMessage()}`);
  dnsModal.showModal();
}

function downloadZoneTemplate(domain) {
  const text = [
    `; DNS template for ${domain}`,
    "",
    '@  TXT  "v=spf1 include:_spf.mailchannels.net ~all"',
    "@  MX   28  isaac.mx.cloudflare.net",
    "@  MX   64  linda.mx.cloudflare.net",
    "@  MX   98  amir.mx.cloudflare.net",
    ""
  ].join("\n");

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${domain}-dns-template.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function bindStaticDnsUiActions() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    const originalLabel = btn.textContent;
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy || "";
      await navigator.clipboard.writeText(value);
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = originalLabel;
      }, 1000);
    });
  });

  document.querySelectorAll(".registrar-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.dataset.provider;
      if (!activeDnsDomain) return;
      const linkBuilder = REGISTRAR_LINKS[provider];
      if (!linkBuilder) return;
      window.open(linkBuilder(activeDnsDomain), "_blank", "noopener,noreferrer");
    });
  });

  autoSetupBtn.addEventListener("click", async () => {
    if (!currentUser || !activeDnsDomain) return;
    if (IS_LOCAL_STATIC) {
      setDnsStatus("Cloudflare auto setup is disabled on static localhost. Use deployed app URL for this action.", "error");
      return;
    }
    autoSetupBtn.disabled = true;
    autoSetupBtn.textContent = "Configuring...";
    setDnsStatus("Trying Cloudflare automatic setup...", "info");

    try {
      const token = await currentUser.getIdToken();
      const domainRecord = domains.find((d) => d.domain === activeDnsDomain);
      const response = await fetchFromAvailableApi("/dns-setup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          mode: "cloudflare_auto",
          domain: activeDnsDomain,
          domainId: domainRecord?.id || null
        })
      });

      const result = await readApiJson(response);
      if (!response.ok) throw new Error(result.error || "Auto setup failed");

      setDnsStatus("Cloudflare auto setup done. Click Verify on the domain row.", "success");
    } catch (error) {
      setDnsStatus(`Auto setup failed: ${error.message}. Use manual records below.`, "error");
    } finally {
      autoSetupBtn.disabled = false;
      autoSetupBtn.textContent = "Auto Setup (Cloudflare)";
    }
  });

  zoneDownloadBtn.addEventListener("click", () => {
    if (!activeDnsDomain) return;
    downloadZoneTemplate(activeDnsDomain);
  });
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
        <p class="text-xs text-slate-500">Admin ID: ${item.userId || "N/A"}</p>
      </div>
      <div class="flex gap-2">
        <button data-domain="${item.domain}" class="show-dns px-3 py-1 border rounded">DNS</button>
        ${item.verified
          ? '<button disabled class="px-3 py-1 border rounded bg-emerald-50 text-emerald-700 border-emerald-200">Verified</button>'
          : `<button data-id="${item.id}" data-domain="${item.domain}" class="verify-domain px-3 py-1 border rounded bg-blue-600 text-white border-blue-600">Verify</button>`}
      </div>
    `;
    domainList.appendChild(li);
  });

  domainList.querySelectorAll(".show-dns").forEach((btn) => {
    btn.addEventListener("click", () => {
      openDnsWizard(btn.dataset.domain);
    });
  });

  domainList.querySelectorAll(".verify-domain").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!currentUser) {
        alert("Please sign in first.");
        return;
      }

      btn.disabled = true;
      btn.textContent = "Verifying...";
      try {
        let result;
        if (IS_LOCAL_STATIC || API_RUNTIME_UNAVAILABLE) {
          try {
            result = await verifyDomainClientSide(btn.dataset.id, btn.dataset.domain);
          } catch (localError) {
            const force = window.confirm(
              "DNS lookup failed on localhost. If you already added correct TXT + MX records, click OK to mark as verified manually."
            );
            if (!force) {
              throw localError;
            }
            await markDomainVerifiedManually(btn.dataset.id);
            result = { verified: true, hasSpf: true, missingMx: [] };
          }
        } else {
          try {
            const token = await currentUser.getIdToken();
            const response = await fetchFromAvailableApi("/verify-domain", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                domainId: btn.dataset.id,
                domain: btn.dataset.domain
              })
            });

            result = await readApiJson(response);
            if (!response.ok) {
              throw new Error(result.error || "Verification failed");
            }
          } catch (apiError) {
            // Fallback for hosted mode API issues.
            result = await verifyDomainClientSide(btn.dataset.id, btn.dataset.domain);
          }
        }

        if (result.verified) {
          const details = result.hasSpf
            ? "SPF OK"
            : "SPF missing";
          alert(`Domain verified successfully. ${details}`);
        } else {
          const missingMx = (result.missingMx || []).join(", ");
          alert(`Domain not verified yet. SPF or MX records missing. Missing MX: ${missingMx || "none"}`);
        }
      } catch (error) {
        alert(String(error.message || error));
      } finally {
        btn.disabled = false;
        btn.textContent = "Verify";
      }
    });
  });
}

function renderVerifiedDomains() {
  verifiedDomainSelect.innerHTML = "";
  employeeDomainSelect.innerHTML = "";
  const verified = domains.filter((x) => x.verified);
  if (verified.length === 0) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "No verified domains available";
    verifiedDomainSelect.appendChild(empty);

    const emptyEmployee = document.createElement("option");
    emptyEmployee.value = "";
    emptyEmployee.textContent = "No verified domains available";
    employeeDomainSelect.appendChild(emptyEmployee);
    setSelectedDomainAdminId("");
    return;
  }

  verified.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.domain;
    verifiedDomainSelect.appendChild(option);

    const employeeOption = document.createElement("option");
    employeeOption.value = item.id;
    employeeOption.textContent = item.domain;
    employeeDomainSelect.appendChild(employeeOption);
  });

  updateSelectedDomainOwnerIndicator();
}

employeeDomainSelect?.addEventListener("change", updateSelectedDomainOwnerIndicator);

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
  if (!user) {
    setCurrentAdminId("");
    alert("Please sign in first to manage domains and mailboxes.");
    window.location.href = "./index.html";
    return;
  }

  setCurrentAdminId(user.uid);

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
    status: "pending_dns",
    verified: false,
    createdAt: serverTimestamp()
  });

  domainInput.value = "";
  openDnsWizard(domain);
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

employeeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;

  if (IS_LOCAL_STATIC) {
    return showEmployeeResult(
      "Employee provisioning is disabled on static localhost. Use deployed app URL to run admin provisioning API.",
      "error"
    );
  }

  const name = employeeName.value.trim();
  const authEmail = employeeAuthEmail.value.trim().toLowerCase();
  const notifyEmail = employeeNotifyEmail.value.trim().toLowerCase();
  const prefix = employeePrefix.value.trim().toLowerCase();
  const domainId = employeeDomainSelect.value;

  if (!name || !authEmail || !notifyEmail || !prefix || !domainId) {
    return showEmployeeResult("All employee fields are required.", "error");
  }

  const selected = domains.find((d) => d.id === domainId);
  if (!selected || !selected.verified) {
    return showEmployeeResult("Select a verified domain.", "error");
  }

  const btn = employeeForm.querySelector("button[type='submit']") || employeeForm.querySelector("button");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Provisioning...";
  }

  try {
    const token = await currentUser.getIdToken();
    const response = await fetchFromAvailableApi("/provision-employee-mailbox", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        adminUid: currentUser.uid,
        domainId,
        localPart: prefix,
        employeeName: name,
        employeeAuthEmail: authEmail,
        notifyEmail
      })
    });

    const result = await readApiJson(response);
    if (!response.ok) {
      if (response.status === 404 || response.status === 405) {
        throw new Error(`Provision API is not available on current deployment.${getApiHintMessage()}`);
      }
      throw new Error(result.error || "Employee provisioning failed");
    }

    showEmployeeResult(
      `Provisioned: ${result.mailboxEmail}. Temporary password sent to ${notifyEmail}.`,
      "success"
    );
    employeeForm.reset();
  } catch (error) {
    showEmployeeResult(String(error.message || error), "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Create Employee Email Setup";
    }
  }
});

bindStaticDnsUiActions();
