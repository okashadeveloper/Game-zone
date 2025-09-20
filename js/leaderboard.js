// Leaderboard page functionality
class LeaderboardPage {
    constructor() {
        this.users = [];
        this.currentSection = 'top10';
        
        this.init();
    }
    
    async init() {
        await this.loadUsers();
        this.initSections();
        this.renderPodium();
        this.renderLeaderboard();
    }
    
    async loadUsers() {
        try {
            // Try to get users from global gameHub instance
            if (window.gameHub && window.gameHub.users) {
                this.users = window.gameHub.users;
            } else {
                // Fallback data
                this.users = await this.getFallbackUsers();
            }
        } catch (error) {
            console.error('Error loading users:', error);
            this.users = await this.getFallbackUsers();
        }
    }
    
    async getFallbackUsers() {
        // Generate a comprehensive list of users for demonstration
        const names = [
            "GamerPro", "StarPlayer", "EliteGamer", "MasterPlayer", "GameChamp",
            "SkillMaster", "ProGamer", "GameWizard", "TopPlayer", "GameLegend",
            "CyberNinja", "GameKnight", "PixelHero", "GameSage", "PlayMaster",
            "GameGuru", "DigitalWarrior", "GamePhoenix", "CyberAce", "GameTitan",
            "VirtualHero", "GameSpirit", "PixelKing", "GameOracle", "CyberLord",
            "GameRanger", "DigitalMage", "GameFalcon", "CyberStorm", "GameViper",
            "PixelStorm", "GameThunder", "CyberBlade", "GameShadow", "DigitalFox",
            "GameWolf", "CyberHawk", "GameDragon", "PixelFire", "GameStorm",
            "CyberFlame", "GameLightning", "DigitalEagle", "GameTiger", "CyberIce",
            "GameFrost", "PixelWind", "GameRaven", "CyberSun", "GameMoon",
            "DigitalStar", "GameComet", "CyberGalaxy", "GameNova", "PixelVoid",
            "GameCosmos", "CyberOrbit", "GamePlanet", "DigitalNebula", "GameQuasar",
            "CyberMeteor", "GameAsteroid", "PixelSaturn", "GameJupiter", "CyberMars",
            "GameVenus", "DigitalEarth", "GameMercury", "CyberPluto", "GameUranus",
            "PixelNeptune", "GameSolar", "CyberLunar", "GameStellar", "DigitalCosmic",
            "GameGalactic", "CyberInterstellar", "GameUniversal", "PixelInfinite", "GameEternal",
            "CyberImmortal", "GameLegendary", "DigitalMythic", "GameEpic", "CyberHeroic",
            "GameChampion", "PixelVictor", "GameConqueror", "CyberDominator", "GameSupreme",
            "DigitalUltimate", "GamePrime", "CyberElite", "GameMaster", "PixelGrandmaster",
            "GameOverlord", "CyberEmperor", "GameKing", "DigitalRuler", "GameSovereign"
        ];
        
        return names.map((name, index) => ({
            id: index + 1,
            username: name,
            score: Math.floor(Math.random() * 10000) + 5000 - (index * 50),
            level: Math.floor(Math.random() * 30) + 20 - Math.floor(index / 3),
            avatar: name.substring(0, 2).toUpperCase(),
            country: this.getRandomCountry(),
            games_played: Math.floor(Math.random() * 200) + 50,
            wins: Math.floor(Math.random() * 150) + 25,
            achievements: Math.floor(Math.random() * 50) + 10
        })).sort((a, b) => b.score - a.score);
    }
    
    getRandomCountry() {
        const countries = [
            "🇺🇸", "🇬🇧", "🇨🇦", "🇩🇪", "🇫🇷", "🇯🇵", "🇰🇷", "🇧🇷",
            "🇦🇺", "🇮🇳", "🇨🇳", "🇷🇺", "🇮🇹", "🇪🇸", "🇳🇱", "🇸🇪"
        ];
        return countries[Math.floor(Math.random() * countries.length)];
    }
    
