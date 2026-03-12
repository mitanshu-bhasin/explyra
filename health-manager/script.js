import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, collection, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIG: Logic to handle localhost or deployment environment
let firebaseConfig;
if (typeof __firebase_config !== 'undefined') {
    firebaseConfig = JSON.parse(__firebase_config);
} else {
        // Fallback to user provided config for local testing (Localhost)
        firebaseConfig = {
        apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
        authDomain: "mitanshusupport.firebaseapp.com",
        projectId: "mitanshusupport",
        storageBucket: "mitanshusupport.firebasestorage.app",
        messagingSenderId: "490917500459",
        appId: "1:490917500459:web:139ebcf55996d4a28f3c6e",
        measurementId: "G-SFPLDCXR66"
    };
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
if (err.code == 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
} else if (err.code == 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence');
}
});
import {signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

window.loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Logged in as:", result.user.displayName);
    } catch (error) {
        console.error("Auth Error:", error.message);
    }
};

document.getElementById('google-login-btn').addEventListener('click', loginWithGoogle);
// --- GLOBAL STATE ---
let FOOD_DB = [];
let EXERCISE_DB = []; // Will be loaded from CSV

// --- AI CONFIGURATION ---
const resolveGroqKey = window.resolveGroqKey || (() => {
    const metaKey = document.querySelector('meta[name="groq-api-key"]')?.content?.trim();
    return (
        window.__GROQ_API_KEY ||
        window.AI_CONFIG?.apiKey ||
        metaKey ||
        localStorage.getItem('explyra_groq_key') ||
        ''
    );
});

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const AI_MODEL = "llama-3.3-70b-versatile"; 
const getGroqApiKey = () => resolveGroqKey();

let currentUser = null;
let userProfile = null;
let todayData = null;
let activeFilter = 'all';
let activeExFilter = 'all'; // For Exercise Modal
let selectedFood = null;
let selectedExercise = null; // For Exercise Detail
let chatHistory = [];
let chatTimestamps = []; // For rate limiting
// NEW: Date State
let currentDate = new Date();
let unsubscribeLog = null; 

// --- NEW: Helper for Date ---
function getISODate(d) {
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - (offset*60*1000));
    return localDate.toISOString().split('T')[0];
}

// --- WEATHER & ENV SYSTEM ---
window.refreshWeather = () => initEnvironment(true);

async function initEnvironment(force = false) {
    const cityEl = document.getElementById('env-city');
    const locHeader = document.getElementById('header-location');
    
    if(!navigator.geolocation) {
        cityEl.innerText = "N/A";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        // 1. Get City Name (BigDataCloud Free API)
        try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const geoData = await geoRes.json();
            const city = geoData.locality || geoData.city || "Local Area";
            cityEl.innerText = city;
            locHeader.innerText = city.substring(0, 15);
        } catch(e) { console.error(e); }

        // 2. Fetch Weather & AQI (Open-Meteo)
        try {
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=uv_index_max&timezone=auto`;
            const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto`;

            const [wRes, aRes] = await Promise.all([fetch(weatherUrl), fetch(aqiUrl)]);
            const wData = await wRes.json();
            const aData = await aRes.json();

            updateEnvUI(wData, aData);
        } catch(e) {
            console.error("Weather Error", e);
            document.getElementById('env-advice').innerText = "Offline Mode: Stay hydrated.";
        }
    }, (err) => {
        cityEl.innerText = "Location Denied";
        locHeader.innerText = "Offline";
    });
}

function updateEnvUI(wData, aData) {
    const current = wData.current;
    const daily = wData.daily;
    const aqi = aData.current.us_aqi;

    // Temp & Condition
    document.getElementById('env-temp').innerText = Math.round(current.temperature_2m) + "°";
    document.getElementById('env-humid').innerText = current.relative_humidity_2m + "%";
    document.getElementById('env-wind').innerText = current.wind_speed_10m + "kph";
    document.getElementById('env-uv').innerText = daily.uv_index_max[0];
    document.getElementById('env-aqi').innerText = aqi;

    // AQI Color Logic
    const aqiEl = document.getElementById('env-aqi').parentElement;
    if(aqi <= 50) aqiEl.className = "bg-green-500/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-green-100 border border-green-500/30";
    else if(aqi <= 100) aqiEl.className = "bg-yellow-500/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-yellow-100 border border-yellow-500/30";
    else aqiEl.className = "bg-red-500/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-red-100 border border-red-500/30 animate-pulse";

    // Weather Icon & Desc Map
    const code = current.weather_code;
    let icon = "fa-cloud";
    let desc = "Cloudy";
    let advice = "";

    if(code === 0) { icon = "fa-sun"; desc = "Clear"; advice = "Great day for outdoor cardio!"; }
    else if(code <= 3) { icon = "fa-cloud-sun"; desc = "Partly Cloudy"; advice = "Perfect weather for a walk."; }
    else if(code <= 67) { icon = "fa-cloud-rain"; desc = "Rainy"; advice = "Indoor workout recommended."; }
    else if(code >= 95) { icon = "fa-bolt"; desc = "Storm"; advice = "Stay safe indoors."; }

    document.getElementById('weather-icon').innerHTML = `<i class="fa-solid ${icon} ${code===0?'pulse-slow':''}"></i>`;
    document.getElementById('env-condition').innerText = desc;

    // Smart Advice Engine
    if(aqi > 100) advice = "⚠️ Poor Air Quality. Wear a mask outside.";
    else if(daily.uv_index_max[0] > 7) advice = "☀️ High UV! Apply sunscreen.";
    else if(current.temperature_2m > 35) advice = "🔥 Heatwave! Drink extra water.";
    
    document.getElementById('env-advice').innerText = advice;
}


// --- 1. DATABASE LOADERS ---
async function loadFoodDatabase() {
    try {
        let csvText = "";
        try {
            const response = await fetch('food.csv');
            if (response.ok) csvText = await response.text();
            else throw new Error("No CSV");
        } catch(e) {
                // Simulated DB for demo purposes if file missing
                csvText = `Name,Group,Diet,State,Serving,Calories,Protein,Carbs,Fat,Fiber,Nutrients
Roti (Whole Wheat),Cereal,Veg,All,1 piece (40g),104,3,22,0.5,2.5,Iron
Brown Rice,Cereal,Veg,All,1 bowl (150g),166,3.5,34,1.2,2,Magnesium
Dal Tadka,Pulses,Veg,North,1 bowl (200g),180,9,20,6,5,Protein;Folate`;
        }
        
        const lines = csvText.split('\n');
        FOOD_DB = lines.slice(1).filter(line => line.trim() !== '').map((line, index) => {
            const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            if(cols.length < 5) return null;
            let gramWeight = null;
            const match = cols[4]?.match(/(\d+)\s*g/i);
            if (match) gramWeight = parseInt(match[1]);
            return {
                id: `csv_${index}`,
                name: cols[0],
                category: cols[1] || 'General',
                diet: cols[2] || 'Veg',
                state: cols[3] || 'All',
                serving: cols[4] || '1 serving',
                gramWeight: gramWeight,
                calories: parseFloat(cols[5]) || 0,
                protein: parseFloat(cols[6]) || 0,
                carbs: parseFloat(cols[7]) || 0,
                fat: parseFloat(cols[8]) || 0,
                fiber: parseFloat(cols[9]) || 0,
                nutrients: cols[10] ? cols[10].replace(/;/g, ',') : ''
            };
        }).filter(item => item !== null);
        return true;
    } catch (error) {
        console.error("DB Error:", error);
        return false;
    }
}

