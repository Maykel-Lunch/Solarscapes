// Favicon — injected here since header.html loads into <body>, not <head>,
// so a <link rel="icon"> placed in the partial itself wouldn't be honored.
(function () {
    // DETECT ENVIRONMENT
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

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

// ===== FUNCTION TO FIX ROOT-RELATIVE PATHS IN AN INJECTED PARTIAL =====
// Works for both header.html and footer.html — rewrites any href/src that
// starts with "/" (root-relative) so it resolves correctly whether the site
// is served from the domain root (local/custom domain) or from a GitHub
// Pages project subpath (e.g. /Solarscapes/).
function fixIncludePaths(root) {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    function rewrite(el, attr) {
        let value = el.getAttribute(attr);
        if (!value || value === '#' || value.startsWith('#')) return;
        // Only touch root-relative paths (leave http(s)://, mailto:, etc. alone)
        if (!value.startsWith('/')) return;

        // Strip any existing /Solarscapes prefix so this is safe to run
        // multiple times / on already-fixed markup without doubling up.
        value = value.replace(new RegExp('^/' + repoName + '(?=/|$)'), '');

        el.setAttribute(attr, basePath + value);
    }

    root.querySelectorAll('[href^="/"]').forEach(function (el) {
        rewrite(el, 'href');
    });
    root.querySelectorAll('[src^="/"]').forEach(function (el) {
        rewrite(el, 'src');
    });
}

$(document).ready(function () {
    // Detect environment for loading
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Load header — absolute path, resolves the same from any folder depth
    $('#navbar-placeholder').load(basePath + '/includes/header.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading header: ' + xhr.status + ' ' + xhr.statusText);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }

        fixIncludePaths(navPlaceholder);
        initDropdowns(navPlaceholder);
    });

    // Load footer — same approach
    $('#footer-placeholder').load(basePath + '/includes/footer.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading footer: ' + xhr.status + ' ' + xhr.statusText);
            $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
            return;
        }

        fixIncludePaths(footerPlaceholder);
    });
});