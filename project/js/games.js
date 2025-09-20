// Games page functionality
class GamesPage {
    constructor() {
        this.games = [];
        this.filteredGames = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.searchQuery = '';
        
        this.init();
    }
    
    async init() {
        await this.loadGames();
        this.initControls();
        this.renderGames();
    }
    
    async loadGames() {
        try {
            // Try to get games from global gameHub instance
            if (window.gameHub && window.gameHub.games) {
                this.games = window.gameHub.games;
            } else {
                // Fallback data
                this.games = await this.getFallbackGames();
            }
            
            this.filteredGames = [...this.games];
        } catch (error) {
            console.error('Error loading games:', error);
            this.games = await this.getFallbackGames();
            this.filteredGames = [...this.games];
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
                image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game1",
                developer: "StarGames",
                releaseDate: "2024-01-15",
                players: 1250,
                features: ["Multiplayer", "HD Graphics", "Story Mode", "Achievements"]
            },
            {
                id: 2,
                title: "Mystery Manor",
                description: "Solve intricate puzzles and uncover dark secrets in this thrilling mystery adventure.",
                category: "puzzle",
                rating: 4.6,
                image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game2",
                developer: "PuzzleCraft",
                releaseDate: "2024-02-20",
                players: 980,
                features: ["Brain Teasers", "Story Rich", "Atmospheric", "Multiple Endings"]
            },
            {
                id: 3,
                title: "Battle Arena",
                description: "Compete in intense multiplayer battles with players from around the world.",
                category: "action",
                rating: 4.9,
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game3",
                developer: "Combat Studios",
                releaseDate: "2024-03-10",
                players: 2100,
                features: ["PvP", "Tournaments", "Real-time Combat", "Leaderboards"]
            },
            {
                id: 4,
                title: "Pixel Quest",
                description: "A retro-style platformer with modern gameplay mechanics and charming pixel art.",
                category: "arcade",
                rating: 4.4,
                image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game4",
                developer: "Retro Games",
                releaseDate: "2024-01-05",
                players: 750,
                features: ["Retro Style", "Platformer", "Collectibles", "Boss Battles"]
            },
            {
                id: 5,
                title: "Strategy Empire",
                description: "Build and manage your empire in this deep strategy game with complex mechanics.",
                category: "strategy",
                rating: 4.7,
                image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game5",
                developer: "Empire Games",
                releaseDate: "2024-02-28",
                players: 1500,
                features: ["City Building", "Resource Management", "Diplomacy", "Research Tree"]
            },
            {
                id: 6,
                title: "Fantasy RPG",
                description: "Embark on an epic journey through a magical world filled with quests and adventures.",
                category: "rpg",
                rating: 4.8,
                image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game6",
                developer: "Fantasy Studios",
                releaseDate: "2024-03-01",
                players: 1800,
                features: ["Character Progression", "Open World", "Magic System", "Epic Storyline"]
            },
            {
                id: 7,
                title: "Speed Racer",
                description: "High-octane racing game with realistic physics and stunning track designs.",
                category: "arcade",
                rating: 4.3,
                image: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game7",
                developer: "Speed Studios",
                releaseDate: "2024-01-20",
                players: 900,
                features: ["Racing", "Customization", "Time Trials", "Championship Mode"]
            },
            {
                id: 8,
                title: "Logic Master",
                description: "Challenge your mind with hundreds of logic puzzles and brain teasers.",
                category: "puzzle",
                rating: 4.5,
                image: "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&w=400",
                gameUrl: "https://example.com/game8",
                developer: "Brain Games",
                releaseDate: "2024-02-15",
                players: 650,
                features: ["Logic Puzzles", "Progressive Difficulty", "Hint System", "Daily Challenges"]
            }
        ];
    }
    
    initControls() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterAndRenderGames();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterAndRenderGames();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterAndRenderGames();
            });
        }
        
        // Category filters
        const categoryFilters = document.getElementById('category-filters');
        if (categoryFilters) {
            categoryFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    // Update active state
                    categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    // Update filter
                    this.currentCategory = e.target.dataset.category;
                    this.filterAndRenderGames();
                }
            });
        }
        
        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.filterAndRenderGames();
            });
        }
    }
    
    filterAndRenderGames() {
        // Start with all games
        this.filteredGames = [...this.games];
        
        // Apply category filter
        if (this.currentCategory !== 'all') {
            this.filteredGames = this.filteredGames.filter(game => 
                game.category === this.currentCategory
            );
        }
        
        // Apply search filter
        if (this.searchQuery) {
            this.filteredGames = this.filteredGames.filter(game =>
                game.title.toLowerCase().includes(this.searchQuery) ||
                game.description.toLowerCase().includes(this.searchQuery) ||
                game.category.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Apply sorting
        this.sortGames();
        
        // Render results
        this.renderGames();
        this.updateResultsCount();
    }
    
    sortGames() {
        switch (this.currentSort) {
            case 'name':
                this.filteredGames.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'rating':
                this.filteredGames.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                this.filteredGames.sort((a, b) => b.players - a.players);
                break;
            case 'newest':
                this.filteredGames.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
        }
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;
        
        if (this.filteredGames.length === 0) {
            gamesGrid.innerHTML = `
                <div class="no-results">
                    <h3>No games found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }
        
        gamesGrid.innerHTML = this.filteredGames.map((game, index) => `
            <div class="game-card hover-lift animate-fade-up" style="animation-delay: ${index * 0.1}s" data-game-id="${game.id}">
                <div class="game-card-image">
                    <img src="${game.image}" alt="${game.title}" loading="lazy">
                    <div class="game-card-overlay">
                        <button class="game-play-btn" onclick="gamesPage.playGame(${game.id})">
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
        `).join('');
        
        // Add click handlers for game cards
        gamesGrid.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (gameCard && !e.target.classList.contains('game-play-btn')) {
                const gameId = gameCard.dataset.gameId;
                this.goToGameDetail(gameId);
            }
        });
    }
    
    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const count = this.filteredGames.length;
            const total = this.games.length;
            resultsCount.textContent = `Showing ${count} of ${total} games`;
        }
    }
    
    playGame(gameId) {
        const game = this.games.find(g => g.id == gameId);
        if (game) {
            // For demo purposes, navigate to game detail page
            this.goToGameDetail(gameId);
        }
    }
    
    goToGameDetail(gameId) {
        window.location.href = `game-detail.html?id=${gameId}`;
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize games page when DOM is loaded
let gamesPage;

document.addEventListener('DOMContentLoaded', () => {
    gamesPage = new GamesPage();
});

// Expose gamesPage globally
window.gamesPage = gamesPage;