    initSections() {
        const sectionToggles = document.querySelectorAll('.section-toggle');
        
        sectionToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const section = toggle.dataset.section;
                this.toggleSection(section);
            });
        });
        
        // Initially show top 10
        this.toggleSection('top10');
    }
    
    toggleSection(sectionName) {
        const sections = document.querySelectorAll('.leaderboard-section');
        
        sections.forEach(section => {
            const toggle = section.querySelector('.section-toggle');
            const content = section.querySelector('.section-content');
            const icon = section.querySelector('.toggle-icon');
            
            if (toggle.dataset.section === sectionName) {
                // Open this section
                section.classList.add('active');
                icon.textContent = '▼';
                content.style.maxHeight = content.scrollHeight + 'px';
                this.renderSectionContent(sectionName);
            } else {
                // Close other sections
                section.classList.remove('active');
                icon.textContent = '▶';
                content.style.maxHeight = '0px';
            }
        });
        
        this.currentSection = sectionName;
    }
    
    renderPodium() {
        const podium = document.getElementById('podium');
        if (!podium) return;
        
        const topThree = this.users.slice(0, 3);
        
        podium.innerHTML = topThree.map((user, index) => {
            const position = index + 1;
            const crownEmoji = position === 1 ? '👑' : '';
            
            return `
                <div class="podium-position ${position === 1 ? 'first' : position === 2 ? 'second' : 'third'} animate-scale-in" style="animation-delay: ${index * 0.2}s">
                    <div class="podium-step">
                        ${crownEmoji && `<div class="podium-crown">${crownEmoji}</div>`}
                        <div class="podium-avatar">${user.avatar}</div>
                        <div class="podium-name">${user.username}</div>
                        <div class="podium-score">${user.score.toLocaleString()}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderSectionContent(section) {
        let users = [];
        let containerId = '';
        
        switch (section) {
            case 'top10':
                users = this.users.slice(0, 10);
                containerId = 'top10-list';
                break;
            case 'top50':
                users = this.users.slice(0, 50);
                containerId = 'top50-list';
                break;
            case 'top100':
                users = this.users.slice(0, 100);
                containerId = 'top100-list';
                break;
        }
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = users.map((user, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            const medalEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
            
            return `
                <div class="leaderboard-item ${isTopThree ? 'rank-highlight' : ''}" style="animation-delay: ${index * 0.05}s">
                    <div class="leaderboard-rank ${isTopThree ? 'top-rank' : ''}">
                        ${medalEmoji || rank}
                    </div>
                    <div class="leaderboard-avatar">${user.avatar}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${user.username} ${user.country || ''}</div>
                        <div class="leaderboard-level">Level ${user.level} • ${user.wins || 0} wins</div>
                    </div>
                    <div class="leaderboard-score">${user.score.toLocaleString()}</div>
                </div>
            `;
        }).join('');
    }
    
    renderLeaderboard() {
        // This method can be used for additional rendering if needed
        this.addScrollAnimations();
    }
    
    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.animate-scale-in, .leaderboard-item');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Method to search for a specific user
    findUser(username) {
        const user = this.users.find(u => 
            u.username.toLowerCase().includes(username.toLowerCase())
        );
        
        if (user) {
            const rank = this.users.indexOf(user) + 1;
            return { user, rank };
        }
        
        return null;
    }
    
    // Method to get user statistics
    getUserStats(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return null;
        
        const rank = this.users.indexOf(user) + 1;
        const totalUsers = this.users.length;
        const percentile = Math.round(((totalUsers - rank) / totalUsers) * 100);
        
        return {
            user,
            rank,
            totalUsers,
            percentile,
            isTopTen: rank <= 10,
            isTopFifty: rank <= 50,
            isTopHundred: rank <= 100
        };
    }
}

// Initialize leaderboard page when DOM is loaded
let leaderboardPage;

document.addEventListener('DOMContentLoaded', () => {
    leaderboardPage = new LeaderboardPage();
});

// Expose leaderboardPage globally
window.leaderboardPage = leaderboardPage;