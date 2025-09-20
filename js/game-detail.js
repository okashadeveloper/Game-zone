// Game detail page functionality
class GameDetailPage {
    constructor() {
        this.game = null;
        this.gameId = null;
        this.isPlaying = false;
        
        this.init();
    }
    
    init() {
        this.gameId = this.getUrlParameter('id');
        if (this.gameId) {
            this.loadGame();
        } else {
            this.showError('Game not found');
        }
    }
    
    async loadGame() {
        try {
            // Try to get game from global gameHub instance or gamesPage
            let allGames = [];
            
            if (window.gameHub && window.gameHub.games) {
                allGames = window.gameHub.games;
            } else if (window.gamesPage && window.gamesPage.games) {
                allGames = window.gamesPage.games;
            } else {
                allGames = await this.getFallbackGames();
            }
            
            this.game = allGames.find(game => game.id == this.gameId);
            
            if (this.game) {
                this.renderGame();
                this.initControls();
                this.loadRelatedGames(allGames);
                this.updatePageTitle();
            } else {
                this.showError('Game not found');
            }
        } catch (error) {
            console.error('Error loading game:', error);
            this.showError('Error loading game');
        }
    }
    
    async getFallbackGames() {
        return [
            {
                id: 1,
                title: "Cosmic Adventure",
                description: "Explore distant galaxies in this epic space adventure with stunning visuals and immersive gameplay.",
                category: "action",
                rating: 4.8,
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
                gameUrl: "https://example.com/game1",
                developer: "StarGames",
                releaseDate: "2024-01-15",
                players: 1250,
                features: ["Multiplayer Support", "HD Graphics", "Story Mode", "Achievements System", "Cloud Saves"]
            },
            {
                id: 2,
                title: "Mystery Manor",
                description: "Solve intricate puzzles and uncover dark secrets in this thrilling mystery adventure.",
                category: "puzzle",
                rating: 4.6,
                image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=800",
                gameUrl: "https://example.com/game2",
                developer: "PuzzleCraft",
                releaseDate: "2024-02-20",
                players: 980,
                features: ["Brain Teasers", "Story Rich", "Atmospheric Music", "Multiple Endings"]
            },
            {
                id: 3,
                title: "Battle Arena",
                description: "Compete in intense multiplayer battles with players from around the world.",
                category: "action",
                rating: 4.9,
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
                gameUrl: "https://example.com/game3",
                developer: "Combat Studios",
                releaseDate: "2024-03-10",
                players: 2100,
                features: ["PvP Combat", "Tournaments", "Real-time Battles", "Global Leaderboards"]
            }
        ];
    }
    
    renderGame() {
        // Render game banner
        const gameBanner = document.getElementById('game-banner');
        const gameTitle = document.getElementById('game-title');
        const gameCategory = document.getElementById('game-category');
        const gameRating = document.getElementById('game-rating');
        const gameDescription = document.getElementById('game-description');
        
        if (gameBanner) gameBanner.src = this.game.image;
        if (gameTitle) gameTitle.textContent = this.game.title;
        if (gameCategory) gameCategory.textContent = this.capitalizeFirst(this.game.category);
        if (gameRating) gameRating.textContent = `⭐ ${this.game.rating}`;
        if (gameDescription) gameDescription.textContent = this.game.description;
        
        // Render game details
        this.renderGameDetails();
    }
    
    renderGameDetails() {
        // Full description
        const fullDescription = document.getElementById('game-full-description');
        if (fullDescription) {
            fullDescription.textContent = this.game.description + " " + (this.game.longDescription || "Experience hours of engaging gameplay with cutting-edge graphics and innovative mechanics that will keep you coming back for more.");
        }
        
        // Features
        const featuresList = document.getElementById('game-features');
        if (featuresList && this.game.features) {
            featuresList.innerHTML = this.game.features.map(feature => 
                `<li>${feature}</li>`
            ).join('');
        }
        
        // Game stats
        const releaseDate = document.getElementById('release-date');
        const developer = document.getElementById('developer');
        const categoryDetail = document.getElementById('category-detail');
        const playersCount = document.getElementById('players-count');
        
        if (releaseDate) releaseDate.textContent = this.formatDate(this.game.releaseDate);
        if (developer) developer.textContent = this.game.developer;
        if (categoryDetail) categoryDetail.textContent = this.capitalizeFirst(this.game.category);
        if (playersCount) playersCount.textContent = `${this.game.players} active`;
    }
    