// --- NEW: Load Exercise CSV ---
async function loadExerciseDatabase() {
        try {
        let csvText = "";
        try {
            // Try fetching remote CSV
            const response = await fetch('ex.csv');
            if (response.ok) csvText = await response.text();
            else throw new Error("No CSV");
        } catch(e) {
            console.warn("Exercise CSV not found, using basic fallback.");
            // Basic fallback so app doesn't crash
            csvText = `ID,Exercise Name,Category,Equipment,Difficulty,MET Value,Description
1,Running (6mph),Cardio,None,Intermediate,9.8,Steady state running at a moderate pace.
2,Pushups,Strength,None,Beginner,3.8,Standard pushups.
3,Yoga,Yoga,Mat,Beginner,2.5,Basic Hatha yoga.`;
        }

        // ID,Exercise Name,Category,Equipment,Difficulty,MET Value,Description
        const lines = csvText.split('\n');
        EXERCISE_DB = lines.slice(1).filter(line => line.trim() !== '').map((line) => {
            // Handle commas inside quotes if any (basic regex)
            const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));
            if(cols.length < 6) return null;
            
            return {
                id: cols[0],
                name: cols[1],
                category: cols[2] || 'Cardio',
                equipment: cols[3] || 'None',
                difficulty: cols[4] || 'Beginner',
                met: parseFloat(cols[5]) || 1.0,
                description: cols[6] || ''
            };
        }).filter(item => item !== null);
        console.log("Loaded Exercises:", EXERCISE_DB.length);

        } catch(error) {
            console.error("Ex DB Error", error);
        }
}

// --- 2. AUTH & INIT ---
window.handleAuth = async (type) => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const errEl = document.getElementById('auth-error');
    
    // Allow anonymous login for demo if fields empty
    if(!email && !password) {
            await signInAnonymously(auth);
            return;
    }
    
    try {
        if (type === 'signup') await createUserWithEmailAndPassword(auth, email, password);
        else await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        errEl.querySelector('span').innerText = e.message.replace('Firebase:', '').trim();
        errEl.classList.remove('hidden');
    }
};

window.handleLogout = () => {
    if(confirm("Log out of HealthZen?")) signOut(auth);
};

onAuthStateChanged(auth, async (user) => {
    const loader = document.getElementById('global-loader');
    const statusEl = document.getElementById('loading-status');
    currentUser = user;

    if (user) {
        document.getElementById('auth-screen').classList.add('hidden');
        
        statusEl.innerText = "Loading Databases...";
        await Promise.all([loadFoodDatabase(), loadExerciseDatabase()]);
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            userProfile = userDoc.data();
            if(!userProfile.medicines) userProfile.medicines = [];
            // Ensure new fields exist
            if(userProfile.intimacyEnabled === undefined) userProfile.intimacyEnabled = false;
            if(userProfile.targetWeight === undefined) userProfile.targetWeight = null;
            if(userProfile.bodyFat === undefined) userProfile.bodyFat = null;
            
            initApp(user.uid);
            document.getElementById('app-screen').classList.remove('hidden');
            loader.classList.add('hidden');
            populateSettings();
            initEnvironment(); // Start Weather Service
        } else {
            document.getElementById('onboarding-screen').classList.remove('hidden');
            loader.classList.add('hidden');
        }
    } else {
        document.getElementById('app-screen').classList.add('hidden');
        document.getElementById('onboarding-screen').classList.add('hidden');
        document.getElementById('auth-screen').classList.remove('hidden');
        loader.classList.add('hidden');
    }
});

// --- 3. CORE LOGIC (Refactored for Date Switch) ---

window.changeDate = (days) => {
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    if(currentUser) initApp(currentUser.uid); // Fetch data for new date
}

