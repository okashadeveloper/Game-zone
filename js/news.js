// News page functionality
class NewsPage {
    constructor() {
        this.news = [];
        this.filteredNews = [];
        this.currentCategory = 'all';
        
        this.init();
    }
    
    async init() {
        await this.loadNews();
        this.initFilters();
        this.renderFeaturedArticle();
        this.renderNews();
    }
    
    async loadNews() {
        try {
            // Try to get news from global gameHub instance
            if (window.gameHub && window.gameHub.news) {
                this.news = window.gameHub.news;
            } else {
                // Fallback data
                this.news = await this.getFallbackNews();
            }
            
            this.filteredNews = [...this.news];
        } catch (error) {
            console.error('Error loading news:', error);
            this.news = await this.getFallbackNews();
            this.filteredNews = [...this.news];
        }
    }
    
    async getFallbackNews() {
        return [
            {
                id: 1,
                title: "Major Update: New Gaming Engine Released",
                excerpt: "Experience next-generation gaming with our revolutionary new engine featuring advanced physics, improved graphics, and enhanced performance.",
                content: "We're excited to announce the release of our revolutionary new gaming engine...",
                category: "updates",
                date: "2024-03-15",
                author: "GameHub Team",
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
                featured: true,
                readTime: "5 min"
            },
            {
                id: 2,
                title: "Spring Tournament Championship Results",
                excerpt: "Congratulations to all participants in this season's epic gaming tournament. Check out the winners and highlight moments.",
                content: "The Spring Tournament Championship has concluded with incredible performances...",
                category: "tournaments",
                date: "2024-03-12",
                author: "Tournament Staff",
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "3 min"
            },
            {
                id: 3,
                title: "New Game Release: Cosmic Adventure",
                excerpt: "Embark on an interstellar journey in our latest space exploration game featuring stunning visuals and immersive gameplay.",
                content: "Get ready to explore the cosmos like never before in Cosmic Adventure...",
                category: "releases",
                date: "2024-03-10",
                author: "Development Team",
                image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "4 min"
            },
            {
                id: 4,
                title: "Game Review: Battle Arena Deep Dive",
                excerpt: "Our comprehensive review of the latest multiplayer battle arena game, including gameplay analysis and competitive insights.",
                content: "Battle Arena has taken the gaming world by storm with its innovative combat system...",
                category: "reviews",
                date: "2024-03-08",
                author: "Review Team",
                image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "7 min"
            },
            {
                id: 5,
                title: "Platform Security Enhancement Update",
                excerpt: "We've implemented advanced security measures to protect your gaming experience and personal data.",
                content: "Your security is our top priority. Learn about our latest security enhancements...",
                category: "updates",
                date: "2024-03-05",
                author: "Security Team",
                image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "6 min"
            },
            {
                id: 6,
                title: "Community Spotlight: Player Stories",
                excerpt: "Discover amazing stories from our gaming community and learn about their incredible achievements.",
                content: "Every week, we feature inspiring stories from our incredible gaming community...",
                category: "updates",
                date: "2024-03-03",
                author: "Community Team",
                image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "4 min"
            },
            {
                id: 7,
                title: "Upcoming Tournament: Summer Championship",
                excerpt: "Registration is now open for the biggest gaming tournament of the year. Don't miss your chance to compete!",
                content: "The Summer Championship is approaching fast, and we're looking for the best players...",
                category: "tournaments",
                date: "2024-03-01",
                author: "Tournament Staff",
                image: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "3 min"
            },
            {
                id: 8,
                title: "Game Development Behind the Scenes",
                excerpt: "Take a peek behind the curtain and discover how our development team creates amazing gaming experiences.",
                content: "Ever wondered how your favorite games come to life? Join us for an exclusive look...",
                category: "updates",
                date: "2024-02-28",
                author: "Development Team",
                image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "8 min"
            }
        ];
    }
    
    initFilters() {
        const filterButtons = document.querySelectorAll('.news-filters .filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Apply filter
                this.currentCategory = e.target.dataset.category;
                this.filterAndRenderNews();
            });
        });
    }
    
    filterAndRenderNews() {
        if (this.currentCategory === 'all') {
            this.filteredNews = [...this.news];
        } else {
            this.filteredNews = this.news.filter(article => 
                article.category === this.currentCategory
            );
        }
        
        this.renderNews();
    }
    
    renderFeaturedArticle() {
        const featuredContainer = document.getElementById('featured-article');
        if (!featuredContainer) return;
        
        const featured = this.news.find(article => article.featured) || this.news[0];
        if (!featured) return;
        
        featuredContainer.innerHTML = `
            <div class="featured-article-content animate-fade-up" data-article-id="${featured.id}">
                <img src="${featured.image}" alt="${featured.title}" class="featured-image">
                <div class="featured-overlay">
                    <div class="featured-content">
                        <span class="featured-category">${this.capitalizeFirst(featured.category)}</span>
                        <h2 class="featured-title">${featured.title}</h2>
                        <p class="featured-excerpt">${featured.excerpt}</p>
                        <div class="featured-meta">
                            <span>By ${featured.author}</span>
                            <span>•</span>
                            <time>${this.formatDate(featured.date)}</time>
                            <span>•</span>
                            <span>${featured.readTime || '5 min'} read</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add click handler for featured article
        featuredContainer.addEventListener('click', (e) => {
            const article = e.target.closest('.featured-article-content');
            if (article) {
                const articleId = article.dataset.articleId;
                this.goToArticle(articleId);
            }
        });
    }
    
    renderNews() {
        const newsGrid = document.getElementById('news-grid');
        if (!newsGrid) return;
        
        // Filter out featured article from grid
        const gridNews = this.filteredNews.filter(article => !article.featured);
        
        if (gridNews.length === 0) {
            newsGrid.innerHTML = `
                <div class="no-results">
                    <h3>No articles found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }
        
        newsGrid.innerHTML = gridNews.map((article, index) => `
            <article class="news-card hover-lift animate-fade-up" style="animation-delay: ${index * 0.1}s" data-article-id="${article.id}">
                <img src="${article.image}" alt="${article.title}" class="news-image" loading="lazy">
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-category">${this.capitalizeFirst(article.category)}</span>
                        <time class="news-date">${this.formatDate(article.date)}</time>
                    </div>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <div class="news-footer">
                        <div class="news-author">By ${article.author}</div>
                        <div class="news-read-time">${article.readTime || '5 min'} read</div>
                        <a href="#" class="news-read-more">Read More →</a>
                    </div>
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
    
    goToArticle(articleId) {
        window.location.href = `article.html?id=${articleId}`;
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Method to get related articles
    getRelatedArticles(currentArticleId, category, limit = 3) {
        return this.news
            .filter(article => article.id != currentArticleId)
            .filter(article => !category || article.category === category)
            .slice(0, limit);
    }
    
    // Method to search articles
    searchArticles(query) {
        const searchTerm = query.toLowerCase();
        return this.news.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm)
        );
    }
}

// Initialize news page when DOM is loaded
let newsPage;

document.addEventListener('DOMContentLoaded', () => {
    newsPage = new NewsPage();
});

// Expose newsPage globally
window.newsPage = newsPage;