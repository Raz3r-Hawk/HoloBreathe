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
1. Delete `android/.gradle` folder if it exists
2. In Android Studio: File → Invalidate Caches and Restart
3. Run: `cd android && ./gradlew clean`
4. Run: `./gradlew assembleRelease`

## Alternative Command Line Build
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

The error was caused by incorrect JVM heap size configuration that made Gradle think "Xmx409m" was a class name instead of a memory parameter.