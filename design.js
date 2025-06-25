// Design Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Color Swatch Interactive Effects
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotateZ(5deg)';
            this.style.filter = 'brightness(1.2)';
        });
        
        swatch.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateZ(0deg)';
            this.style.filter = 'brightness(1)';
        });
        
        // Copy color value on click
        swatch.addEventListener('click', function() {
            const colorValue = getComputedStyle(this).background;
            if (navigator.clipboard) {
                // Create a temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'カラー情報をコピーしました！';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--gradient-accent);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }
        });
    });
    
    // Typography Samples Interactive Effects
    const textSamples = document.querySelectorAll('.text-sample');
    textSamples.forEach(sample => {
        sample.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        sample.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    });
    
    // Glass Card Interactive Effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
    
    // Principle Cards Stagger Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Animate principle cards on scroll
    const principleCards = document.querySelectorAll('.principle-card');
    principleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate showcase items on scroll
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Enhanced floating animation for demonstration elements
    const floatingElements = document.querySelectorAll('.floating-element, .pulse-element');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(255, 107, 53, 0.4))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
            this.style.filter = '';
        });
    });
    
    // Dynamic color palette generation (for demonstration)
    function createDynamicColorDemo() {
        const colorDemo = document.querySelector('.color-demo');
        if (!colorDemo) return;
        
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            const swatches = colorDemo.querySelectorAll('.color-swatch');
            swatches.forEach((swatch, index) => {
                if (swatch.classList.contains('primary')) {
                    swatch.style.background = colors[(currentIndex + index) % colors.length];
                }
            });
            currentIndex = (currentIndex + 1) % colors.length;
        }, 3000);
    }
    
    createDynamicColorDemo();
    
    // Scroll-triggered animations for hero section
    function animateOnScroll() {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.design-hero .hero-content');
        
        if (heroContent) {
            const translateY = scrollY * 0.3;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    }
    
    // Throttled scroll listener
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(animateOnScroll);
            ticking = true;
            setTimeout(() => ticking = false, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add sparkle effect to hover elements
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            font-size: 12px;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Add sparkle effect to interactive elements
    const interactiveElements = document.querySelectorAll('.showcase-item, .principle-card, .glass-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createSparkle(x, y);
        });
    });
    
    // Performance optimization: Clean up observers when page is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            observer.disconnect();
        }
    });
    
    console.log('🎨 Design page interactive features loaded successfully!');
}); 