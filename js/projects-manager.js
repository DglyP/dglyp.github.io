console.log('Projects Manager script loaded');

// Function to load projects from JSON
async function loadProjects() {
    console.log('Attempting to load projects from JSON...');
    try {
        const response = await fetch('js/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Projects loaded successfully:', data.projects);
        return data.projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

// Function to render a single project
function renderProject(project, effect = "fadeInRight") {
    console.log('Rendering project:', project.title);
    return `
    <div class="col-md-6 animate-box" data-animate-effect="${effect}">
        <div class="project" style="background-image: url(${project.image});">
            <div class="desc">
                <div class="con">
                    <h3><a href="${project.url}" target="_blank" rel="noreferrer noopener">${project.title}</a></h3>
                    <span>${project.description} ${
                        project.demoUrl ? 
                        `<a href="${project.demoUrl}" style="color: #f9bf3f" target="_blank" rel="noreferrer noopener">Try it</a>` :
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
    console.log('Initializing projects section...');
    
    const featuredContainer = document.getElementById('featured-projects');
    const moreProjectsContainer = document.getElementById('more-projects');
    
    if (!featuredContainer) {
        console.error('Featured projects container not found!');
        return;
    }

    try {
        const projects = await loadProjects();
        console.log('Total projects loaded:', projects.length);
        
        const featuredProjects = projects.filter(p => p.featured);
        const otherProjects = projects.filter(p => !p.featured);
        
        console.log('Featured projects:', featuredProjects.length);
        console.log('Other projects:', otherProjects.length);

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
            console.log('Projects Manager: Initializing animations...');
            const allProjects = document.querySelectorAll('#featured-projects .animate-box, #more-projects .animate-box');
            console.log(`Projects Manager: Found ${allProjects.length} projects to animate`);
            allProjects.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.classList.add('animated', el.getAttribute('data-animate-effect'));
                    console.log(`Projects Manager: Animated project ${index + 1}`);
                }, index * 200); // Stagger the animations
            });
        }, 100);

    } catch (error) {
        console.error('Error in initializeProjects:', error);
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);