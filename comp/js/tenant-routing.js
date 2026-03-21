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

    function shouldEnforceTenantRouting(hostname) {
        const host = String(hostname || window.location.hostname || '').toLowerCase();
        return host === 'comp.explyra.me' || host === 'explyra.me' || host.endsWith('.explyra.me');
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
        const isLocalDev = host === 'localhost' || host.startsWith('127.') || host === '0.0.0.0' || host === '[::1]' || host.endsWith('.local');

        if (isLocalDev) {
            return `${window.location.origin}${tenantPath}`;
        }

        if (host === 'comp.explyra.me') {
            return tenantPath;
        }

        if (!host.endsWith('explyra.me')) {
            return `${window.location.origin}${tenantPath}`;
        }

        return `https://comp.explyra.me${tenantPath}`;
    }

    function toTenantAwareHref(href, options) {
        const original = String(href || '').trim();
        if (!original || isExternalHref(original)) return original;

        if (!shouldEnforceTenantRouting()) return original;

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

    function toTenantAwareNavigationUrl(url, companyId) {
        if (url == null) return url;

        if (!shouldEnforceTenantRouting()) return String(url);

        const raw = String(url).trim();
        if (!raw || raw.startsWith('#')) return raw;
        if (/^(mailto:|tel:|javascript:)/i.test(raw)) return raw;

        try {
            const parsed = new URL(raw, window.location.origin);
            const host = (parsed.hostname || '').toLowerCase();
            const currentHost = (window.location.hostname || '').toLowerCase();
            const isLocalTenantHost = host === currentHost || host === 'comp.explyra.me';
            if (!isLocalTenantHost) return raw;

            const rebuiltPath = buildTenantPath(parsed.pathname || '/', companyId);
            const rebuilt = `${rebuiltPath}${parsed.search || ''}${parsed.hash || ''}`;
            if (parsed.origin === window.location.origin) return rebuilt;
            return `${parsed.origin}${rebuilt}`;
        } catch (e) {
            return raw;
        }
    }

    function enforceTenantNavigation(options) {
        if (!shouldEnforceTenantRouting()) return;

        const companyId = options?.companyId || getCurrentCompanyId();
        if (!isCompanyId(companyId)) return;
        if (window.__explyraTenantNavEnforced) return;

        const rewrite = (url) => toTenantAwareNavigationUrl(url, companyId);

        const rawPushState = history.pushState.bind(history);
        history.pushState = function patchedPushState(state, title, url) {
            return rawPushState(state, title, rewrite(url));
        };

        const rawReplaceState = history.replaceState.bind(history);
        history.replaceState = function patchedReplaceState(state, title, url) {
            return rawReplaceState(state, title, rewrite(url));
        };

        document.addEventListener('click', (event) => {
            const anchor = event.target?.closest?.('a[href]');
            if (!anchor) return;
            if (event.defaultPrevented) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const href = anchor.getAttribute('href');
            const rewritten = rewrite(href);
            if (!rewritten || rewritten === href) return;

            event.preventDefault();
            window.location.href = rewritten;
        }, true);

        window.__explyraTenantNavEnforced = true;
    }

    function redirectToTenantPath(targetPath, companyId) {
        if (!shouldEnforceTenantRouting()) {
            window.location.href = normalizePath(targetPath);
            return;
        }
        window.location.href = buildTenantUrl(targetPath, companyId);
    }

    window.ExplyraTenant = {
        isCompanyId,
        getCompanyIdFromPath,
        getCompanyIdFromStorage,
        getCurrentCompanyId,
        shouldEnforceTenantRouting,
        buildTenantPath,
        buildTenantUrl,
        toTenantAwareHref,
        applyTenantLinkTransform,
        toTenantAwareNavigationUrl,
        enforceTenantNavigation,
        redirectToTenantPath
    };

    const autoCompanyId = getCompanyIdFromPath();
    if (isCompanyId(autoCompanyId) && shouldEnforceTenantRouting()) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                applyTenantLinkTransform({ companyId: autoCompanyId, forcePrefix: true });
            });
        } else {
            applyTenantLinkTransform({ companyId: autoCompanyId, forcePrefix: true });
        }
        enforceTenantNavigation({ companyId: autoCompanyId });
    }
})();
