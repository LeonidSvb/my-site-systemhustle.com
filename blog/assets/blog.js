// Blog functionality with diagram support

document.addEventListener('DOMContentLoaded', function() {
    
    // Load blog posts for index page
    if (document.getElementById('blog-posts')) {
        loadBlogPosts();
    }
    
    // Initialize diagrams if present
    initializeDiagrams();
    
    // Animate metric bars on scroll
    animateMetricBars();
    
    // Add reading progress indicator
    addReadingProgress();
});

// Load blog posts from data.json
async function loadBlogPosts() {
    try {
        const response = await fetch('/blog/data.json');
        const posts = await response.json();
        
        const container = document.getElementById('blog-posts');
        const loading = document.getElementById('loading');
        
        if (loading) loading.style.display = 'none';
        
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post-card';
            
            // Handle auto dates
            const displayDate = post.date === 'auto' ? getTodayDate() : post.date;
            
            postElement.innerHTML = `
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-date">${formatDate(displayDate)}</span>
                </div>
                <h2 class="post-title">
                    <a href="/blog/posts/${post.slug}.html">${post.title}</a>
                </h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-footer">
                    <a href="/blog/posts/${post.slug}.html" class="read-more">Read Article</a>
                    ${post.readTime ? `<span class="read-time">${post.readTime}</span>` : ''}
                </div>
            `;
            
            container.appendChild(postElement);
        });
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = '<p style="color: #999;">Unable to load articles. Please refresh the page.</p>';
        }
    }
}

// Initialize Mermaid diagrams
function initializeDiagrams() {
    // Check if Mermaid is available
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            themeVariables: {
                primaryColor: '#F8F8F8',
                primaryTextColor: '#1C1C1E',
                primaryBorderColor: '#E5E5E5',
                lineColor: '#D1D1D1',
                secondaryColor: '#F1F1F1',
                tertiaryColor: '#FAFAFA'
            }
        });
    }
}

// Animate metric bars when they come into view
function animateMetricBars() {
    const metricBars = document.querySelectorAll('.metric-bar .fill');
    
    if (!metricBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width;
                }
            }
        });
    }, { threshold: 0.5 });
    
    metricBars.forEach(bar => {
        // Store original width and reset
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        bar.style.width = '0%';
        
        observer.observe(bar);
    });
}

// Add reading progress indicator
function addReadingProgress() {
    if (!document.querySelector('.article-content')) return;
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #f0f0f0;
            z-index: 99;
        }
        .progress-fill {
            height: 100%;
            background: #1C1C1E;
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.article-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const startReading = articleTop - windowHeight * 0.3;
        const finishReading = articleTop + articleHeight - windowHeight * 0.7;
        
        if (scrollTop < startReading) {
            progressBar.querySelector('.progress-fill').style.width = '0%';
        } else if (scrollTop > finishReading) {
            progressBar.querySelector('.progress-fill').style.width = '100%';
        } else {
            const progress = (scrollTop - startReading) / (finishReading - startReading);
            progressBar.querySelector('.progress-fill').style.width = (progress * 100) + '%';
        }
    });
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Format date helper
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Simple chart creation for metrics (no external library needed)
function createSimpleChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const { title, type = 'bar', colors = ['#1C1C1E', '#48484A'] } = options;
    
    let html = '';
    
    if (title) {
        html += `<div class="diagram-title">${title}</div>`;
    }
    
    if (type === 'bar') {
        html += '<div class="simple-chart">';
        data.forEach((item, index) => {
            const percentage = (item.value / Math.max(...data.map(d => d.value))) * 100;
            const color = colors[index % colors.length];
            
            html += `
                <div class="chart-bar">
                    <div class="bar-label">${item.label}</div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${percentage}%; background: ${color}"></div>
                        <span class="bar-value">${item.value}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        // Add chart styles
        const style = document.createElement('style');
        style.textContent = `
            .simple-chart {
                margin: 24px 0;
            }
            .chart-bar {
                margin-bottom: 16px;
            }
            .bar-label {
                font-size: 14px;
                color: #666;
                margin-bottom: 4px;
                font-weight: 500;
            }
            .bar-container {
                position: relative;
                background: #f0f0f0;
                height: 32px;
                border-radius: 16px;
                overflow: hidden;
            }
            .bar-fill {
                height: 100%;
                transition: width 0.8s ease;
                border-radius: 16px;
            }
            .bar-value {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 12px;
                font-weight: 600;
                color: #1a1a1a;
            }
        `;
        document.head.appendChild(style);
    }
    
    container.innerHTML = html;
}