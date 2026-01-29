#!/bin/bash

# Script to copy the correct GoogleService-Info.plist based on bundle identifier
# This script should run before Firebase configuration

set -e

# Get the bundle identifier from build settings
BUNDLE_ID="${PRODUCT_BUNDLE_IDENTIFIER}"

# Determine which environment based on bundle ID
ENV=""
if [[ "$BUNDLE_ID" == "com.vidres" ]]; then
    ENV="prod"
elif [[ "$BUNDLE_ID" == "com.vidres.dev" ]]; then
    ENV="dev"
elif [[ "$BUNDLE_ID" == "com.vidres.local" ]]; then
    ENV="local"
elif [[ "$BUNDLE_ID" == "com.vidres.qa" ]]; then
    ENV="qa"
else
    echo "⚠️  Warning: Unknown bundle identifier: $BUNDLE_ID"
    echo "Using default (dev) GoogleService-Info.plist"
    ENV="dev"
fi

# Source file path
SOURCE_FILE="${PROJECT_DIR}/GoogleService-Info-${ENV}.plist"

# Destination file path (where Firebase expects it)
DEST_FILE="${PROJECT_DIR}/vidres/GoogleService-Info.plist"

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "⚠️  Warning: GoogleService-Info-${ENV}.plist not found at $SOURCE_FILE"
    echo "Falling back to default GoogleService-Info.plist"
    
    # Try to use the default file in ios/ directory
    DEFAULT_FILE="${PROJECT_DIR}/GoogleService-Info.plist"
    if [ -f "$DEFAULT_FILE" ]; then
        cp "$DEFAULT_FILE" "$DEST_FILE"
        echo "✅ Copied default GoogleService-Info.plist"
    else
        echo "❌ Error: No GoogleService-Info.plist file found!"
        exit 1
    fi
else
    # Copy the environment-specific file
    cp "$SOURCE_FILE" "$DEST_FILE"
    echo "✅ Copied GoogleService-Info-${ENV}.plist for bundle ID: $BUNDLE_ID"
fi




