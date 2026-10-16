@echo off
title Finance Brunch - Local Server
cd /d "%~dp0"

echo ========================================================
echo   Starting Finance Brunch Local Server...
echo ========================================================
echo.
echo Server URL: http://localhost:8080
echo.

REM The Vite app and API are separate processes.
start "Finance Brunch API" cmd /k "cd /d %~dp0backend && npm start"

REM Launch default browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8080"

REM Start the Vite development server
npm run dev

pause
