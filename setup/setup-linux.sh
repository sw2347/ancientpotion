#!/bin/bash

# Check if the user has administrative privileges
if [ "$(id -u)" != "0" ]; then
    echo "Please run this script as root or with sudo."
    exit 1
fi

echo "Checking Node.js installation..."
if command -v node &>/dev/null; then
    echo "Node.js installation detected, skipping..."
else
    echo "Node.js is not installed. Installing..."

    # Define the installation directory (change as needed)
    INSTALL_DIR="/usr/local"

    # Download Node.js installer
    curl -o nodejs_installer.tar.xz https://nodejs.org/dist/latest-v18.x/node-v18.17.1-linux-x64.tar.xz

    # Extract Node.js archive
    tar -xJf nodejs_installer.tar.xz -C "$INSTALL_DIR/"

    # Rename the extracted directory to a simpler name
    mv "$INSTALL_DIR/node-v18.17.1-linux-x64" "$INSTALL_DIR/nodejs"

    # Add Node.js binary directory to PATH
    export PATH="$INSTALL_DIR/nodejs/bin:$PATH"

    # Check if Node.js installation was successful
    if [ $? -eq 0 ]; then
        echo "Node.js has been successfully installed."
    else
        echo "Failed to install Node.js. Please install it manually."
        exit 1
    fi

    # Clean up the installer file
    rm nodejs_installer.tar.xz
fi

# Check Node.js version
echo "Node.js setup completed"

echo "Installing Redis..."
# Set the installation directory (change as needed)
INSTALL_DIR="/usr/local/redis"

# Set the Redis download URL (adjust version if needed)
REDIS_VERSION="6.2.6"
REDIS_URL="https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-$REDIS_VERSION.zip"

# Create the installation directory if it doesn't exist
if [ ! -d "$INSTALL_DIR" ]; then
    mkdir -p "$INSTALL_DIR"
fi

# Download Redis zip file
curl -o redis.zip -L "$REDIS_URL"

# Extract Redis files to the installation directory
unzip redis.zip -d "$INSTALL_DIR/"

# Clean up the downloaded zip file
rm redis.zip

echo "Redis has been successfully installed to $INSTALL_DIR"
echo "You can start Redis by running: $INSTALL_DIR/redis-server"

exit 0