function updateDateDisplay() {
    const today = new Date();
    const dateStr = getISODate(currentDate);
    const todayStr = getISODate(today);
    
    const displayEl = document.getElementById('current-date-display');
    
    if(dateStr === todayStr) {
        displayEl.innerText = "Today";
        displayEl.className = "font-bold text-slate-900 text-sm";
    } else {
        // Show relative days or date
        const diffTime = Math.abs(today - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        displayEl.innerText = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        displayEl.className = "font-bold text-indigo-600 text-sm";
    }
}

function initApp(uid) {
    // Unsubscribe from previous listener if exists
    if(unsubscribeLog) {
        unsubscribeLog();
        unsubscribeLog = null;
    }

    const dateStr = getISODate(currentDate);
    const logRef = doc(db, "users", uid, "logs", dateStr);
    
    unsubscribeLog = onSnapshot(logRef, (snap) => {
        if (snap.exists()) {
            todayData = snap.data();
        } else {
            // Create doc if today, else just show empty for history
            const todayStr = getISODate(new Date());
            const emptyData = { foods: [], exercises: [], water: 0, bp: [], heartRate: [], medicinesTaken: [], intimacy: 0 };
            
            if (dateStr === todayStr) {
                setDoc(logRef, emptyData);
                todayData = emptyData;
            } else {
                // Viewing past/future date that has no data
                todayData = emptyData;
            }
        }
        updateUI();
        renderMedicineChecklist();
        calculateBMI(); // Update BMI on init
    });
}

// --- NEW: AUTO BMI CALCULATION ---
function calculateBMI() {
    if(!userProfile || !userProfile.height || !userProfile.weight) return;
    
    const h = userProfile.height / 100; // convert cm to m
    const w = userProfile.weight;
    const bmi = (w / (h * h)).toFixed(1);
    
    const bmiValEl = document.getElementById('bmi-value');
    const bmiBadge = document.getElementById('bmi-badge');
    
    if(bmiValEl) bmiValEl.innerText = bmi;
    
    // Logic for Category
    let cat = "Normal";
    let colorClass = "bg-green-100 text-green-600";
    let bars = [0.3, 0.3, 0.3, 0.3]; // opacity

    if (bmi < 18.5) {
        cat = "Underweight";
        colorClass = "bg-blue-100 text-blue-600";
        document.getElementById('bmi-bar-1').style.opacity = '1';
    } else if (bmi >= 18.5 && bmi < 25) {
        cat = "Healthy";
        colorClass = "bg-green-100 text-green-600";
        document.getElementById('bmi-bar-2').style.opacity = '1';
    } else if (bmi >= 25 && bmi < 30) {
        cat = "Overweight";
        colorClass = "bg-yellow-100 text-yellow-600";
        document.getElementById('bmi-bar-3').style.opacity = '1';
    } else {
        cat = "Obese";
        colorClass = "bg-red-100 text-red-600";
        document.getElementById('bmi-bar-4').style.opacity = '1';
    }
    
    if(bmiBadge) {
        bmiBadge.innerText = cat;
        bmiBadge.className = `px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${colorClass}`;
    }
}


// --- NEW: SUPPORT BUTTON ---
window.openSupport = () => {
    window.open('https://mitanshusupport.netlify.app', '_blank');
};

window.saveUserProfile = async (e, isOnboarding) => {
    e.preventDefault();
    const prefix = isOnboarding ? 'ob-' : 'set-';
    const p = {
        name: document.getElementById(prefix + 'name').value,
        age: +document.getElementById(prefix + 'age').value,
        gender: isOnboarding ? document.getElementById('ob-gender').value : userProfile.gender,
        height: +document.getElementById(prefix + 'height').value,
        weight: +document.getElementById(prefix + 'weight').value,
        goal: document.getElementById(prefix + 'goal').value,
        activity: +document.getElementById(prefix + 'activity').value,
        // New Fields
        diet: document.getElementById(prefix + 'diet').value,
        sleep: document.getElementById(prefix + 'sleep').value,
        condition: document.getElementById(prefix + 'condition').value,
        medicines: userProfile?.medicines || [],
        // Advanced Body Metrics
        targetWeight: document.getElementById(prefix + 'target-weight') ? +document.getElementById(prefix + 'target-weight').value : null,
        bodyFat: document.getElementById(prefix + 'body-fat') ? +document.getElementById(prefix + 'body-fat').value : null,
        // Intimacy Tracker Setting
        intimacyEnabled: document.getElementById('set-intimacy') ? document.getElementById('set-intimacy').checked : false
    };

    let bmr = (10 * p.weight) + (6.25 * p.height) - (5 * p.age) + (p.gender === 'male' ? 5 : -161);
    let tdee = bmr * p.activity;
    p.targetCalories = Math.round(tdee + (p.goal === 'loss' ? -500 : p.goal === 'gain' ? 500 : 0));
    p.tdee = Math.round(tdee);
    
    // Clear AI Plan if profile significantly changes
    p.aiPlan = null; 

    await setDoc(doc(db, "users", currentUser.uid), p, { merge: true });
    
    if(isOnboarding) window.location.reload();
    else {
        alert("Profile Updated Successfully!");
        userProfile = p;
        calculateBMI(); // Recalculate immediately
        updateUI();
        
        // Intimacy UI Handling
        const navIntimacy = document.getElementById('nav-intimacy');
        if(p.intimacyEnabled) {
            navIntimacy.classList.remove('hidden');
        } else {
            navIntimacy.classList.add('hidden');
            // If user was on Intimacy tab, kick them to dashboard
            if(!document.getElementById('view-intimacy').classList.contains('hidden')) {
                switchTab('dashboard');
            }
        }
        
        switchTab('dashboard');
    }
};

function populateSettings() {
    document.getElementById('set-email').value = currentUser.email || "Guest User";
    document.getElementById('set-name').value = userProfile.name;
    document.getElementById('set-age').value = userProfile.age;
    document.getElementById('set-height').value = userProfile.height;
    document.getElementById('set-weight').value = userProfile.weight;
    document.getElementById('set-goal').value = userProfile.goal;
    document.getElementById('set-activity').value = userProfile.activity;
    
    // Advanced Fields
    if(userProfile.diet) document.getElementById('set-diet').value = userProfile.diet;
    if(userProfile.sleep) document.getElementById('set-sleep').value = userProfile.sleep;
    if(userProfile.condition) document.getElementById('set-condition').value = userProfile.condition;
    if(userProfile.targetWeight) document.getElementById('set-target-weight').value = userProfile.targetWeight;
    if(userProfile.bodyFat) document.getElementById('set-body-fat').value = userProfile.bodyFat;
    
    // Intimacy Toggle
    const toggle = document.getElementById('set-intimacy');
    if(toggle) toggle.checked = userProfile.intimacyEnabled || false;
    
    const navIntimacy = document.getElementById('nav-intimacy');
    if(userProfile.intimacyEnabled) navIntimacy.classList.remove('hidden');
    else navIntimacy.classList.add('hidden');

    renderMedicineSettingsList();
}

// --- NEW: VOICE & LOG MENU LOGIC ---

// Voice State
let isMuted = false;
let recognition = null;
let synth = window.speechSynthesis;

// Init Recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chat-input').value = transcript;
        stopVoiceInput();
        // Optional: Auto submit
        // handleChatSubmit(new Event('submit'));
    };
    recognition.onerror = (event) => stopVoiceInput();
    recognition.onend = () => stopVoiceInput();
}

window.toggleVoiceInput = () => {
    if(!recognition) { alert("Voice not supported in this browser"); return; }
    const btn = document.getElementById('mic-btn');
    if(btn.classList.contains('text-red-500')) {
        stopVoiceInput();
    } else {
        recognition.start();
        btn.classList.add('text-red-500', 'animate-pulse');
        btn.innerHTML = '<i class="fa-solid fa-stop"></i>';
    }
};

function stopVoiceInput() {
    const btn = document.getElementById('mic-btn');
    if(recognition) recognition.stop();
    btn.classList.remove('text-red-500', 'animate-pulse');
    btn.classList.add('text-slate-400');
    btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
}

window.toggleMute = () => {
    isMuted = !isMuted;
    const btn = document.getElementById('mute-btn');
    const icon = btn.querySelector('i');
    if(isMuted) {
        icon.className = 'fa-solid fa-volume-xmark';
        btn.classList.add('text-red-400');
        if(synth) synth.cancel();
    } else {
        icon.className = 'fa-solid fa-volume-high';
        btn.classList.remove('text-red-400');
    }
};

function speakText(text) {
    if(isMuted || !synth) return;
    // Clean markdown
    const cleanText = text.replace(/[*_#`]/g, ''); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    // Select voice if available
    const voices = synth.getVoices();
    const prefVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Google')) || voices[0];
    if(prefVoice) utterance.voice = prefVoice;
    utterance.rate = 1.1;
    synth.speak(utterance);
}

window.openLogMenu = () => {
    document.getElementById('log-menu-modal').classList.remove('hidden');
};

// --- CHAT LOGIC (Updated with RATE LIMIT & Advanced Context) ---
window.handleChatSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    // RATE LIMIT CHECK
    const now = Date.now();
    // Filter out timestamps older than 60 seconds
    chatTimestamps = chatTimestamps.filter(t => now - t < 60000);
    
    if(chatTimestamps.length >= 2) {
        const waitTime = Math.ceil((60000 - (now - chatTimestamps[0])) / 1000);
        appendMessage('ai', `⚠️ **Trial Limit Reached:** You can only send 2 messages per minute in this free version. Please wait ${waitTime} seconds.`);
        speakText("Limit reached. Please wait.");
        return;
    }
    
    // Add current timestamp
    chatTimestamps.push(now);

    appendMessage('user', text);
    input.value = '';
    
    const container = document.getElementById('chat-messages');
    container.scrollTop = container.scrollHeight;

    await fetchChatResponse(text);
};

function appendMessage(role, text) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'flex gap-3 ' + (role === 'user' ? 'flex-row-reverse' : '');
    
    if (role === 'ai') {
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0 mt-1">AI</div>
            <div class="chat-ai p-3 text-sm max-w-[85%] prose">${marked.parse(text)}
                <button onclick="speakText('${text.replace(/'/g, "\\'")}')" class="ml-2 text-slate-400 hover:text-purple-600 text-xs"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `;
    } else {
        div.innerHTML = `
            <div class="chat-user p-3 text-sm max-w-[85%]">${text}</div>
        `;
    }
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

