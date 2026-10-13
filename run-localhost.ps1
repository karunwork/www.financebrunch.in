# Navigate to script directory
Set-Location -Path $PSScriptRoot

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting Finance Brunch Local Server...              " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Server URL: http://localhost:8080`n" -ForegroundColor Yellow

# Launch browser
Start-Process "http://localhost:8080"

# Start Vite dev server
npm run dev
