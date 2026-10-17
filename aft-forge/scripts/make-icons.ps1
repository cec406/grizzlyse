# Generates the PWA launcher icons from the AFT Forge shield design.
# Usage: powershell -File scripts/make-icons.ps1
Add-Type -AssemblyName System.Drawing

function New-Icon {
  param(
    [int]$Size,
    [string]$Path,
    [double]$Inset = 0.0
  )

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::FromArgb(255, 8, 11, 8))

  # Map a design fraction (0..1 of the full canvas) into the usable area.
  $usable = 1.0 - $Inset
  $fx = { param($f) [float]((($f - 0.5) * $usable + 0.5) * $Size) }

  $lime = [System.Drawing.Color]::FromArgb(255, 200, 243, 107)
  $amber = [System.Drawing.Color]::FromArgb(255, 243, 183, 79)
  $shieldFill = [System.Drawing.Color]::FromArgb(255, 19, 30, 15)

  $points = @(
    (New-Object System.Drawing.PointF((& $fx 0.50), (& $fx 0.10))),
    (New-Object System.Drawing.PointF((& $fx 0.84), (& $fx 0.24))),
    (New-Object System.Drawing.PointF((& $fx 0.84), (& $fx 0.54))),
    (New-Object System.Drawing.PointF((& $fx 0.50), (& $fx 0.92))),
    (New-Object System.Drawing.PointF((& $fx 0.16), (& $fx 0.54))),
    (New-Object System.Drawing.PointF((& $fx 0.16), (& $fx 0.24)))
  )

  $fillBrush = New-Object System.Drawing.SolidBrush($shieldFill)
  $g.FillPolygon($fillBrush, $points)

  $strokePen = New-Object System.Drawing.Pen($lime, [float]([Math]::Max(2, $Size * 0.022)))
  $g.DrawPolygon($strokePen, $points)

  $font = New-Object System.Drawing.Font('Arial', [float](0.28 * $usable * $Size), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $textBrush = New-Object System.Drawing.SolidBrush($lime)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textHeight = [float]($Size * $usable * 0.36)
  $textRect = New-Object System.Drawing.RectangleF(0, [float]((& $fx 0.44) - $textHeight / 2), [float]$Size, $textHeight)
  $g.DrawString('AFT', $font, $textBrush, $textRect, $format)

  $barBrush = New-Object System.Drawing.SolidBrush($amber)
  $barX = (& $fx 0.33)
  $barY = (& $fx 0.63)
  $barW = [float]((0.67 - 0.33) * $usable * $Size)
  $barH = [float][Math]::Max(2, $Size * 0.03 * $usable)
  $g.FillRectangle($barBrush, $barX, $barY, $barW, $barH)

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "wrote $Path"
}

$root = Join-Path $PSScriptRoot '..\public\icons'
New-Item -ItemType Directory -Force -Path $root | Out-Null

New-Icon -Size 192 -Path (Join-Path $root 'icon-192.png')
New-Icon -Size 512 -Path (Join-Path $root 'icon-512.png')
New-Icon -Size 512 -Path (Join-Path $root 'icon-maskable-512.png') -Inset 0.24