async function fetchChatResponse(userText) {
    const container = document.getElementById('chat-messages');
    
    // Add Loading Bubble
    const loadingId = 'loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = 'flex gap-3';
    loadingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0 mt-1">AI</div>
        <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm text-sm text-slate-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
        </div>
    `;
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        // Construct Context with MEDICINE list & Advanced Body Stats
        const medList = userProfile.medicines && userProfile.medicines.length > 0 
            ? userProfile.medicines.map(m => `${m.name} (${m.time})`).join(', ') 
            : "None";

        const systemPrompt = `
            You are an expert AI Health Coach for HealthZen Pro.
            User Profile:
            - Name: ${userProfile.name}
            - Age: ${userProfile.age}, Gender: ${userProfile.gender}
            - Weight: ${userProfile.weight}kg, Height: ${userProfile.height}cm
            - Target Weight: ${userProfile.targetWeight || 'Not Set'}kg
            - Body Fat: ${userProfile.bodyFat || 'Not Set'}%
            - Goal: ${userProfile.goal} (Loss/Gain/Maintain)
            - Activity Level: ${userProfile.activity}
            - Conditions: ${userProfile.condition}
            - Diet Pref: ${userProfile.diet}
            - Current Medicines: ${medList}
            
            Instructions:
            1. Provide short, actionable advice.
            2. If asked for a plan, generate a detailed 1-day meal or workout plan.
            3. Be encouraging but medically safe.
            4. Use formatting (bold, lists) for readability.
            5. NOTE: This is a costly app provided on a free trial. If asked about features, mention this is a "Premium Beta".
        `;

        const messages = [
            { role: "system", content: systemPrompt },
            ...chatHistory.slice(-5), // Keep last 5 messages for context
            { role: "user", content: userText }
        ];

        const groqKey = getGroqApiKey();
        if (!groqKey) {
            document.getElementById(loadingId).remove();
            appendMessage('ai', "AI coach is disabled because no API key is configured. Provide window.__GROQ_API_KEY, set window.AI_CONFIG.apiKey, add a <meta name=\"groq-api-key\"> tag, or store 'explyra_groq_key' in local storage.");
            return;
        }

        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!response.ok) throw new Error("AI Busy");

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        // Update History
        chatHistory.push({ role: "user", content: userText });
        chatHistory.push({ role: "assistant", content: aiText });

        // Remove loading and show message
        document.getElementById(loadingId).remove();
        appendMessage('ai', aiText);
        
        // Speak response
        speakText(aiText);

    } catch (error) {
        console.error(error);
        document.getElementById(loadingId).remove();
        appendMessage('ai', "⚠️ Connection error. Please try again.");
    }
}

// --- NEW: AI HEALTH PLAN GENERATOR (MODAL LOGIC) ---

window.renderHealthPlan = () => {
    const container = document.getElementById('plan-content');
    const loader = document.getElementById('ai-loading');
    
    // If user already has a generated plan, display it.
    if(userProfile.aiPlan) {
        loader.classList.add('hidden');
        displayAIPlan(userProfile.aiPlan);
    } else {
        // No plan exists, generate one automatically
        loader.classList.remove('hidden');
        container.innerHTML = ''; 
        container.appendChild(loader);
        generateAIPlan();
    }
};

window.generateAIPlan = async (force = false) => {
    const container = document.getElementById('plan-content');
    const loader = document.getElementById('ai-loading');
    
    if(force) {
        container.innerHTML = '';
        container.appendChild(loader);
        loader.classList.remove('hidden');
    }

    try {
        // Construct the Prompt for the AI
        const prompt = `
            You are a world-class certified fitness coach and nutritionist.
            Create a hyper-personalized daily protocol for this user:
            - Age: ${userProfile.age}, Gender: ${userProfile.gender}
            - Stats: ${userProfile.height}cm, ${userProfile.weight}kg
            - Target Weight: ${userProfile.targetWeight || 'N/A'}kg
            - Body Fat: ${userProfile.bodyFat || 'N/A'}%
            - Activity Level: ${userProfile.activity} (1.2=Sedentary, 1.9=Athlete)
            - Goal: ${userProfile.goal}
            - Dietary Preference: ${userProfile.diet}
            - Sleep: ${userProfile.sleep} hours/night
            - Medical Condition: ${userProfile.condition}

            Provide a JSON response with strict adherence to this schema (no markdown formatting, just raw JSON):
            {
                "calories": { "breakfast": number, "lunch": number, "snack": number, "dinner": number },
                "meals": { 
                    "breakfast": "Name + short desc", 
                    "lunch": "Name + short desc", 
                    "snack": "Name + short desc", 
                    "dinner": "Name + short desc" 
                },
                "workout": "Specific workout name and duration (e.g. 30 min HIIT)",
                "habits": ["habit 1", "habit 2", "habit 3"],
                "note": "Short motivational quote or medical tip"
            }
        `;

        const groqKey = getGroqApiKey();
        if (!groqKey) {
            loader.classList.add('hidden');
            container.innerHTML = '<p class="text-center text-gray-500">AI plan generation is disabled: configure window.__GROQ_API_KEY, window.AI_CONFIG.apiKey, a groq-api-key meta tag, or localStorage key.</p>';
            return;
        }

        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [
                    { role: "system", content: "You are a health API that outputs only valid JSON." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1024,
                response_format: { type: "json_object" } // Force JSON
            })
        });

        if(!response.ok) throw new Error("AI Service Busy");
        
        const data = await response.json();
        const plan = JSON.parse(data.choices[0].message.content);

        // Save to Firestore so we don't pay for regeneration every time
        await updateDoc(doc(db, "users", currentUser.uid), { aiPlan: plan });
        userProfile.aiPlan = plan;
        
        displayAIPlan(plan);

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="text-center p-4 text-red-500">
                <i class="fa-solid fa-triangle-exclamation text-3xl mb-2"></i>
                <p class="text-sm">Could not generate plan. Please try again.</p>
                <button onclick="generateAIPlan(true)" class="mt-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-xs font-bold">Retry</button>
            </div>
        `;
    }
};

