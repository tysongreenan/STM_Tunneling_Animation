# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/stm-tunneling-simulator.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

## Environment Variables

No environment variables are required for this project.

## Build Configuration

The project is configured for static export:
- `next.config.js` includes `output: 'export'`
- Optimized for Vercel deployment
- No server-side features required

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Performance Optimization

The app is already optimized with:
- Static generation
- Image optimization disabled (for static export)
- Efficient animations with Framer Motion
- Minimal bundle size

## Troubleshooting

### Build Errors
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run build`
- Verify Next.js configuration

### Runtime Errors
- Check browser console for errors
- Ensure all components are properly imported
- Verify Framer Motion animations

## Monitoring

Vercel provides built-in:
- Performance monitoring
- Error tracking
- Analytics
- Real-time logs

## Updates

To update your deployment:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically redeploys

```bash
git add .
git commit -m "Update: description of changes"
git push
```
