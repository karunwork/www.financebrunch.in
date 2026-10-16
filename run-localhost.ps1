# Navigate to script directory
Set-Location -Path $PSScriptRoot

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting Finance Brunch Local Server...              " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Server URL: http://localhost:8080`n" -ForegroundColor Yellow

# The Vite app and API are separate processes. Start the API in its own
# window so the homepage can reach http://localhost:5000/api/reviews.
Start-Process powershell -ArgumentList @(
  '-NoExit',
  '-Command',
  "Set-Location '$PSScriptRoot\\backend'; npm start"
)

# Launch browser
Start-Process "http://localhost:8080"

# Start Vite dev server
npm run dev
