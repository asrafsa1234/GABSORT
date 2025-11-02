<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GAB Sort - Recycling Companion App

An eco-friendly recycling companion app that helps you identify recyclable items and provides disposal instructions.

View your app in AI Studio: https://ai.studio/apps/drive/15yV0zsj0zcTyAeGlVgk-cFaXM0sjROMM

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```
3. Open your browser to http://localhost:3000

**Note:** This app now uses a mock service and doesn't require any API keys.

## Build for Production

1. Build the production version:
   ```bash
   npm run build
   ```
2. Preview the production build:
   ```bash
   npm run preview
   ```

The build output will be in the `dist/` folder.

## Deploy to Production

This app can be deployed to any static hosting service. Here are popular options:

### Option 1: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click "Deploy"

Your app will be live in seconds!

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "Add new site" > "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
4. Enable GitHub Pages in your repository settings

### Option 4: Surge.sh

1. Install surge globally:
   ```bash
   npm install -g surge
   ```
2. Build and deploy:
   ```bash
   npm run build
   surge dist/
   ```

## Features

- 📸 Image upload and analysis
- ♻️ Recycling identification and instructions
- 📊 Recyclability scoring
- 💡 Eco-friendly tips and alternatives
- 📝 Scan history
- 🗺️ Recycling map
- 👤 User profile with points

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- No external API keys required
