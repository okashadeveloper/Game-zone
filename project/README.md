# GameHub - Gaming Website Template

A fully animated, multi-page gaming website template with preview sections on the home page and dedicated full detail pages. Built with clean HTML, CSS, and JavaScript.

## 🚀 Features

### Home Page
- **Hero Banner**: Parallax scrolling with animated text and call-to-action buttons
- **Featured Games Carousel**: Displays 3-4 games with smooth transitions and "See All Games" link
- **Leaderboard Preview**: Shows top 3 players with animated cards and "View Full Leaderboard" link
- **News Preview**: Displays 2-3 recent articles with "View All News" link

### Games Library Page
- **Responsive Grid**: Dynamic grid layout for all games
- **Search & Filter**: Real-time search and category filtering
- **Sort Options**: Sort by name, rating, popularity, or release date
- **Game Cards**: Hover animations with "Play Now" buttons

### Game Detail Page
- **Game Banner**: Full-width banner with game information
- **Embedded Player**: Game iframe with play/fullscreen controls
- **Game Stats**: Developer, release date, player count, features
- **Related Games**: Shows games from the same category

### Leaderboard Page
- **Podium Display**: Animated top 3 players podium
- **Expandable Sections**: Top 10, Top 50, Top 100 with smooth accordion animations
- **Player Cards**: Detailed player information with rankings

### News/Blog Page
- **Featured Article**: Large hero article with overlay content
- **Article Grid**: Responsive grid of news articles
- **Category Filters**: Filter articles by category
- **Article Detail**: Dedicated page for full article content

### Contact/About Page
- **Contact Form**: Animated form with validation
- **Contact Information**: Multiple contact methods with hover effects
- **About Section**: Company information and social links

## 🛠️ Technical Features

### Animations & Interactions
- Smooth page transitions and scroll effects
- Parallax scrolling on hero section
- Hover animations on cards and buttons
- Fade-in animations triggered by scroll
- Loading animations and skeleton loaders
- Micro-interactions on all interactive elements

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- Collapsible mobile navigation
- Optimized layouts for all screen sizes
- Touch-friendly interactions

### Performance
- Lazy loading for images
- Optimized animations with reduced motion support
- Efficient DOM manipulation
- Compressed assets

### Accessibility
- ARIA labels and proper semantics
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly
- Focus management

## 📁 File Structure

```
GameHub/
├── index.html                 # Home page
├── pages/
│   ├── games.html            # Games library
│   ├── game-detail.html     # Individual game page
│   ├── leaderboard.html     # Global leaderboard
│   ├── news.html            # News/blog listing
│   ├── article.html         # Individual article
│   └── contact.html         # Contact/about page
├── css/
│   ├── main.css             # Core styles and layout
│   ├── components.css       # Component-specific styles
│   └── animations.css       # Animation definitions
├── js/
│   ├── main.js              # Core functionality
│   ├── navigation.js        # Navigation utilities
│   ├── games.js            # Games page functionality
│   ├── leaderboard.js      # Leaderboard page functionality
│   ├── news.js             # News page functionality
│   ├── article.js          # Article page functionality
│   ├── game-detail.js      # Game detail functionality
│   └── contact.js          # Contact form functionality
├── data/
│   ├── games.json          # Games database
│   ├── users.json          # User/leaderboard data
│   └── news.json           # News articles data
└── README.md               # This file
```

## 🎮 Data Management

### Adding New Games

Edit `data/games.json` to add new games:

```json
{
  "id": 9,
  "title": "New Game Title",
  "description": "Game description",
  "category": "action", // action, puzzle, strategy, arcade, rpg
  "rating": 4.5,
  "image": "https://example.com/image.jpg",
  "gameUrl": "https://example.com/game",
  "featured": false, // Set to true to feature on homepage
  "developer": "Studio Name",
  "releaseDate": "2024-03-15",
  "players": 1000,
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

### Adding Leaderboard Entries

Edit `data/users.json` to add or modify player rankings:

```json
{
  "id": 11,
  "username": "NewPlayer",
  "score": 8500,
  "level": 25,
  "avatar": "NP", // 2-letter abbreviation
  "country": "🇺🇸", // Flag emoji
  "games_played": 67,
  "wins": 54,
  "achievements": 11
}
```

### Adding News Articles

Edit `data/news.json` to add new articles:

```json
{
  "id": 7,
  "title": "Article Title",
  "excerpt": "Brief description of the article",
  "content": "Full article content with HTML formatting",
  "category": "updates", // updates, tournaments, releases, reviews
  "date": "2024-03-15",
  "author": "Author Name",
  "image": "https://example.com/article-image.jpg",
  "featured": false, // Set to true to feature on news page
  "readTime": "5 min"
}
```

## 🎨 Customization

### Colors

The color system is defined in CSS variables in `css/main.css`:

```css
:root {
    --primary-color: #8B5FBF;     /* Purple */
    --secondary-color: #00E6CC;   /* Cyan */
    --accent-color: #F59E0B;      /* Orange */
    --success-color: #10B981;     /* Green */
    --warning-color: #F59E0B;     /* Orange */
    --error-color: #EF4444;       /* Red */
}
```

### Typography

Two main font families are used:
- **Orbitron**: For headings and display text (futuristic feel)
- **Rajdhani**: For body text and UI elements (clean and readable)

### Animations

All animations can be controlled via `css/animations.css`. Key features:
- Reduced motion support for accessibility
- Configurable animation delays and durations
- Responsive animation adjustments

## 🚀 Getting Started

1. **Download/Clone** the template files
2. **Open** `index.html` in a web browser
3. **Customize** the data files (`data/*.json`) with your content
4. **Modify** colors and styling in the CSS files
5. **Deploy** to your web server

### Local Development

For local development with live reloading:

1. Install a local server (like Live Server for VS Code)
2. Open the project folder
3. Start the local server
4. Navigate to `http://localhost:3000` (or your server's URL)

### Production Deployment

1. Upload all files to your web server
2. Ensure proper MIME types are set for JSON files
3. Configure HTTPS for security
4. Optimize images for faster loading
5. Enable GZIP compression

## 🔧 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📝 License

This template is provided as-is for educational and commercial use. Feel free to modify and customize according to your needs.

## 🤝 Support

For questions or issues:
1. Check the code comments for implementation details
2. Review the JSON data structure examples
3. Test in different browsers and devices
4. Validate your JSON files before deployment

## 🌟 Credits

- **Images**: Pexels (royalty-free stock photos)
- **Fonts**: Google Fonts (Orbitron, Rajdhani)
- **Icons**: Unicode emojis for maximum compatibility

---

**Happy Gaming! 🎮**