#!/bin/bash
# Quick testing script for SystemHustle.com

echo "🧪 Running SystemHustle.com tests..."

# Start local server in background
echo "🚀 Starting local server on port 8002..."
python3 -m http.server 8002 > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2

# Function to cleanup
cleanup() {
    echo "🧹 Cleaning up..."
    kill $SERVER_PID 2>/dev/null
}
trap cleanup EXIT

# Test if server is running
if ! curl -s http://localhost:8002/ > /dev/null; then
    echo "❌ Error: Local server not responding"
    exit 1
fi

echo "✅ Server running on http://localhost:8002"

# Check unified assets
echo "🔍 Checking unified assets..."

missing_assets=0

if [ ! -f "main.css" ]; then
    echo "❌ Missing main.css"
    missing_assets=1
fi

if [ ! -f "main.js" ]; then
    echo "❌ Missing main.js"
    missing_assets=1
fi

if [ ! -f "config.js" ]; then
    echo "❌ Missing config.js"
    missing_assets=1
fi

if [ $missing_assets -eq 1 ]; then
    echo "❌ Test failed: Missing unified assets"
    exit 1
fi

echo "✅ All unified assets present"

# Check HTML files use unified system
echo "🔍 Checking HTML files for unified system usage..."

main_pages=("index.html" "about-me.html" "blog/index.html")
issues=0

for page in "${main_pages[@]}"; do
    if [ -f "$page" ]; then
        if ! grep -q "main.js\|config.js" "$page"; then
            echo "⚠️  $page doesn't use unified assets"
            issues=1
        else
            echo "✅ $page uses unified system"
        fi
    else
        echo "❌ $page not found"
        issues=1
    fi
done

# Count CTA buttons
cta_count=$(grep -r "data-cta=" --include="*.html" . | wc -l)
echo "✅ Found $cta_count unified CTA buttons"

# Check documentation
echo "🔍 Checking documentation..."

docs=("README.md" "TESTING.md" "DEVLOG.md" "IDEAS.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc exists"
    else
        echo "❌ $doc missing"
        issues=1
    fi
done

# Final result
if [ $issues -eq 0 ]; then
    echo ""
    echo "🎉 All tests passed!"
    echo "🌐 Test your site at: http://localhost:8002"
    echo "📱 Mobile test: http://localhost:8002 (use browser dev tools)"
    echo ""
    echo "Press Enter to stop server..."
    read
else
    echo ""
    echo "❌ Some tests failed. Please check the issues above."
    exit 1
fi