function displayAIPlan(plan) {
    const container = document.getElementById('plan-content');
    
    container.innerHTML = `
        <div class="space-y-4 fade-in">
            <!-- Calorie Split -->
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 text-indigo-100 text-6xl"><i class="fa-solid fa-chart-pie"></i></div>
                <h4 class="font-bold text-indigo-900 mb-2 relative z-10 text-xs uppercase tracking-wide">Daily Targets</h4>
                <div class="grid grid-cols-4 gap-2 relative z-10 text-center">
                        <div class="bg-white/60 rounded-lg p-2">
                        <div class="text-[10px] text-indigo-400 font-bold">Bkfast</div>
                        <div class="font-bold text-indigo-700">${plan.calories.breakfast}</div>
                        </div>
                        <div class="bg-white/60 rounded-lg p-2">
                        <div class="text-[10px] text-indigo-400 font-bold">Lunch</div>
                        <div class="font-bold text-indigo-700">${plan.calories.lunch}</div>
                        </div>
                        <div class="bg-white/60 rounded-lg p-2">
                        <div class="text-[10px] text-indigo-400 font-bold">Snack</div>
                        <div class="font-bold text-indigo-700">${plan.calories.snack}</div>
                        </div>
                        <div class="bg-white/60 rounded-lg p-2">
                        <div class="text-[10px] text-indigo-400 font-bold">Dinner</div>
                        <div class="font-bold text-indigo-700">${plan.calories.dinner}</div>
                        </div>
                </div>
            </div>

            <!-- Meal Suggestions -->
            <div class="space-y-2">
                <h4 class="font-bold text-slate-800 text-sm pl-1">Chef's Selection</h4>
                <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div class="flex gap-3 items-start border-b border-slate-50 pb-2">
                        <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0 text-xs"><i class="fa-solid fa-mug-hot"></i></div>
                        <div><p class="text-xs font-bold text-slate-700 uppercase">Breakfast</p><p class="text-sm text-slate-600">${plan.meals.breakfast}</p></div>
                    </div>
                    <div class="flex gap-3 items-start border-b border-slate-50 pb-2">
                        <div class="w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0 text-xs"><i class="fa-solid fa-bowl-rice"></i></div>
                        <div><p class="text-xs font-bold text-slate-700 uppercase">Lunch</p><p class="text-sm text-slate-600">${plan.meals.lunch}</p></div>
                    </div>
                    <div class="flex gap-3 items-start">
                        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0 text-xs"><i class="fa-solid fa-utensils"></i></div>
                        <div><p class="text-xs font-bold text-slate-700 uppercase">Dinner</p><p class="text-sm text-slate-600">${plan.meals.dinner}</p></div>
                    </div>
                </div>
            </div>

            <!-- Workout -->
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div class="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                <h4 class="font-bold text-xs uppercase text-slate-400 mb-1">Today's Training</h4>
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-dumbbell text-2xl text-white"></i>
                    <p class="font-bold text-lg leading-tight">${plan.workout}</p>
                </div>
            </div>

            <!-- Habits -->
            <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h4 class="font-bold text-slate-800 mb-2 text-sm">Daily Protocol</h4>
                <ul class="text-sm text-slate-600 space-y-2">
                    ${plan.habits.map(h => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-green-500 mt-1 text-xs"></i> <span>${h}</span></li>`).join('')}
                </ul>
            </div>

            <!-- Note -->
            <div class="bg-purple-50 p-3 rounded-xl border border-purple-100 flex gap-3 items-center">
                <i class="fa-solid fa-quote-left text-purple-300 text-xl"></i>
                <p class="text-xs text-purple-800 italic font-medium">"${plan.note}"</p>
            </div>
        </div>
    `;
}

// --- 4. ADVANCED FOOD LOGIC ---
window.openFoodDetail = (foodId) => {
    selectedFood = FOOD_DB.find(f => f.id === foodId);
    if(!selectedFood) return;

    document.getElementById('food-search-container').classList.add('hidden');
    document.getElementById('food-filters').classList.add('hidden');
    document.getElementById('food-list').classList.add('hidden');
    document.getElementById('food-detail-view').classList.remove('hidden');
    document.getElementById('back-food-btn').classList.remove('hidden');

    document.getElementById('fd-name').innerText = selectedFood.name;
    document.getElementById('fd-serving').innerText = `Serving: ${selectedFood.serving}`;
    
    const dietBadge = document.getElementById('fd-diet');
    if(selectedFood.diet === 'Non-Veg') {
        dietBadge.className = "text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-700 uppercase";
        dietBadge.innerText = "NON-VEG";
    } else {
        dietBadge.className = "text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700 uppercase";
        dietBadge.innerText = "VEG";
    }

    const nutBox = document.getElementById('fd-nutrients-box');
    const nutContainer = document.getElementById('fd-nutrients');
    nutContainer.innerHTML = '';
    
    if(selectedFood.nutrients && selectedFood.nutrients.trim() !== '') {
        nutBox.classList.remove('hidden');
        selectedFood.nutrients.split(',').forEach(nut => {
            const span = document.createElement('span');
            span.className = "bg-purple-50 text-purple-600 border border-purple-100 text-xs px-2 py-1 rounded-lg font-medium shadow-sm";
            span.innerText = nut.trim();
            nutContainer.appendChild(span);
        });
    } else {
        nutBox.classList.add('hidden');
    }

    const gramOpt = document.getElementById('opt-gram');
    if(selectedFood.gramWeight) {
        gramOpt.disabled = false;
        gramOpt.innerText = `Grams (1 srv = ${selectedFood.gramWeight}g)`;
    } else {
        gramOpt.disabled = true;
        gramOpt.innerText = "Grams (N/A)";
    }
    
    document.querySelector('input[name="mealType"][value="Breakfast"]').checked = true;
    document.getElementById('fd-unit').value = 'serving';
    document.getElementById('fd-qty').value = 1;
    calcFoodTotals();
};

window.backToFoodList = () => {
    document.getElementById('food-detail-view').classList.add('hidden');
    document.getElementById('back-food-btn').classList.add('hidden');
    document.getElementById('food-search-container').classList.remove('hidden');
    document.getElementById('food-filters').classList.remove('hidden');
    document.getElementById('food-list').classList.remove('hidden');
};

window.calcFoodTotals = () => {
    if(!selectedFood) return;
    const qty = parseFloat(document.getElementById('fd-qty').value) || 0;
    const unit = document.getElementById('fd-unit').value;
    let multiplier = qty;
    if(unit === 'gram' && selectedFood.gramWeight) multiplier = qty / selectedFood.gramWeight;

    document.getElementById('fd-cal').innerText = Math.round(selectedFood.calories * multiplier);
    document.getElementById('fd-pro').innerText = (selectedFood.protein * multiplier).toFixed(1) + 'g';
    document.getElementById('fd-carb').innerText = (selectedFood.carbs * multiplier).toFixed(1) + 'g';
    document.getElementById('fd-fat').innerText = (selectedFood.fat * multiplier).toFixed(1) + 'g';
};

window.confirmAddFood = async () => {
    if(!selectedFood) return;
    const qty = parseFloat(document.getElementById('fd-qty').value) || 0;
    const unit = document.getElementById('fd-unit').value;
    const mealType = document.querySelector('input[name="mealType"]:checked').value;
    let multiplier = qty;
    let displayQty = `${qty} serving(s)`;
    if(unit === 'gram' && selectedFood.gramWeight) {
        multiplier = qty / selectedFood.gramWeight;
        displayQty = `${qty}g`;
    }

    const foodLog = {
        ...selectedFood,
        logId: Date.now(),
        mealType: mealType,
        calories: Math.round(selectedFood.calories * multiplier),
        protein: parseFloat((selectedFood.protein * multiplier).toFixed(1)),
        carbs: parseFloat((selectedFood.carbs * multiplier).toFixed(1)),
        fat: parseFloat((selectedFood.fat * multiplier).toFixed(1)),
        fiber: parseFloat(((selectedFood.fiber || 0) * multiplier).toFixed(1)),
        loggedQty: displayQty,
        time: new Date().toLocaleTimeString()
    };

    await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), {
        foods: arrayUnion(foodLog)
    });
    
    closeModal('food-modal');
    backToFoodList();
};

// --- NEW: EXERCISE TRACKER LOGIC ---
window.toggleExFilter = (filter) => {
    activeExFilter = filter;
    document.querySelectorAll('.ex-filter-chip').forEach(btn => {
        const isActive = btn.innerText === (filter === 'all' ? 'All' : filter);
        if(isActive) btn.className = 'ex-filter-chip active bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-md';
        else btn.className = 'ex-filter-chip bg-white text-slate-600 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-200 hover:bg-slate-50';
    });
    window.filterExercises();
};

window.filterExercises = () => {
    const term = document.getElementById('ex-search').value.toLowerCase();
    const list = document.getElementById('exercise-list');
    list.innerHTML = '';

    const matches = EXERCISE_DB.filter(ex => {
        const nameMatch = ex.name.toLowerCase().includes(term);
        if(activeExFilter === 'all') return nameMatch;
        return nameMatch && ex.category.includes(activeExFilter);
    }).slice(0, 50);

    matches.forEach(ex => {
        const el = document.createElement('div');
        el.className = 'bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 cursor-pointer flex items-center gap-3 transition-all group';
        el.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-person-running"></i>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">${ex.name}</h4>
                <div class="flex gap-2 text-[10px] text-slate-500">
                        <span class="bg-slate-50 px-1.5 rounded">${ex.category}</span>
                        <span class="bg-slate-50 px-1.5 rounded">${ex.difficulty}</span>
                </div>
            </div>
            <div class="text-right">
                <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
            </div>
        `;
        el.onclick = () => openExerciseDetail(ex.id);
        list.appendChild(el);
    });
};

