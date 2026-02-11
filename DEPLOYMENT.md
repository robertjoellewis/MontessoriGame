# Deployment Guide - GitHub Pages

This game is set up for automatic deployment to GitHub Pages using GitHub Actions.

## Initial Setup (One-Time)

### 1. Create GitHub Repository

If you haven't already:
```bash
# Create a new repo on GitHub (via web interface), then:
git remote add origin https://github.com/YOUR-USERNAME/MontessoriGame.git
```

**IMPORTANT**: The repository name in the URL above must match the `base` setting in `vite.config.js` (currently set to `/MontessoriGame/`)

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save

### 3. Push Your Code

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit with CI/CD setup"

# Push to GitHub
git push -u origin main
```

## Automatic Deployment

Once set up, **every push to the `main` branch automatically deploys** your game!

The GitHub Action workflow will:
1. Install dependencies
2. Build the game (`npm run build`)
3. Deploy to GitHub Pages

You can watch the deployment progress in the **Actions** tab of your repository.

## Accessing Your Deployed Game

After the first successful deployment, your game will be live at:

```
https://YOUR-USERNAME.github.io/MontessoriGame/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Manual Deployment

You can also trigger a deployment manually:

1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Choose `main` branch and click **Run workflow**

## Local Build Testing

Before deploying, you can test the production build locally:

```bash
# Build the game
npm run build

# Preview the build
npm run preview
```

This will serve the built game at `http://localhost:4173`

## Updating the Base URL

If you change your repository name, update the `base` path in `vite.config.js`:

```javascript
export default defineConfig({
  base: '/YOUR-NEW-REPO-NAME/',
  // ...
});
```

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Make sure all dependencies are in `package.json`
- Verify the build works locally with `npm run build`

### Assets Not Loading
- Verify the `base` path in `vite.config.js` matches your repository name
- Check browser console for 404 errors

### Deployment Fails
- Ensure GitHub Pages is enabled in repository Settings
- Verify repository permissions allow GitHub Actions to deploy
- Check that the workflow has proper permissions in `.github/workflows/deploy.yml`

## Environment Variables

If you need environment variables (like API keys):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets (e.g., `REPLICATE_API_TOKEN`)
3. Update the workflow to use them:

```yaml
- name: Build game
  env:
    VITE_REPLICATE_API_TOKEN: ${{ secrets.REPLICATE_API_TOKEN }}
  run: npm run build
```

**Note**: For security, never commit `.env` files to git!

## Current Status

✅ Vite configured for GitHub Pages
✅ GitHub Actions workflow created
✅ .gitignore configured

⚠️ Need to complete:
- [ ] Create GitHub repository
- [ ] Enable GitHub Pages in repository settings
- [ ] Push code to GitHub
