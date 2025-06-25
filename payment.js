// Payment Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Load selected plan from sessionStorage
    function loadSelectedPlan() {
        const selectedPlan = sessionStorage.getItem('selectedPlan');
        if (selectedPlan) {
            const plan = JSON.parse(selectedPlan);
            updatePlanDisplay(plan);
        }
    }
    
    function updatePlanDisplay(plan) {
        const planNameEl = document.getElementById('selected-plan-name');
        const planPriceEl = document.getElementById('plan-price');
        
        if (planNameEl) planNameEl.textContent = `${plan.name} プラン`;
        if (planPriceEl) planPriceEl.textContent = plan.price;
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardSection = document.querySelector('.card-section');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            if (radio.value === 'card') {
                cardSection.style.display = 'block';
            } else {
                cardSection.style.display = 'none';
            }
        });
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    const cardDisplay = document.getElementById('card-display');
    
    function formatCardNumber(value) {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        return parts.length ? parts.join(' ') : v;
    }
    
    cardNumberInput.addEventListener('input', function(e) {
        const formatted = formatCardNumber(e.target.value);
        e.target.value = formatted;
        
        if (formatted.length === 0) {
            cardDisplay.textContent = '•••• •••• •••• ••••';
        } else {
            const parts = formatted.split(' ');
            while (parts.length < 4) parts.push('••••');
            for (let i = 0; i < parts.length; i++) {
                if (parts[i].length < 4) {
                    parts[i] = parts[i] + '•'.repeat(4 - parts[i].length);
                }
            }
            cardDisplay.textContent = parts.join(' ');
        }
    });
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry-date');
    const expiryDisplay = document.getElementById('expiry-display');
    
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        expiryDisplay.textContent = value || 'MM/YY';
    });
    
    // Card holder name
    const cardHolderInput = document.getElementById('card-holder');
    const holderDisplay = document.getElementById('holder-display');
    
    cardHolderInput.addEventListener('input', function(e) {
        const value = e.target.value.toUpperCase();
        holderDisplay.textContent = value || 'CARD HOLDER';
    });
    
    // Form submission
    const paymentForm = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit-btn');
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            alert('お支払いが完了しました！無料トライアルを開始いたします。');
            
            // Reset button
            btnText.style.display = 'flex';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
        }, 3000);
    });
    
    // Initialize
    loadSelectedPlan();
    
    console.log('💳 Payment page initialized successfully!');
}); 