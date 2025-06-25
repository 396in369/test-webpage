// Contact Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.btn-submit');
    const resetBtn = document.querySelector('.btn-reset');
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
    
    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Contact form submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
        }, 2000); // Simulate 2 second processing time
    });
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        // Add confirmation for reset
        if (contactForm.checkValidity() && hasFormData()) {
            const confirmed = confirm('入力内容をリセットしてもよろしいですか？');
            if (!confirmed) {
                return false;
            }
        }
        
        // Clear any error states
        clearFormErrors();
    });
    
    // Real-time form validation
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Method cards hover effects
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click to copy contact info
        const detailItems = card.querySelectorAll('.detail-item');
        detailItems.forEach(item => {
            const text = item.textContent.trim();
            if (text.includes('@') || text.includes('-')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    copyToClipboard(text);
                    showCopyNotification(this);
                });
            }
        });
    });
    
    // Office cards interactive effects
    const officeCards = document.querySelectorAll('.office-card');
    officeCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
    
    // Scroll animations
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
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.method-card, .office-card, .faq-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Helper functions
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        // Remove previous error state
        field.classList.remove('error');
        removeErrorMessage(field);
        
        // Check if required field is empty
        if (isRequired && !value) {
            showFieldError(field, 'この項目は必須です');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, '有効なメールアドレスを入力してください');
                return false;
            }
        }
        
        // Phone validation (Japanese format)
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\-\(\)\+\s]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, '有効な電話番号を入力してください');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff6b35;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: fadeInUp 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function removeErrorMessage(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());
        
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    function hasFormData() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        return Array.from(inputs).some(input => input.value.trim() !== '');
    }
    
    function showSuccessMessage() {
        let successMsg = document.querySelector('.success-message');
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '✅ お問い合わせを受け付けました。ご返信までしばらくお待ちください。';
            contactForm.appendChild(successMsg);
        }
        
        successMsg.classList.add('show');
        
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
    
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
    
    function showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = 'コピーしました！';
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
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const isPercentage = element.textContent.includes('%');
        let current = 0;
        const increment = target / 50; // 50 steps for animation
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const value = Math.floor(current);
            element.textContent = isPercentage ? `${value}%` : value;
        }, 30);
    }
    
    // Auto-resize textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Add floating label effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.transform = 'translateY(-8px) scale(0.9)';
                label.style.color = 'var(--accent-color)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
        }
    });
    
    // Add CSS for error state
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ff6b35;
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(errorStyle);
    
    console.log('📧 Contact page interactive features loaded successfully!');
}); 