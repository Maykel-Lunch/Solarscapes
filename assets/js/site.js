// Favicon — injected here since header.html loads into <body>, not <head>
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

// ===== FUNCTION TO FIX ROOT-RELATIVE PATHS =====
function fixIncludePaths(root) {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    function rewrite(el, attr) {
        let value = el.getAttribute(attr);
        if (!value || value === '#' || value.startsWith('#')) return;
        if (!value.startsWith('/')) return;

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
    // DETECT ENVIRONMENT
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    // ===== CRITICAL FIX: Determine the correct path to includes =====
    // Get the current page path and calculate how many levels deep we are
    const pathname = window.location.pathname;
    let relativePath = '';
    
    // Check if we're in a subfolder
    if (pathname.includes('/pages/learning/')) {
        relativePath = '../../';
    } else if (pathname.includes('/pages/main/')) {
        relativePath = '../../';
    } else if (pathname.includes('/pages/tools/')) {
        relativePath = '../../';
    } else if (pathname.includes('/pages/')) {
        relativePath = '../';
    } else {
        relativePath = './';
    }

    // For GitHub Pages, we need to handle the subpath differently
    // If on GitHub Pages, the basePath already includes /Solarscapes/
    const headerPath = isGitHubPages 
        ? basePath + '/includes/header.html'  // GitHub: /Solarscapes/includes/header.html
        : relativePath + 'includes/header.html'; // Local: ../../includes/header.html

    const footerPath = isGitHubPages
        ? basePath + '/includes/footer.html'
        : relativePath + 'includes/footer.html';

    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Load header
    if (navPlaceholder) {
        $(navPlaceholder).load(headerPath, function (response, status, xhr) {
            if (status === 'error') {
                console.log('Error loading header: ' + xhr.status + ' ' + xhr.statusText);
                console.log('Tried to load from: ' + headerPath);
                $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
                return;
            }
            fixIncludePaths(navPlaceholder);
            initDropdowns(navPlaceholder);
        });
    }

    // Load footer
    if (footerPlaceholder) {
        $(footerPlaceholder).load(footerPath, function (response, status, xhr) {
            if (status === 'error') {
                console.log('Error loading footer: ' + xhr.status + ' ' + xhr.statusText);
                console.log('Tried to load from: ' + footerPath);
                $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
                return;
            }
            fixIncludePaths(footerPlaceholder);
        });
    }
});