window.openExerciseDetail = (exId) => {
    selectedExercise = EXERCISE_DB.find(e => e.id === exId);
    if(!selectedExercise) return;

    document.getElementById('ex-search-container').classList.add('hidden');
    document.getElementById('ex-filters').classList.add('hidden');
    document.getElementById('exercise-list').classList.add('hidden');
    document.getElementById('exercise-detail-view').classList.remove('hidden');
    document.getElementById('back-ex-btn').classList.remove('hidden');

    document.getElementById('ex-name').innerText = selectedExercise.name;
    document.getElementById('ex-diff').innerText = selectedExercise.difficulty;
    document.getElementById('ex-desc').innerText = selectedExercise.description || "No description available.";
    document.getElementById('ex-cat').innerText = selectedExercise.category;
    document.getElementById('ex-equip').innerText = selectedExercise.equipment;
    
    document.getElementById('ex-duration').value = 30; // Reset
    calcExerciseBurn();
};

window.backToExerciseList = () => {
    document.getElementById('exercise-detail-view').classList.add('hidden');
    document.getElementById('back-ex-btn').classList.add('hidden');
    document.getElementById('ex-search-container').classList.remove('hidden');
    document.getElementById('ex-filters').classList.remove('hidden');
    document.getElementById('exercise-list').classList.remove('hidden');
};

window.calcExerciseBurn = () => {
    if(!selectedExercise || !userProfile) return;
    
    const mins = parseFloat(document.getElementById('ex-duration').value) || 0;
    const weight = userProfile.weight || 70; // fallback if missing
    const met = selectedExercise.met;
    
    // Formula: Calories = (MET * 3.5 * weight in kg) / 200 * duration in min
    const burned = Math.round((met * 3.5 * weight) / 200 * mins);
    
    document.getElementById('ex-burn-val').innerText = burned;
};

window.confirmAddExercise = async () => {
    if(!selectedExercise) return;
    const mins = parseFloat(document.getElementById('ex-duration').value) || 0;
    const burned = parseInt(document.getElementById('ex-burn-val').innerText);

    const exLog = {
        ...selectedExercise,
        logId: Date.now(),
        duration: mins,
        burned: burned,
        time: new Date().toLocaleTimeString()
    };

    await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), {
        exercises: arrayUnion(exLog)
    });
    
    closeModal('exercise-modal');
    backToExerciseList();
};

// --- 5. UI UPDATES ---
let charts = {};

function updateUI() {
    if(!todayData || !userProfile) return;

    const eaten = Math.round(todayData.foods.reduce((a, b) => a + b.calories, 0));
    const burned = Math.round(todayData.exercises.reduce((a, b) => a + b.burned, 0));
    const net = eaten - burned;
    const remaining = userProfile.targetCalories - net;
    const fiber = Math.round(todayData.foods.reduce((a, b) => a + (b.fiber || 0), 0));

    document.getElementById('disp-net-cals').innerText = remaining;
    document.getElementById('disp-target-cals').innerText = userProfile.targetCalories;
    document.getElementById('disp-eaten').innerText = eaten;
    document.getElementById('disp-burned').innerText = burned;
    document.getElementById('disp-water').innerText = todayData.water;
    document.getElementById('disp-fiber').innerText = fiber;
    
    const fiberPct = Math.min((fiber/30)*100, 100);
    document.getElementById('fiber-bar').style.width = `${fiberPct}%`;

    const macros = todayData.foods.reduce((acc, f) => ({
        p: acc.p + f.protein, c: acc.c + f.carbs, f: acc.f + f.fat
    }), {p:0, c:0, f:0});
    
    ['p','c','f'].forEach(k => {
        document.getElementById(`val-${k}`).innerText = `${Math.round(macros[k])}g`;
        const targets = { p: 150, c: 250, f: 70 };
        document.getElementById(`bar-${k}`).style.width = `${Math.min((macros[k]/targets[k])*100, 100)}%`;
    });
    document.getElementById('macro-total').innerText = `${Math.round(macros.p + macros.c + macros.f)}g`;

    renderCharts(macros);
    renderDailyLog();
    
    // Intimacy Logic
    const intCount = todayData.intimacy || 0;
    const intEl = document.getElementById('intimacy-count');
    if(intEl) intEl.innerText = intCount;
    renderIntimacyChart();
}

