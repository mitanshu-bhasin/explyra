<p align="center">
  <img src="assets/images/explyra_logo.png" alt="Explyra Logo" width="120" />
</p>

<h1 align="center">Explyra — Modern SaaS Developer Platform & Utility Suite</h1>

<p align="center">
  <strong>The Ultimate All-in-One Digital Workspace for Productivity, Management, and Utilities</strong>
</p>

<p align="center">
  <a href="https://explyra.pages.dev/"><img src="https://img.shields.io/badge/Live%20Demo-explyra.pages.dev-10b981?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready" />
  <img src="https://img.shields.io/badge/License-Proprietary-blue?style=for-the-badge" alt="License" />
</p>

---

## 📌 Project Description

**Explyra** is a highly robust, unified SaaS ecosystem designed to streamline and modernize workflows for developers, enterprise teams, and individual professionals. Originally rooted in enterprise Expense Management, the repository has exponentially scaled into a versatile platform featuring end-to-end health tracking, a dedicated e-learning system (LMS), professional invoicing tools, and a suite of high-performance developer utilities—all bundled into a seamless Progressive Web App (PWA).

---

## 🌟 Live Concept / Vision

Our vision is to provide an **"All-in-One Digital Workspace"**. Instead of relying on fragmented tools, Explyra unifies secure expense approvals, offline-capable health tracking, educational course management, and developer micro-tools (like AI voice generation and P2P file sharing) under a single cohesive, scalable, and responsive infrastructure.

---

## ✨ Core Features

### 🏢 Explyra Expense Manager (`emp.html`, `admin.html`)
- **Dual-portal environment**: Separate workflows for Employees and Administrators.
- **Smart Tracking**: Real-time expense creation, interactive charts, and multi-currency claim vaults.
- **Role Verification**: Customizable role matrices and dynamic permission structures.

### 🍎 Health Manager (`/health-manager`)
- **Holistic Tracking**: Dedicated fitness and dietary tracker application.
- **Data Integration**: Driven by expansive CSV datasets covering food metrics and nutritional statistics.
- **Resilience**: Native offline functionality via Service Workers.

### 📚 Explyra Learning (`/explyra-learning`)
- **Integrated LMS**: Full course dashboards covering a variety of topics.
- **Achievement Validation**: Automated progression tracking and certificate issuance routines.

### 💼 Ino Invoicing Software (`/Ino software`)
- **Professional Billing**: Native tools for invoice generation.
- **Customization**: Visual customization and billing cycle management.

### 🛠️ Developer Utility Suite (`/Utilites`)
- **Voice Generator & Translator**: AI-driven multi-lingual text-to-speech engine.
- **P2P File Transfer**: Secure, rapid peer-to-peer data sharing protocols.
- **Doc Scan**: Web-based document scanning processing to rapid PDF formulation.

### 🤖 Real-Time Communications & AI
- **Integrated Chat** (`emp-chat.js`): Ecosystem real-time chat with automated spam filtration.
- **AI Support Assistant** (`ai-support.js`): Intelligent policy query agent.

### 📱 Cross-Platform PWA
- **Installable Desktop/Mobile App** (`manifest.json`): PWA routing natively on Android, iOS, Windows, and macOS.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | HTML5, Vanilla JavaScript (ES6+), CSS3 |
| **Styling Architecture** | Modular component CSS, Tailwind CSS standard utilities |
| **Backend & Database** | Firebase (Firestore, Auth, Storage, Cloud Functions) |
| **Mobile Integration** | Capacitor JS (`@capacitor/android`, `@capacitor/core`) |
| **Graphics & Exporting** | Chart.js (Analytics), html2pdf.js (Exporting) |
| **Deployment Ecosystem** | Cloudflare Pages, Netlify, Vercel |
| **Scripting & Automation** | Python (Theme automation, indexing), Node.js (Build scripts) |

---

## 🏗️ Project Architecture

