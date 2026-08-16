# Solarscapes - Educational Astronomy Platform

A comprehensive interactive web-based learning platform for astronomy and space science education.

## Project Structure

```
Solarscapes/
├── index.html                 # Main landing page
├── script.js                  # Global JavaScript functionality
├── main.css                   # Global styles
├── README.md                  # Project documentation
│
├── pages/                     # All HTML pages organized by category
│   ├── learning/              # Educational content pages
│   │   ├── astronomy-basics.html
│   │   ├── learning-modules.html
│   │   └── space-history.html
│   │
│   ├── tools/                 # Interactive tools and simulations
│   │   ├── solar-system.html
│   │   ├── solar-system-animation.html
│   │   ├── solar-system-model.html
│   │   └── solar-system-virtual-tour.html
│   │
│   └── main/                  # Core application pages
│       ├── ContentPage.html
│       ├── HomePage.html
│       ├── QuizPage.html
│       └── calendar.html
│
├── assets/                    # All media and styling
│   ├── img/                   # Images and visual assets
│   │   ├── Planet images
│   │   ├── Background images
│   │   ├── Logo files
│   │   └── Other assets
│   │
│   ├── css/                   # Stylesheets
│   │   └── style.css
│   │
│   ├── js/                    # JavaScript libraries
│   │   └── bootstrap.min.js
│   │
│   └── branding/              # Logo and branding assets
│       └── (logo variants)
│
└── docs/                      # Documentation
```

## Cleanup Completed ✓

- Removed all Windows Zone.Identifier metadata files (31 files)
- Moved loose image files from root to assets/img/
- Deleted empty placeholder files
- Renamed HTML files to use hyphens (no spaces)
- Organized HTML pages by category
- Consolidated all images and assets
- Organized branding assets
- Created documentation folder

## Getting Started

1. Open `index.html` in a web browser
2. Use the navigation menu to explore content
3. Access educational materials in pages/learning/
4. Try interactive tools in pages/tools/
5. Use quiz and calendar features in pages/main/

## Dependencies

- Bootstrap 5.3.0 (CDN)
- Font Awesome 6.0.0 (CDN)
- Google Fonts (CDN)

## Features

- Interactive solar system models and animations
- Educational learning modules
- Astronomy basics tutorials
- Virtual tours of the solar system
- Quiz functionality
- Astronomical calendar events
- Space history content
