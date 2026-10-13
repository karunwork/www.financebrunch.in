Add-Type -AssemblyName System.Drawing

$srcPath = Resolve-Path "public/images/finance-brunch-official-logo.jpg"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $src.Width
$height = $src.Height

# Bounding box of content: X from 215 to 1015, Y from 10 to 162
$cropX = 210
$cropW = 1024 - $cropX
$cropH = $height

$destFull = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Also create symbol-only bitmap: X from 215 to 425
$symbolW = 425 - $cropX
$destSymbol = New-Object System.Drawing.Bitmap($symbolW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $origX = $x + $cropX
        $pixel = $src.GetPixel($origX, $y)
        
        # Estimate background for this column
        $t1 = $src.GetPixel($origX, 2)
        $b1 = $src.GetPixel($origX, $height - 3)
        $bgR = ($t1.R + $b1.R) / 2.0
        $bgG = ($t1.G + $b1.G) / 2.0
        $bgB = ($t1.B + $b1.B) / 2.0
        
        $deltaR = [double]$pixel.R - $bgR
        $deltaG = [double]$pixel.G - $bgG
        $deltaB = [double]$pixel.B - $bgB

        $dist = [Math]::Sqrt($deltaR * $deltaR + $deltaG * $deltaG + $deltaB * $deltaB)
        $brightDiff = (0.299 * $deltaR + 0.587 * $deltaG + 0.114 * $deltaB)

        $alpha = 0.0

        # Don't pick up top or bottom edge noise
        if ($y -gt 8 -and $y -lt ($height - 9)) {
            if ($dist -gt 15.0 -and $brightDiff -gt 6.0) {
                $t = ($dist - 15.0) / 26.0
                if ($t -gt 1.0) { $t = 1.0 }
                $alpha = $t
            }

            if ($pixel.B -gt ($bgB + 10) -or $pixel.G -gt ($bgG + 10)) {
                $chromaDiff = [Math]::Max($deltaB, $deltaG)
                if ($chromaDiff -gt 9.0) {
                    $a2 = ($chromaDiff - 9.0) / 20.0
                    if ($a2 -gt 1.0) { $a2 = 1.0 }
                    if ($a2 -gt $alpha) { $alpha = $a2 }
                }
            }
        }

        $alphaInt = [int]([Math]::Round($alpha * 255.0))
        if ($alphaInt -lt 10) {
            $alphaInt = 0
        }

        if ($alphaInt -gt 0) {
            $normA = [Math]::Max(0.2, $alpha)
            $rOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.R - $bgR * (1.0 - $alpha)) / $normA))
            $gOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.G - $bgG * (1.0 - $alpha)) / $normA))
            $bOut = [int][Math]::Min(255.0, [Math]::Max(0.0, ($pixel.B - $bgB * (1.0 - $alpha)) / $normA))

            $newColor = [System.Drawing.Color]::FromArgb($alphaInt, $rOut, $gOut, $bOut)
            $destFull.SetPixel($x, $y, $newColor)
            
            if ($x -lt $symbolW) {
                $destSymbol.SetPixel($x, $y, $newColor)
            }
        } else {
            $destFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            if ($x -lt $symbolW) {
                $destSymbol.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
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

Write-Host "Generated clean transparent full logo: $outFull"
Write-Host "Generated clean transparent symbol: $outSymbol"
