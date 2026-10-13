Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public/images/finance-brunch-official-logo.jpg"))

for ($x = 390; $x -le 435; $x += 2) {
    $active = 0
    for ($y = 20; $y -le 160; $y++) {
        $p = $bmp.GetPixel($x, $y)
        $t = $bmp.GetPixel($x, 2)
        $b = $bmp.GetPixel($x, $bmp.Height - 3)
        $bgB = ($t.B + $b.B) / 2.0
        if (($p.B - $bgB) -gt 25) { $active++ }
    }
    Write-Output "x=$x active=$active"
}
$bmp.Dispose()
