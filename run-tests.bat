@echo off
echo 🚀 SystemHustle.com Automated Testing Suite
echo ==========================================

echo 📦 Installing Playwright if needed...
call npm install

echo 🎭 Installing browser binaries...
call npx playwright install

echo 🧪 Running comprehensive website tests...
call npx playwright test

echo 📊 Generating test report...
call npx playwright show-report

echo ✅ Testing complete! Check test-results/ folder for details.
pause