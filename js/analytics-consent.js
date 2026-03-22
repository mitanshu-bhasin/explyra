(function () {
    const CONSENT_KEY = 'explyra-cookie-consent';
    const ANALYTICS_KEY = 'explyra-analytics-enabled';
    const GA_ID = 'G-TFBZ5GZ22C';

    function hasAnalyticsConsent() {
        return localStorage.getItem(CONSENT_KEY) === 'true' && localStorage.getItem(ANALYTICS_KEY) === 'true';
    }

    function initAnalytics() {
        if (window.__explyraAnalyticsInitialized) return;
        window.__explyraAnalyticsInitialized = true;

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', GA_ID);
        window.gtag = gtag;
    }

    if (hasAnalyticsConsent()) {
        initAnalytics();
    }

    window.addEventListener('explyra-cookie-updated', function (event) {
        const detail = event && event.detail ? event.detail : {};
        if (detail.consent === true && detail.analyticsEnabled === true) {
            initAnalytics();
        }
    });

    window.addEventListener('storage', function () {
        if (hasAnalyticsConsent()) {
            initAnalytics();
        }
    });
})();
