<p align="center">
  <img src="assets/images/explyra_logo.png" alt="Explyra Logo" width="120" />
</p>

<h1 align="center">Explyra — Modern SaaS Developer Platform & Utility Suite</h1>

<p align="center">
  <strong>The Ultimate All-in-One Digital Workspace for Productivity, Management, and Utilities</strong>
</p>

<p align="center">
  <a href="https://explyra.me/"><img src="https://img.shields.io/badge/Live%20Demo-explyra.pages.dev-10b981?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Demo" /></a>
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
explyra/
├── assets/                      # Global UI assets: brand imagery, logos, PWA icons
├── components/                  # Reusable HTML partials injected at runtime
│   ├── admin-navbar.html        #   Top navigation bar for admin portal
│   ├── emp-navbar.html          #   Top navigation bar for employee portal
│   ├── admin-sidebar.html       #   Role-based sidebar navigation for admins
│   ├── footer.html              #   Shared site footer
│   └── loader.js                #   Spinner/overlay loader for async data fetches
├── css/                         # Shared stylesheets
│   ├── common.css               #   Global design tokens, typography, layout (454 lines)
│   ├── admin-styles.css         #   Admin dashboard–specific styles (366 lines)
│   ├── emp-styles.css           #   Employee portal styles (57 lines)
│   └── admin-translate.css      #   Internationalization/translation overrides (29 lines)
├── js/                          # Core application business logic (20 modules, ~12 700 lines)
│   ├── firebase-config.js       #   Firebase SDK initialization and project config
│   ├── common.js                #   Shared helpers used across every page
│   ├── utils.js                 #   Generic DOM/formatting utility functions
│   ├── theme.js                 #   Light/dark theme toggle
│   ├── spam-filter.js           #   Message spam detection engine
│   ├── emp-auth.js              #   Employee auth: email/password + Google OAuth
│   ├── emp-expenses.js          #   Expense creation, editing, multi-currency tracking
│   ├── emp-chat.js              #   Real-time chat via Firestore snapshot listeners
│   ├── emp-notifications.js     #   Push notifications and in-app alerts
│   ├── emp-profile.js           #   User profile management
│   ├── emp-tasks.js             #   Task creation and tracking
│   ├── emp-vault.js             #   Multi-currency claim vault/wallet
│   ├── emp-calls.js             #   WebRTC peer-to-peer voice/video calling
│   ├── emp-utils.js             #   Employee-specific utility helpers
│   ├── admin-logic.js           #   Admin dashboard controller, approval workflows
│   ├── admin-helper.js          #   Supporting helpers for admin operations
│   ├── explyra-logic.js         #   App initialization and client-side routing
│   ├── ai-support.js            #   AI support assistant (Groq / Llama 3)
│   └── _orig_emp_logic.js       #   Archived original expense logic (legacy reference)
├── functions/                   # Firebase Cloud Functions (Node.js backend)
│   ├── index.js                 #   sendCallNotification — FCM push for incoming calls
│   └── package.json             #   Cloud Functions dependencies
├── crm/                         # Customer Relationship Management module
│   ├── index.html               #   CRM shell (33 KB)
│   ├── crm-main.js              #   Core CRM initialization and routing
│   ├── Contacts.js              #   Contact management (CRUD, search, tagging)
│   ├── Leads.js                 #   Lead tracking and status pipeline
│   ├── Pipeline.js              #   Sales pipeline and stage visualization
│   ├── Analytics.js             #   Sales analytics and chart rendering
│   └── api-failover.js          #   API resilience and failover handling
├── explyra-learning/            # Integrated LMS / e-learning platform
│   ├── index.html               #   LMS landing page
│   ├── dashboard.html           #   Learner dashboard with progress tracking
│   ├── admin.html               #   Course administration panel
│   ├── courses/                 #   Individual course pages
│   │   ├── frontend-fundamentals.html
│   │   ├── agentic-ai.html
│   │   ├── firebase-hosting.html
│   │   ├── web-hosting.html
│   │   └── seo-devs.html
│   ├── certificates/            #   Certificate generation and verification
│   │   ├── generator.html
│   │   └── verify.html
│   └── scripts/                 #   LMS JavaScript
│       ├── learning-core.js     #     Progression tracking and course logic
│       └── auth-sync.js         #     Auth state sync between LMS and main app
├── health-manager/              # Standalone offline-first fitness & nutrition tracker
│   ├── index.html               #   Tracker landing / onboarding
│   ├── main.html                #   Main tracker dashboard
│   ├── td.html                  #   Today's diet and exercise log
│   ├── privacy.html             #   Privacy policy for the tracker
│   ├── sw.js                    #   Service Worker for offline support
│   ├── manifest.json            #   PWA manifest for the health sub-app
│   ├── food.csv                 #   Nutritional dataset (food metrics)
│   └── ex.csv                   #   Exercise dataset (calories, MET values)
├── developers/                  # Developer Tools Hub
│   ├── index.html               #   Tools hub landing page
│   ├── style.css                #   Hub stylesheet
│   ├── base64-tool/             #   Base64 encoder / decoder
│   ├── code-minifier/           #   HTML / CSS / JS minifier
│   ├── code-playground/         #   In-browser code sandbox
│   ├── fake-data-generator/     #   Realistic fake data generator
│   ├── hash-generator/          #   MD5 / SHA hash tool
│   ├── json-formatter/          #   JSON pretty-printer and validator
│   ├── link-shortener/          #   URL shortener
│   ├── password-generator/      #   Secure password generator
│   ├── regex-tester/            #   Regex testing and explanation tool
│   ├── url-encoder/             #   URL encode / decode
│   ├── snippets/                #   Reusable code snippet library
│   ├── resources/               #   Developer reference resources
│   └── tools/                   #   Additional micro-tools
│       ├── lorem-ipsum/         #     Lorem ipsum text generator
│       ├── dummy-image/         #     Placeholder image generator
│       ├── http-status-lookup/  #     HTTP status code reference
│       ├── user-agent-parser/   #     User-agent string parser
│       ├── css-beautifier/      #     CSS code beautifier
│       ├── js-beautifier/       #     JavaScript code beautifier
│       ├── html-beautifier/     #     HTML code beautifier
│       ├── robots-txt-generator/#     robots.txt generator
│       ├── htaccess-generator/  #     .htaccess generator
│       ├── open-graph-generator/#     Open Graph meta tag generator
│       ├── sitemap-generator/   #     XML sitemap generator
│       ├── meta-tag-generator/  #     SEO meta tag generator
│       ├── gradient-generator/  #     CSS gradient builder
│       ├── box-shadow-generator/#     CSS box-shadow builder
│       ├── clip-path-generator/ #     CSS clip-path builder
│       ├── border-radius-generator/#  CSS border-radius builder
│       └── refund-policy-generator/# Legal refund policy template
├── Utilites/                    # Micro-tool ecosystem
│   ├── Voice genrator and translator/ # AI text-to-speech (multi-lingual)
│   ├── P2P/                     #   Peer-to-peer secure file transfer
│   └── Doc Scan/                #   Document scanning → PDF export
├── Ino software/                # Invoicing & billing software module
├── scripts/                     # Python automation scripts
│   ├── update_index.py          #   Bulk HTML/CSS string replacement across all files
│   ├── inject_schema.py         #   JSON-LD structured-data injection (SEO)
│   ├── update_admin_emp.py      #   Sync shared code between admin and employee portals
│   └── make_common_css.py       #   Generate common.css from component templates
├── public/                      # Static public assets (served as-is)
├── www/                         # Capacitor mobile build output (generated — do not edit)
├── updates/                     # Update scripts and changelogs
├── .well-known/                 # RFC 8615 web-standard compliance files
│   └── security.txt             #   Responsible-disclosure contact info
│
│  ── Root HTML pages ──
├── index.html                   # Marketing hub, feature overview, SEO JSON-LD schema
├── emp.html                     # Employee expense portal (claim submission & tracking)
├── admin.html                   # Admin dashboard (approvals, analytics, user mgmt)
├── app.html                     # Main app shell / post-login dashboard
├── login.html                   # Authentication page
├── signup.html                  # User registration
├── search.html                  # Full-site search
├── drive.html                   # P2P file transfer interface
├── help.html                    # Help & support documentation
├── contact.html                 # Contact form
├── pricing.html                 # Pricing tiers
├── team.html                    # Team information
├── company.html                 # Company profile
├── donation.html                # Donation / sponsorship page
├── offline.html                 # Service Worker offline fallback
├── 404.html                     # Custom 404 error page
├── verify.html                  # Email / identity verification
├── privacy.html                 # Privacy policy
├── terms.html                   # Terms of service
├── license.html                 # License information
├── refund.html                  # Refund policy
├── support.html                 # Support portal
│
│  ── Root service workers ──
├── sw.js                        # Root Service Worker: offline caching, CDN strategy
├── firebase-messaging-sw.js     # FCM Service Worker: background push notifications
│
│  ── Configuration ──
├── package.json                 # Node.js deps, npm scripts (start, build), Capacitor init
├── capacitor.config.json        # Capacitor: app ID (explyra.expense.manager), web dir
├── firebase.json                # Firebase Hosting: SPA rewrites, caching headers
├── firestore.rules              # Firestore database security rules
├── .firebaserc                  # Firebase project alias (default: "explyras")
├── netlify.toml                 # Netlify: minification, security headers, cache config
├── vercel.json                  # Vercel: headers, rewrites, cleanUrls
├── manifest.json                # PWA manifest: icons, theme, app shortcuts, share target
├── google-services.json         # Google Play Services config for Android builds
├── browserconfig.xml            # Windows live-tile branding config
│
│  ── Build & utility scripts ──
├── build.js                     # Main build: copies source → www/, patches for mobile
├── _optimize.js                 # Asset optimization helper
├── patch-emp-footers.js         # Automated footer injection across employee pages
├── replace_socials.js           # Social media link replacement utility
├── replace_socials2.js          # Extended social link replacement
├── update-schemas.js            # Structured-data / schema update automation
│
│  ── SEO & web standards ──
├── robots.txt                   # Search-engine crawl directives
├── sitemap.xml                  # Site map for indexing
├── opensearch.xml               # OpenSearch browser integration
├── humans.txt                   # Human-readable project credits
├── structured-data.json         # Global JSON-LD structured data
├── CNAME                        # Custom domain: explyra.me
└── feed.xml                     # RSS/Atom feed
```

---

## 📝 File-level Explanation for Important Files

- **`index.html`**: The focal marketing hub defining all ecosystem features, incorporating complex animations and SEO JSON-LD schema.
- **`emp.html`** & **`admin.html`**: The heavy, localized dashboard shells dynamically rendering respective permissions and layouts for expense management.
- **`js/admin-logic.js`**: Central admin controller managing role configuration, Firestore queries, expense approval workflows, and DOM manipulation.
- **`js/emp-expenses.js`**: Handles expense creation, editing, multi-currency tracking, and Firestore write operations from the employee portal.
- **`js/emp-calls.js`**: Implements WebRTC peer-to-peer voice and video calling with real-time Firestore signaling.
- **`js/ai-support.js`**: AI support assistant powered by the Groq API (Llama 3 models) for policy queries and automated help.
- **`sw.js`** & **`firebase-messaging-sw.js`**: Crucial service workers enabling instant cache-loading, offline fallback (`offline.html`), and background push notifications.
- **`build.js`**: Build orchestrator that copies source files to `www/` for Capacitor, removes unsupported features (e.g. Google Sign-In) on mobile, and patches HTML/CSS for native environments.
- **`package.json`**: Controls core local dependencies (`serve`, `firebase`, `@capacitor/core`) and executes custom build pipelines (`node build.js`).
- **`scripts/update_index.py`**: Python automation script for bulk HTML/CSS string replacements across multiple files.
- **`functions/index.js`**: Firebase Cloud Function that triggers FCM push notifications when a peer-to-peer call is initiated.

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
