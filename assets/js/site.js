/**
 * ============================================
 * SITE CONFIGURATION
 * ============================================
 */
const APP = (function() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    return {
        isProduction: isGitHubPages,
        isDevelopment: !isGitHubPages,
        get BASE_URL() { return basePath; },
        get INCLUDES_URL() { return basePath + '/includes'; },
        get ASSETS_URL() { return basePath + '/assets'; },
        get IMAGES_URL() { return basePath + '/assets/img'; },
        get PAGES_URL() { return basePath + '/pages'; },
        path: function(relativePath) { return basePath + relativePath; }
    };
})();

console.log('🌍 Environment:', APP.isProduction ? 'Production' : 'Development');

/**
 * ============================================
 * DROPDOWN FUNCTIONALITY
 * ============================================
 */
function initDropdowns(root) {
    const toggles = root.querySelectorAll('.nav-item.dropdown > .dropdown-toggle');

    function closeAll(except) {
        root.querySelectorAll('.dropdown-menu.show').forEach(function (menu) {
            if (menu === except) return;
            menu.classList.remove('show');
            const toggle = menu.previousElementSibling;
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    toggles.forEach(function (toggle) {
        const menu = toggle.nextElementSibling;
        if (!menu || !menu.classList.contains('dropdown-menu')) return;

        menu.style.position = 'fixed';
        menu.style.margin = '0';
        menu.style.zIndex = '99999';

        function positionMenu() {
            const rect = toggle.getBoundingClientRect();
            menu.style.top = rect.bottom + 'px';
            menu.style.left = rect.left + 'px';
        }

        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = menu.classList.contains('show');
            closeAll(isOpen ? null : menu);
            if (!isOpen) positionMenu();
            menu.classList.toggle('show', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
        });

        window.addEventListener('resize', function () {
            if (menu.classList.contains('show')) positionMenu();
        });
        window.addEventListener('scroll', function () {
            if (menu.classList.contains('show')) positionMenu();
        }, true);
    });

    document.addEventListener('click', function (event) {
        if (!root.contains(event.target)) closeAll();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeAll();
    });
}

/**
 * ============================================
 * PATH FIXING FOR INJECTED PARTIALS
 * ============================================
 * header.html and footer.html are static files shared across every page,
 * loaded via $.load(). They hardcode root-relative paths like
 * "/index.html" or "/assets/img/Logo.png" so the SAME file resolves the
 * same way regardless of which page/folder-depth loaded it.
 *
 * Root-relative paths always resolve from the actual domain root. Locally
 * (served from the project root) that's correct as-is. On GitHub Pages
 * project sites the domain root is one level ABOVE the repo
 * (e.g. https://username.github.io/), so a raw "/assets/img/Logo.png"
 * 404s there; it needs to become "/Solarscapes/assets/img/Logo.png".
 *
 * This function rewrites every root-relative href/src inside a freshly
 * injected partial by prefixing it with APP.BASE_URL (empty string
 * locally, "/Solarscapes" on GitHub Pages). Safe to run more than once —
 * it strips any existing "/Solarscapes" prefix before re-adding it, so it
 * won't double up.
 */
function fixIncludePaths(root) {
    const basePath = APP.BASE_URL;
    const repoName = 'Solarscapes';
    const repoPrefixPattern = new RegExp('^/' + repoName + '(?=/|$)');

    function rewrite(el, attr) {
        let value = el.getAttribute(attr);
        if (!value) return;
        // Leave "#", empty, and non-root-relative URLs (http(s)://, mailto:, etc.) alone
        if (value === '#' || value.startsWith('#')) return;
        if (!value.startsWith('/')) return;

        // Strip any existing /Solarscapes prefix so re-running this is safe
        value = value.replace(repoPrefixPattern, '');

        el.setAttribute(attr, basePath + value);
    }

    root.querySelectorAll('[href^="/"]').forEach(function (el) {
        rewrite(el, 'href');
    });
    root.querySelectorAll('[src^="/"]').forEach(function (el) {
        rewrite(el, 'src');
    });
}

/**
 * ============================================
 * FAVICON INJECTION
 * ============================================
 */
(function() {
    const basePath = APP.BASE_URL;

    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = basePath + '/assets/img/Logo.png';
    document.head.appendChild(icon);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = basePath + '/assets/img/Logo.png';
    document.head.appendChild(appleIcon);
})();

/**
 * ============================================
 * MAIN INITIALIZATION
 * ============================================
 */
$(document).ready(function () {
    // Determine depth for loading includes
    const path = window.location.pathname;
    let depth = '';

    if (path.includes('/pages/learning/') || path.includes('/pages/main/') || path.includes('/pages/tools/')) {
        depth = '../../';
    } else if (path.includes('/pages/')) {
        depth = '../';
    } else {
        depth = './';
    }

    const headerPath = depth + 'includes/header.html';
    const footerPath = depth + 'includes/footer.html';

    console.log('📄 Loading header from:', headerPath);

    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    $('#navbar-placeholder').load(headerPath, function (response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading header:', xhr.status);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation.</div>');
            return;
        }
        console.log('✅ Header loaded!');

        fixIncludePaths(navPlaceholder);
        initDropdowns(navPlaceholder);
    });

    $('#footer-placeholder').load(footerPath, function (response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading footer:', xhr.status);
            return;
        }
        console.log('✅ Footer loaded!');

        fixIncludePaths(footerPlaceholder);
    });
});