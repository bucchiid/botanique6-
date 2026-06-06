# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages. Follow these steps to get it running:

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bucchiid/botanique6-.git
cd botanique6-
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the app locally:

```bash
npm start
```

The app will open at `http://localhost:3000`

## Deployment to GitHub Pages

1. Make sure all changes are committed:
```bash
git add .
git commit -m "Your message"
git push origin main
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

This will:
- Build the app for production
- Deploy it to the `gh-pages` branch
- Your site will be live at: `https://bucchiid.github.io/botanique6-`

## GitHub Pages Configuration

The project is configured in `package.json` with:
- `"homepage": "https://bucchiid.github.io/botanique6-"`
- Deploy script using `gh-pages` package

## Manual GitHub Pages Setup (if needed)

If deployment doesn't work, manually configure GitHub Pages:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select `gh-pages` (after first deploy)
   - Folder: Select `/ (root)`
4. Click Save

## Troubleshooting

### Pages build not deploying
- Ensure `gh-pages` package is installed: `npm install gh-pages --save-dev`
- Check that your GitHub token has proper permissions
- Verify the repository is public (or GitHub Pages is enabled for private repos in your plan)

### Site not updating after deploy
- Clear your browser cache
- Wait a few minutes for GitHub to rebuild
- Check the "Actions" tab to see deployment status

### 404 Error
- Verify `homepage` field in `package.json` matches your repository URL
- Check that `gh-pages` branch exists in your repository
- Ensure the build folder exists and contains index.html

## Project Structure

```
botanique6-/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── Calendar/       # Calendar feature
│   │   └── JokeGenerator/  # Joke generator feature
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies & scripts
└── README.md               # Project info
```

## Features

- 📅 **Calendar**: Manage tasks and reminders, sync with phone calendars
- 😂 **Joke Generator**: Get random jokes, save favorites
- 🏠 **Community Hub**: Botanique Brussels home organization
- 💚 **Green Theme**: Beautiful, nature-inspired design

## License

MIT License - feel free to use and modify!
