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
        .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate, #goog-gt-tt, .goog-te-balloon-frame, .goog-te-tip-frame, .goog-te-banner, .VIpgJd-Zvi9fq-ahS06b-bN99Vc, iframe.goog-te-banner-frame {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
        }

        /* Google Translate Menu Styling (The "White Box" fix) */
        .goog-te-menu-frame {
            box-shadow: 0 16px 48px rgba(0,0,0,0.18) !important;
            border: 1px solid var(--bdr2, #E4E1DB) !important;
            border-radius: 16px !important;
            overflow: hidden !important;
        }
        /* Dark mode trick for the iframe content */
        [data-theme="dark"] .goog-te-menu-frame {
            filter: invert(0.88) hue-rotate(180deg) !important;
            box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important;
        }

        .nav-translation {
            display: flex;
            align-items: center;
            background: var(--bg3);
            border: 1px solid var(--bdr2);
            border-radius: 100px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            height: 36px;
            position: relative;
            overflow: hidden; 
            padding: 0 12px;
            margin-right: 12px; /* Increased gap for better breathing room */
        }
        .nav-translation:hover { 
            border-color: var(--blue);
            background: var(--bg2);
            transform: translateY(-1px) scale(1.02);
            box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }
        .nav-translation i { font-size: 0.95rem; color: var(--blue); pointer-events: none; margin-right: 8px; }
        
        /* Make the Google element and its combo fill the whole pill */
        #google_translate_element, .goog-te-gadget, .goog-te-combo {
            width: 100%;
            height: 100%;
            display: flex !important;
            align-items: center;
            justify-content: center;
        }
        .goog-te-gadget .goog-te-combo {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            font-size: 0.85rem;
            font-weight: 700;
            color: transparent !important; 
            outline: none;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            text-align: center;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
        }
        
        .nav-lang-code {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--ink, #0D1117);
            text-transform: uppercase;
            pointer-events: none;
            z-index: 1;
            margin-right: 8px;
        }
        [data-theme="dark"] .nav-lang-code { color: #fff; }
        
        /* Custom arrow for the pill */
        .nav-translation::after {
            content: "\f078";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            font-size: 0.6rem;
            color: var(--ink, #0D1117);
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 1;
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-translation:hover::after { transform: translateY(-50%) scale(1.1); font-weight: 950; }
        [data-theme="dark"] .nav-translation::after { color: #fff; }

        @media (max-width: 1023px) {
            .mobile-translation-item {
                padding: 1.2rem 1.5rem;
                border-top: 1px solid var(--bdr);
                margin-top: 1rem;
                display: flex;
                align-items: center;
                gap: 12px;
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
                <form class="fsb-wrapper" id="footSearchForm">
                    <input type="text" class="fsb-input" placeholder="Search everywhere..." required>
                    <button type="submit" class="fsb-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
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

        const form = document.getElementById('footSearchForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const q = e.target.querySelector('input').value.trim();
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
                <div id="google_translate_element"></div>
            `;
            const themePill = desktopNavRight.querySelector('.theme-pill');
            if (themePill) desktopNavRight.insertBefore(translateDiv, themePill);
            else desktopNavRight.insertAdjacentElement('afterbegin', translateDiv);
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
                const iframes = document.querySelectorAll('iframe.goog-te-banner-frame, .goog-te-banner-frame, #goog-gt-tt');
                iframes.forEach(f => {
                    f.style.setProperty('display', 'none', 'important');
                    f.style.setProperty('visibility', 'hidden', 'important');
                    f.style.setProperty('opacity', '0', 'important');
                    f.style.setProperty('pointer-events', 'none', 'important');
                });
                document.body.style.top = '0px';

                // 2. Sync the display spans and add "Show Original"
                const combos = document.querySelectorAll('.goog-te-combo');
                const codes = document.querySelectorAll('.nav-lang-code');

                combos.forEach(combo => {
                    // Ensure "Show Original" exists and is clear
                    if (combo.options.length > 0 && combo.options[0].value === '') {
                        if (combo.options[0].text !== 'Original' && combo.options[0].text !== 'Show Original') {
                            combo.options[0].text = 'Show Original';
                        }
                    }

                    const selectedOpt = combo.options[combo.selectedIndex];
                    if (selectedOpt) {
                        const isOriginal = selectedOpt.value === '';
                        const fullText = selectedOpt.getAttribute('data-full-text') || selectedOpt.text;

                        // Store full text for mapping
                        if (!selectedOpt.getAttribute('data-full-text') && !isOriginal) {
                            selectedOpt.setAttribute('data-full-text', selectedOpt.text);
                        }

                        let code = 'EN';
                        if (!isOriginal) {
                            code = langMap[fullText] || (fullText.length > 2 ? fullText.substring(0, 2).toUpperCase() : fullText);
                        }

                        codes.forEach(c => {
                            if (c.textContent !== code) c.textContent = code;
                        });
                    }
                });

                // 3. Hide redundant text nodes
                const gadgets = document.querySelectorAll('.goog-te-gadget');
                gadgets.forEach(gadget => {
                    gadget.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.textContent.trim().length > 0) {
                            node.textContent = '';
                        }
                    });
                });

                // 4. Force body position (Google often adds top: 40px)
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
