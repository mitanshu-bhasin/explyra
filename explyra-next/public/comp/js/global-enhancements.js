/**
 * Explyra Global Enhancements v2
 * Adds Footer Search Box, Advanced Cookie Consent Banner and Language Translation
 */

(function () {
    // --- Configuration & Styles ---
    const styles = `
        /* Cookie Banner & Modal */
        .explyra-cookie-banner {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            width: calc(100% - 48px);
            max-width: 600px;
            background: var(--surf, #fff);
            border: 1px solid var(--bdr, #E4E1DB);
            border-radius: 20px;
            padding: 24px;
            box-shadow: var(--s3, 0 12px 40px rgba(0,0,0,0.15));
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            opacity: 0;
            visibility: hidden;
        }
        .explyra-cookie-banner.visible {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .ecb-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            z-index: 10001;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .ecb-modal-overlay.open {
            display: flex;
            opacity: 1;
        }

        .ecb-modal {
            background: var(--surf, #fff);
            width: 90%;
            max-width: 450px;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            transform: translateY(20px);
            transition: transform 0.3s;
        }
        .ecb-modal-overlay.open .ecb-modal {
            transform: translateY(0);
        }

        .ecb-setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid var(--bdr, #E4E1DB);
        }
        .ecb-setting-info h4 { margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--ink); }
        .ecb-setting-info p { margin: 4px 0 0; font-size: 0.8rem; color: var(--ink3); }

        /* Toggle Switch */
        .ecb-switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;
        }
        .ecb-switch input { opacity: 0; width: 0; height: 0; }
        .ecb-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        .ecb-slider:before {
            position: absolute;
            content: "";
            height: 18px; width: 18px;
            left: 3px; bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .ecb-slider { background-color: var(--blue, #1546C0); }
        input:checked + .ecb-slider:before { transform: translateX(20px); }
        input:disabled + .ecb-slider { opacity: 0.5; cursor: default; }

        /* Footer Search Refined */
        .foot-search-box {
            margin-top: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            border-top: 1px solid var(--bdr, rgba(136, 136, 136, 0.1));
            padding: 40px 0;
            position: relative;
            z-index: 10;
            clear: both;
        }
        @media (min-width: 1024px) {
            .foot-search-box {
                flex-direction: row;
                justify-content: space-between;
                padding-left: 20px;
                padding-right: 20px;
                gap: 40px;
            }
            .foot-socials-wrapper { order: 2; }
            .fsb-container { order: 1; display: flex; align-items: center; gap: 24px; }
        }
        @media (max-width: 1023px) {
            .foot-search-box {
                flex-direction: column-reverse;
                gap: 32px;
                text-align: center;
            }
        }

        .fsb-wrapper {
            position: relative;
            width: 100%;
            max-width: 280px;
            display: flex;
            align-items: center;
            background: var(--surf, #fff);
            border: 1.5px solid var(--bdr, #CCC8C0);
            border-radius: 100px;
            padding: 4px 6px 4px 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            z-index: 101;
        }
        .fsb-wrapper:focus-within {
            border-color: var(--blue, #1546C0);
            box-shadow: 0 8px 20px rgba(21, 70, 192, 0.12);
            transform: translateY(-2px);
        }
        .fsb-input {
            flex: 1;
            border: none;
            background: none;
            padding: 8px 0;
            font-size: 0.85rem;
            font-family: inherit;
            color: var(--ink, #0D1117);
            outline: none;
        }
        .fsb-btn {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: var(--blue, #1546C0);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            cursor: pointer;
        }
        .fsb-btn:hover { transform: scale(1.08); }

        /* Ecosystem Search Dropdown */
        .fsb-dropdown {
            position: absolute;
            bottom: calc(100% + 12px);
            left: 0;
            width: 100%;
            background: var(--surf, #fff);
            border: 1px solid var(--bdr, #E4E1DB);
            border-radius: 16px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.15);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-height: 350px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px;
            z-index: 100;
        }
        [data-theme="dark"] .fsb-dropdown {
            background: var(--bg3, #141928);
            border-color: var(--bdr, rgba(255,255,255,0.07));
            box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .fsb-wrapper:focus-within .fsb-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .fsb-result {
            display: flex;
            flex-direction: column;
            padding: 10px 14px;
            border-radius: 10px;
            text-decoration: none;
            color: var(--ink, #0D1117);
            transition: background 0.2s;
            cursor: pointer;
            text-align: left;
        }
        [data-theme="dark"] .fsb-result {
            color: var(--ink, #EEF0F8);
        }
        .fsb-result:hover, .fsb-result.keyboard-selected {
            background: var(--blue-g, rgba(21,70,192,0.08));
        }
        [data-theme="dark"] .fsb-result:hover, [data-theme="dark"] .fsb-result.keyboard-selected {
            background: rgba(91, 138, 245, 0.12);
        }
        .fsb-result-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--blue, #1546C0);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        [data-theme="dark"] .fsb-result-title {
            color: var(--blue2, #93B4FF);
        }
        .fsb-result-type {
            font-size: 0.6rem;
            background: var(--bg3, #F1EFE9);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--ink3, #666);
            font-weight: 600;
            text-transform: uppercase;
        }
        [data-theme="dark"] .fsb-result-type {
            background: var(--bg4, #1B2235);
            color: var(--ink3, #8290A8);
        }
        .fsb-result-desc {
            font-size: 0.75rem;
            color: var(--ink3, #666);
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        [data-theme="dark"] .fsb-result-desc {
            color: var(--ink3, #8290A8);
        }
        .fsb-no-results {
            padding: 16px;
            text-align: center;
            font-size: 0.85rem;
            color: var(--ink3, #666);
        }

        .ecb-actions { display: flex; gap: 12px; }
        .ecb-btn { 
            padding: 10px 20px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; 
            cursor: pointer; transition: all 0.2s; border: none;
        }
        .ecb-btn-primary { background: var(--blue, #1546C0); color: #fff; }
        .ecb-btn-ghost { background: var(--bg3, #F1EFE9); color: var(--ink); border: 1px solid var(--bdr); }
        .ecb-btn-full { width: 100%; margin-top: 24px; }

        /* Status & Security Links */
        .fsb-links {
            display: flex;
            gap: 16px;
        }
        .fsb-link {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--ink3, #666);
            transition: color 0.2s;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .fsb-link:hover {
            color: var(--blue, #1546C0);
        }
        .fsb-link i {
            font-size: 0.9rem;
        }

        /* Google Translate Refined */
        #google_translate_element, #google_translate_element_mobile {
            display: inline-block;
            vertical-align: middle;
        }
        .goog-te-gadget {
            font-family: inherit !important;
            font-size: 0 !important;
            color: transparent !important;
        }
        [data-theme="dark"] .goog-te-gadget .goog-te-combo {
            background: var(--bg4, #1B2235);
            border-color: var(--bdr, rgba(255,255,255,0.1));
            color: #fff;
        }
        /* Hide Google Logo, "Powered by", and default text globally */
        .goog-te-gadget span, .goog-te-gadget img, .goog-te-gadget a, .goog-te-menu-value span {
            display: none !important;
        }
        
        /* Aggressive Google Branding Removal (Top bar, tooltips, frames) */
        .goog-te-banner-frame, 
        .goog-te-banner-frame.skiptranslate, 
        #goog-gt-tt, 
        .goog-te-balloon-frame, 
        .goog-te-tip-frame, 
        .goog-te-banner, 
        .VIpgJd-Zvi9fq-ahS06b-bN99Vc, 
        iframe.goog-te-banner-frame,
        .goog-te-menu-value span:nth-child(2),
        .goog-te-menu-value span:nth-child(3),
        .goog-te-gadget-icon,
        .goog-te-banner-frame {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Force body to stay at top and not shift down */
        body {
            top: 0 !important;
            position: relative !important;
        }

        /* 
           THE ULTIMATE LANGUAGE DROPDOWN FIX
           Combines iframe filtering and direct targeting for maximum compatibility.
        */
        iframe[class*="goog-te-menu-frame"],
        .goog-te-menu-frame,
        .goog-te-menu2-panel {
            box-shadow: 0 16px 48px rgba(0,0,0,0.3) !important;
            border: 1px solid #ddd !important;
            border-radius: 12px !important;
            background-color: #000000 !important;
            filter: invert(1) hue-rotate(180deg) brightness(1) !important;
        }

        /* Direct targeting for non-iframe versions (to ensure "everything is visible") */
        .goog-te-menu2, .goog-te-menu2 * {
            color: #0d1117 !important;
            background-color: #ffffff !important;
            font-family: 'Outfit', sans-serif !important;
        }
        
        [data-theme="dark"] iframe[class*="goog-te-menu-frame"],
        [data-theme="dark"] .goog-te-menu-frame {
            filter: none !important; 
            background-color: #141928 !important;
            border-color: rgba(255,255,255,0.1) !important;
        }
        [data-theme="dark"] .goog-te-menu2, 
        [data-theme="dark"] .goog-te-menu2 * {
            color: #ffffff !important;
            background-color: #141928 !important;
        }

        /* SLEEK COMPACT PILL */
        .nav-translation {
            display: flex;
            align-items: center;
            background: var(--bg3, #F1EFE9);
            border: 1px solid var(--bdr2, #E4E1DB);
            border-radius: 100px;
            transition: all 0.3s ease;
            height: 32px;
            position: relative;
            padding: 0 8px 0 10px;
            margin-right: 12px;
            width: 78px;
            flex-shrink: 0;
            cursor: pointer;
        }
        .nav-translation:hover { 
            border-color: var(--blue, #1546C0);
            background: var(--bg2, #fff);
            z-index: 1000;
        }
        .nav-translation i { font-size: 0.8rem; color: var(--blue, #1546C0); margin-right: 5px; }
        .nav-translation .nav-lang-code {
            font-size: 0.72rem;
            font-weight: 800;
            color: var(--ink, #0D1117);
            text-transform: uppercase;
        }
        [data-theme="dark"] .nav-translation .nav-lang-code { color: #fff; }

        .nav-translation::after {
            content: "\f078";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            font-size: 0.5rem;
            color: var(--ink, #0D1117);
            margin-left: auto;
            transition: transform 0.3s;
        }
        [data-theme="dark"] .nav-translation::after { color: #fff; }
        .nav-translation:hover::after { transform: rotate(180deg); }

        /* Categorized Language Mega Dropdown */
        .lang-dropdown-content {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 720px;
            background: var(--bg2, #fff);
            border: 1px solid var(--bdr, #E4E1DB);
            border-radius: 12px;
            box-shadow: 0 24px 60px rgba(0,0,0,0.15);
            display: flex; /* Side-banner flex */
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            z-index: 2000;
            pointer-events: none;
            overflow: hidden;
        }

        .lang-side-banner {
            width: 200px;
            padding: 1.5rem;
            background: var(--bg3, #F1EFE9);
            border-right: 1px solid var(--bdr, #E4E1DB);
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            flex-shrink: 0;
        }

        .lang-side-title {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .lang-side-title i { font-size: 1.8rem; color: var(--blue, #1546C0); }
        .lang-side-title h4 { margin: 0; font-size: 1rem; font-weight: 700; color: var(--ink); }
        .lang-side-title p { margin: 0; font-size: 0.75rem; color: var(--ink3); line-height: 1.4; }

        .lang-main-zone {
            flex: 1;
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        [data-theme="dark"] .lang-dropdown-content {
            background: #141928;
            border-color: rgba(255, 255, 255, 0.08);
            box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        [data-theme="dark"] .lang-side-banner { background: rgba(255,255,255,0.02); }

        .nav-translation:hover .lang-dropdown-content {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: all;
            transition-delay: 0.15s;
        }

        /* Hover Bridge for stability */
        .nav-translation::before {
            content: '';
            position: absolute;
            bottom: -20px;
            right: 0;
            width: 100%;
            height: 30px;
            background: transparent;
            display: none;
        }
        .nav-translation:hover::before { display: block; }

        .lang-col h5 {
            font-size: 0.65rem;
            font-weight: 800;
            color: var(--blue, #1546C0);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.8rem;
            opacity: 0.8;
        }
        .lang-list { display: flex; flex-direction: column; gap: 4px; }
        .lang-item {
            padding: 6px 10px;
            font-size: 0.85rem;
            color: var(--ink, #0D1117);
            border-radius: 8px;
            transition: all 0.2s;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        [data-theme="dark"] .lang-item { color: #EEF0F8; }
        .lang-item:hover {
            background: var(--blue-g, rgba(21,70,192,0.06));
            color: var(--blue, #1546C0);
            padding-left: 14px;
        }
        [data-theme="dark"] .lang-item:hover {
            background: rgba(91, 138, 245, 0.1);
            color: #fff;
        }
        .lang-item.active {
            background: var(--blue, #1546C0);
            color: #fff !important;
            font-weight: 600;
        }
        .lang-item-code {
            font-size: 0.6rem;
            opacity: 0.5;
            font-weight: 700;
        }

        @media (max-width: 1023px) {
            .lang-dropdown-content { display: none !important; }
            .mobile-translation-item {
                padding: 1.2rem 1.5rem;
                border-top: 1px solid var(--bdr);
                margin-top: 1rem;
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
            }
            .mobile-translation-item i { font-size: 1.1rem; color: var(--blue); }
        }
    `;

    let isInitialized = false;
    function init() {
        if (isInitialized) return;
        isInitialized = true;

        injectStyles();
        setupCookieBanner();
        setupFooterSearch();
        setupLanguageTranslate();
    }

    function injectStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }

    function setupCookieBanner() {
        if (localStorage.getItem('explyra-cookie-consent') === 'true') return;

        const banner = document.createElement('div');
        banner.className = 'explyra-cookie-banner';
        banner.innerHTML = `
            <div class="ecb-content">
                <div style="font-weight:700; font-size:1rem; margin-bottom:4px;">Cookie Consent</div>
                <p style="font-size:0.8rem; color:var(--ink3); line-height:1.4; margin:0;">We use cookies to improve your experience. <a href="/privacy.html" style="color:var(--blue); text-decoration:underline;">Privacy Policy</a></p>
            </div>
            <div class="ecb-actions">
                <button class="ecb-btn ecb-btn-ghost" id="ecbSettings">Settings</button>
                <button class="ecb-btn ecb-btn-primary" id="ecbAccept">Got it</button>
            </div>
        `;

        const overlay = document.createElement('div');
        overlay.className = 'ecb-modal-overlay';
        overlay.innerHTML = `
            <div class="ecb-modal">
                <h3 style="margin-top:0;">Cookie Settings</h3>
                <div class="ecb-setting-item">
                    <div class="ecb-setting-info">
                        <h4>Essential Cookies</h4>
                        <p>Required for basic site functionality.</p>
                    </div>
                    <label class="ecb-switch">
                        <input type="checkbox" checked disabled>
                        <span class="ecb-slider"></span>
                    </label>
                </div>
                <div class="ecb-setting-item">
                    <div class="ecb-setting-info">
                        <h4>Analytics Cookies</h4>
                        <p>Help us understand how you use the site.</p>
                    </div>
                    <label class="ecb-switch">
                        <input type="checkbox" id="toggleAnalytics" checked>
                        <span class="ecb-slider"></span>
                    </label>
                </div>
                <p style="font-size:0.75rem; color:var(--ink3); margin-top:16px;">
                    Read our <a href="/privacy.html" style="color:var(--blue);">Privacy Policy</a> for more details.
                </p>
                <button class="ecb-btn ecb-btn-primary ecb-btn-full" id="saveSettings">Save & Accept</button>
            </div>
        `;

        document.body.appendChild(banner);
        document.body.appendChild(overlay);

        setTimeout(() => banner.classList.add('visible'), 1200);

        document.getElementById('ecbAccept').onclick = () => {
            localStorage.setItem('explyra-cookie-consent', 'true');
            localStorage.setItem('explyra-analytics-enabled', 'true');
            hideBanner(banner);
        };

        document.getElementById('ecbSettings').onclick = () => { overlay.classList.add('open'); };

        document.getElementById('saveSettings').onclick = () => {
            const ana = document.getElementById('toggleAnalytics').checked;
            localStorage.setItem('explyra-cookie-consent', 'true');
            localStorage.setItem('explyra-analytics-enabled', ana.toString());
            overlay.classList.remove('open');
            hideBanner(banner);
        };

        overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('open'); };
    }

    function hideBanner(banner) {
        banner.classList.remove('visible');
        setTimeout(() => banner.remove(), 600);
    }

    function setupFooterSearch() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const container = document.createElement('div');
        container.className = 'foot-search-box';

        const searchForm = `
            <div class="fsb-container">
                <form class="fsb-wrapper" id="footSearchForm" autocomplete="off">
                    <input type="text" class="fsb-input" id="fsbInput" placeholder="Search everywhere..." required>
                    <button type="submit" class="fsb-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                    <div class="fsb-dropdown" id="fsbDropdown"></div>
                </form>
                <div class="fsb-links">
                    <a href="https://status.explyra.me" class="fsb-link" target="_blank"><i class="fas fa-signal"></i> Status</a>
                    <a href="/security.txt" class="fsb-link"><i class="fas fa-shield-alt"></i> Security</a>
                </div>
            </div>
        `;

        const socials = footer.querySelector('.foot-socials-wrapper');
        if (socials) {
            socials.style.marginTop = '0';
            socials.style.borderTop = 'none';
            socials.style.paddingTop = '0';
            socials.style.position = 'relative';
            socials.style.width = 'auto';
            const followTxt = socials.querySelector('p');
            if (followTxt) followTxt.style.marginBottom = '8px';
            container.insertAdjacentHTML('beforeend', searchForm);
            container.appendChild(socials);
            footer.appendChild(container);
        } else {
            container.innerHTML = searchForm;
            footer.appendChild(container);
        }

        let ecosystemIndex = [];
        async function loadEcosystemIndex() {
            try {
                const response = await fetch('/ecosystem-index.json');
                if (response.ok) {
                    ecosystemIndex = await response.json();
                } else {
                    // Fallback to minimal index if fetch fails
                    ecosystemIndex = [
                        { title: "Explyra Home", type: "Product", url: "/index.html", desc: "Main landing page" }
                    ];
                }
            } catch (e) {
                console.warn('Failed to load search index:', e);
            }
        }
        loadEcosystemIndex();

        const form = document.getElementById('footSearchForm');
        const input = document.getElementById('fsbInput');
        const dropdown = document.getElementById('fsbDropdown');

        if (form && input && dropdown) {
            let selectedIndex = -1;

            const renderResults = (query) => {
                const results = ecosystemIndex.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.desc.toLowerCase().includes(query) || 
                    item.type.toLowerCase().includes(query)
                ).slice(0, 5); // Limit to 5 results

                dropdown.innerHTML = '';
                
                if (results.length === 0) {
                    dropdown.innerHTML = `<div class="fsb-no-results">No results for "${query}"<br><span style="font-size:0.75rem;opacity:0.6;margin-top:6px;display:block">Press Enter to perform global search</span></div>`;
                    return;
                }

                results.forEach((res, idx) => {
                    const a = document.createElement('a');
                    a.href = res.url;
                    a.className = 'fsb-result';
                    a.setAttribute('data-index', idx);
                    a.innerHTML = `
                        <div class="fsb-result-title">
                            ${res.title}
                            <span class="fsb-result-type">${res.type}</span>
                        </div>
                        <div class="fsb-result-desc">${res.desc}</div>
                    `;
                    dropdown.appendChild(a);
                });
            };

            input.addEventListener('input', (e) => {
                const q = e.target.value.trim().toLowerCase();
                selectedIndex = -1;
                if (q.length > 0) {
                    renderResults(q);
                }
            });

            input.addEventListener('keydown', (e) => {
                const items = dropdown.querySelectorAll('.fsb-result');
                if (items.length === 0) return;

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedIndex = (selectedIndex + 1) % items.length;
                    updateSelection(items);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                    updateSelection(items);
                } else if (e.key === 'Enter') {
                    if (selectedIndex >= 0 && selectedIndex < items.length) {
                        e.preventDefault();
                        window.location.href = items[selectedIndex].href;
                    }
                }
            });

            const updateSelection = (items) => {
                items.forEach((item, idx) => {
                    if (idx === selectedIndex) item.classList.add('keyboard-selected');
                    else item.classList.remove('keyboard-selected');
                });
            };

            form.onsubmit = (e) => {
                e.preventDefault();
                const q = input.value.trim();
                if (q) window.location.href = `/search.html?q=${encodeURIComponent(q)}`;
            };
        }
    }

    function setupLanguageTranslate() {
        // 0. Ensure Font Awesome is present for icons
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        // 1. Injection targets
        const desktopNavRight = document.querySelector('.nav-right');
        const mobileNavLinks = document.querySelector('.mobile-nav-links');

        if (desktopNavRight) {
            const translateDiv = document.createElement('div');
            translateDiv.className = 'nav-translation';
            translateDiv.innerHTML = `
                <i class="fa-solid fa-globe"></i>
                <span class="nav-lang-code">EN</span>
                <div class="lang-dropdown-content">
                    <div class="lang-side-banner">
                        <div class="lang-side-title">
                            <i class="fa-solid fa-earth-asia"></i>
                            <h4>Select Language</h4>
                            <p>Translate Explyra Suite into your preferred language instantly.</p>
                        </div>
                        <div style="margin-top:auto; font-size:0.65rem; color:var(--ink3); opacity:0.6;">
                            Powered by Google Neural Machine Translation.
                        </div>
                    </div>
                    <div class="lang-main-zone">
                        <div class="lang-col">
                            <h5>Popular & Indian</h5>
                            <div class="lang-list">
                                <div class="lang-item" data-lang="en">English <span class="lang-item-code">EN</span></div>
                                <div class="lang-item" data-lang="hi">Hindi <span class="lang-item-code">HI</span></div>
                                <div class="lang-item" data-lang="bn">Bengali <span class="lang-item-code">BN</span></div>
                                <div class="lang-item" data-lang="mr">Marathi <span class="lang-item-code">MR</span></div>
                                <div class="lang-item" data-lang="ta">Tamil <span class="lang-item-code">TA</span></div>
                                <div class="lang-item" data-lang="gu">Gujarati <span class="lang-item-code">GU</span></div>
                            </div>
                        </div>
                        <div class="lang-col">
                            <h5>Global Markets</h5>
                            <div class="lang-list">
                                <div class="lang-item" data-lang="es">Spanish <span class="lang-item-code">ES</span></div>
                                <div class="lang-item" data-lang="fr">French <span class="lang-item-code">FR</span></div>
                                <div class="lang-item" data-lang="ar">Arabic <span class="lang-item-code">AR</span></div>
                                <div class="lang-item" data-lang="zh-CN">Chinese <span class="lang-item-code">CN</span></div>
                                <div class="lang-item" data-lang="ja">Japanese <span class="lang-item-code">JP</span></div>
                                <div class="lang-item" data-lang="ru">Russian <span class="lang-item-code">RU</span></div>
                                <div class="lang-item" data-lang="de">German <span class="lang-item-code">DE</span></div>
                                <div class="lang-item" data-lang="ko">Korean <span class="lang-item-code">KR</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="google_translate_element" style="display:none !important"></div>
            `;
            const themePill = desktopNavRight.querySelector('.theme-pill');
            if (themePill) desktopNavRight.insertBefore(translateDiv, themePill);
            else desktopNavRight.insertAdjacentElement('afterbegin', translateDiv);

            // Desktop selection logic
            translateDiv.addEventListener('click', (e) => {
                const item = e.target.closest('.lang-item');
                if (item) {
                    const langCode = item.getAttribute('data-lang');
                    const combo = document.querySelector('.goog-te-combo');
                    if (combo) {
                        combo.value = langCode;
                        combo.dispatchEvent(new Event('change'));
                        
                        // Update UI
                        document.querySelectorAll('.lang-item').forEach(li => li.classList.remove('active'));
                        item.classList.add('active');
                    }
                }
            });
        }

        if (mobileNavLinks) {
            const li = document.createElement('li');
            li.className = 'mobile-translation-item';
            li.innerHTML = `
                <i class="fa-solid fa-language"></i>
                <span class="nav-lang-code">EN</span>
                <div id="google_translate_element_mobile"></div>
            `;
            mobileNavLinks.appendChild(li);
        }

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
            }, 'google_translate_element');
            if (document.getElementById('google_translate_element_mobile')) {
                new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    autoDisplay: false
                }, 'google_translate_element_mobile');
            }

            // Clean up dynamically
            const langMap = {
                'English': 'EN', 'Hindi': 'HI', 'French': 'FR', 'German': 'DE', 'Spanish': 'ES', 'Italian': 'IT', 'Japanese': 'JP',
                'Korean': 'KR', 'Chinese (Simplified)': 'CN', 'Chinese (Traditional)': 'TW', 'Russian': 'RU', 'Arabic': 'AR',
                'Portuguese': 'PT', 'Dutch': 'NL', 'Turkish': 'TR', 'Vietnamese': 'VN', 'Indonesian': 'ID', 'Thai': 'TH',
                'Bengali': 'BN', 'Marathi': 'MR', 'Telugu': 'TE', 'Tamil': 'TA', 'Gujarati': 'GU', 'Kannada': 'KN', 'Malayalam': 'ML',
                'Punjabi': 'PA', 'Hawaiian': 'HW'
            };

            const cleanBranding = () => {
                // 1. Hide top bar and frames without removing them (keeps Google logic happy)
                const bannerFrames = document.querySelectorAll('iframe.goog-te-banner-frame, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame');
                bannerFrames.forEach(f => {
                    f.style.setProperty('display', 'none', 'important');
                    f.style.setProperty('visibility', 'hidden', 'important');
                    f.style.setProperty('height', '0px', 'important');
                    f.style.setProperty('opacity', '0', 'important');
                });

                // Physically remove Google's top bar classes from body
                if (document.body.classList.contains('skiptranslate')) {
                    document.body.classList.remove('skiptranslate');
                }
                document.body.style.top = '0px';

                // 2. Sync the display spans
                const combos = document.querySelectorAll('.goog-te-combo');
                const codes = document.querySelectorAll('.nav-lang-code');

                combos.forEach(combo => {
                    const selectedOpt = combo.options[combo.selectedIndex];
                    if (selectedOpt) {
                        const isOriginal = selectedOpt.value === '';
                        const fullText = selectedOpt.getAttribute('data-full-text') || selectedOpt.text;

                        if (!selectedOpt.getAttribute('data-full-text') && !isOriginal) {
                            selectedOpt.setAttribute('data-full-text', selectedOpt.text);
                        }

                        let code = 'EN';
                        if (!isOriginal) {
                            code = langMap[fullText] || (fullText.length > 2 ? fullText.substring(0, 2).toUpperCase() : fullText);
                        }

                        // Update the UI codes
                        codes.forEach(c => {
                            if (c.textContent !== code) c.textContent = code;
                        });

                        // DYNAMIC HTML LANG UPDATE (Fixes the "Browser Translation Bar" popup)
                        const htmlLang = code.toLowerCase();
                        if (document.documentElement.lang !== htmlLang) {
                            document.documentElement.lang = htmlLang;
                        }
                    }
                });

                // 3. Hide redundant text nodes and Google signatures
                const gadgets = document.querySelectorAll('.goog-te-gadget');
                gadgets.forEach(gadget => {
                    gadget.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.textContent.trim().length > 0) {
                            node.textContent = '';
                        }
                    });
                });

                // 4. Force body position to top (Google likes to add top: 40px)
                if (document.body.style.top !== '0px' && document.body.style.top !== '') {
                    document.body.style.setProperty('top', '0px', 'important');
                }
            };



            cleanBranding();
            setInterval(cleanBranding, 800);
        };


        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(script);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
