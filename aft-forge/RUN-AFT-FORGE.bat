@echo off
setlocal
cd /d "%~dp0"

title AFT Forge - Dev Server

if not exist node_modules (
  echo Installing dependencies (first run)...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Check your Node.js install and try again.
    pause
    exit /b 1
  )
)

echo.
echo Starting AFT Forge dev server on all network interfaces...
echo Allow Node.js on private networks when Windows Firewall asks.
echo.
call npm run dev -- --host --open