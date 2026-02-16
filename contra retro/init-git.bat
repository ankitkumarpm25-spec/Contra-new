@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial commit: Contra Gravity Shift - Minimal playable prototype"

echo.
echo ========================================
echo Git repository initialized successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Go to GitHub.com and create a new repository
echo 2. Name it: contra-gravity-shift
echo 3. Copy the repository URL
echo 4. Run these commands:
echo.
echo    git remote add origin YOUR_GITHUB_URL
echo    git branch -M main
echo    git push -u origin main
echo.
pause
