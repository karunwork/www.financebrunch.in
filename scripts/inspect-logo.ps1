Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public/images/finance-brunch-official-logo.jpg"))

# Let's find minX, maxX, minY, maxY where pixel is significantly brighter than background
$minX = 10000; $maxX = 0; $minY = 10000; $maxY = 0

for ($y = 10; $y -lt $src.Height - 10; $y++) {
    for ($x = 10; $x -lt $src.Width - 10; $x++) {
        $p = $src.GetPixel($x, $y)
        # Check if blue channel is strong (> 110) or green is strong (> 95)
        if ($p.B -gt 115 -or $p.G -gt 105 -or $p.R -gt 90) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Logo Content Bounding Box: X = $minX to $maxX, Y = $minY to $maxY"
$src.Dispose()
