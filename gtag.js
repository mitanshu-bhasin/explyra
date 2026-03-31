(function () {
            const gaId = window.EXPLYRA_CONFIG?.analyticsId || 'G-TFBZ5GZ22C';
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', gaId);
            window.gtag = gtag;
        })();
