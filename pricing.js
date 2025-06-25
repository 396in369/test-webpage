// Pricing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Billing Toggle Functionality
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyLabel = document.getElementById('monthly-label');
    const annualLabel = document.getElementById('annual-label');
    const priceAmounts = document.querySelectorAll('.amount');
    const planCards = document.querySelectorAll('.plan-card');
    
    let isAnnual = false;
    
    function updateBillingMode() {
        if (isAnnual) {
            billingToggle.classList.add('active');
            monthlyLabel.classList.remove('active');
            annualLabel.classList.add('active');
            document.body.classList.add('annual-mode');
            
            // Update prices to annual
            priceAmounts.forEach(amount => {
                const annualPrice = amount.getAttribute('data-annual');
                if (annualPrice) {
                    // Add smooth number transition
                    animatePrice(amount, amount.textContent.replace(/[^0-9]/g, ''), annualPrice.replace(/[^0-9]/g, ''));
                }
            });
            
            // Update period text
            document.querySelectorAll('.period').forEach(period => {
                period.textContent = '/月';
            });
            
        } else {
            billingToggle.classList.remove('active');
            monthlyLabel.classList.add('active');
            annualLabel.classList.remove('active');
            document.body.classList.remove('annual-mode');
            
            // Update prices to monthly
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.getAttribute('data-monthly');
                if (monthlyPrice) {
                    animatePrice(amount, amount.textContent.replace(/[^0-9]/g, ''), monthlyPrice.replace(/[^0-9]/g, ''));
                }
            });
            
            // Update period text
            document.querySelectorAll('.period').forEach(period => {
                period.textContent = '/月';
            });
        }
    }
    
    function animatePrice(element, fromPrice, toPrice) {
        const from = parseInt(fromPrice);
        const to = parseInt(toPrice);
        const duration = 500;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(from + (to - from) * easeOutCubic);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize billing mode
    monthlyLabel.classList.add('active');
    updateBillingMode();
    
    // Billing toggle event listeners
    billingToggle.addEventListener('click', function() {
        isAnnual = !isAnnual;
        updateBillingMode();
    });
    
    monthlyLabel.addEventListener('click', function() {
        if (isAnnual) {
            isAnnual = false;
            updateBillingMode();
        }
    });
    
    annualLabel.addEventListener('click', function() {
        if (!isAnnual) {
            isAnnual = true;
            updateBillingMode();
        }
    });
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Plan Selection Functionality
    const planButtons = document.querySelectorAll('.btn-plan');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.getAttribute('data-plan');
            const planName = this.closest('.plan-card').querySelector('.plan-name').textContent;
            const planPrice = this.closest('.plan-card').querySelector('.amount').textContent;
            const billingMode = isAnnual ? 'annual' : 'monthly';
            
            // Store selected plan data in sessionStorage
            const selectedPlan = {
                type: planType,
                name: planName,
                price: planPrice,
                billing: billingMode,
                timestamp: Date.now()
            };
            
            sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
            
            // Add loading state to button
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
            
            // Add success animation
            setTimeout(() => {
                this.innerHTML = '<span class="btn-text">✓ 選択完了</span>';
                this.style.background = '#10B981';
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
                
                // Redirect to payment page after a short delay
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 800);
            }, 200);
            
            // Track analytics (placeholder)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'plan_selected', {
                    'plan_type': planType,
                    'billing_mode': billingMode,
                    'plan_price': planPrice
                });
            }
        });
        
        // Button hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Plan Card Hover Effects
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle glow effect
            this.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Scroll animations for plan cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const planObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Initially hide plan cards for animation
    planCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        planObserver.observe(card);
    });
    
    // Trust indicators animation
    const trustItems = document.querySelectorAll('.trust-item');
    const trustObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    trustItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        trustObserver.observe(item);
    });
    
    // Price comparison highlight
    function highlightPriceComparison() {
        if (isAnnual) {
            // Calculate and show savings
            planCards.forEach(card => {
                const monthlyPrice = parseInt(card.querySelector('.amount').getAttribute('data-monthly'));
                const annualPrice = parseInt(card.querySelector('.amount').getAttribute('data-annual'));
                const savings = (monthlyPrice * 12) - (annualPrice * 12);
                
                // Add savings indicator
                let savingsElement = card.querySelector('.savings-indicator');
                if (!savingsElement && savings > 0) {
                    savingsElement = document.createElement('div');
                    savingsElement.className = 'savings-indicator';
                    savingsElement.innerHTML = `年間 ¥${savings.toLocaleString()} お得`;
                    savingsElement.style.cssText = `
                        background: linear-gradient(45deg, #10B981, #059669);
                        color: white;
                        padding: 0.3rem 1rem;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        margin-top: 0.5rem;
                        text-align: center;
                        animation: slideInUp 0.5s ease;
                    `;
                    card.querySelector('.plan-header').appendChild(savingsElement);
                }
            });
        } else {
            // Remove savings indicators
            document.querySelectorAll('.savings-indicator').forEach(el => el.remove());
        }
    }
    
    // Update price comparison when billing mode changes
    const originalUpdateBillingMode = updateBillingMode;
    updateBillingMode = function() {
        originalUpdateBillingMode();
        setTimeout(highlightPriceComparison, 300);
    };
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.classList.contains('faq-question') || e.target.closest('.faq-question')) {
                e.preventDefault();
                e.target.closest('.faq-question').click();
            }
        }
    });
    
    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('.btn-plan, .faq-question, .toggle-switch');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Performance: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.pricing-hero, .pricing-plans');
    const parallaxHandler = debounce(() => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16);
    
    window.addEventListener('scroll', parallaxHandler);
    
    console.log('💰 Pricing page initialized successfully!');
}); 