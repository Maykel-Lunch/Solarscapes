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
console.log('📁 Base Path:', APP.BASE_URL || '/ (root)');

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
 * FIX PATHS - THE AGGRESSIVE VERSION
 * ============================================
 */
function fixIncludePaths(root) {
    const basePath = APP.BASE_URL;
    
    console.log('🔧 FIXING PATHS - AGGRESSIVE MODE ACTIVATED!');
    console.log('  Base Path:', basePath || '/');
    console.log('  Root element:', root);
    
    // FIX EVERY SINGLE LINK
    const allLinks = root.querySelectorAll('a[href]');
    console.log('  Found', allLinks.length, 'links to fix');
    
    allLinks.forEach(function(link, index) {
        let href = link.getAttribute('href');
        const original = href;
        
        // Skip empty or anchor links
        if (!href || href === '#' || href.startsWith('#')) return;
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
        if (href.startsWith('data:')) return;
        
        // ===== THE MAGIC FIX =====
        // If link starts with /pages/ but NOT /Solarscapes/pages/
        if (href.startsWith('/pages/') && !href.startsWith('/Solarscapes/pages/')) {
            // Add /Solarscapes/ to the beginning
            href = '/Solarscapes' + href;
            console.log('  ✏️  Fixed link #' + (index + 1) + ':', original, '→', href);
        }
        // If link starts with pages/ (no slash)
        else if (href.startsWith('pages/')) {
            href = '/Solarscapes/' + href;
            console.log('  ✏️  Fixed link #' + (index + 1) + ':', original, '→', href);
        }
        // If link starts with /assets/ but NOT /Solarscapes/assets/
        else if (href.startsWith('/assets/') && !href.startsWith('/Solarscapes/assets/')) {
            href = '/Solarscapes' + href;
            console.log('  ✏️  Fixed asset #' + (index + 1) + ':', original, '→', href);
        }
        // If link is root-relative and we're on GitHub Pages
        else if (href.startsWith('/') && APP.isProduction && !href.startsWith('/Solarscapes/')) {
            href = '/Solarscapes' + href;
            console.log('  ✏️  Fixed root link #' + (index + 1) + ':', original, '→', href);
        }
        
        link.setAttribute('href', href);
    });
    
    // FIX EVERY SINGLE IMAGE
    const allImages = root.querySelectorAll('img[src]');
    console.log('  Found', allImages.length, 'images to fix');
    
    allImages.forEach(function(img, index) {
        let src = img.getAttribute('src');
        const original = src;
        
        if (!src) return;
        if (src.startsWith('http') || src.startsWith('data:')) return;
        
        if (src.startsWith('/assets/') && !src.startsWith('/Solarscapes/assets/')) {
            src = '/Solarscapes' + src;
            console.log('  ✏️  Fixed image #' + (index + 1) + ':', original, '→', src);
        }
        
        img.setAttribute('src', src);
    });
    
    console.log('✅ Done fixing paths!');
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
    // DETECT PAGE DEPTH
    const path = window.location.pathname;
    let depth = '';
    
    if (path.includes('/pages/learning/') || path.includes('/pages/main/') || path.includes('/pages/tools/')) {
        depth = '../../';
        console.log('📁 Page depth: 2 levels (pages/*/)');
    } else if (path.includes('/pages/')) {
        depth = '../';
        console.log('📁 Page depth: 1 level (pages/)');
    } else {
        depth = './';
        console.log('📁 Page depth: Root');
    }
    
    // LOAD HEADER
    const headerPath = depth + 'includes/header.html';
    const footerPath = depth + 'includes/footer.html';
    
    console.log('📄 Loading header from:', headerPath);
    console.log('📄 Loading footer from:', footerPath);
    
    // Load header
    $('#navbar-placeholder').load(headerPath, function(response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading header:', xhr.status, xhr.statusText);
            console.error('❌ Tried to load from:', headerPath);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }
        console.log('✅ Header loaded successfully!');
        
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            // FIX ALL PATHS
            fixIncludePaths(navPlaceholder);
            // INIT DROPDOWNS
            initDropdowns(navPlaceholder);
            console.log('✅ Header setup complete!');
        }
    });
    
    // Load footer
    $('#footer-placeholder').load(footerPath, function(response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading footer:', xhr.status, xhr.statusText);
            console.error('❌ Tried to load from:', footerPath);
            $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
            return;
        }
        console.log('✅ Footer loaded successfully!');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            fixIncludePaths(footerPlaceholder);
        }
    });
});