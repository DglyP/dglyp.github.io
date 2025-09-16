// Visual Skills Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all visualizations when the skills section is in view
    const skillsSection = document.querySelector('.colorlib-skills');
    if (skillsSection && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeVisualizations();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    } else {
        // Fallback for browsers without IntersectionObserver
        setTimeout(initializeVisualizations, 1000);
    }
});

function initializeVisualizations() {
    createCommunityImpact();
    createSkillsRadar();
    createTechBubbles();
    createCareerFocusPie();
}

// XR Community Impact Visualization
function createCommunityImpact() {
    const container = d3.select('#community-impact');
    // Clear any existing content
    container.selectAll("*").remove();
    
    const containerWidth = container.node().offsetWidth;
    const width = Math.min(containerWidth, 200);
    const height = Math.min(width, 200);
    const radius = Math.min(width, height) / 2 - 20;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('margin', '0 auto');
    
    const g = svg.append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // Create concentric circles representing global reach
    const circles = [
        { radius: radius * 0.3, color: '#2c98f0', label: 'Local' },
        { radius: radius * 0.6, color: 'rgba(44, 152, 240, 0.6)', label: 'Regional' },
        { radius: radius * 0.9, color: 'rgba(44, 152, 240, 0.3)', label: 'Global' }
    ];
    
    circles.forEach((circle, i) => {
        g.append('circle')
            .attr('r', 0)
            .attr('fill', circle.color)
            .attr('stroke', '#2c98f0')
            .attr('stroke-width', 2)
            .transition()
            .delay(i * 300)
            .duration(800)
            .attr('r', circle.radius);
    });
    
    // Add XR community icons/dots (scaled for mobile)
    const scale = Math.min(1, width / 200);
    const communityPoints = [
        { x: 0, y: 0, size: 8 * scale }, // Center - you
        { x: 30 * scale, y: -20 * scale, size: 4 * scale },
        { x: -25 * scale, y: 15 * scale, size: 4 * scale },
        { x: 20 * scale, y: 35 * scale, size: 4 * scale },
        { x: -30 * scale, y: -25 * scale, size: 4 * scale },
        { x: 45 * scale, y: 10 * scale, size: 4 * scale }
    ];
    
    setTimeout(() => {
        g.selectAll('.community-point')
            .data(communityPoints)
            .enter().append('circle')
            .attr('class', 'community-point')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 0)
            .attr('fill', '#fff')
            .attr('stroke', '#2c98f0')
            .attr('stroke-width', 2)
            .transition()
            .duration(500)
            .attr('r', d => d.size);
    }, 1000);
    
    // Add center label (scaled font)
    g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .style('font-size', `${Math.max(8, 10 * scale)}px`)
        .style('fill', '#333')
        .style('font-weight', 'bold')
        .text('XR Community')
        .attr('opacity', 0)
        .transition()
        .delay(1200)
        .duration(500)
        .attr('opacity', 1);
}