function renderDailyLog() {
    const container = document.getElementById('daily-log-list');
    
    // Check both foods and exercises
    if (todayData.foods.length === 0 && todayData.exercises.length === 0) {
        container.innerHTML = `<div class="flex flex-col items-center justify-center py-6 text-center">
                        <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-2">
                            <i class="fa-solid fa-list"></i>
                        </div>
                        <p class="text-xs text-slate-400 italic">No activity logged yet.</p>
                    </div>`;
        return;
    }

    container.innerHTML = '';

    // Render Exercises First
        if(todayData.exercises.length > 0) {
        const exDiv = document.createElement('div');
        exDiv.innerHTML = `<h4 class="text-xs font-bold text-orange-400 uppercase tracking-wide mb-2 ml-1">Workouts</h4>`;
        todayData.exercises.forEach(ex => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "flex justify-between items-center bg-orange-50 p-3 rounded-2xl border border-orange-100 mb-2";
            itemDiv.innerHTML = `
                <div>
                    <p class="font-bold text-sm text-slate-800">${ex.name}</p>
                    <p class="text-[10px] text-slate-500 font-medium">${ex.duration} min • ${ex.burned} kcal burned</p>
                </div>
                <button onclick="deleteExerciseLog(${ex.logId})" class="text-orange-400 hover:text-red-500 p-2 transition-colors"><i class="fa-solid fa-trash-can"></i></button>
            `;
            exDiv.appendChild(itemDiv);
        });
        container.appendChild(exDiv);
    }

    // Render Meals
    const meals = { 'Breakfast': [], 'Lunch': [], 'Snack': [], 'Dinner': [] };
    todayData.foods.forEach(f => {
        const type = f.mealType || 'Snack';
        if(meals[type]) meals[type].push(f);
        else meals['Snack'].push(f);
    });

    for (const [mealName, items] of Object.entries(meals)) {
        if (items.length > 0) {
            const groupDiv = document.createElement('div');
            groupDiv.innerHTML = `<h4 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 mt-4 first:mt-2 ml-1">${mealName}</h4>`;
            items.forEach(food => {
                const itemDiv = document.createElement('div');
                itemDiv.className = "flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-2";
                itemDiv.innerHTML = `
                    <div>
                        <p class="font-bold text-sm text-slate-800">${food.name}</p>
                        <p class="text-[10px] text-slate-500 font-medium">${food.loggedQty} • ${food.calories} kcal</p>
                    </div>
                    <button onclick="deleteFoodLog(${food.logId})" class="text-slate-400 hover:text-red-500 p-2 transition-colors"><i class="fa-solid fa-trash-can"></i></button>
                `;
                groupDiv.appendChild(itemDiv);
            });
            container.appendChild(groupDiv);
        }
    }
}

window.deleteFoodLog = async (logId) => {
    if(!confirm("Remove this item?")) return;
    const updatedFoods = todayData.foods.filter(f => f.logId !== logId);
    await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), { foods: updatedFoods });
};

window.deleteExerciseLog = async (logId) => {
        if(!confirm("Remove this workout?")) return;
    const updatedEx = todayData.exercises.filter(e => e.logId !== logId);
    await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), { exercises: updatedEx });
};

function renderCharts(macros) {
    // Macro Chart
    const ctxM = document.getElementById('macrosChart').getContext('2d');
    if(charts.macro) charts.macro.destroy();
    charts.macro = new Chart(ctxM, {
        type: 'doughnut',
        data: {
            labels: ['Pro', 'Carb', 'Fat'],
            datasets: [{
                data: [macros.p, macros.c, macros.f],
                backgroundColor: ['#3b82f6', '#eab308', '#ef4444'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: { cutout: '80%', plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }
    });

    // Analytics Tab Charts
    // Weekly Trend (Simulated Data + Current)
    const ctxWeek = document.getElementById('weeklyChart').getContext('2d');
    if(charts.week) charts.week.destroy();
    charts.week = new Chart(ctxWeek, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
            datasets: [
                { label: 'In', data: [2100, 1900, 2300, 1800, 2000, 2400, Math.round(todayData.foods.reduce((a,b)=>a+b.calories,0))], backgroundColor: '#6366f1', borderRadius: 4 },
                { label: 'Out', data: [400, 300, 600, 400, 350, 200, Math.round(todayData.exercises.reduce((a,b)=>a+b.burned,0))], backgroundColor: '#f97316', borderRadius: 4 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { display: false } }, x: { grid: { display: false } } } }
    });

    // BP Chart
    const ctxBP = document.getElementById('bpChart').getContext('2d');
    if(charts.bp) charts.bp.destroy();
    charts.bp = new Chart(ctxBP, {
        type: 'line',
        data: {
            labels: todayData.bp.map(x => x.time),
            datasets: [
                { label: 'Sys', data: todayData.bp.map(x => x.sys), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4, pointRadius: 3 },
                { label: 'Dia', data: todayData.bp.map(x => x.dia), borderColor: '#f97316', backgroundColor: 'transparent', borderDash: [5,5], tension: 0.4, pointRadius: 0 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 50, grid: { color: '#f1f5f9' } }, x: { display: false } } }
    });

    // HR Chart
    const ctxHR = document.getElementById('hrChart').getContext('2d');
    if(charts.hr) charts.hr.destroy();
    charts.hr = new Chart(ctxHR, {
        type: 'bar',
        data: {
            labels: todayData.heartRate.map(x => x.time),
            datasets: [{ label: 'BPM', data: todayData.heartRate.map(x => x.bpm), backgroundColor: '#ec4899', borderRadius: 6, barThickness: 10 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 40, grid: { display: false } }, x: { display: false } } }
    });
}

// --- INTIMACY TRACKER ---
window.logIntimacy = async () => {
    if(!todayData) return;
    const current = todayData.intimacy || 0;
    // Optimistic update
    document.getElementById('intimacy-count').innerText = current + 1;
    
    await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), {
        intimacy: (current + 1)
    });
};

function renderIntimacyChart() {
    const ctx = document.getElementById('intimacyChart');
    if(!ctx) return;
    if(charts.intimacy) charts.intimacy.destroy();
    
    // Note: In a real app we'd fetch 7 days of data. Here we simulate past 6 days for the graph.
    const todayVal = todayData ? (todayData.intimacy || 0) : 0;
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
    const data = [0, 1, 0, 1, 2, 0, todayVal]; // Simulated history + real today
    
    charts.intimacy = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frequency',
                data: data,
                backgroundColor: '#ec4899',
                borderRadius: 6,
                barThickness: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 1 } },
                x: { grid: { display: false } }
            }
        }
    });
}

