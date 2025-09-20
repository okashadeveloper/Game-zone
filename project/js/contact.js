// Contact page functionality
class ContactPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.initContactForm();
        this.initAnimations();
    }
    
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }
    
    handleFormSubmission(form) {
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        this.setFormLoading(form, true);
        
        // Simulate form submission
        setTimeout(() => {
            this.setFormLoading(form, false);
            this.showSuccessMessage();
            form.reset();
        }, 2000);
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject) {
            errors.push('Please select a subject');
        }
        
        if (!data.message || data.message.length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    setFormLoading(form, loading) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const formInputs = form.querySelectorAll('input, select, textarea');
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.classList.add('loading');
            formInputs.forEach(input => input.disabled = true);
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
            submitBtn.classList.remove('loading');
            formInputs.forEach(input => input.disabled = false);
        }
    }
    
    showSuccessMessage() {
        this.showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
    }
    
    showErrors(errors) {
        const errorMessage = errors.join('\n');
        this.showNotification(errorMessage, 'error');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
                </div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
        
        // Close button handler
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            this.hideNotification(notification);
        });
        
        // Click outside to close
        notification.addEventListener('click', (e) => {
            if (e.target === notification) {
                clearTimeout(hideTimeout);
                this.hideNotification(notification);
            }
        });
    }
    
    hideNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    initAnimations() {
        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe form and contact info elements
        const animatedElements = document.querySelectorAll('.contact-form-section, .contact-info-section, .contact-item, .about-section');
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
        
        // Add hover effects to contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effects to social links
        const socialLinks = document.querySelectorAll('.social-links .social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                link.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                // Show demo message
                const platform = link.getAttribute('aria-label');
                this.showNotification(`This would open our ${platform} page in a real implementation.`, 'info');
            });
        });
    }
    
    // Method to handle form field validation on blur
    initFieldValidation() {
        const formFields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
        
        formFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
    }
    
    validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
                
            case 'email':
                if (!value || !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
                
            case 'message':
                if (!value || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Initialize contact page when DOM is loaded
let contactPage;

document.addEventListener('DOMContentLoaded', () => {
    contactPage = new ContactPage();
});

// Expose contactPage globally
window.contactPage = contactPage;