// Navigation utility functions
class Navigation {
    static init() {
        this.initMobileMenu();
        this.initNavbarScroll();
        this.initActiveLinks();
    }
    
    static initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    static initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScrollTop = 0;
        let isScrolling = false;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class when scrolled down
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop;
            isScrolling = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                requestAnimationFrame(handleScroll);
                isScrolling = true;
            }
        });
    }
    
    static initActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Handle home page
            if ((currentPath.endsWith('index.html') || currentPath === '/') && href.includes('index.html')) {
                link.classList.add('active');
            }
            // Handle other pages
            else if (href && href !== '#' && currentPath.includes(href.replace('../', ''))) {
                link.classList.add('active');
            }
            // Handle hash links on same page
            else if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    this.setupScrollSpy(link, targetElement);
                }
            }
        });
    }
    
    static setupScrollSpy(link, target) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    // Add active class to current link
                    link.classList.add('active');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-80px 0px -80% 0px'
        });
        
        observer.observe(target);
    }
    
    static smoothScrollTo(target, offset = 80) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    static goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    }
    
    static setActiveNavItem(itemName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.trim().toLowerCase() === itemName.toLowerCase()) {
                link.classList.add('active');
            }
        });
    }
    
    static createBreadcrumb(items) {
        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        
        const list = document.createElement('ol');
        list.className = 'breadcrumb-list';
        
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            if (index === items.length - 1) {
                // Current page
                listItem.textContent = item.text;
                listItem.setAttribute('aria-current', 'page');
            } else {
                // Link
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.text;
                link.className = 'breadcrumb-link';
                listItem.appendChild(link);
            }
            
            list.appendChild(listItem);
            
            // Add separator
            if (index < items.length - 1) {
                const separator = document.createElement('span');
                separator.className = 'breadcrumb-separator';
                separator.textContent = '/';
                separator.setAttribute('aria-hidden', 'true');
                list.appendChild(separator);
            }
        });
        
        breadcrumb.appendChild(list);
        return breadcrumb;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});

// Expose Navigation globally
window.Navigation = Navigation;