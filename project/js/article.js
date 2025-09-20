// Article page functionality
class ArticlePage {
    constructor() {
        this.article = null;
        this.articleId = null;
        
        this.init();
    }
    
    init() {
        this.articleId = this.getUrlParameter('id');
        if (this.articleId) {
            this.loadArticle();
        } else {
            this.showError('Article not found');
        }
    }
    
    async loadArticle() {
        try {
            // Try to get article from global gameHub instance or newsPage
            let allNews = [];
            
            if (window.gameHub && window.gameHub.news) {
                allNews = window.gameHub.news;
            } else if (window.newsPage && window.newsPage.news) {
                allNews = window.newsPage.news;
            } else {
                allNews = await this.getFallbackNews();
            }
            
            this.article = allNews.find(article => article.id == this.articleId);
            
            if (this.article) {
                this.renderArticle();
                this.updatePageTitle();
            } else {
                this.showError('Article not found');
            }
        } catch (error) {
            console.error('Error loading article:', error);
            this.showError('Error loading article');
        }
    }
    
    async getFallbackNews() {
        return [
            {
                id: 1,
                title: "Major Update: New Gaming Engine Released",
                excerpt: "Experience next-generation gaming with our revolutionary new engine featuring advanced physics, improved graphics, and enhanced performance.",
                content: `
                    <p>We're excited to announce the release of our revolutionary new gaming engine that will transform your gaming experience forever. After months of intensive development and testing, we're proud to introduce features that push the boundaries of what's possible in modern gaming.</p>
                    
                    <h2>What's New in the Engine</h2>
                    
                    <p>Our new engine brings several groundbreaking improvements:</p>
                    
                    <ul>
                        <li><strong>Advanced Physics System:</strong> More realistic interactions between objects and environments</li>
                        <li><strong>Enhanced Graphics Pipeline:</strong> Support for real-time ray tracing and advanced lighting</li>
                        <li><strong>Improved Performance:</strong> Up to 40% better frame rates on the same hardware</li>
                        <li><strong>Better Audio:</strong> Spatial audio technology for immersive sound experiences</li>
                    </ul>
                    
                    <p>The development team has worked tirelessly to ensure backward compatibility with existing games while opening up new possibilities for future titles.</p>
                    
                    <h2>Impact on Current Games</h2>
                    
                    <p>All existing games will automatically benefit from performance improvements, while newer titles will take full advantage of the advanced features. We're working with developers to update their games to utilize the new capabilities.</p>
                    
                    <p>This update represents our commitment to pushing the gaming industry forward and providing the best possible experience for our players.</p>
                `,
                category: "updates",
                date: "2024-03-15",
                author: "GameHub Team",
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "5 min"
            },
            {
                id: 2,
                title: "Spring Tournament Championship Results",
                excerpt: "Congratulations to all participants in this season's epic gaming tournament. Check out the winners and highlight moments.",
                content: `
                    <p>The Spring Tournament Championship has concluded with incredible performances from players around the world. This season saw record participation with over 10,000 players competing across multiple game categories.</p>
                    
                    <h2>Championship Winners</h2>
                    
                    <p>Congratulations to our champions:</p>
                    
                    <ul>
                        <li><strong>Battle Arena Champion:</strong> GamerPro - 15,420 points</li>
                        <li><strong>Strategy Master:</strong> StarPlayer - 14,890 points</li>
                        <li><strong>Puzzle Champion:</strong> EliteGamer - 13,650 points</li>
                    </ul>
                    
                    <h2>Tournament Highlights</h2>
                    
                    <p>This tournament featured some of the most intense matches we've ever seen. The final battle between GamerPro and StarPlayer lasted over 2 hours and kept viewers on the edge of their seats.</p>
                    
                    <p>We were also impressed by the sportsmanship displayed by all participants. The gaming community continues to show that competition and friendship go hand in hand.</p>
                    
                    <h2>Next Tournament</h2>
                    
                    <p>Mark your calendars! The Summer Championship will begin registration next month. We're planning even bigger prizes and more exciting competitions.</p>
                `,
                category: "tournaments",
                date: "2024-03-12",
                author: "Tournament Staff",
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
                readTime: "3 min"
            }
        ];
    }
    
    renderArticle() {
        const articleHeader = document.getElementById('article-header');
        const articleBody = document.getElementById('article-body');
        
        if (articleHeader) {
            articleHeader.innerHTML = `
                <div class="article-image-container animate-fade-in">
                    <img src="${this.article.image}" alt="${this.article.title}" class="article-image">
                </div>
                <h1 class="article-title animate-fade-up">${this.article.title}</h1>
                <div class="article-meta animate-fade-up" style="animation-delay: 0.1s">
                    <span class="article-category">${this.capitalizeFirst(this.article.category)}</span>
                    <span class="meta-separator">•</span>
                    <span class="article-author">By ${this.article.author}</span>
                    <span class="meta-separator">•</span>
                    <time class="article-date">${this.formatDate(this.article.date)}</time>
                    <span class="meta-separator">•</span>
                    <span class="article-read-time">${this.article.readTime || '5 min'} read</span>
                </div>
            `;
        }
        
        if (articleBody) {
            articleBody.innerHTML = `
                <div class="article-text animate-fade-up" style="animation-delay: 0.2s">
                    ${this.article.content || this.generateContentFromExcerpt()}
                </div>
            `;
        }
        
        // Add smooth scroll animations
        this.initScrollAnimations();
    }
    
    generateContentFromExcerpt() {
        // If no full content is available, generate from excerpt
        return `
            <p>${this.article.excerpt}</p>
            <p>This is a sample article content. In a real application, this would contain the full article text with proper formatting, images, and interactive elements.</p>
            <h2>Key Features</h2>
            <p>Here are some highlights from this ${this.article.category} article:</p>
            <ul>
                <li>Comprehensive coverage of the topic</li>
                <li>Expert insights and analysis</li>
                <li>Community feedback and reactions</li>
                <li>Future implications and updates</li>
            </ul>
            <p>Stay tuned for more updates and articles from our team. We're committed to bringing you the latest news and insights from the gaming world.</p>
        `;
    }
    
    updatePageTitle() {
        document.title = `${this.article.title} - GameHub`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', this.article.excerpt);
        }
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-in');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    showError(message) {
        const articleHeader = document.getElementById('article-header');
        const articleBody = document.getElementById('article-body');
        
        if (articleHeader) {
            articleHeader.innerHTML = `
                <div class="error-content">
                    <h1 class="error-title">Oops! ${message}</h1>
                    <p class="error-message">The article you're looking for might have been moved or doesn't exist.</p>
                    <a href="news.html" class="btn btn-primary">← Back to News</a>
                </div>
            `;
        }
        
        if (articleBody) {
            articleBody.innerHTML = '';
        }
    }
    
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
}

// Initialize article page when DOM is loaded
let articlePage;

document.addEventListener('DOMContentLoaded', () => {
    articlePage = new ArticlePage();
});

// Expose articlePage globally
window.articlePage = articlePage;