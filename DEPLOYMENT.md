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

## Production Readiness Check

Before **EVERY** push to production, run:

```bash
npm run check-prod
```

This automated script verifies:
- ✅ All asset paths are valid and files exist
- ✅ Assets in `assets/` are synced to `public/assets/`
- ✅ Vite base path is correctly configured
- ✅ Build output is recent and valid
- ✅ No hardcoded localhost URLs in code
- ✅ All import paths resolve correctly

The check runs automatically before `npm run build` via the `prebuild` hook.

## Common Production Issues & Solutions

### Issue 1: Blank Screen After Scene Transition

**Symptom:** Game works locally but shows blank screen when transitioning scenes in production

**Root Cause:** Assets added to `assets/` directory are NOT deployed (only `public/` folder is served by Vite)

**Solution:**
```bash
# Copy new assets to public/ directory
cp assets/audio/*.mp3 public/assets/audio/
cp assets/sprites/*.png public/assets/sprites/

# Verify everything is synced
npm run check-prod
```

**Prevention:** Always add new assets directly to `public/assets/` OR ensure you copy them before building

### Issue 2: Audio Files 404

**Symptom:** Console errors: "Failed to load asset: assets/audio/classroomSong2.mp3"

**Root Cause:** Audio files in `assets/audio/` but not in `public/assets/audio/`

**Solution:**
```bash
# List what's in each directory
ls assets/audio/
ls public/assets/audio/

# Copy missing files
cp assets/audio/*.mp3 public/assets/audio/

# Rebuild
npm run build
```

### Issue 3: Vite Base Path Mismatch

**Symptom:** Assets load in dev (localhost) but 404 in production

**Root Cause:** `base` path in `vite.config.js` doesn't match deployment URL

**Current Config:**
```js
// vite.config.js
base: '/MontessoriGame/'  // Must match GitHub repo name!
```

**Production URL:** `https://robertjoellewis.github.io/MontessoriGame/`

If you rename the repository or use a custom domain, update the base path accordingly.

## Asset Management Best Practices

### DO ✅
- Add all game assets to `public/assets/` directory
- Use relative paths in code: `assets/sprites/file.png`
- Run `npm run check-prod` before every push
- Test production build locally: `npm run preview`
- Keep `assets/` and `public/assets/` in sync

### DON'T ❌
- Don't add assets only to `assets/` (won't be deployed)
- Don't use absolute paths like `/assets/file.png`
- Don't push without running production check
- Don't commit the `dist/` folder (it's auto-generated)

## Deployment Workflow

### Step 1: Development
```bash
npm run dev  # Work on features locally
```

### Step 2: Pre-Deployment Check
```bash
# ALWAYS run this before pushing!
npm run check-prod

# Fix any errors/warnings it reports
```

### Step 3: Test Production Build
```bash
# Build and preview locally
npm run build
npm run preview

# Test at http://localhost:4173/MontessoriGame/
# Verify all scenes work, audio plays, etc.
```

### Step 4: Commit & Push
```bash
git add -A
git commit -m "Your descriptive message"
git push origin main

# GitHub Actions auto-deploys to:
# https://robertjoellewis.github.io/MontessoriGame/
```

### Step 5: Verify Deployment
1. Wait 2-3 minutes for GitHub Actions to complete
2. Visit https://robertjoellewis.github.io/MontessoriGame/
3. Test critical game paths (see checklist below)

## Production Testing Checklist

After deployment, verify these work:

- [ ] Game loads and shows name selection scene
- [ ] Cottage scene loads with music and animations
- [ ] Village scene transition works (walking to school)
- [ ] Classroom scene loads with all 12 children
- [ ] Teaching system works (click materials, teach children)
- [ ] Nap time transition works at 12:15 PM
- [ ] Nap room scene loads and fade transitions are smooth
- [ ] Inventory system opens with ESC key
- [ ] All audio files play correctly
- [ ] No console errors in browser DevTools (F12)

## Troubleshooting Production

### Browser Console Debugging

Press F12 to open DevTools, then:

1. **Console Tab:** Look for red errors
2. **Network Tab:** Check for 404s (failed asset loads)
3. **Sources Tab:** Verify files loaded correctly

Common Errors:
- `404 Not Found` → Asset not in `public/` folder
- `Failed to load audio` → Audio file path mismatch
- `Cannot read property of undefined` → Scene transition issue

### Asset Loading Verification

```bash
# Check which assets your code references
grep -r "this.load" src/scenes/

# Verify those assets exist in public/
ls public/assets/audio/
ls public/assets/sprites/

# Run automated check
npm run check-prod
```

## Current Status

✅ Vite configured for GitHub Pages
✅ GitHub Actions workflow created
✅ .gitignore configured
✅ Production check script created
✅ Repository created and pushed
✅ Assets synced to public/ folder

**Live URL:** https://robertjoellewis.github.io/MontessoriGame/
