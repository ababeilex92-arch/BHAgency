#!/bin/bash

# BHAgency Auto-Deployment Script for Mac/Linux
echo "🚀 BHAgency Auto-Deployment Tool"
echo "=================================="

# Navigate to project directory
cd "$HOME/CascadeProjects/BHAgency" 2>/dev/null || cd "/Users/ababe/CascadeProjects/BHAgency" 2>/dev/null

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run from BHAgency directory."
    exit 1
fi

echo "✅ Located BHAgency project directory"

# Check for logo
if [ ! -f "assets/images/logo.png" ]; then
    echo "❌ Error: Logo file not found"
    exit 1
fi

echo "✅ Logo file found"

# Create temp upload directory
UPLOAD_DIR="temp_upload_$(date +%s)"
mkdir -p "$UPLOAD_DIR"
mkdir -p "$UPLOAD_DIR/assets/images"

# Copy files to upload directory
echo "📁 Preparing files for upload..."
cp index.html "$UPLOAD_DIR/"
cp css/styles.css "$UPLOAD_DIR/"
cp js/script.js "$UPLOAD_DIR/"
cp -r assets/images/* "$UPLOAD_DIR/assets/images/"

echo "✅ Files copied to upload directory: $UPLOAD_DIR"

# Open GitHub in browser
echo "🌐 Opening GitHub repository..."
if command -v open >/dev/null; then
    # macOS
    open "https://github.com/ababeilex92-arch/BHAgency"
elif command -v xdg-open >/dev/null; then
    # Linux
    xdg-open "https://github.com/ababeilex92-arch/BHAgency"
else
    echo "Please manually open: https://github.com/ababeilex92-arch/BHAgency"
fi

# Open upload directory
echo "📂 Opening upload directory..."
if command -v open >/dev/null; then
    # macOS
    open "$UPLOAD_DIR"
elif command -v xdg-open >/dev/null; then
    # Linux
    xdg-open "$UPLOAD_DIR"
else
    echo "Upload directory: $UPLOAD_DIR"
fi

echo ""
echo "📋 INSTRUCTIONS:"
echo "1. In GitHub, click 'Add file' → 'Upload files'"
echo "2. Upload everything from the opened folder"
echo "3. Commit message: Auto-update $(date)"
echo "4. Your site will update in 1-2 minutes"
echo ""
echo "Press Enter to clean up temp files..."
read -r

# Clean up
rm -rf "$UPLOAD_DIR"
echo "✅ Cleanup complete! Your website should be live shortly."

# Optional: Open live site
echo "🌍 Opening live site to check..."
sleep 2
if command -v open >/dev/null; then
    open "https://ababeilex92-arch.github.io/BHAgency/"
elif command -v xdg-open >/dev/null; then
    xdg-open "https://ababeilex92-arch.github.io/BHAgency/"
else
    echo "Live site: https://ababeilex92-arch.github.io/BHAgency/"
fi
