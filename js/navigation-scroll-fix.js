// Navigation Scroll Fix - Allow scrolling within navigation without closing
$(document).ready(function() {
    
    // Variable to track if user is scrolling within navigation
    var isScrollingInNav = false;
    var scrollTimeout;
    
    // Detect scrolling within the navigation area
    $('#colorlib-aside').on('scroll touchmove', function(e) {
        isScrollingInNav = true;
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Reset the flag after scrolling stops
        scrollTimeout = setTimeout(function() {
            isScrollingInNav = false;
        }, 150);
    });
    
    // Detect scrolling within the main menu specifically
    $('#colorlib-main-menu').on('scroll touchmove', function(e) {
        isScrollingInNav = true;
        e.stopPropagation(); // Prevent bubbling
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Reset the flag after scrolling stops
        scrollTimeout = setTimeout(function() {
            isScrollingInNav = false;
        }, 150);
    });
    
    // Override the original window scroll handler
    $(window).off('scroll'); // Remove original handler
    
    // Add new scroll handler that respects navigation scrolling
    $(window).on('scroll', function() {
        // Only close navigation if NOT scrolling within nav area
        if (!isScrollingInNav && $('body').hasClass('offcanvas')) {
            $('body').removeClass('offcanvas');
            $('.js-colorlib-nav-toggle').removeClass('active');
        }
    });
    
    // Prevent navigation from closing when touching/clicking within navigation area
    $('#colorlib-aside, #colorlib-main-menu').on('touchstart touchmove click', function(e) {
        e.stopPropagation(); // Prevent the event from bubbling up
    });
    
    // Allow touch scrolling within navigation menu
    $('#colorlib-main-menu').on('touchstart', function(e) {
        e.stopPropagation();
    });
    
    // Prevent accidental closure when touching navigation items for scrolling
    $('#colorlib-main-menu ul li').on('touchstart touchmove', function(e) {
        // Only stop propagation if it's a scroll gesture, not a tap
        if (e.type === 'touchmove') {
            e.stopPropagation();
        }
    });
    
    // Enhanced click outside detection that considers navigation scrolling
    $(document).off('click'); // Remove original click handler
    $(document).on('click', function(e) {
        var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
        
        // Only close if clicking truly outside AND not currently scrolling in nav
        if (!container.is(e.target) && 
            container.has(e.target).length === 0 && 
            !isScrollingInNav && 
            $('body').hasClass('offcanvas')) {
            
            $('body').removeClass('offcanvas');
            $('.js-colorlib-nav-toggle').removeClass('active');
        }
    });
    
    // Add visual feedback for scrollable content
    function updateScrollIndicators() {
        var navMenu = $('#colorlib-main-menu')[0];
        if (navMenu) {
            var isScrollable = navMenu.scrollHeight > navMenu.clientHeight;
            if (isScrollable) {
                $('#colorlib-main-menu').addClass('scrollable');
            } else {
                $('#colorlib-main-menu').removeClass('scrollable');
            }
        }
    }
    
    // Update scroll indicators on load and resize
    updateScrollIndicators();
    $(window).on('resize', updateScrollIndicators);
    
    // Add smooth scrolling behavior to navigation
    $('#colorlib-main-menu').css({
        'scroll-behavior': 'smooth',
        '-webkit-scroll-behavior': 'smooth'
    });
});
