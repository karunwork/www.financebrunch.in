@echo off
title Finance Brunch - Local Server
cd /d "%~dp0"

echo ========================================================
echo   Starting Finance Brunch Local Server...
echo ========================================================
echo.
echo Server URL: http://localhost:8080
echo.

REM Launch default browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8080"

REM Start the Vite development server
npm run dev

pause
