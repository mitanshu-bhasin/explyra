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
        // Only enforce on explyra.me — do NOT include comp.explyra.me to avoid cross-subdomain redirects
        return host === 'explyra.me' || host.endsWith('.explyra.me');
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

    function normalizeWorkspaceTargetPath(path) {
        const value = String(path || '').replace(/^\/+/, '');
        if (!value) return value;

        if (/^admin\.html(?:[?#].*)?$/i.test(value)) return value.replace(/^admin\.html/i, 'admin');
        if (/^emp\.html(?:[?#].*)?$/i.test(value)) return value.replace(/^emp\.html/i, 'emp');
        if (/^benifits\.html(?:[?#].*)?$/i.test(value)) return value.replace(/^benifits\.html/i, 'benifits');
        if (/^crm\/index\.html(?:[?#].*)?$/i.test(value)) return value.replace(/^crm\/index\.html/i, 'crm');

        return value;
    }

    function buildTenantPath(targetPath, companyId) {
        const cid = companyId || getCurrentCompanyId();
        if (!isCompanyId(cid)) return normalizePath(targetPath);

        const cleanTarget = normalizeWorkspaceTargetPath(String(targetPath || '')
            .replace(/^\/+/, '')
            .replace(/^cmp_[a-z0-9]+\//i, ''));

        return `/${cid}/${cleanTarget}`;
    }

    function buildTenantUrl(targetPath, companyId) {
        const tenantPath = buildTenantPath(targetPath, companyId);
        // Always stay on the current origin — never redirect to comp.explyra.me
        return `${window.location.origin}${tenantPath}`;
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
            const isLocalTenantHost = host === currentHost; // Stay same-origin, never cross to comp subdomain
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

    function generateWorkspaceUrl(companyId, page = 'admin.html') {
        if (!isCompanyId(companyId)) return null;
        return buildTenantUrl(page, companyId);
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
        redirectToTenantPath,
        generateWorkspaceUrl
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
        return;
    }

    if (shouldEnforceTenantRouting()) {
        const currentPath = normalizePath(window.location.pathname || '/');
        const canonicalWorkspacePath = normalizeWorkspaceTargetPath(currentPath.replace(/^\//, ''));
        const canonicalNeedsRedirect = /^(admin|emp|benifits)(?:[?#].*)?$/i.test(canonicalWorkspacePath) &&
            /^\/(admin\.html|emp\.html|benifits\.html)(?:\/)?$/i.test(currentPath);

        if (canonicalNeedsRedirect) {
            const canonicalUrl = `/${canonicalWorkspacePath}${window.location.search || ''}${window.location.hash || ''}`;
            window.location.replace(canonicalUrl);
            return;
        }

        const storedCompanyId = getCompanyIdFromStorage();
        const isWorkspacePathWithoutTenant = /^\/(admin|admin\.html|emp|emp\.html|benifits|benifits\.html)(?:\/)?$/i.test(currentPath);

        if (isCompanyId(storedCompanyId) && isWorkspacePathWithoutTenant) {
            const normalizedTarget = normalizeWorkspaceTargetPath(currentPath.replace(/^\//, ''));
            const tenantPath = buildTenantPath(normalizedTarget, storedCompanyId);
            const finalUrl = `${tenantPath}${window.location.search || ''}${window.location.hash || ''}`;
            if (finalUrl !== `${currentPath}${window.location.search || ''}${window.location.hash || ''}`) {
                window.location.replace(finalUrl);
            }
        }
    }
})();
