# Video Background Setup Guide

## Quick Setup

### Option 1: Use the Download Script (Recommended)

```bash
./scripts/download-video.sh
```

This will automatically download a free stock video from Pexels.

### Option 2: Manual Download

1. **Visit one of these free stock video sites:**
   - [Pexels - Technology Videos](https://www.pexels.com/search/videos/abstract%20technology/)
   - [Pexels - Banking/Finance Videos](https://www.pexels.com/search/videos/banking%20finance/)
   - [Pixabay - Abstract Backgrounds](https://pixabay.com/videos/search/abstract/)
   - [Mixkit - Free Video Backgrounds](https://mixkit.co/free-video-backgrounds/)

2. **Download Requirements:**
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 or higher
   - File size: Under 10MB recommended for web performance
   - Duration: 10-30 seconds (will loop)

3. **Save the video:**
   - Save as: `public/videos/background.mp4`
   - Make sure the file is named exactly `background.mp4`

## Recommended Video Types

For a banking/fintech login page, consider:
- Abstract technology patterns
- Subtle data visualizations
- Minimal geometric animations
- Professional corporate backgrounds
- Subtle particle effects

## Video Optimization Tips

1. **Compress the video** (if file is too large):
   ```bash
   # Using ffmpeg (if installed)
   ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -crf 23 -preset medium output.mp4
   ```

2. **Trim video length** (if needed):
   ```bash
   ffmpeg -i input.mp4 -t 00:00:15 -c copy output.mp4
   ```

## Testing

After adding the video:
1. Restart the dev server
2. Visit `http://localhost:3001/login`
3. The video should autoplay, loop, and be muted

## Fallback

If the video doesn't load, the page will automatically show a beautiful gradient background instead.

