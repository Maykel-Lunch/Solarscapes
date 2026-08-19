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
 * FIX PATHS IN LOADED CONTENT
 * ============================================
 */
function fixIncludePaths(root) {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'Solarscapes';
    const basePath = isGitHubPages ? '/' + repoName : '';
    
    console.log('🔧 Fixing paths in loaded content...');
    console.log('  Base path:', basePath || '/');
    
    function rewrite(el, attr) {
        let value = el.getAttribute(attr);
        if (!value || value === '#' || value.startsWith('#')) return;
        if (value.startsWith('http') || value.startsWith('mailto') || value.startsWith('tel')) return;
        if (value.startsWith('data:')) return;
        
        const original = value;
        
        // Clean the path - remove any /Solarscapes/ prefix
        value = value.replace(/^\/Solarscapes\//, '/');
        value = value.replace(/^\/Solarscapes$/, '/');
        value = value.replace(/^Solarscapes\//, '/');
        
        // Make it root-relative
        if (!value.startsWith('/')) {
            value = '/' + value;
        }
        
        // Add base path if in production (GitHub Pages)
        if (isGitHubPages) {
            value = basePath + value;
        }
        
        if (original !== value) {
            console.log('  ✏️  Fixed:', original, '→', value);
        }
        
        el.setAttribute(attr, value);
    }
    
    // Fix ALL links
    const allLinks = root.querySelectorAll('[href]');
    console.log('  Found', allLinks.length, 'links to fix');
    allLinks.forEach(el => rewrite(el, 'href'));
    
    // Fix ALL images
    const allImages = root.querySelectorAll('[src]');
    console.log('  Found', allImages.length, 'images to fix');
    allImages.forEach(el => rewrite(el, 'src'));
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
    
    // Load header
    const headerPath = depth + 'includes/header.html';
    const footerPath = depth + 'includes/footer.html';
    
    console.log('📄 Loading header from:', headerPath);
    console.log('📄 Loading footer from:', footerPath);
    
    // Load header
    $('#navbar-placeholder').load(headerPath, function(response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading header:', xhr.status, xhr.statusText);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }
        console.log('✅ Header loaded successfully!');
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            fixIncludePaths(navPlaceholder);
            initDropdowns(navPlaceholder);
        }
    });
    
    // Load footer
    $('#footer-placeholder').load(footerPath, function(response, status, xhr) {
        if (status === 'error') {
            console.error('❌ Error loading footer:', xhr.status, xhr.statusText);
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