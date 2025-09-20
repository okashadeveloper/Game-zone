// Main JavaScript file for GameHub
class GameHub {
    constructor() {
        this.games = [];
        this.users = [];
        this.news = [];
        this.isLoading = false;
        
        this.init();
    }
    
    async init() {
        // Show loading screen
        this.showLoading();
        
        // Load data
        await this.loadData();
        
        // Initialize components
        this.initNavigation();
        this.initScrollEffects();
        this.initParallax();
        this.initIntersectionObserver();
        
        // Load home page content
        if (this.isHomePage()) {
            this.initHomePage();
        }
        
        // Hide loading screen
        this.hideLoading();
    }
    
    async loadData() {
        try {
            const [gamesResponse, usersResponse, newsResponse] = await Promise.all([
                fetch('/data/games.json'),
                fetch('/data/users.json'),
                fetch('/data/news.json')
            ]);
            
            this.games = await gamesResponse.json();
            this.users = await usersResponse.json();
            this.news = await newsResponse.json();
        } catch (error) {
            console.error('Error loading data:', error);
            this.loadFallbackData();
        }
    }
    
    loadFallbackData() {
        // Fallback data in case JSON files can't be loaded
        this.games = [
            {
                id: 1,
                title: "Cosmic Adventure",
                description: "Explore distant galaxies in this epic space adventure.",
                category: "action",
                rating: 4.8,
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game1",
                featured: true,
                developer: "StarGames",
                releaseDate: "2024-01-15",
                players: 1250
            },
            {
                id: 2,
                title: "Mystery Manor",
                description: "Solve puzzles and uncover secrets in this thrilling mystery game.",
                category: "puzzle",
                rating: 4.6,
                image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game2",
                featured: true,
                developer: "PuzzleCraft",
                releaseDate: "2024-02-20",
                players: 980
            },
            {
                id: 3,
                title: "Battle Arena",
                description: "Compete in intense multiplayer battles.",
                category: "action",
                rating: 4.9,
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game3",
                featured: true,
                developer: "Combat Studios",
                releaseDate: "2024-03-10",
                players: 2100
            }
        ];
        
        this.users = [
            { id: 1, username: "GamerPro", score: 15420, level: 45, avatar: "GP" },
            { id: 2, username: "StarPlayer", score: 14890, level: 42, avatar: "SP" },
            { id: 3, username: "EliteGamer", score: 13650, level: 38, avatar: "EG" },
            { id: 4, username: "MasterPlayer", score: 12980, level: 35, avatar: "MP" },
            { id: 5, username: "GameChamp", score: 11750, level: 32, avatar: "GC" }
        ];
        
        this.news = [
            {
                id: 1,
                title: "New Game Release: Cosmic Adventure",
                excerpt: "Get ready for an epic space adventure with stunning graphics and immersive gameplay.",
                category: "releases",
                date: "2024-03-15",
                author: "GameHub Team",
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: true
            },
            {
                id: 2,
                title: "Weekly Tournament Results",
                excerpt: "Congratulations to all participants in this week's gaming tournament.",
                category: "tournaments",
                date: "2024-03-12",
                author: "Tournament Staff",
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
                id: 3,
                title: "Platform Updates and Improvements",
                excerpt: "We've made several improvements to enhance your gaming experience.",
                category: "updates",
                date: "2024-03-10",
                author: "Development Team",
                image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
        ];
    }
    
    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }
    
    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000);
        }
    }
    
    isHomePage() {
        return document.getElementById('featured-games') !== null;
    }
    
    initHomePage() {
        this.initFeaturedGames();
        this.initLeaderboardPreview();
        this.initNewsPreview();
    }
    
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        // Scroll effect for navbar
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    initScrollEffects() {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add stagger effect to children
                    const children = entry.target.querySelectorAll('.animate-stagger > *');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animationDelay = `${index * 0.1}s`;
                            child.classList.add('animate-fade-up');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe elements with reveal class
        const revealElements = document.querySelectorAll('.reveal, .scroll-fade');
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    initFeaturedGames() {
        const carouselTrack = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (!carouselTrack) return;
        
        const featuredGames = this.games.filter(game => game.featured).slice(0, 4);
        
        // Render featured games
        carouselTrack.innerHTML = featuredGames.map(game => `
            <div class="carousel-item">
                <div class="game-card hover-lift" data-game-id="${game.id}">
                    <div class="game-card-image">
                        <img src="${game.image}" alt="${game.title}" loading="lazy">
                        <div class="game-card-overlay">
                            <button class="game-play-btn" onclick="gameHub.playGame(${game.id})">
                                Play Now
                            </button>
                        </div>
                    </div>
                    <div class="game-card-content">
                        <h3 class="game-card-title">${game.title}</h3>
                        <p class="game-card-description">${game.description}</p>
                        <div class="game-card-meta">
                            <span class="game-category">${this.capitalizeFirst(game.category)}</span>
                            <span class="game-rating">⭐ ${game.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Initialize carousel
        this.initCarousel(carouselTrack, prevBtn, nextBtn);
        
        // Add click handlers for game cards
        carouselTrack.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (gameCard && !e.target.classList.contains('game-play-btn')) {
                const gameId = gameCard.dataset.gameId;
                this.goToGameDetail(gameId);
            }
        });
    }
    
    initCarousel(track, prevBtn, nextBtn) {
        let currentIndex = 0;
        const items = track.children;
        const itemWidth = 320; // 300px + 20px gap
        const maxIndex = Math.max(0, items.length - 3);
        
        const updateCarousel = () => {
            const translateX = -currentIndex * itemWidth;
            track.style.transform = `translateX(${translateX}px)`;
            
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        };
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Auto-play carousel
        setInterval(() => {
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }, 5000);
        
        updateCarousel();
    }
    
    initLeaderboardPreview() {
        const leaderboardCards = document.getElementById('leaderboard-preview-cards');
        
        if (!leaderboardCards) return;
        
        const topPlayers = this.users.slice(0, 3);
        
        leaderboardCards.innerHTML = topPlayers.map((player, index) => `
            <div class="leaderboard-card rank-${index + 1} hover-lift animate-scale-in" style="animation-delay: ${index * 0.2}s">
                <div class="rank-badge rank-${index + 1}">${index + 1}</div>
                <div class="player-avatar">${player.avatar}</div>
                <h3 class="player-name">${player.username}</h3>
                <p class="player-score">${player.score.toLocaleString()} points</p>
            </div>
        `).join('');
    }
    
    initNewsPreview() {
        const newsGrid = document.getElementById('news-preview-grid');
        
        if (!newsGrid) return;
        
        const latestNews = this.news.slice(0, 3);
        
        newsGrid.innerHTML = latestNews.map((article, index) => `
            <article class="news-card hover-lift animate-fade-up" style="animation-delay: ${index * 0.1}s" data-article-id="${article.id}">
                <img src="${article.image}" alt="${article.title}" class="news-image" loading="lazy">
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-category">${this.capitalizeFirst(article.category)}</span>
                        <time class="news-date">${this.formatDate(article.date)}</time>
                    </div>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <a href="#" class="news-read-more">Read More →</a>
                </div>
            </article>
        `).join('');
        
        // Add click handlers for news cards
        newsGrid.addEventListener('click', (e) => {
            const newsCard = e.target.closest('.news-card');
            if (newsCard) {
                const articleId = newsCard.dataset.articleId;
                this.goToArticle(articleId);
            }
        });
    }
    
    playGame(gameId) {
        const game = this.games.find(g => g.id == gameId);
        if (game) {
            // For demo purposes, we'll navigate to game detail page
            this.goToGameDetail(gameId);
        }
    }
    
    goToGameDetail(gameId) {
        window.location.href = `pages/game-detail.html?id=${gameId}`;
    }
    
    goToArticle(articleId) {
        window.location.href = `pages/article.html?id=${articleId}`;
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Utility method to get URL parameters
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // Method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Initialize GameHub when DOM is loaded
let gameHub;

document.addEventListener('DOMContentLoaded', () => {
    gameHub = new GameHub();
});

// Expose gameHub globally for other scripts
window.gameHub = gameHub;