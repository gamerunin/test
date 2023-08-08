$(document).ready(function() {
    const navMenu = $('#nav-menu');

    $('#mobile-menu-button').click(function() {
        navMenu.toggleClass('nav--mobile-hidden');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('#nav-menu, #mobile-menu-button').length) {
            if (!navMenu.hasClass('nav--mobile-hidden')) {
                navMenu.addClass('nav--mobile-hidden');
            }
        }
    });
});