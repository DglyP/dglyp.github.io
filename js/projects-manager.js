
// Function to load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('js/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        return [];
    }
}

// Function to render a single project
function renderProject(project, effect = "fadeInRight") {
    // Map project IDs to translation keys
    const translationMap = {
        'avatar-ar-logo': 'avatar',
        'holobrain': 'holoBrain', 
        'ar-filters': 'arFilters',
        'colombia-xr': 'colombiaXr',
        // For projects that don't have translations yet, use the fallback text
        'astroscoop-vision-pro': 'astroscoop',
        '3d-visualizer': '3dVisualizer',
        '3d-reconstructions': '3dReconstructions',
        'ar-car-tracking': 'arCarTracking',
        'clinical-simulation': 'clinicalSimulation',
        'emotion-recognition': 'emotionRecognition',
        'pupil-mimicry': 'pupilMimicry',
        'ar-asteroids': 'arAsteroids',
        'unity-zeromq-multiplayer': 'unityZeromq',
        'mediapipe-parallax': 'mediapipeParallax'
    };
    
    const translationKey = translationMap[project.id] || project.id;
    
    // Check if translation exists, otherwise use fallback
    const hasTranslation = translationKey && ['avatar', 'holoBrain', 'arFilters', 'colombiaXr'].includes(translationKey);
    
    return `
    <div class="col-md-6 animate-box" data-animate-effect="${effect}">
        <div class="project" style="background-image: url(${project.image});">
            <div class="desc">
                <div class="con">
                    <h3><a href="${project.url}" target="_blank" rel="noreferrer noopener">${hasTranslation ? `<span data-translate="work.projects.${translationKey}.title">${project.title}</span>` : project.title}</a></h3>
                    <span>${hasTranslation ? `<span data-translate="work.projects.${translationKey}.description">${project.description}</span>` : project.description} ${
                        project.demoUrl ? 
                        `<a href="${project.demoUrl}" style="color: #f9bf3f" target="_blank" rel="noreferrer noopener">${hasTranslation ? `<span data-translate="work.projects.${translationKey}.action">Try it</span>` : 'Try it'}</a>` :
                        ''
                    }</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Function to initialize the projects section
async function initializeProjects() {
    
    const featuredContainer = document.getElementById('featured-projects');
    const moreProjectsContainer = document.getElementById('more-projects');
    
    if (!featuredContainer) {
        return;
    }

    try {
        const projects = await loadProjects();
        
        const featuredProjects = projects.filter(p => p.featured);
        const otherProjects = projects.filter(p => !p.featured);
        

        // Create rows for featured projects
        featuredContainer.innerHTML = `
            <div class="row">
                ${featuredProjects.map(p => renderProject(p, "fadeInRight")).join('')}
            </div>
        `;

        // Create rows for other projects (only if container exists)
        if (moreProjectsContainer) {
            moreProjectsContainer.innerHTML = `
                <div class="row">
                    ${otherProjects.map((p, index) => {
                        const effects = ["fadeInRight", "fadeInTop", "fadeInBottom", "fadeInLeft"];
                        return renderProject(p, effects[index % effects.length]);
                    }).join('')}
                </div>
            `;
        }

        // Initialize animations for initial projects
        setTimeout(() => {
            const allProjects = document.querySelectorAll('#featured-projects .animate-box, #more-projects .animate-box');
            allProjects.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.classList.add('animated', el.getAttribute('data-animate-effect'));
                }, index * 200); // Stagger the animations
            });
            
            // Update translations for dynamically loaded projects
            if (window.TranslationManager && window.TranslationManager.applyTranslations) {
                window.TranslationManager.applyTranslations();
            }
        }, 100);

    } catch (error) {
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);