Add-Type -AssemblyName System.Drawing

$srcPath = Resolve-Path "public/images/finance-brunch-official-logo.jpg"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$srcW = $src.Width
$srcH = $src.Height

# Bounding box of content: X from 208 to 840, Y from 16 to 168
$cropX = 206
$cropR = 844
$cropW = $cropR - $cropX # 638
$cropY = 14
$cropB = 170
$cropH = $cropB - $cropY # 156

$destFull = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Standalone Symbol bounds: X from 206 to 412 (monogram ends at 407)
$symbolW = 412 - $cropX # 206
$destSymbol = New-Object System.Drawing.Bitmap($symbolW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($destY = 0; $destY -lt $cropH; $destY++) {
    $y = $destY + $cropY
    for ($destX = 0; $destX -lt $cropW; $destX++) {
        $x = $destX + $cropX
        
        $pixel = $src.GetPixel($x, $y)
        
        # Sample background from top (y=2) and bottom (y=srcH-3) for this exact column
        $tPixel = $src.GetPixel($x, 2)
        $bPixel = $src.GetPixel($x, $srcH - 3)
        
        # Linear vertical interpolation for background gradient at (x, y)
        $yFactor = [double]$y / [double]$srcH
        $bgR = $tPixel.R * (1.0 - $yFactor) + $bPixel.R * $yFactor
        $bgG = $tPixel.G * (1.0 - $yFactor) + $bPixel.G * $yFactor
        $bgB = $tPixel.B * (1.0 - $yFactor) + $bPixel.B * $yFactor
        
        $deltaR = [double]$pixel.R - $bgR
        $deltaG = [double]$pixel.G - $bgG
        $deltaB = [double]$pixel.B - $bgB
        
        $colorDist = [Math]::Sqrt($deltaR * $deltaR + $deltaG * $deltaG + $deltaB * $deltaB)
        $brightDiff = (0.299 * $deltaR + 0.587 * $deltaG + 0.114 * $deltaB)
        $blueBoost = $deltaB * 1.2
        
        # Letter pixels are noticeably brighter than the slate background or have strong blue chroma
        $strength = [Math]::Max($colorDist, [Math]::Max($brightDiff * 1.5, $blueBoost))
        
        $alpha = 0.0
        # Threshold: background noise in the JPEG is typically distance < 18
        if ($strength -gt 18.0) {
            $t = ($strength - 18.0) / 28.0
            if ($t -gt 1.0) { $t = 1.0 }
            # Smooth ease-in-out for anti-aliased edge
            $alpha = $t * $t * (3.0 - 2.0 * $t)
        }
        
        # Enforce clean zero-alpha boundary on the outermost 4 pixels
        if ($destX -lt 4 -or $destX -ge ($cropW - 4) -or $destY -lt 4 -or $destY -ge ($cropH - 4)) {
            $alpha = 0.0
        }
        
        $alphaInt = [int]([Math]::Round($alpha * 255.0))
        if ($alphaInt -lt 15) {
            $alphaInt = 0
        }
        
        if ($alphaInt -gt 0) {
            # Unmix foreground color from background to restore pure vibrant letter color
            $safeA = [Math]::Max(0.25, $alpha)
            $rOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.R - $bgR * (1.0 - $alpha)) / $safeA))
            $gOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.G - $bgG * (1.0 - $alpha)) / $safeA))
            $bOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.B - $bgB * (1.0 - $alpha)) / $safeA))
            
            $outColor = [System.Drawing.Color]::FromArgb($alphaInt, $rOut, $gOut, $bOut)
            $destFull.SetPixel($destX, $destY, $outColor)
            
            if ($destX -lt $symbolW) {
                if ($destX -ge ($symbolW - 4)) {
                    $destSymbol.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    $destSymbol.SetPixel($destX, $destY, $outColor)
                }
            }
        } else {
            $destFull.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            if ($destX -lt $symbolW) {
                $destSymbol.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }
}

$outFull = Join-Path (Get-Location) "public/images/finance-brunch-official-logo.png"
$destFull.Save($outFull, [System.Drawing.Imaging.ImageFormat]::Png)

$outSymbol = Join-Path (Get-Location) "public/images/finance-brunch-symbol.png"
$destSymbol.Save($outSymbol, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$destFull.Dispose()
$destSymbol.Dispose()

Write-Host "Success: Full logo $cropW x $cropH saved to $outFull"
Write-Host "Success: Symbol $symbolW x $cropH saved to $outSymbol"
