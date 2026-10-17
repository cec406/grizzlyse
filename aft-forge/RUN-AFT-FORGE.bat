@echo off
setlocal
title AFT Forge - Soldier Performance OS
cd /d "%~dp0"

echo ==========================================
echo   AFT FORGE - Soldier Performance OS
echo ==========================================
echo.

call :show_addresses
echo.
echo  - On THIS PC: open the SAME-DEVICE address.
echo  - On a phone/tablet: connect to the same Wi-Fi, then open one of
echo    the OTHER-DEVICES addresses above.
echo  - Windows Firewall may ask to allow Node.js the first time. Allow it
echo    on private networks so other devices can connect.
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  echo Install it from https://nodejs.org/ and run this file again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found.
  echo Reinstall Node.js from https://nodejs.org/ and run this file again.
  echo.
  pause
  exit /b 1
)

REM If a server is already answering on 5173, just open the browser.
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5173' -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 (
  echo AFT Forge is already running. Opening the browser...
  start "" "http://127.0.0.1:5173"
  echo.
  echo If the page looks stuck or black, press Ctrl+Shift+R in the browser
  echo to force-refresh it.
  echo.
  pause
  exit /b 0
)

if not exist "node_modules\" (
  echo Installing dependencies. This may take a minute...
  call npm install
  if errorlevel 1 (
    echo.
    echo ERROR: npm install failed. Check the messages above.
    pause
    exit /b 1
  )
)

echo.
echo Starting the AFT Forge server in THIS window.
echo Leave this window open while you train. Close it (or Ctrl+C) to stop.
echo Your browser will open automatically once the server is ready.
echo.

REM Open the browser as soon as the server answers (background helper).
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for ($i = 0; $i -lt 120; $i++) { try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5173' -TimeoutSec 1; if ($r.StatusCode -eq 200) { Start-Process 'http://127.0.0.1:5173'; exit 0 } } catch { Start-Sleep -Milliseconds 500 } }" >nul 2>&1

call npm run dev -- --host 0.0.0.0 --port 5173 --strictPort

echo.
echo The server stopped.
echo If the browser page was black or stuck, press Ctrl+Shift+R there to force-refresh,
echo then run this file again.
echo.
pause
exit /b 0

REM ---------------------------------------------------------------
REM Print the URL to use on this PC and one URL per active network
REM adapter (Wi-Fi, Ethernet, VPN/Tailscale...) for other devices.
REM ---------------------------------------------------------------
:show_addresses
echo  SAME DEVICE (this PC):
echo    http://127.0.0.1:5173
echo.
echo  OTHER DEVICES (same Wi-Fi / LAN):
powershell -NoProfile -Command "$found = $false; Get-NetIPConfiguration -ErrorAction SilentlyContinue | Where-Object { $_.NetAdapter.Status -eq 'Up' -and $_.IPv4Address } | ForEach-Object { $alias = $_.InterfaceAlias; foreach ($ip in $_.IPv4Address) { $addr = $ip.IPAddress; if ($addr -notlike '127.*' -and $addr -notlike '169.254.*') { Write-Host ('    http://' + $addr + ':5173   (' + $alias + ')'); $found = $true } } }; if (-not $found) { Write-Host '    (no active network adapter found - connect Wi-Fi or Ethernet)' }"
exit /b 0