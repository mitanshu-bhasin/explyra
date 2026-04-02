import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// 1. Initialize Firebase (Unified Config)
const firebaseConfig = {
    apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
    authDomain: "explyras.firebaseapp.com",
    databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9",
    measurementId: "G-TFBZ5GZ22C"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const storage = firebase.storage();

// 2. AI Studio Config
const API_KEY = "AIzaSyBuaiiY1Ef7EyTB1Qtd1GS2xNT-Rkhhqp4";
const genAI = new GoogleGenerativeAI(API_KEY);

// State
let activeModel = "gemini-3-flash-preview"; 
let currentGem = "Expert AI Analyst";
let chatHistory = [];
let pendingFiles = [];

// DOM Elements (Consolidated)
const elements = {
    promptInput: document.getElementById('prompt-input'),
    sendBtn: document.getElementById('send-btn'),
    messagesContainer: document.getElementById('messages-container'),
    welcomeScreen: document.getElementById('welcome-screen'),
    sidebar: document.getElementById('sidebar'),
    toggleSidebar: document.getElementById('toggle-sidebar'),
    sidebarSettingsBtn: document.getElementById('sidebar-settings-btn'),
    settingsFlyout: document.getElementById('settings-flyout'),
    newChatBtn: document.getElementById('new-chat-btn'),
    uploadBtn: document.getElementById('upload-btn'),
    fileInput: document.getElementById('file-input'),
    fileChips: document.getElementById('attachment-previews'),
    modelSelector: document.getElementById('model-pill'),
    modelDropdown: document.getElementById('model-dropdown'),
    currentModelDisplay: document.getElementById('active-model-name'),
    canvasDrawer: document.getElementById('canvas-panel'),
    closeCanvas: document.getElementById('close-canvas'),
    canvasBody: document.getElementById('canvas-content'),
    chatCenter: document.getElementById('chat-center')
};

// Console logs for debugging in browser
console.log("Explyra Matrix Core Initiated.");

// --- Model Configuration ---
const availableModels = [
    { id: "gemini-3.1-pro-preview", name: "3.1 Pro", icon: "psychology" },
    { id: "gemini-3-flash-preview", name: "Flash 3", icon: "bolt", default: true },
    { id: "gemini-3.1-flash-lite-preview", name: "Flash-Lite", icon: "electric_bolt" },
    { id: "gemini-3.1-flash-image-preview", name: "Banana 2", icon: "image" },
    { id: "veo-3.1-generate-preview", name: "Veo 3.1", icon: "movie" }
];

const EXPLYRA_PERSONAS = {
    "Explyra AI - Idea & Problem Sol...": "You are the Explyra Elite Intelligence. Solve complex problems with deep expert reasoning and wit.",
    "Teacher": "You are a professional JEE and Theoretical Physics teacher. Explain using software development and Antigravity context.",
    "Expert AI Analyst": "You are a master AI analyst. Use multi-step planning and advanced reasoning."
};

/** UI INITIALIZATION **/

function init() {
    populateModelDropdown();
    attachListeners();
}

function populateModelDropdown() {
    if (!elements.modelDropdown) return;
    elements.modelDropdown.innerHTML = '';
    availableModels.forEach(m => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.style.cssText = "padding:12px 16px; cursor:pointer; color:#fff; border-bottom:1px solid rgba(255,255,255,0.05); transition:0.2s;";
        item.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px; vertical-align:middle; margin-right:8px;">${m.icon}</span> <strong>${m.name}</strong>`;
        item.onclick = (e) => { e.stopPropagation(); selectModel(m); };
        item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.1)';
        item.onmouseout = () => item.style.background = 'transparent';
        elements.modelDropdown.appendChild(item);
    });
}

function selectModel(m) {
    activeModel = m.id;
    elements.currentModelDisplay.innerText = m.name;
    elements.modelDropdown.style.display = 'none';
}

