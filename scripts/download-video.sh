#!/bin/bash

# Script to download a background video for the login page
# This script downloads a free stock video from Pexels

echo "Downloading background video for ReckAI login page..."
echo ""

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download a suitable abstract/technology background video
# Using curl to download from Pexels (free stock video)
# This is a direct download link to a technology/abstract background video

VIDEO_URL="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4"
OUTPUT_FILE="public/videos/background.mp4"

echo "Downloading video from Pexels..."
curl -L -o "$OUTPUT_FILE" "$VIDEO_URL"

if [ $? -eq 0 ]; then
    echo "✅ Video downloaded successfully to $OUTPUT_FILE"
    echo "File size: $(du -h $OUTPUT_FILE | cut -f1)"
else
    echo "❌ Download failed. Please download manually:"
    echo ""
    echo "1. Visit: https://www.pexels.com/search/videos/abstract%20technology/"
    echo "2. Or: https://www.pexels.com/search/videos/banking%20finance/"
    echo "3. Download a video (preferably 1920x1080, MP4 format)"
    echo "4. Save it as: public/videos/background.mp4"
    echo ""
    echo "Alternative sources:"
    echo "- https://pixabay.com/videos/search/abstract/"
    echo "- https://mixkit.co/free-video-backgrounds/"
fi

