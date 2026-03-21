(function () {
    function normalizePath(path) {
        if (!path) return '/';
        return path.startsWith('/') ? path : `/${path}`;
    }

    function isExternalHref(href) {
        return /^([a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#');
    }

    function isCompanyId(value) {
        return /^cmp_[a-z0-9]+$/i.test(String(value || '').trim());
    }

    function getCompanyIdFromPath(pathname) {
        const path = normalizePath(pathname || window.location.pathname);
        const segments = path.split('/').filter(Boolean);
        if (!segments.length) return null;
        return isCompanyId(segments[0]) ? segments[0] : null;
    }

    function getCompanyIdFromStorage() {
        const keys = ['companyId', 'company_id', 'explyraCompanyId'];
        for (const key of keys) {
            const value = localStorage.getItem(key);
            if (isCompanyId(value)) return value;
        }

        try {
            const sessionRaw = localStorage.getItem('company_session');
            if (sessionRaw) {
                const session = JSON.parse(sessionRaw);
                if (isCompanyId(session?.companyId)) return session.companyId;
            }
        } catch (e) {
            // Ignore malformed cache.
        }

        return null;
    }

    function getCurrentCompanyId() {
        return getCompanyIdFromPath() || getCompanyIdFromStorage();
    }

    function buildTenantPath(targetPath, companyId) {
        const cid = companyId || getCurrentCompanyId();
        if (!isCompanyId(cid)) return normalizePath(targetPath);

        const cleanTarget = String(targetPath || '')
            .replace(/^\/+/, '')
            .replace(/^cmp_[a-z0-9]+\//i, '');

        return `/${cid}/${cleanTarget}`;
    }

    function buildTenantUrl(targetPath, companyId) {
        const tenantPath = buildTenantPath(targetPath, companyId);
        const host = (window.location.hostname || '').toLowerCase();
        if (host === 'comp.explyra.me') {
            return tenantPath;
        }
        return `https://comp.explyra.me${tenantPath}`;
    }

    function toTenantAwareHref(href, options) {
        const original = String(href || '').trim();
        if (!original || isExternalHref(original)) return original;

        const companyId = options?.companyId || getCurrentCompanyId();
        const forcePrefix = Boolean(options?.forcePrefix);

        if (!isCompanyId(companyId)) return original;

        const link = original.replace(/^\/+/, '');
        const needsPrefix = forcePrefix ||
            /^admin\.html(?:[?#].*)?$/i.test(link) ||
            /^emp\.html(?:[?#].*)?$/i.test(link) ||
            /^benifits\.html(?:[?#].*)?$/i.test(link) ||
            /^crm(?:\/.*)?$/i.test(link) ||
            /^attendance\/company(?:\/.*)?$/i.test(link);

        if (!needsPrefix) return original;
        return buildTenantPath(link, companyId);
    }

    function applyTenantLinkTransform(options) {
        const companyId = options?.companyId || getCurrentCompanyId();
        if (!isCompanyId(companyId)) return;

        const forcePrefix = Boolean(options?.forcePrefix);
        const anchors = document.querySelectorAll('a[href]');
        anchors.forEach((anchor) => {
            const rewritten = toTenantAwareHref(anchor.getAttribute('href'), { companyId, forcePrefix });
            if (rewritten && rewritten !== anchor.getAttribute('href')) {
                anchor.setAttribute('href', rewritten);
            }
        });
    }

    function redirectToTenantPath(targetPath, companyId) {
        window.location.href = buildTenantUrl(targetPath, companyId);
    }

    window.ExplyraTenant = {
        isCompanyId,
        getCompanyIdFromPath,
        getCompanyIdFromStorage,
        getCurrentCompanyId,
        buildTenantPath,
        buildTenantUrl,
        toTenantAwareHref,
        applyTenantLinkTransform,
        redirectToTenantPath
    };
})();
