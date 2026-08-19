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

$(document).ready(function () {
    const placeholder = document.getElementById('navbar-placeholder');
    const basePath = window.location.pathname.indexOf('/pages/') !== -1 ? '../../' : '';

    $('#navbar-placeholder').load(basePath + 'includes/header.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading header: ' + xhr.status + ' ' + xhr.statusText);
            $('#navbar-placeholder').html('<div class="alert alert-danger m-3">Failed to load navigation. Please refresh the page.</div>');
            return;
        }
        initDropdowns(placeholder);
    });

    $('#footer-placeholder').load(basePath + 'includes/footer.html', function (response, status, xhr) {
        if (status === 'error') {
            console.log('Error loading footer: ' + xhr.status + ' ' + xhr.statusText);
            $('#footer-placeholder').html('<div class="alert alert-danger m-3">Failed to load footer. Please refresh the page.</div>');
        }
    });
});
