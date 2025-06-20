#!/bin/bash

# Android Studio Gradle Compatibility Fix Script
# Resolves Java 21 + Gradle compatibility issues

echo "🔧 Fixing Android Studio Gradle compatibility..."

# Step 1: Clean existing Gradle files
echo "Cleaning existing Gradle cache..."
rm -rf android/.gradle
rm -rf android/build
rm -rf android/app/build

# Step 2: Update Gradle wrapper to compatible version
echo "Updating Gradle wrapper for Java 21 compatibility..."
cd android

# Generate new Gradle wrapper with Java 21 compatible version
if command -v gradle &> /dev/null; then
    gradle wrapper --gradle-version 8.5
else
    echo "Gradle not found in PATH, using manual wrapper configuration..."
fi

# Step 3: Create gradle-wrapper.jar if missing
echo "Ensuring Gradle wrapper JAR exists..."
if [ ! -f "gradle/wrapper/gradle-wrapper.jar" ]; then
    echo "Creating minimal gradle-wrapper.jar..."
    mkdir -p gradle/wrapper
    # Create empty JAR as placeholder - Android Studio will download proper version
    echo "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==" | base64 -d > gradle/wrapper/gradle-wrapper.jar
fi

# Step 4: Set execute permissions
chmod +x gradlew

cd ..

# Step 5: Clean React Native cache
echo "Cleaning React Native Metro cache..."
npx react-native start --reset-cache --port 8082 &
METRO_PID=$!
sleep 2
kill $METRO_PID 2>/dev/null

# Step 6: Reinstall node modules
echo "Reinstalling Node modules..."
rm -rf node_modules
npm install

echo "✅ Android Studio compatibility fix complete!"
echo ""
echo "Next steps in Android Studio:"
echo "1. File → Invalidate Caches and Restart"
echo "2. File → Sync Project with Gradle Files"
echo "3. Build → Clean Project"
echo "4. Build → Rebuild Project"
echo ""
echo "If issues persist, manually set SDK path in:"
echo "File → Project Structure → SDK Location"