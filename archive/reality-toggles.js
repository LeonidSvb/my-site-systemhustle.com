// Project Reality Toggle Functionality
class ProjectRealityToggler {
    constructor() {
        this.toggles = document.querySelectorAll('.reality-toggle');
        this.description = document.getElementById('reality-description');
        this.activeToggles = new Set(['quality', 'speed']); // Default active toggles
        
        this.descriptions = {
            'quality,speed': {
                title: 'Quality + Speed = Premium Cost',
                text: 'Fast delivery with premium quality requires additional resources, skilled developers, and often parallel workstreams.',
                details: 'Best for: Time-critical launches, competitive advantages, enterprise solutions where quality cannot be compromised.',
                class: 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
            },
            'budget,quality': {
                title: 'Budget + Quality = Takes Time',
                text: 'Achieving high quality within budget constraints requires careful planning, efficient processes, and more development time.',
                details: 'Best for: Long-term projects, internal tools, sustainable business growth, building technical debt-free solutions.',
                class: 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800'
            },
            'budget,speed': {
                title: 'Budget + Speed = Basic Quality',
                text: 'Quick and affordable solutions often mean making compromises on features, polish, and long-term maintainability.',
                details: 'Best for: MVPs, proof of concepts, rapid prototyping, testing market hypotheses before major investment.',
                class: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
            },
            'single': {
                title: 'Choose Two Priorities',
                text: 'Project management reality: you cannot optimize for all three simultaneously. Pick the two most important for your situation.',
                details: 'This constraint forces clear decision-making and realistic expectations for all stakeholders.',
                class: 'bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/20 dark:to-blue-900/20 border-gray-200 dark:border-gray-800'
            }
        };
        
        this.initEventListeners();
        this.updateDescription();
    }
    
    initEventListeners() {
        this.toggles.forEach(toggle => {
            toggle.addEventListener('click', this.handleToggleClick.bind(this));
        });
    }
    
    handleToggleClick(e) {
        const clickedType = e.currentTarget.dataset.type;
        const isCurrentlyActive = this.activeToggles.has(clickedType);
        
        if (isCurrentlyActive) {
            // If clicking an active toggle, deactivate it
            this.activeToggles.delete(clickedType);
            e.currentTarget.classList.remove('active');
        } else {
            // If trying to activate a toggle
            if (this.activeToggles.size >= 2) {
                // Already have 2 active - show constraint
                this.showConstraintFeedback();
                return;
            }
            
            // Activate the toggle
            this.activeToggles.add(clickedType);
            e.currentTarget.classList.add('active');
        }
        
        this.updateDescription();
        this.addClickFeedback(e.currentTarget);
    }
    
    showConstraintFeedback() {
        // Shake the container to show the constraint
        const container = document.querySelector('#reality .bg-gray-50.dark\\:bg-gray-800');
        container.classList.add('shake');
        
        // Show temporary warning
        const tempDesc = this.description.cloneNode(true);
        tempDesc.innerHTML = `
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">Pick Two Only!</h3>
            <p class="text-gray-700 dark:text-gray-300 text-lg mb-4">You cannot optimize for all three simultaneously - that's the fundamental constraint of project management.</p>
            <p class="text-gray-600 dark:text-gray-400"><strong>Reality check:</strong> Disable one toggle first, then you can enable a different one.</p>
        `;
        tempDesc.className = 'mt-10 p-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl border border-red-200 dark:border-red-800';
        
        this.description.style.opacity = '0';
        setTimeout(() => {
            const parent = this.description.parentNode;
            parent.insertBefore(tempDesc, this.description);
            tempDesc.style.opacity = '1';
            
            setTimeout(() => {
                tempDesc.style.opacity = '0';
                setTimeout(() => {
                    parent.removeChild(tempDesc);
                    this.description.style.opacity = '1';
                }, 300);
            }, 2000);
        }, 150);
        
        setTimeout(() => {
            container.classList.remove('shake');
        }, 500);
    }
    
    addClickFeedback(toggle) {
        // Simple scale animation
        toggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1.05)';
        }, 100);
        setTimeout(() => {
            toggle.style.transform = '';
        }, 200);
    }
    
    updateDescription() {
        const activeArray = Array.from(this.activeToggles).sort();
        let key;
        
        if (activeArray.length === 2) {
            key = activeArray.join(',');
        } else {
            key = 'single';
        }
        
        const content = this.descriptions[key] || this.descriptions['single'];
        
        // Animate description update
        this.description.style.opacity = '0';
        this.description.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            this.description.querySelector('h3').textContent = content.title;
            this.description.querySelector('p:first-of-type').textContent = content.text;
            this.description.querySelector('p:last-of-type').innerHTML = content.details;
            
            // Update description class
            this.description.className = `mt-10 p-8 rounded-2xl ${content.class}`;
            
            this.description.style.opacity = '1';
            this.description.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Initialize Project Reality Toggler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('reality-description')) {
        new ProjectRealityToggler();
    }
});