function attachListeners() {
    // Sidebar Toggle
    elements.toggleSidebar.onclick = (e) => {
        e.stopPropagation();
        elements.sidebar.classList.toggle('collapsed');
    };

    // Settings Flyout
    elements.sidebarSettingsBtn.onclick = (e) => {
        e.stopPropagation();
        elements.settingsFlyout.classList.toggle('active');
    };

    // Model Selector
    elements.modelSelector.onclick = (e) => {
        e.stopPropagation();
        const disp = elements.modelDropdown.style.display;
        elements.modelDropdown.style.display = disp === 'block' ? 'none' : 'block';
    };

    // Close Everything on Global Click
    document.addEventListener('click', (e) => {
        if (elements.settingsFlyout && !elements.settingsFlyout.contains(e.target)) {
            elements.settingsFlyout.classList.remove('active');
        }
        if (elements.modelDropdown && !elements.modelDropdown.contains(e.target)) {
            elements.modelDropdown.style.display = 'none';
        }
    });

    // New Chat
    elements.newChatBtn.onclick = () => {
        chatHistory = [];
        elements.messagesContainer.innerHTML = '';
        elements.welcomeScreen.style.display = 'flex';
        elements.canvasDrawer.classList.remove('active');
    };

    // File Upload
    elements.uploadBtn.onclick = () => elements.fileInput.click();
    elements.fileInput.onchange = handleFileUpload;

    // Send Button
    elements.sendBtn.onclick = handleSend;
    elements.promptInput.oninput = () => {
        elements.promptInput.style.height = 'auto';
        elements.promptInput.style.height = elements.promptInput.scrollHeight + 'px';
        elements.sendBtn.disabled = elements.promptInput.value.trim() === '' && pendingFiles.length === 0;
    };
    elements.promptInput.onkeyup = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) handleSend();
    };

    // Sidebar Category Clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = () => {
            const txt = item.querySelector('.text').innerText;
            if (EXPLYRA_PERSONAS[txt]) {
                currentGem = txt;
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        };
    });

    // Feature Pills Logic (Image/Code/Trends)
    document.querySelectorAll('.feature-pill').forEach(pill => {
        pill.onclick = () => {
            const prompt = pill.dataset.prompt;
            elements.promptInput.value = prompt;
            if (prompt.includes('Visualize') || prompt.includes('image')) {
                selectModel({id: "gemini-3.1-flash-image-preview", name: "Banana 2"});
            }
            handleSend();
        };
    });

    // Close Canvas
    elements.closeCanvas.onclick = () => elements.canvasDrawer.classList.remove('active');
}

/** FUNCTIONALITY **/

async function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    for (const file of files) {
        const chip = renderFileChip(file);
        try {
            const base64 = await fileToBase64(file);
            const url = await uploadToFirebase(file);
            pendingFiles.push({ name: file.name, type: file.type, data: base64, url: url });
            chip.style.opacity = '1';
            elements.sendBtn.disabled = false;
        } catch (err) {
            chip.style.borderColor = 'red';
            console.error("Upload Error", err);
        }
    }
}

function renderFileChip(file) {
    const chip = document.createElement('div');
    chip.style.cssText = "background:#1e1f20; border:1px solid #333; padding:8px 12px; border-radius:12px; font-size:12px; display:flex; align-items:center; gap:8px; opacity:0.5;";
    chip.innerHTML = `📄 <span>${file.name}</span> <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;" onclick="this.parentElement.remove()">close</span>`;
    elements.fileChips.appendChild(chip);
    return chip;
}

function fileToBase64(file) {
    return new Promise(r => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => r(reader.result.split(',')[1]);
    });
}

async function uploadToFirebase(file) {
    const ref = storage.ref(`attachments/${Date.now()}_${file.name}`);
    await ref.put(file);
    return await ref.getDownloadURL();
}

