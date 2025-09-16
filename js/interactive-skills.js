// Community Building Journey Animation
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate community journey stages
    function animateCommunityJourney() {
        const journeyContainer = document.querySelector('.community-journey-container');
        
        if (!journeyContainer) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startJourneyAnimation();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(journeyContainer);
    }
    
    function startJourneyAnimation() {
        // Animate the individual developer stage
        setTimeout(() => {
            animateOrbitingXR();
        }, 1000);
        
        // Animate mentor connections
        setTimeout(() => {
            animateMentorConnections();
        }, 2000);
        
        // Animate community network
        setTimeout(() => {
            animateCommunityNetwork();
        }, 3000);
    }
    
    function animateOrbitingXR() {
        const xrElements = document.querySelectorAll('.xr-element');
        xrElements.forEach((element, index) => {
            element.style.opacity = '1';
            element.style.animation = `orbit 4s linear infinite`;
            element.style.animationDelay = (index * 0.5) + 's';
        });
    }
    
    function animateMentorConnections() {
        const mentees = document.querySelectorAll('.mentee-icons .person-icon');
        const connectionLines = document.querySelector('.connection-lines');
        
        mentees.forEach((mentee, index) => {
            setTimeout(() => {
                mentee.style.opacity = '1';
                mentee.style.transform = 'scale(1)';
            }, index * 300);
        });
        
        if (connectionLines) {
            setTimeout(() => {
                connectionLines.style.opacity = '1';
            }, 1000);
        }
    }
    
    function animateCommunityNetwork() {
        const memberNodes = document.querySelectorAll('.member-node');
        const networkConnections = document.querySelector('.network-connections');
        const xrTech = document.querySelectorAll('.xr-tech');
        
        // Animate member nodes
        memberNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
            }, index * 200);
        });
        
        // Animate network connections
        if (networkConnections) {
            setTimeout(() => {
                networkConnections.style.opacity = '1';
            }, 1200);
        }
        
        // Animate XR technologies
        xrTech.forEach((tech, index) => {
            setTimeout(() => {
                tech.style.opacity = '1';
                tech.style.transform = 'scale(1)';
            }, index * 400 + 1500);
        });
    }
    
    // Add hover effects to competency cards
    function addCompetencyCardEffects() {
        const competencyCards = document.querySelectorAll('.competency-card');
        
        competencyCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.competency-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
                
                // Animate competency list items
                const listItems = this.querySelectorAll('.competency-list span');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(5px)';
                        item.style.background = '#2c98f0';
                        item.style.color = 'white';
                    }, index * 100);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.competency-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset competency list items
                const listItems = this.querySelectorAll('.competency-list span');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(0px)';
                        item.style.background = '#f8f9fa';
                        item.style.color = '#666';
                    }, index * 50);
                });
            });
        });
    }
    
    // Add recognition item effects
    function addRecognitionEffects() {
        const recognitionItems = document.querySelectorAll('.recognition-item');
        
        recognitionItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const logo = this.querySelector('.recognition-logo');
                if (logo) {
                    logo.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const logo = this.querySelector('.recognition-logo');
                if (logo) {
                    logo.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Add floating animation to journey elements
    function addFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.person-icon, .central-hub, .xr-tech');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = (index * 0.3) + 's';
            if (!element.style.animation || element.style.animation === '') {
                element.style.animation = 'float 3s ease-in-out infinite';
            }
        });
    }
    
    // Add staggered reveal animation for journey stages
    function addStaggeredReveal() {
        const journeyStages = document.querySelectorAll('.journey-stage');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        journeyStages.forEach(stage => {
            stage.style.opacity = '0';
            stage.style.transform = 'translateY(30px)';
            stage.style.transition = 'all 1s ease';
            observer.observe(stage);
        });
    }
    
    // Initialize hidden elements that will be animated
    function initializeHiddenElements() {
        // Hide XR elements initially
        const xrElements = document.querySelectorAll('.xr-element');
        xrElements.forEach(element => {
            element.style.opacity = '0';
        });
        
        // Hide mentee icons initially
        const mentees = document.querySelectorAll('.mentee-icons .person-icon');
        mentees.forEach(mentee => {
            mentee.style.opacity = '0';
            mentee.style.transform = 'scale(0)';
            mentee.style.transition = 'all 0.5s ease';
        });
        
        // Hide connection lines initially
        const connectionLines = document.querySelector('.connection-lines');
        if (connectionLines) {
            connectionLines.style.opacity = '0';
            connectionLines.style.transition = 'opacity 1s ease';
        }
        
        // Hide member nodes initially
        const memberNodes = document.querySelectorAll('.member-node');
        memberNodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0)';
            node.style.transition = 'all 0.5s ease';
        });
        
        // Hide network connections initially
        const networkConnections = document.querySelector('.network-connections');
        if (networkConnections) {
            networkConnections.style.opacity = '0';
            networkConnections.style.transition = 'opacity 1s ease';
        }
        
        // Hide XR tech initially
        const xrTech = document.querySelectorAll('.xr-tech');
        xrTech.forEach(tech => {
            tech.style.opacity = '0';
            tech.style.transform = 'scale(0)';
            tech.style.transition = 'all 0.5s ease';
        });
    }
    
    // Initialize all animations
    initializeHiddenElements();
    animateCommunityJourney();
    addCompetencyCardEffects();
    addRecognitionEffects();
    addFloatingAnimations();
    addStaggeredReveal();
});

// Add additional CSS animations
const additionalCSS = `
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
}

@keyframes orbit {
    from {
        transform: rotate(0deg) translateX(50px) rotate(0deg);
    }
    to {
        transform: rotate(360deg) translateX(50px) rotate(-360deg);
    }
}

@keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes networkPulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.6; }
}

.floating {
    animation: float 3s ease-in-out infinite;
}

.journey-stage {
    transition: all 1s ease;
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);