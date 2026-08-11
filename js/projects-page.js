/**
 * Projects Page Manager
 * Handles loading and displaying all projects on the dedicated projects.html page
 * with filtering functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the projects page
    if (document.getElementById('all-projects')) {
        loadAllProjects();
        setupFilters();
    }
});

/**
 * Load all projects from JSON and display them
 */
async function loadAllProjects() {
    try {
        const response = await fetch('js/data/projects.json');
        if (!response.ok) {
            throw new Error(`Failed to load projects: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && data.projects && Array.isArray(data.projects)) {
            displayAllProjects(data.projects);
        } else {
            console.error('Projects Page Manager: Invalid projects data structure');
        }
    } catch (error) {
        console.error('Projects Page Manager: Error loading projects:', error);
    }
}

/**
 * Display all projects in the grid
 */
function displayAllProjects(projects) {
    const container = document.getElementById('all-projects');
    if (!container) {
        console.error('Container #all-projects not found!');
        return;
    }
    
    // Sort projects to show featured ones first
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });
    
    container.innerHTML = '';
    
    sortedProjects.forEach((project, index) => {
        const projectElement = renderProjectForPage(project, index);
        container.appendChild(projectElement);
    });
    
    // Add animation delay for staggered effect
    addStaggeredAnimation();
}

/**
 * Render a single project for the projects page
 */
function renderProjectForPage(project, index) {
    const div = document.createElement('div');
    div.className = 'col-md-6 animate-box';
    div.setAttribute('data-animate-effect', index % 4 === 0 ? 'fadeInLeft' : 
                                           index % 4 === 1 ? 'fadeInRight' : 
                                           index % 4 === 2 ? 'fadeInUp' : 'fadeInDown');
    
    // Add data attributes for filtering
    const technologies = project.technologies ? project.technologies.join(' ').toLowerCase() : '';
    const category = resolveProjectCategory(project);
    div.setAttribute('data-technologies', technologies);
    div.setAttribute('data-category', category);
    div.setAttribute('data-featured', project.featured ? 'true' : 'false');
    
    // Determine primary link
    let primaryUrl = '#';
    let linkText = 'View Project';
    
    if (project.demoUrl) {
        primaryUrl = project.demoUrl;
        linkText = 'View Demo';
    } else if (project.url) {
        primaryUrl = project.url;
        linkText = 'View Project';
    } else if (project.githubUrl) {
        primaryUrl = project.githubUrl;
        linkText = 'View Code';
    } else if (project.videoUrl) {
        primaryUrl = project.videoUrl;
        linkText = 'Watch Video';
    }
    
    // Create secondary links
    let secondaryLinks = '';
    const links = [];
    if (project.githubUrl && project.githubUrl !== primaryUrl) {
        links.push(`<a href="${project.githubUrl}" style="color: orange" target="_blank" rel="noreferrer noopener">Code</a>`);
    }
    if (project.demoUrl && project.demoUrl !== primaryUrl) {
        links.push(`<a href="${project.demoUrl}" style="color: orange" target="_blank" rel="noreferrer noopener">Demo</a>`);
    }
    if (project.videoUrl && project.videoUrl !== primaryUrl) {
        links.push(`<a href="${project.videoUrl}" style="color: orange" target="_blank" rel="noreferrer noopener">Video</a>`);
    }
    if (project.url && project.url !== primaryUrl) {
        links.push(`<a href="${project.url}" style="color: orange" target="_blank" rel="noreferrer noopener">More Info</a>`);
    }
    
    if (links.length > 0) {
        secondaryLinks = `<br>Links: ${links.join(' | ')}`;
    }
    
    // Badge for featured projects
    const featuredBadge = project.featured ? 
        '<span class="featured-badge" style="position: absolute; top: 10px; right: 10px; background: #f9bf3f; color: #222; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; z-index: 10;">Featured</span>' : '';
    
    div.innerHTML = `
        <div class="project" style="background-image: url(${project.image}); position: relative;">
            ${featuredBadge}
            <div class="desc">
                <div class="con">
                    <h3><a href="${primaryUrl}" target="_blank" rel="noreferrer noopener">${project.title}</a></h3>
                    <span>${project.description}${secondaryLinks}</span>
                    ${project.technologies ? `<div class="tech-tags" style="margin-top: 10px;">${project.technologies.map(tech => `<span class="tech-tag" style="background: rgba(249, 191, 63, 0.2); color: #f9bf3f; padding: 3px 8px; border-radius: 10px; font-size: 11px; margin-right: 5px; display: inline-block; margin-bottom: 3px;">${tech}</span>`).join('')}</div>` : ''}
                </div>
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Resolve a stable category for project filtering
 */
function resolveProjectCategory(project) {
    if (project.category) {
        return String(project.category).toLowerCase();
    }

    const technologies = (project.technologies || []).map(tech => String(tech).toLowerCase());
    const title = String(project.title || '').toLowerCase();

    if (technologies.includes('styly') || title.includes('styly')) return 'styly';
    if (technologies.includes('meta') || title.includes('meta horizon start') || title.includes('meta')) return 'meta-start';
    if (
        technologies.includes('wearables') ||
        technologies.includes('smart glasses') ||
        technologies.includes('vision pro') ||
        technologies.includes('xreal')
    ) return 'wearables';
    if (technologies.includes('ar')) return 'ar';
    if (technologies.includes('vr')) return 'vr';

    return 'xr';
}

/**
 * Setup filter functionality
 */
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

/**
 * Filter projects based on selected criteria
 */
function filterProjects(filter) {
    const projects = document.querySelectorAll('#all-projects .col-md-6');
    const categoryFilters = ['styly', 'meta-start', 'wearables'];
    
    projects.forEach(project => {
        let shouldShow = true;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'featured') {
            shouldShow = project.getAttribute('data-featured') === 'true';
        } else if (categoryFilters.includes(filter)) {
            shouldShow = project.getAttribute('data-category') === filter;
        } else {
            // Check if project has the technology
            const technologies = project.getAttribute('data-technologies') || '';
            shouldShow = technologies.includes(filter.toLowerCase());
        }
        
        if (shouldShow) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
    
    // Re-apply animation to visible projects
    addStaggeredAnimation();
}

/**
 * Add staggered animation to make projects visible
 */
function addStaggeredAnimation() {
    const visibleProjects = document.querySelectorAll('#all-projects .col-md-6[style*="block"], #all-projects .col-md-6:not([style*="none"])');
    
    visibleProjects.forEach((project, index) => {
        setTimeout(() => {
            project.style.opacity = '1';
            project.style.visibility = 'visible';
            project.classList.add('animated', project.getAttribute('data-animate-effect') || 'fadeInRight');
        }, index * 150);
    });
}

// Export for potential external use
window.ProjectsPageManager = {
    loadAllProjects,
    displayAllProjects,
    setupFilters,
    filterProjects
};
