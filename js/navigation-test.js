// Navigation Testing Script
// This script helps test navigation responsiveness across different screen sizes

function testNavigationAtDifferentSizes() {
    const testSizes = [
        { name: 'Ultra Small Mobile', width: 320, height: 568 },
        { name: 'Small Mobile', width: 360, height: 640 },
        { name: 'Large Mobile', width: 414, height: 896 },
        { name: 'Tablet Portrait', width: 768, height: 1024 },
        { name: 'Tablet Landscape', width: 1024, height: 768 },
        { name: 'Small Desktop', width: 1200, height: 800 },
        { name: 'Large Desktop', width: 1440, height: 900 },
        { name: 'Ultra Wide', width: 1920, height: 1080 }
    ];

    console.log('🔍 Navigation Responsiveness Test');
    console.log('=================================');

    testSizes.forEach(size => {
        console.log(`\n📱 Testing ${size.name} (${size.width}x${size.height})`);
        
        // Simulate viewport change
        if (window.innerWidth !== size.width) {
            console.log(`  ⚠️  Current viewport: ${window.innerWidth}x${window.innerHeight}`);
            console.log(`  📏 To test ${size.name}, resize browser to ${size.width}x${size.height}`);
        }
        
        // Check navigation elements
        const aside = document.getElementById('colorlib-aside');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('#colorlib-main-menu ul li a');
        
        if (aside) {
            const asideStyles = window.getComputedStyle(aside);
            console.log(`  📐 Sidebar width: ${asideStyles.width}`);
            console.log(`  👀 Sidebar visibility: ${asideStyles.visibility}`);
        }
        
        if (navLinks.length > 0) {
            console.log(`  🔗 Found ${navLinks.length} navigation links`);
            
            // Check if any text is overflowing
            navLinks.forEach((link, index) => {
                const linkRect = link.getBoundingClientRect();
                const parentRect = link.parentElement.getBoundingClientRect();
                
                if (linkRect.width > parentRect.width) {
                    console.log(`  ⚠️  Link ${index + 1} "${link.textContent}" may be overflowing`);
                } else {
                    console.log(`  ✅ Link ${index + 1} "${link.textContent}" fits properly`);
                }
            });
        }
    });
    
    console.log('\n🎯 Navigation Test Complete!');
    console.log('To manually test different screen sizes:');
    console.log('1. Use browser developer tools (F12)');
    console.log('2. Toggle device toolbar (Ctrl+Shift+M)');
    console.log('3. Try different device presets or custom dimensions');
}

// Auto-run test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testNavigationAtDifferentSizes);
} else {
    testNavigationAtDifferentSizes();
}

// Expose function globally for manual testing
window.testNavigationAtDifferentSizes = testNavigationAtDifferentSizes;

console.log('📋 Navigation testing script loaded!');
console.log('💡 Run testNavigationAtDifferentSizes() in console to test responsiveness');