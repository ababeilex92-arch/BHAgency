# BHAgency Development Commands

## Quick Git Setup (if not already done)
```bash
cd C:\Users\ababe\CascadeProjects\BHAgency
git init
git remote add origin https://github.com/ababeilex92-arch/BHAgency.git
git branch -M main
```

## Daily Update Commands
```bash
# Navigate to project
cd C:\Users\ababe\CascadeProjects\BHAgency

# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your update description here"

# Push to live (auto-deploys!)
git push origin main
```

## Quick Update Script
Save this as `update.bat` in your BHAgency folder for one-click updates:
```batch
@echo off
echo Updating BHAgency website...
cd /d "C:\Users\ababe\CascadeProjects\BHAgency"
git add .
git commit -m "Website update - %date% %time%"
git push origin main
echo Done! Check https://ababeilex92-arch.github.io/BHAgency/
pause
```

## What to Track
- [ ] Text content updates
- [ ] Style improvements
- [ ] New features added
- [ ] Bug fixes
- [ ] Mobile responsiveness
- [ ] SEO optimizations

Your friend will always see the latest at: https://ababeilex92-arch.github.io/BHAgency/
