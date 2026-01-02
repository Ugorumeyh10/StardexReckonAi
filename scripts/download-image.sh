#!/bin/bash

# Script to download a background image for the login page from Pixabay

echo "Downloading background image for ReckAI login page..."
echo ""

# Create images directory if it doesn't exist
mkdir -p public/images

# Pixabay API (using a direct image URL - you can replace with your own API key)
# This downloads a free technology/abstract background image
IMAGE_URL="https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg"
OUTPUT_FILE="public/images/background.jpg"

echo "Downloading image from Pixabay..."
curl -L -o "$OUTPUT_FILE" "$IMAGE_URL"

if [ $? -eq 0 ]; then
    echo "✅ Image downloaded successfully to $OUTPUT_FILE"
    echo "File size: $(du -h $OUTPUT_FILE | cut -f1)"
else
    echo "❌ Download failed. Please download manually:"
    echo ""
    echo "1. Visit: https://pixabay.com/images/search/technology%20background/"
    echo "2. Or: https://pixabay.com/images/search/banking%20finance/"
    echo "3. Download a high-quality image (1920x1080 or larger)"
    echo "4. Save it as: public/images/background.jpg"
    echo ""
    echo "Recommended search terms:"
    echo "- technology background"
    echo "- abstract finance"
    echo "- banking technology"
    echo "- modern office"
fi