// Skills Radar Chart
function createSkillsRadar() {
    const container = d3.select('#skills-radar');
    // Clear any existing content
    container.selectAll("*").remove();
    
    const containerWidth = container.node().offsetWidth;
    const width = Math.min(containerWidth, 200);
    const height = Math.min(width, 200);
    const radius = Math.min(width, height) / 2 - 30;
    
    const skills = [
        { skill: 'Unity', value: 95 },
        { skill: 'AR/VR', value: 90 },
        { skill: 'JavaScript', value: 85 },
        { skill: 'Python', value: 80 },
        { skill: 'Leadership', value: 88 }
    ];
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('margin', '0 auto');
    
    const g = svg.append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`);
    
    const angleSlice = Math.PI * 2 / skills.length;
    
    // Draw radar grid
    for (let level = 0; level < 5; level++) {
        const levelRadius = radius * (level + 1) / 5;
        g.append('circle')
            .attr('r', levelRadius)
            .attr('fill', 'none')
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1);
    }
    
    // Draw axes
    const scale = Math.min(1, width / 200);
    skills.forEach((skill, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', x)
            .attr('y2', y)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1);
        
        // Add labels (responsive font size)
        g.append('text')
            .attr('x', x * 1.2)
            .attr('y', y * 1.2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .style('font-size', `${Math.max(8, 10 * scale)}px`)
            .style('fill', '#333')
            .text(skill.skill);
    });
    
    // Draw skill area
    const lineGenerator = d3.line()
        .x((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            return Math.cos(angle) * (radius * d.value / 100);
        })
        .y((d, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            return Math.sin(angle) * (radius * d.value / 100);
        })
        .curve(d3.curveLinearClosed);
    
    const area = g.append('path')
        .datum(skills)
        .attr('fill', 'rgba(44, 152, 240, 0.2)')
        .attr('stroke', '#2c98f0')
        .attr('stroke-width', 2)
        .attr('d', lineGenerator);
    
    // Animate the area
    const totalLength = area.node().getTotalLength();
    area.attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1500)
        .attr('stroke-dashoffset', 0);
}

// Technology Bubble Chart
function createTechBubbles() {
    const container = d3.select('#tech-bubbles');
    // Clear any existing content
    container.selectAll("*").remove();
    
    const containerWidth = container.node().offsetWidth;
    const width = Math.min(containerWidth, 200);
    const height = Math.min(width, 200);
    
    const technologies = [
        { name: 'Unity', value: 95, color: '#ff6b6b' },
        { name: 'AR', value: 90, color: '#4ecdc4' },
        { name: 'JS', value: 85, color: '#45b7d1' },
        { name: 'Python', value: 80, color: '#96ceb4' },
        { name: 'C#', value: 88, color: '#ffeaa7' }
    ];
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('margin', '0 auto');
    
    const scale = Math.min(1, width / 200);
    
    const simulation = d3.forceSimulation(technologies)
        .force('charge', d3.forceManyBody().strength(50 * scale))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => (d.value / 4 + 5) * scale));
    
    const bubbles = svg.selectAll('circle')
        .data(technologies)
        .enter().append('circle')
        .attr('r', 0)
        .attr('fill', d => d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    
    const labels = svg.selectAll('text')
        .data(technologies)
        .enter().append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .style('font-size', `${Math.max(8, 10 * scale)}px`)
        .style('fill', '#fff')
        .style('font-weight', 'bold')
        .text(d => d.name);
    
    // Animate bubbles
    bubbles.transition()
        .duration(1000)
        .attr('r', d => (d.value / 4 + 10) * scale);
    
    simulation.on('tick', () => {
        bubbles
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
}

// Career Focus Pie Chart
function createCareerFocusPie() {
    const container = d3.select('#career-focus-pie');
    // Clear any existing content
    container.selectAll("*").remove();
    
    const containerWidth = container.node().offsetWidth;
    const isMobile = window.innerWidth <= 768;
    
    // Adjust dimensions for mobile - keep it simpler
    const width = Math.min(containerWidth - 20, 800);
    const height = isMobile ? 450 : 300;
    const radius = Math.min(width * 0.35, 100); // Fixed smaller radius
    
    const careerData = [
        { label: 'XR Leadership', value: 30, color: '#2c98f0' },
        { label: 'Technology Learning', value: 25, color: '#4ecdc4' },
        { label: 'Project Creation', value: 20, color: '#45b7d1' },
        { label: 'Strategic Partnerships', value: 15, color: '#96ceb4' },
        { label: 'Mentoring & Teaching', value: 10, color: '#ffeaa7' }
    ];
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('margin', '0 auto');

    // Simpler positioning
    const chartCenterX = width / 2;
    const chartCenterY = isMobile ? 100 : 120;
    const legendX = isMobile ? 20 : width * 0.65;
    const legendY = isMobile ? 220 : 20;
    
    const g = svg.append('g')
        .attr('transform', `translate(${chartCenterX}, ${chartCenterY})`);
    
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);
    
    const arcData = pie(careerData);
    
    // Create pie slices
    const slices = g.selectAll('.slice')
        .data(arcData)
        .enter().append('g')
        .attr('class', 'slice');
    
    slices.append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .transition()
        .delay((d, i) => i * 200)
        .duration(800)
        .style('opacity', 1)
        .attrTween('d', function(d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });
    
    // Add percentage labels
    const fontSize = Math.max(10, radius / 8);
    slices.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .style('font-size', `${fontSize}px`)
        .style('fill', '#333')
        .style('font-weight', 'bold')
        .text(d => `${d.data.value}%`)
        .attr('opacity', 0)
        .transition()
        .delay((d, i) => i * 200 + 800)
        .duration(500)
        .attr('opacity', 1);
    
    // Create legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${legendX}, ${legendY})`);
    
    const legendItemHeight = isMobile ? 22 : 25;
    const legendColumns = isMobile ? 1 : 1; // Single column for better readability
    const columnWidth = isMobile ? width - 20 : width * 0.3;
    
    const legendItems = legend.selectAll('.legend-item')
        .data(careerData)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => {
            if (isMobile) {
                // Single column layout on mobile for full text visibility
                return `translate(0, ${i * legendItemHeight})`;
            } else {
                return `translate(0, ${i * legendItemHeight})`;
            }
        });
    
    legendItems.append('rect')
        .attr('width', isMobile ? 12 : 12)
        .attr('height', isMobile ? 12 : 12)
        .attr('fill', d => d.color)
        .attr('rx', 2);
    
    legendItems.append('text')
        .attr('x', isMobile ? 18 : 18)
        .attr('y', isMobile ? 10 : 10)
        .style('font-size', isMobile ? '11px' : '12px')
        .style('fill', '#333')
        .text(d => {
            // Don't truncate on mobile - show full text
            if (isMobile) {
                return d.label;
            }
            return d.label;
        });
}