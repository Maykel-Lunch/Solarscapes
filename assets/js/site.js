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

// ===== NEW: FUNCTION TO FIX PATHS IN HEADER =====
function fixHeaderPaths(root) {
    // Detect environment
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';
    
    // Fix logo image
    const logo = root.querySelector('.logo');
    if (logo) {
        let src = logo.getAttribute('src');
        // Remove any existing /Solarscapes/ prefix (if any)
        src = src.replace(/^\/Solarscapes/, '');
        // Add correct base path
        logo.src = basePath + src;
    }
    
    // Fix navbar brand link
    const brand = root.querySelector('.navbar-brand');
    if (brand) {
        let href = brand.getAttribute('href');
        href = href.replace(/^\/Solarscapes/, '');
        brand.href = basePath + href;
    }
    
    // Fix all dropdown links and nav links
    root.querySelectorAll('.dropdown-item, .nav-link[href^="/"]').forEach(function(link) {
        let href = link.getAttribute('href');
        // Skip if it's just "#" or empty
        if (!href || href === '#' || href.startsWith('#')) return;
        
        // Remove any existing /Solarscapes/ prefix
        href = href.replace(/^\/Solarscapes/, '');
        // Add correct base path
        link.href = basePath + href;
    });
}

$(document).ready(function () {
    // Detect environment for loading
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    
    // Determine relative path for loading includes
    // This detects if we're in a subfolder (pages/learning/, pages/main/, etc.)
    const pathDepth = window.location.pathname.split('/').filter(p => p && p !== repoName).length;
    const relativePath = pathDepth > 0 ? '../'.repeat(pathDepth) : './';
    
    const placeholder = document.getElementById('navbar-placeholder');

    // Load header
    $('#navbar-placeholder').load(relativePath + 'includes/header.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading header: ' + xhr.status + ' ' + xhr.statusText);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }
        
        // Initialize dropdowns
        initDropdowns(placeholder);
        
        // ===== NEW: FIX ALL PATHS in the header =====
        fixHeaderPaths(placeholder);
    });

    // Load footer
    $('#footer-placeholder').load(relativePath + 'includes/footer.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading footer: ' + xhr.status + ' ' + xhr.statusText);
            $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
        }
    });
});