// --- 6. COMMON UI LOGIC ---
window.toggleFilter = (filter) => {
    activeFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(btn => {
        const isActive = btn.innerText === (filter === 'all' ? 'All' : filter);
        if(isActive) btn.className = 'filter-chip active bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-md';
        else btn.className = 'filter-chip bg-white text-slate-600 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-200 hover:bg-slate-50';
    });
    window.filterFood();
};

window.filterFood = () => {
    const term = document.getElementById('food-search').value.toLowerCase();
    const list = document.getElementById('food-list');
    list.innerHTML = '';

    const matches = FOOD_DB.filter(f => {
        const nameMatch = f.name.toLowerCase().includes(term) || f.state.toLowerCase().includes(term);
        if (activeFilter === 'all') return nameMatch;
        if (activeFilter === 'Veg') return nameMatch && (f.diet === 'Veg' || f.diet === 'Vegan');
        if (activeFilter === 'Non-Veg') return nameMatch && f.diet === 'Non-Veg';
        if (activeFilter === 'High Protein') return nameMatch && f.protein > 10;
        return nameMatch;
    }).slice(0, 50);

    matches.forEach(food => {
        const isVeg = food.diet === 'Veg' || food.diet === 'Vegan';
        const el = document.createElement('div');
        el.className = 'bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 cursor-pointer flex justify-between items-center transition-all group';
        el.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-3 h-3 rounded-sm border ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-[1px]">
                        <span class="w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}"></span>
                    </span>
                    <h4 class="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">${food.name}</h4>
                </div>
                <div class="flex flex-wrap gap-2 text-[10px] text-slate-500">
                    <span>${food.serving}</span>
                    ${food.nutrients ? `<span class="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded truncate max-w-[80px] font-semibold">${food.nutrients.split(',')[0]}</span>` : ''}
                </div>
            </div>
            <div class="text-right pl-3 border-l border-slate-100 ml-3 min-w-[60px]">
                <p class="text-indigo-600 font-extrabold text-sm">${food.calories}</p>
                <p class="text-[10px] text-slate-400">kcal</p>
            </div>
        `;
        el.onclick = () => openFoodDetail(food.id);
        list.appendChild(el);
    });
};

// --- MEDICINE LOGIC ---
function renderMedicineSettingsList() {
    const list = document.getElementById('medicine-settings-list');
    list.innerHTML = '';
    userProfile.medicines.forEach((med, index) => {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-center';
        div.innerHTML = `
            <input type="text" value="${med.name}" placeholder="Medicine Name" class="med-name flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100">
            <input type="time" value="${med.time}" class="med-time w-28 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm outline-none">
            <button onclick="removeMedicineRow(${index})" class="text-red-400 hover:text-red-600 p-2"><i class="fa-solid fa-trash-can"></i></button>
        `;
        list.appendChild(div);
    });
}
window.addMedicineRow = () => {
    if(!userProfile.medicines) userProfile.medicines = [];
    userProfile.medicines.push({ name: '', time: '09:00' });
    renderMedicineSettingsList();
}
window.removeMedicineRow = (index) => {
    userProfile.medicines.splice(index, 1);
    renderMedicineSettingsList();
}
window.saveMedicines = async () => {
    const names = document.querySelectorAll('.med-name');
    const times = document.querySelectorAll('.med-time');
    const newMeds = [];
    names.forEach((inp, i) => { if(inp.value.trim()) newMeds.push({ name: inp.value.trim(), time: times[i].value }); });
    userProfile.medicines = newMeds;
    await updateDoc(doc(db, "users", currentUser.uid), { medicines: newMeds });
    alert("Schedule Updated!");
    renderMedicineChecklist();
}
function renderMedicineChecklist() {
    const container = document.getElementById('medicine-checklist');
    if(!userProfile.medicines || userProfile.medicines.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-400 text-center italic py-2">No medicines scheduled. Add in Settings.</p>';
        return;
    }
    container.innerHTML = '';
    const takenList = todayData.medicinesTaken || [];
    userProfile.medicines.forEach(med => {
        const isTaken = takenList.includes(med.name);
        const div = document.createElement('label');
        div.className = 'flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded-xl transition-colors select-none';
        div.innerHTML = `
            <div class="relative">
                <input type="checkbox" class="peer sr-only custom-checkbox" ${isTaken ? 'checked' : ''} onchange="toggleMedicine('${med.name}')">
                <div class="w-6 h-6 border-2 border-slate-300 rounded-lg bg-white peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all flex items-center justify-center">
                    <i class="fa-solid fa-check text-white text-xs hidden"></i>
                </div>
            </div>
            <div class="flex-1">
                <p class="text-sm font-bold text-slate-800 ${isTaken ? 'line-through text-slate-400' : ''}">${med.name}</p>
                <p class="text-[10px] text-slate-500 font-medium">Scheduled: ${med.time}</p>
            </div>
        `;
        container.appendChild(div);
    });
}
window.toggleMedicine = async (medName) => {
    const takenList = todayData.medicinesTaken || [];
    if(takenList.includes(medName)) {
        await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), { medicinesTaken: arrayRemove(medName) });
    } else {
        await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), { medicinesTaken: arrayUnion(medName) });
    }
};

window.openModal = (id) => {
    document.getElementById(id).classList.remove('hidden');
    if(id === 'plan-modal') renderHealthPlan();
    if(id === 'food-modal') window.filterFood();
    if(id === 'exercise-modal') window.filterExercises();
};

window.closeModal = (id) => document.getElementById(id).classList.add('hidden');
window.updateWater = async (amt) => { const n = Math.max(0, todayData.water + amt); await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), { water: n }); };
window.saveVitals = async () => {
    const sys = +document.getElementById('bp-sys').value; const dia = +document.getElementById('bp-dia').value; const bpm = +document.getElementById('hr-bpm').value; const t = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const updates = {}; if(sys && dia) updates.bp = arrayUnion({ sys, dia, time: t }); if(bpm) updates.heartRate = arrayUnion({ bpm, time: t });
    if(Object.keys(updates).length > 0) { await updateDoc(doc(db, "users", currentUser.uid, "logs", getISODate(currentDate)), updates); closeModal('vital-modal'); }
};

window.switchTab = (tab) => {
    document.querySelectorAll('.nav-btn').forEach(b => { 
        b.classList.remove('text-indigo-600', 'active', 'bg-indigo-50'); 
        b.classList.add('text-slate-300'); 
    });
    const targetBtn = document.querySelector(`[data-target="${tab}"]`);
    if(targetBtn) {
        targetBtn.classList.add('text-indigo-600', 'active', 'bg-indigo-50');
        targetBtn.classList.remove('text-slate-300');
    }
    
    ['dashboard', 'analytics', 'settings', 'chat', 'intimacy'].forEach(t => {
        const el = document.getElementById(`view-${t}`);
        if(el) el.classList.add('hidden');
    });
    document.getElementById(`view-${tab}`).classList.remove('hidden');
};
