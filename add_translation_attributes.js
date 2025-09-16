// JavaScript to add missing translation attributes
// This can be run in the browser console

// Function to add translation attributes to Latest Experience job titles and dates
function addMissingTranslationAttributes() {
    console.log('Adding missing translation attributes...');
    
    // Find elements by their text content and add translation attributes
    const elements = document.querySelectorAll('h2 a[href="#contact"]');
    
    elements.forEach(link => {
        const text = link.textContent.trim();
        
        if (text.includes('Senior Extended Reality Specialist – Manager at STYLY Inc.')) {
            if (!link.querySelector('[data-translate]')) {
                link.innerHTML = '<span data-translate="experienceLatest.jobs.styly.title">Senior Extended Reality Specialist – Manager at STYLY Inc.</span>';
                console.log('Added translation to STYLY job title');
            }
        }
        
        if (text.includes('Founder / XR Engineer at Omni Applications LLC & LucidDreams S.A.S')) {
            if (!link.querySelector('[data-translate]')) {
                link.innerHTML = '<span data-translate="experienceLatest.jobs.omni.title">Founder / XR Engineer at Omni Applications LLC & LucidDreams S.A.S</span>';
                console.log('Added translation to Omni job title');
            }
        }
    });
    
    // Find date spans and add translation attributes
    const timelineLabels = document.querySelectorAll('.timeline-label h2 span');
    
    timelineLabels.forEach(span => {
        const text = span.textContent.trim();
        
        if (text === 'July 2024 – Present' && !span.querySelector('[data-translate]')) {
            span.innerHTML = '<span data-translate="experienceLatest.jobs.styly.date">July 2024 – Present</span>';
            console.log('Added translation to STYLY job date');
        }
        
        if (text === 'October 2023 – July 2024' && !span.querySelector('[data-translate]')) {
            span.innerHTML = '<span data-translate="experienceLatest.jobs.pretia.date">October 2023 – July 2024</span>';
            console.log('Added translation to Pretia job date');
        }
        
        if (text === 'April 2021 – September 2023' && !span.querySelector('[data-translate]')) {
            span.innerHTML = '<span data-translate="experienceLatest.jobs.omni.date">April 2021 – September 2023</span>';
            console.log('Added translation to Omni job date');
        }
        
        if (text === 'September 2023 – Present' && !span.querySelector('[data-translate]')) {
            span.innerHTML = '<span data-translate="experienceLatest.jobs.erasmus.date">September 2023 – Present</span>';
            console.log('Added translation to Erasmus job date');
        }
    });
    
    // Refresh translations
    if (window.translationManager && window.translationManager.applyTranslations) {
        window.translationManager.applyTranslations();
        console.log('Applied translations');
    }
    
    console.log('Translation attributes addition completed!');
}

// Run the function
addMissingTranslationAttributes();