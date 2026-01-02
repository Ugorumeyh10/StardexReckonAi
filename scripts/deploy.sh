#!/bin/bash

# Deployment script for StardexReckonAi
# Usage: ./scripts/deploy.sh [vercel|render|docker]

set -e

DEPLOY_TARGET=${1:-"help"}

case $DEPLOY_TARGET in
  "docker")
    echo "🐳 Building Docker image..."
    docker build -t stardexreckonai .
    echo "✅ Docker image built successfully!"
    echo "Run with: docker run -p 3000:3000 stardexreckonai"
    ;;
  "vercel")
    echo "▲ Deploying to Vercel..."
    if ! command -v vercel &> /dev/null; then
      echo "Installing Vercel CLI..."
      npm install -g vercel
    fi
    vercel --prod
    ;;
  "render")
    echo "🚀 Deploying to Render..."
    echo "Push to GitHub and Render will auto-deploy"
    echo "Or use: render deploy"
    ;;
  "test")
    echo "🧪 Testing Docker build locally..."
    docker build -t stardexreckonai .
    docker run -p 3000:3000 --rm stardexreckonai &
    sleep 5
    curl -f http://localhost:3000 || exit 1
    docker stop $(docker ps -q --filter ancestor=stardexreckonai)
    echo "✅ Docker build test passed!"
    ;;
  *)
    echo "Usage: ./scripts/deploy.sh [docker|vercel|render|test]"
    echo ""
    echo "Commands:"
    echo "  docker  - Build Docker image locally"
    echo "  vercel  - Deploy to Vercel (requires Vercel CLI)"
    echo "  render  - Show Render deployment instructions"
    echo "  test    - Test Docker build locally"
    exit 1
    ;;
esac

