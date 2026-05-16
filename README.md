# Flutter Developer Portfolio

A production-ready, high-performance portfolio website for a Flutter Developer.

## 🚀 Quick Start

Simply open `index.html` in your browser — no build step needed.

## 📁 Structure

```
portfolio/
├── index.html          # Entry point
├── css/
│   ├── reset.css       # CSS reset
│   ├── variables.css   # Design tokens
│   ├── base.css        # Base styles
│   ├── components.css  # UI components
│   ├── navbar.css      # Navigation
│   ├── animations.css  # Keyframes & scroll reveals
│   └── sections.css    # Section styles
├── js/
│   ├── main.js         # Bootstrap, theme, particles
│   ├── animations.js   # Intersection Observer
│   ├── navbar.js       # Mobile menu, scroll state
│   ├── projects.js     # Cards, tilt, modal
│   ├── contact.js      # Form validation
│   └── github.js       # GitHub API repos
└── assets/
    ├── images/         # Avatar, project screenshots
    └── resume.pdf      # Add your resume PDF here
```

## ✏️ Customization

1. **Name / Info** — Search `Aryan Shah` in `index.html` and replace.
2. **Email / Links** — Update `aryan.shah@email.com`, GitHub, LinkedIn URLs.
3. **Projects** — Edit the `PROJECTS` array in `js/projects.js`.
4. **GitHub Repos** — Set `USERNAME` in `js/github.js` to your GitHub handle.
5. **Resume** — Place your `resume.pdf` in `assets/`.
6. **Avatar** — Replace `assets/images/avatar.png`.

## 🌐 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
# Enable Pages in repo Settings → Pages → Deploy from main branch
```

### Netlify (drag & drop)
Drag the entire `portfolio/` folder onto [netlify.com/drop](https://app.netlify.com/drop).

### Vercel
```bash
npx vercel --prod
```