async function handleSend() {
    const text = elements.promptInput.value.trim();
    if (!text && pendingFiles.length === 0) return;

    elements.welcomeScreen.style.display = 'none';
    elements.promptInput.value = '';
    elements.sendBtn.disabled = true;

    const currentFiles = [...pendingFiles];
    pendingFiles = [];
    elements.fileChips.innerHTML = '';

    renderMessage('user', text, currentFiles);
    const aiMsgBox = renderMessage('ai', 'Matrix Planning...', []);

    try {
        const model = genAI.getGenerativeModel({ 
            model: activeModel,
            systemInstruction: EXPLYRA_PERSONAS[currentGem]
        });
        
        let parts = [{ text }];
        currentFiles.forEach(f => parts.push({ inlineData: { data: f.data, mimeType: f.type } }));

        if (activeModel.includes('image') || activeModel.includes('veo')) {
             aiMsgBox.innerHTML = '<span class="explyra-gradient">Rendering Matrix Output...</span>';
             const res = await model.generateContent({ contents: [{ role:'user', parts }] });
             const out = res.response.text();
             aiMsgBox.innerHTML = DOMPurify.sanitize(marked.parse(out));
             triggerCanvas(out, activeModel);
        } else {
            const chat = model.startChat({ history: chatHistory.slice(-10) });
            const result = await chat.sendMessageStream(parts);
            aiMsgBox.innerHTML = '';
            let fullText = "";
            for await (const chunk of result.stream) {
                fullText += chunk.text();
                aiMsgBox.innerHTML = DOMPurify.sanitize(marked.parse(fullText));
                elements.chatCenter.scrollTo(0, elements.chatCenter.scrollHeight);
            }
            if (fullText.includes('```')) triggerCanvas(fullText, 'code');
            chatHistory.push({ role:'user', parts: [{ text }] });
            chatHistory.push({ role:'model', parts: [{ text: fullText }] });
        }
    } catch (err) {
        aiMsgBox.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
    }
    elements.sendBtn.disabled = false;
}

function renderMessage(role, text, files) {
    const msg = document.createElement('div');
    msg.className = 'message';
    
    msg.innerHTML = `
        <div class="avatar ${role === 'user' ? 'user-avatar' : 'ai-avatar'}">
            ${role === 'user' ? 'M' : '<img src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif">'}
        </div>
        <div class="msg-text">
            ${text ? DOMPurify.sanitize(marked.parse(text)) : ''}
            <div class="media-box" style="display:flex; gap:10px; margin-top:12px;"></div>
            ${role === 'ai' ? `
                <div class="msg-actions">
                    <button class="material-symbols-outlined action-btn">thumb_up</button>
                    <button class="material-symbols-outlined action-btn">thumb_down</button>
                    <button class="material-symbols-outlined action-btn">content_copy</button>
                </div>` : ''}
        </div>
    `;

    if (files && files.length > 0) {
        const box = msg.querySelector('.media-box');
        files.forEach(f => {
            if (f.type.startsWith('image/')) {
                box.innerHTML += `<img src="${f.url}" style="max-height:160px; border-radius:12px;">`;
            } else {
                box.innerHTML += `<div style="background:#1e1f20; padding:10px; border-radius:12px; font-size:11px;">📄 ${f.name}</div>`;
            }
        });
    }

    elements.messagesContainer.appendChild(msg);
    elements.chatCenter.scrollTo(0, elements.chatCenter.scrollHeight);
    return msg.querySelector('.msg-text');
}

function triggerCanvas(text, type) {
    elements.canvasDrawer.classList.add('active');
    if (type === 'code' || text.includes('```')) {
        const code = text.match(/```([\s\S]*?)```/);
        elements.canvasBody.innerHTML = `<pre><code class="hljs">${hljs.highlightAuto(code ? code[1] : text).value}</code></pre>`;
    } else {
        elements.canvasBody.innerHTML = DOMPurify.sanitize(marked.parse(text));
    }
}

// Kickstart
init();
hljs.highlightAll();
