@echo off
setlocal enabledelayedexpansion

net session >nul 2>&1
if %errorlevel% == 0 (
    set "IsAdmin=1"
) else (
    set "IsAdmin=0"
)

if NOT !IsAdmin! == 1 (
    echo Please make sure that you are running this file as an administrator!
    exit /b 1
)

echo Checking nodejs installation...
where node 2> Nul

if NOT %errorlevel% == "9009" (
    echo NodeJS installation detected, skipping..
) else (
    echo NodeJS is not installed. Installing...

    rem Define the installation directory (change as needed)
    set INSTALL_DIR=C:\Program Files\nodejs

    rem Download Node.js installer
    curl -o nodejs_installer.msi https://nodejs.org/dist/latest-v18.x/node-v18.17.1-x64.msi | bash

    rem Install Node.js silently
    msiexec /i nodejs_installer.msi /qn INSTALLDIR="%INSTALL_DIR%"

    rem Check if Node.js installation was successful
    if %errorlevel% == 0 (
        echo Node.js has been successfully installed.
    ) else (
        echo Failed to install Node.js. Please install it manually.
        pause
        exit /b 1
    )
    rem Clean up the installer file
    del nodejs_installer.msi
)
rem Check Node.js version
echo NodeJS setup completed

echo Installing Redis..
rem Set the installation directory (change as needed)
set INSTALL_DIR=C:\Program Files\Redis

rem Set the Redis download URL (adjust version if needed)
set REDIS_VERSION=6.2.6
set REDIS_URL=https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-%REDIS_VERSION%.zip

rem Create the installation directory if it doesn't exist
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

rem Download Redis zip file
curl -o redis.zip %REDIS_URL%

rem Extract Redis files to the installation directory
expand -F:* "redis.zip" "%INSTALL_DIR%\"

rem Clean up the downloaded zip file
del redis.zip

echo Redis has been successfully installed to %INSTALL_DIR%
echo You can start Redis by running: %INSTALL_DIR%\redis-server.exe

endlocal
exit /b 1
endlocal