@echo off
title BHAgency Auto-Updater
color 0A
echo.
echo ╔══════════════════════════════════════════════╗
echo ║     BHAgency Website Auto-Deployment Tool      ║
echo ║                                              ║
echo ╚══════════════════════════════════════════════════╝
echo.
echo Checking for changes...
cd /d "C:\Users\ababe\CascadeProjects\BHAgency"

:: Create a simple status check
if exist "assets\images\logo.png" (
    echo [✓] Logo file found
) else (
    echo [✗] Logo file missing
    pause
    exit /b
)

echo.
echo Preparing files for upload...
echo.

:: Create a temporary folder with files to upload
if not exist "temp_upload" mkdir temp_upload
copy index.html temp_upload\
copy css\styles.css temp_upload\
copy js\script.js temp_upload\
xcopy assets\images\*.* temp_upload\assets\images\ /E /I /Y

echo.
echo ════════════════════════════════════════════════
echo ║  FILES READY FOR MANUAL UPLOAD:               ║
echo ║                                              ║
echo ║  1. Open GitHub:                           ║
echo ║     https://github.com/ababeilex92-arch/BHAgency  ║
echo ║                                              ║
echo ║  2. Click "Add file" → "Upload files"      ║
echo ║  3. Upload everything from: temp_upload\       ║
echo ║                                              ║
echo ║  4. Commit message: "Auto-update - %date%"     ║
echo ║                                              ║
echo ══════════════════════════════════════════════
echo.
echo Opening GitHub in your default browser...
start https://github.com/ababeilex92-arch/BHAgency
echo.
echo Opening temp_upload folder...
explorer temp_upload

echo.
echo Press any key to clean up temp files...
pause > nul
rmdir /s /q temp_upload
echo Done! Your website should update within 1-2 minutes.
echo.
pause