    initControls() {
        const playBtn = document.getElementById('play-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const closePlayerBtn = document.getElementById('close-player');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => this.playGame());
        }
        
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.playFullscreen());
        }
        
        if (closePlayerBtn) {
            closePlayerBtn.addEventListener('click', () => this.closeGame());
        }
    }
    
    playGame() {
        const gamePlayer = document.getElementById('game-player');
        const gameIframe = document.getElementById('game-iframe');
        
        if (gamePlayer && gameIframe) {
            // Show player
            gamePlayer.style.display = 'block';
            
            // Set iframe source (in a real app, this would be the actual game URL)
            gameIframe.src = this.game.gameUrl || 'about:blank';
            
            // Scroll to player
            gamePlayer.scrollIntoView({ behavior: 'smooth' });
            
            this.isPlaying = true;
            
            // Update play button
            const playBtn = document.getElementById('play-btn');
            if (playBtn) {
                playBtn.innerHTML = '<span>🎮 Playing...</span>';
                playBtn.disabled = true;
            }
        }
    }
    
    playFullscreen() {
        // Open game in new tab/window for fullscreen experience
        if (this.game.gameUrl) {
            window.open(this.game.gameUrl, '_blank', 'fullscreen=yes');
        } else {
            // Demo implementation
            this.showNotification('Fullscreen mode would open the game in a new window', 'info');
        }
    }
    
    closeGame() {
        const gamePlayer = document.getElementById('game-player');
        const gameIframe = document.getElementById('game-iframe');
        
        if (gamePlayer && gameIframe) {
            // Hide player
            gamePlayer.style.display = 'none';
            
            // Clear iframe
            gameIframe.src = 'about:blank';
            
            this.isPlaying = false;
            
            // Update play button
            const playBtn = document.getElementById('play-btn');
            if (playBtn) {
                playBtn.innerHTML = '<span>▶ Play Now</span>';
                playBtn.disabled = false;
            }
        }
    }
    
    loadRelatedGames(allGames) {
        const relatedGamesGrid = document.getElementById('related-games-grid');
        if (!relatedGamesGrid || !allGames) return;
        
        // Get related games from same category, excluding current game
        const relatedGames = allGames
            .filter(game => game.id != this.gameId && game.category === this.game.category)
            .slice(0, 4);
        
        if (relatedGames.length === 0) {
            // If no games in same category, get random games
            const otherGames = allGames.filter(game => game.id != this.gameId).slice(0, 4);
            relatedGames.push(...otherGames);
        }
        
        relatedGamesGrid.innerHTML = relatedGames.map((game, index) => `
            <div class="related-game-card hover-lift animate-fade-up" style="animation-delay: ${index * 0.1}s" data-game-id="${game.id}">
                <img src="${game.image}" alt="${game.title}" class="related-game-image">
                <div class="related-game-info">
                    <h4 class="related-game-title">${game.title}</h4>
                    <div class="related-game-meta">
                        <span class="related-game-category">${this.capitalizeFirst(game.category)}</span>
                        <span class="related-game-rating">⭐ ${game.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for related games
        relatedGamesGrid.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.related-game-card');
            if (gameCard) {
                const gameId = gameCard.dataset.gameId;
                window.location.href = `game-detail.html?id=${gameId}`;
            }
        });
    }
    
    updatePageTitle() {
        document.title = `${this.game.title} - GameHub`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', this.game.description);
        }
    }
    
    showError(message) {
        const gameHeader = document.getElementById('game-header');
        
        if (gameHeader) {
            gameHeader.innerHTML = `
                <div class="error-content">
                    <h1 class="error-title">Oops! ${message}</h1>
                    <p class="error-message">The game you're looking for might have been moved or doesn't exist.</p>
                    <a href="games.html" class="btn btn-primary">← Back to Games</a>
                </div>
            `;
        }
    }
    
    showNotification(message, type = 'info') {
        if (window.gameHub && typeof window.gameHub.showNotification === 'function') {
            window.gameHub.showNotification(message, type);
        } else {
            alert(message); // Fallback
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

// Initialize game detail page when DOM is loaded
let gameDetailPage;

document.addEventListener('DOMContentLoaded', () => {
    gameDetailPage = new GameDetailPage();
});

// Expose gameDetailPage globally
window.gameDetailPage = gameDetailPage;