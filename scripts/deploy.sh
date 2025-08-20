#!/bin/bash
# Simple deployment script for SystemHustle.com

echo "🚀 Starting deployment..."

# Check if we're in the right directory
if [ ! -f "config.js" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

# Run basic checks
echo "📋 Running pre-deployment checks..."

# Check if main files exist
if [ ! -f "main.css" ] || [ ! -f "main.js" ] || [ ! -f "config.js" ]; then
    echo "❌ Error: Missing main assets (main.css, main.js, or config.js)"
    exit 1
fi

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ Error: Missing index.html"
    exit 1
fi

# Validate HTML files have unified assets
echo "🔍 Validating unified assets usage..."
html_files=$(find . -name "*.html" -not -path "./archive/*" -not -path "./node_modules/*")
for file in $html_files; do
    if ! grep -q "main.js\|config.js" "$file"; then
        echo "⚠️  Warning: $file doesn't use unified assets"
    fi
done

# Git operations
echo "📝 Preparing git commit..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Get commit message
    read -p "Enter commit message: " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Update: $(date +'%Y-%m-%d %H:%M')"
    fi
    
    # Commit with standardized format
    git commit -m "$commit_message

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# Push to GitHub (will deploy automatically via GitHub Pages)
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Site will be live at: https://systemhustle.com"