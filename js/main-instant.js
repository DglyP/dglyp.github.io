// Optimized main.js for instant loading and performance
;(function () {
    'use strict';

    // Immediately show all content when DOM is ready
    function initializeContent() {
        // Force all sections to be visible immediately
        $('.colorlib-about, .colorlib-services, .colorlib-skills, .colorlib-education, .colorlib-experience, .colorlib-work, .colorlib-blog, .colorlib-contact')
            .css({ 'visibility': 'visible', 'opacity': '1' });

        // Remove animation classes and show content
        $('.animate-box').each(function() {
            $(this)
                .removeClass('fadeIn fadeInLeft fadeInRight fadeInUp')
                .css({ 'visibility': 'visible', 'opacity': '1' });
        });

        // Initialize counters without animation
        if ($('#colorlib-counter').length > 0) {
            $('.js-counter').each(function() {
                var $this = $(this);
                var num = $this.data('number');
                $this.text(num);
            });
        }
    }

    // Optimized burger menu
    function burgerMenu() {
        var $body = $('body');
        var $toggle = $('.js-colorlib-nav-toggle');
        
        $toggle.on('click', function(e) {
            e.preventDefault();
            $body.toggleClass('offcanvas');
            $(this).toggleClass('active');
        });
    }

    // Optimized click outside handler
    function clickOutside() {
        var $body = $('body');
        var $container = $("#colorlib-aside, .js-colorlib-nav-toggle");
        var $toggle = $('.js-colorlib-nav-toggle');

        $(document).on('click scroll', function(e) {
            if ($body.hasClass('offcanvas') && 
                !$container.is(e.target) && 
                $container.has(e.target).length === 0) {
                $body.removeClass('offcanvas');
                $toggle.removeClass('active');
            }
        });
    }

    // Document ready function with performance optimizations
    $(function(){
        // Initialize all functionality immediately
        initializeContent();
        burgerMenu();
        clickOutside();
        
        // Optimized smooth scroll
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            var target = $(this.hash);
            if (target.length) {
                // Close mobile menu if open
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
                
                // Smooth scroll to target
                $('html, body').scrollTop(target.offset().top);
            }
        });
    });
})();