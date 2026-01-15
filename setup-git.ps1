# Git Setup Script for chess-website
# Run this script after installing Git

Write-Host "Setting up Git repository..." -ForegroundColor Green

# Initialize git repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Check if there are any changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Creating initial commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Chess website files"
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Check if remote already exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Adding remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/Kalem-tech/easychess.git
} else {
    Write-Host "Remote origin already exists: $remote" -ForegroundColor Yellow
    Write-Host "Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/Kalem-tech/easychess.git
}

# Set default branch to main
Write-Host "Setting default branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "`nSetup complete! Next steps:" -ForegroundColor Green
Write-Host "1. Make sure you're authenticated with GitHub" -ForegroundColor Cyan
Write-Host "2. Run: git push -u origin main" -ForegroundColor Cyan
Write-Host "`nIf you need to authenticate, you can use:" -ForegroundColor Yellow
Write-Host "   - GitHub Desktop" -ForegroundColor Cyan
Write-Host "   - Personal Access Token (PAT)" -ForegroundColor Cyan
Write-Host "   - SSH keys" -ForegroundColor Cyan