The platform operates as a massive scalable **Client-Server Architecture**, designed largely as a Single-Page Application (SPA) / Multi-Page hybrid integrated deeply with Firebase Backend-as-a-Service (BaaS).

- **Frontend Layers**: Divides logic strictly by domain boundary (`js/emp-*.js` vs. `js/admin-*.js`) interacting with shared DOM partials (`/components`).
- **Data Layer**: Firestore handles real-time synchronization utilizing snapshot listeners for instant UI hydration.
- **Security Tier**: Firebase Cloud Functions execute secure operations reinforced by strict `firestore.rules`.
- **Mobile Wrapper**: Capacitor wraps web logic into accessible iOS/Android environments.

---

## 📂 Folder Structure

```text
Explyra Root/
├── assets/                 # Global UI assets (brand imagery, logos, PWA icons)
├── components/             # Reusable UI partials (navbars, sidebars, loaders, footers)
├── css/                    # Shared stylesheets (`common.css`, `admin-styles.css`)
├── developers/             # API documentation and open-source integration resources
├── explyra-learning/       # Independent LMS platform (courses, certificates, scripts)
├── functions/              # Backend Firebase Cloud Functions (Node.js)
├── health-manager/         # Complete diet/fitness tracker app and static CSV databases
├── Ino software/           # Billing and Invoicing software generation module
├── js/                     # Core business logic divided by operational domain
├── scripts/                # Python operational scripts (build automation, regex replacements)
├── Utilites/               # Micro-tools ecosystem (Voice Gen, P2P, DocScan)
├── index.html              # Marketing entry point and suite hub
├── emp.html / admin.html   # Primary secure portals for the Expense tracker
├── package.json            # Node project configuration and Capacitor initialization
├── sw.js                   # Root Service Worker for PWA functionality and offline caching
└── firestore.rules         # Firebase database security configuration
```

---

## 📝 File-level Explanation for Important Files

- **`index.html`**: The focal marketing hub defining all ecosystem features, incorporating complex animations and SEO JSON-LD schema.
- **`emp.html`** & **`admin.html`**: The heavy, localized dashboard shells dynamically rendering respective permissions and layouts for expense management.
- **`js/admin-logic.js`** & **`js/emp-calls.js`**: Massive central controllers. They manage everything from role configuration assignments to Firestore database fetching and UI DOM manipulation.
- **`sw.js`** & **`firebase-messaging-sw.js`**: Crucial service workers enabling the app to load instantly from cache, support offline fallback (`offline.html`), and receive background push notifications.
- **`package.json`**: Controls core local dependencies (`serve`, `firebase`, `@capacitor/core`) and executes custom build pipelines (`node build.js`).
- **`_update_theme.py`** & **`build.js`**: Custom CI/CD scripting used to minify assets, structure deployments, and manipulate overarching web themes dynamically.

---

## 🚀 Getting Started

