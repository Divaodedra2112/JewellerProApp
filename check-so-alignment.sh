#!/bin/bash

APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
TEMP_ALIGNED_APK="android/app/build/outputs/apk/release/app-release-temp-aligned.apk"

if [ ! -f "$APK_PATH" ]; then
  echo "❌ APK not found at $APK_PATH"
  exit 1
fi

echo "Checking native .so libraries in $APK_PATH..."

ALL_ALIGNED=true

for lib in $(unzip -Z1 "$APK_PATH" | grep '\.so$'); do
    offset=$(unzip -v "$APK_PATH" "$lib" | awk 'NR==4{print $2}')
    if (( offset % 16384 == 0 )); then
        echo "$lib ✅ aligned"
    else
        echo "$lib ❌ not aligned"
        ALL_ALIGNED=false
    fi
done

if [ "$ALL_ALIGNED" = true ]; then
    echo "🎉 All your native .so libraries are 16 KB aligned. APK is ready!"
    exit 0
else
    echo "⚠️ Some libraries are not properly aligned! Attempting to fix using zipalign..."

    # Check if zipalign exists
    if ! command -v zipalign &> /dev/null; then
        echo "❌ zipalign not found. Install Android SDK build-tools and add zipalign to PATH."
        exit 3
    fi

    # Align APK and save to temp file
    zipalign -v -p 4 "$APK_PATH" "$TEMP_ALIGNED_APK"

    if [ $? -eq 0 ]; then
        # Replace original APK with aligned APK
        mv "$TEMP_ALIGNED_APK" "$APK_PATH"
        echo "✅ APK successfully aligned and replaced: $APK_PATH"
        exit 0
    else
        echo "❌ Failed to align APK."
        exit 4
    fi
fi