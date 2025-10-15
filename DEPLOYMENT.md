# Deployment Guide

This guide will help you deploy your Psychedelic Safety Hub application to various hosting platforms.

## Prerequisites

1. **Node.js installed** (version 18+)
2. **Project built successfully** - Run `npm run build` without errors
3. **Git repository** (recommended for most deployment platforms)

## Quick Start - Local Testing

Before deploying, always test locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Option 1: Netlify (Recommended - Easiest)

Netlify offers free hosting with automatic deployments from Git.

### Method A: Netlify Drop (No Git Required)

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

4. Your site is live!

### Method B: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

4. Follow the prompts:
   - Create a new site? **Yes**
   - Publish directory? **dist**

### Method C: Netlify Git Integration (Automatic Deployments)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [app.netlify.com](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect your Git provider and select your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (or higher)

6. Click "Deploy site"

Now every push to your main branch triggers an automatic deployment!

---

## Option 2: Vercel

Vercel is another excellent free option with great performance.

### Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

### Using Vercel Dashboard

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project"

4. Select your repository

5. Vercel auto-detects Vite settings - just click "Deploy"!

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Setup Steps

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/psychedelic-safety-hub-app/', // Replace with your repo name
   })
   ```

3. Add scripts to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages:
   - Go to your repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/root`
   - Save

Your site will be at: `https://yourusername.github.io/psychedelic-safety-hub-app/`

---

## Option 4: Render

Free tier with automatic deployments.

1. Push code to GitHub

2. Go to [render.com](https://render.com)

3. Click "New Static Site"

4. Connect your repository

5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

6. Click "Create Static Site"

---

## Option 5: Cloudflare Pages

Fast, global CDN with unlimited bandwidth.

1. Push code to GitHub

2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)

3. Click "Create a project"

4. Connect your repository

5. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

6. Click "Save and Deploy"

---

## Option 6: Traditional Web Hosting (cPanel, etc.)

If you have traditional web hosting:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload everything inside the `dist` folder to your web server:
   - Via FTP/SFTP client (FileZilla, Cyberduck, etc.)
   - Or via cPanel File Manager

3. Configure your server:
   - Point your domain to the `dist` directory
   - Set up URL rewriting for single-page app routing

4. Add `.htaccess` file (for Apache servers):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Troubleshooting

### Build Fails

**Error**: `Cannot find module 'react'`
- **Fix**: Run `npm install` first

**Error**: TypeScript errors
- **Fix**: Check `tsconfig.json` and fix type errors, or temporarily disable strict mode

### Blank Page After Deploy

**Issue**: Site deploys but shows blank page
- **Check 1**: Open browser console (F12) for errors
- **Check 2**: Verify `base` in `vite.config.ts` matches your deployment path
- **Check 3**: Ensure all files from `dist` folder were uploaded

### Routing Issues (404 on page refresh)

**Issue**: Routes work when clicking links, but refresh gives 404
- **Fix**: Configure your hosting platform for SPA routing (see platform-specific docs)
- **Netlify**: Create `public/_redirects` file:
  ```
  /*    /index.html   200
  ```
- **Vercel**: Create `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Environment Variables

If you add API keys or environment variables:

1. Create `.env` file (don't commit this!)
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_KEY=your_key_here
   ```
3. Access in code: `import.meta.env.VITE_API_KEY`
4. Set environment variables in your hosting platform's dashboard

---

## Performance Optimization

### Before Deploying

1. **Optimize images**: Compress images before adding them
2. **Tree-shaking**: Unused code is automatically removed by Vite
3. **Code splitting**: Already configured in React Router

### After Deploying

1. **Enable caching**: Most platforms do this automatically
2. **Enable compression**: Gzip/Brotli (check platform settings)
3. **Monitor performance**: Use Lighthouse in Chrome DevTools

---

## Recommended Deployment Platform

**For this project, we recommend Netlify** because:
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Form handling and serverless functions if needed later
- ✅ Great developer experience

---

## Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure analytics** (Google Analytics, Plausible, etc.)
3. **Set up monitoring** (Sentry for error tracking)
4. **Enable automatic deployments** from your main branch
5. **Share your site!**

---

## Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Pages**: https://docs.github.com/en/pages

Good luck with your deployment! 🚀
