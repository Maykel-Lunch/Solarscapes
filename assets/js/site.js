// Favicon — injected here since header.html loads into <body>, not <head>
(function () {
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

// ===== FIX ALL PATHS IN THE HEADER =====
function fixIncludePaths(root) {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    console.log('🔧 Fixing paths in header...');
    console.log('isGitHubPages:', isGitHubPages);
    console.log('basePath:', basePath);

    // Fix ALL links
    root.querySelectorAll('a[href]').forEach(function (el) {
        let href = el.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#')) return;
        if (href.startsWith('http') || href.startsWith('mailto')) return;
        
        // Original for debugging
        const original = href;
        
        // Remove any /Solarscapes/ prefix
        href = href.replace(/^\/Solarscapes\//, '/');
        href = href.replace(/^\/Solarscapes$/, '/');
        
        // Remove any Solarscapes/ prefix (no slash)
        href = href.replace(/^Solarscapes\//, '/');
        
        // Make sure it starts with /
        if (!href.startsWith('/')) {
            href = '/' + href;
        }
        
        // Add basePath if on GitHub
        if (isGitHubPages) {
            href = '/Solarscapes' + href;
        }
        
        if (original !== href) {
            console.log('  ✏️  Fixed:', original, '→', href);
        }
        el.setAttribute('href', href);
    });

    // Fix all images
    root.querySelectorAll('img[src]').forEach(function (el) {
        let src = el.getAttribute('src');
        if (!src || src.startsWith('http') || src.startsWith('data:')) return;
        
        const original = src;
        src = src.replace(/^\/Solarscapes\//, '/');
        src = src.replace(/^Solarscapes\//, '/');
        
        if (!src.startsWith('/')) {
            src = '/' + src;
        }
        
        if (isGitHubPages) {
            src = '/Solarscapes' + src;
        }
        
        if (original !== src) {
            console.log('  ✏️  Fixed image:', original, '→', src);
        }
        el.setAttribute('src', src);
    });
}

$(document).ready(function () {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';

    console.log('🚀 Site loaded!');
    console.log('Environment:', isGitHubPages ? 'GitHub Pages' : 'Local');
    console.log('Base path:', basePath);

    // Load header
    const headerPath = basePath + '/includes/header.html';
    console.log('📄 Loading header from:', headerPath);
    
    $('#navbar-placeholder').load(headerPath, function (response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading header:', xhr.status, xhr.statusText);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }
        console.log('✅ Header loaded successfully!');
        
        const navPlaceholder = document.getElementById('navbar-placeholder');
        fixIncludePaths(navPlaceholder);
        initDropdowns(navPlaceholder);
    });

    // Load footer
    const footerPath = basePath + '/includes/footer.html';
    console.log('📄 Loading footer from:', footerPath);
    
    $('#footer-placeholder').load(footerPath, function (response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading footer:', xhr.status, xhr.statusText);
            $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
            return;
        }
        console.log('✅ Footer loaded successfully!');
        fixIncludePaths(document.getElementById('footer-placeholder'));
    });
});