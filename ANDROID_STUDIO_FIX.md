# Android Studio Build Fix

## Problem Solved
Fixed "Could not find or load main class Xmx409m" error by:

1. **Gradle Properties Fix**
   - Reduced heap size from 4GB to 2GB: `-Xmx2048m`
   - Added proper file encoding: `-Dfile.encoding=UTF-8`
   - This prevents the JVM argument parsing error

2. **Gradle Version Update**
   - Updated to Gradle 8.4 (wrapper)
   - Updated Android Gradle Plugin to 8.2.0
   - Updated Kotlin to 1.9.10

3. **MultiDex Support**
   - Added `multiDexEnabled true` for large apps
   - Ensures compatibility with React Native

## Quick Fix Steps
1. **Clean Everything First**
   ```bash
   cd android
   rm -rf .gradle build
   rm -rf app/build
   ```

2. **In Android Studio**
   - File → Invalidate Caches and Restart
   - File → Project Structure → SDK Location → Set Android SDK path
   - Wait for Gradle sync

3. **Build from Command Line** (Recommended)
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

## Root Cause & Final Fix
The JVM arguments were causing parsing errors. Applied minimal configuration:
- Simplified gradle.properties with basic JVM args: `-Xmx1024m`
- Downgraded to stable versions: Gradle 8.3, AGP 8.1.2, Kotlin 1.8.0
- Disabled problematic parallel processing
- Created fresh configuration files

## Test the Fix
```bash
cd android
./gradlew --version
./gradlew clean
./gradlew assembleDebug
```

If this still fails, the issue may be with Android Studio's Java/SDK configuration rather than the Gradle files.

## Alternative Command Line Build
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

The error was caused by incorrect JVM heap size configuration that made Gradle think "Xmx409m" was a class name instead of a memory parameter.