### Installation Guide

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd "Expense Tracker"
   ```

2. **Install frontend/core dependencies utilizing npm:**
   ```bash
   npm install
   ```

3. **Initialize the backend environment (if making Cloud Function changes):**
   ```bash
   cd functions
   npm install
   ```

### Development Setup

1. **Prerequisites**: Node.js (v18+ recommended) and the Firebase CLI installed globally (`npm install -g firebase-tools`).
2. **Environment Specs**: Create a `.env.local` file referencing standard Firebase config keys (API key, Auth domain) corresponding to your development staging project.
3. **Local Server**: Run the local static dev environment:
   ```bash
   npm start
   ```
   Navigate to `localhost:3000` to interact with the frontend.

---

## 🔑 Environment Variables

Local development logic relies on `.env.local` to inject crucial keys without exposing them to remote repositories. Example required keys typically involve:

- `FIREBASE_API_KEY`: The web API Key for client initialization.
- `FIREBASE_PROJECT_ID`: Target Firebase project directory.
- `FIREBASE_APP_ID`: Application linkage identifier.

---

## 💻 Scripts / Commands

- `npm start`: Initializes a rapid local dev server utilizing `npx serve .`.
- `npm run build`: Executes custom application build processes (`node build.js`).
- `npx cap sync android`: Bundles updated web assets into the Capacitor Android working context.
- `python scripts/update_index.py`: Executes Python automation to rapidly push systemic HTML/CSS string updates across multiple files.

---

## 📡 API Endpoints

All internal and external database fetching and mutation are seamlessly processed through the **Firebase Client SDK**. Manual cloud environments execute via Firebase Cloud Functions (triggering via Webhooks or Callable Functions):
- **Identity / Auth**: Standardized Firebase Authentication pipelines.
- **Data Transport**: Real-time WebSocket communication securely brokered by Firestore rules, aggressively mitigating the need for traditional REST `GET`/`POST` loops.

---

## 🧩 UI Components Overview

The system utilizes an advanced modularized vanilla HTML injection technique, governed heavily by the `/components` directory:
- **Navbars** (`emp-navbar.html`, `admin-navbar.html`): Responsive header controllers that establish user branding and notification states.
- **Sidebars** (`admin-sidebar.html`): Complex navigational directives enforcing role-based visual configurations.
- **Loaders & Overlays**: Standalone `loader.js` rendering spinner states securely during large associative database queries.

---

## ⚙️ Configuration Files Explanation

- **`firebase.json`**: Declares hosting rules governing Single-Page Application (SPA) redirects and specific header cache boundaries.
- **`capacitor.config.json`**: Formulates compiled metadata targeting Capacitor's native build structures (e.g., `explyra.expense.manager`).
- **`netlify.toml` / `vercel.json`**: Dictates distinct runtime fallbacks and proxy handling structures when migrating live environments across differing Edge networks.

---

## 🌍 Deployment Guide

1. **Frontend Production**: Ensure functional code passes via Pull Request into the `main` branch. Integrated webhooks on Vercel/Netlify/Cloudflare will automatically resolve structural dependencies and execute `npm run build` on Edge.
2. **Backend Services**: Modified Firebase logic must be explicitly deployed:
   ```bash
   firebase deploy --only functions
   firebase deploy --only firestore:rules
   ```

---

## 🔮 Future Improvements

- **Framework Abstracting**: Transitioning Vanilla JS layouts natively over to React or Vue to standardize heavy DOM mutation pipelines.
- **TypeScript Integration**: Hardening current and future `/js` codebase functions with static typings to eradicate runtime regressions natively.
- **Testing Implementations**: Finalizing deeper unit and end-to-end operational logic via Jest and Cypress infrastructures.
- **LLM Integrations**: Supercharging `ai-support.js` with greater context awareness for automated invoice parsing, smart expense categorization, and conversational reporting algorithms.

---

## 🤝 Contribution Guide

We strongly welcome structural upgrades that assure the Explyra suite evolves iteratively:

1. Fork the current primary repository.
2. Branch cleanly off `main` employing descriptive nomenclature: `feature/your-addition` or `fix/issue-description`.
3. Validate feature additions adhere rigidly to existing `/js` domain isolation structures.
4. Execute `npm start` natively, auditing both standard desktop and simulated mobile viewpoints.
5. Submit a comprehensive, annotated Pull Request detailing your enhancements.

---

## 📄 License

This repository is strictly **Proprietary**.

Direct commercial utilization, raw cloning for monetization, or explicit reverse engineering—absent authenticated, documented authorization provided natively by the core Explyra Operations Administration—is rigorously disallowed. Direct integration requests alongside MIT licensing variations are available locally within the explicit root `LICENSE` file guidelines.

---

## 🏅 Credits

- **Architect & Core Maintainer**: Mitanshu Bhasin
- **Organization**: Explyra Ecosystem Platform / IPEC Consulting
- **Technologies Acknowledged**: Firebase, Chart.js, Tailwind CSS Open Communities.
