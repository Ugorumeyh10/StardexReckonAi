# Deployment Guide

This guide covers deploying StardexReckonAi to Render and Vercel.

## Prerequisites

- Git repository set up
- Accounts on Render and/or Vercel
- Docker installed (for local testing)

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel has native Next.js support and is the easiest option.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Configure environment variables if needed
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - Add in Vercel dashboard: Settings → Environment Variables
   - Example: `NEXT_PUBLIC_API_URL`, `DATABASE_URL`, etc.

#### Vercel Configuration

Vercel automatically:
- Detects Next.js framework
- Builds with `npm run build`
- Serves with optimized Next.js server
- Provides CDN and edge functions

**Note:** Vercel doesn't use Docker - it has native Next.js support.

---

### Option 2: Render (Using Docker)

Render supports both Docker and native Node.js deployments.

#### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose "Docker" as the environment
   - Render will use the Dockerfile automatically

3. **Render Configuration**
   - **Name:** stardexreckonai (or your preferred name)
   - **Environment:** Docker
   - **Region:** Choose closest to your users
   - **Branch:** main (or your default branch)
   - **Root Directory:** . (root)
   - **Dockerfile Path:** Dockerfile
   - **Docker Context:** .
   - **Build Command:** (auto-detected from Dockerfile)
   - **Start Command:** (auto-detected from Dockerfile)

4. **Environment Variables**
   - Add in Render dashboard: Environment tab
   - Example: `NODE_ENV=production`, `PORT=3000`, etc.

5. **Health Check**
   - Render will use the healthcheck from docker-compose.yml
   - Or set manually: `http://localhost:3000`

#### Render with Native Node.js (Alternative)

If you prefer not to use Docker on Render:

1. Choose "Node" instead of "Docker"
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`
4. Render will use `package.json` scripts

---

## Local Docker Testing

Before deploying, test locally:

```bash
# Build the Docker image
docker build -t stardexreckonai .

# Run the container
docker run -p 3000:3000 stardexreckonai

# Or use docker-compose
docker-compose up --build
```

Visit `http://localhost:3000` to test.

---

## Environment Variables

Create a `.env.production` file (don't commit to git):

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
# Add other production variables
```

Add these in your deployment platform's environment variable settings.

---

## Build Optimization

The Dockerfile uses multi-stage builds for:
- Smaller final image size
- Faster builds with layer caching
- Production-optimized output

---

## Troubleshooting

### Build Fails on Render/Vercel

1. Check Node.js version (should be 20.x)
2. Verify all dependencies in `package.json`
3. Check build logs for specific errors
4. Ensure `next.config.js` is correct

### Docker Build Issues

1. Clear Docker cache: `docker builder prune`
2. Rebuild: `docker build --no-cache -t stardexreckonai .`
3. Check `.dockerignore` isn't excluding needed files

### Port Issues

- Vercel: Automatically handles ports
- Render: Ensure PORT environment variable is set (default: 3000)

---

## CI/CD Setup (Optional)

### GitHub Actions for Vercel

Vercel automatically deploys on push. No GitHub Actions needed.

### GitHub Actions for Render

Render can auto-deploy from GitHub. Enable in Render dashboard.

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connection strings set
- [ ] API endpoints configured
- [ ] CORS settings updated
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)
- [ ] Domain configured (optional)
- [ ] Monitoring/logging set up
- [ ] Error tracking configured

---

## Quick Deploy Commands

### Vercel CLI (Alternative)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Render CLI (Alternative)
```bash
# Install Render CLI
npm install -g render-cli

# Deploy
render deploy
```

---

## Support

For issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Render: [render.com/docs](https://render.com/docs)
- Docker: [docker.com/docs](https://docs.docker.com)

