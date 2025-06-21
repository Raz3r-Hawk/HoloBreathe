# Android Studio Build Instructions

## Prerequisites
- Android Studio Hedgehog (2023.1.1) or newer
- Android SDK 34
- Java 17 (JDK 17)
- Node.js 18+ with npm

## Build Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Android Studio Setup**
   - Open Android Studio
   - File → Open → Select this project folder
   - Wait for Gradle sync to complete (may take 5-10 minutes first time)
   - If sync fails, try: Build → Clean Project, then Build → Rebuild Project

3. **Fix Common Issues**
   - If "Could not find main class" error: File → Invalidate Caches and Restart
   - If Gradle version issues: Use the wrapper properties included (Gradle 8.4)
   - If Java version issues: File → Project Structure → SDK Location → JDK Location

4. **Generate APK**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```

5. **APK Location**
   - Generated APK: `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting
- **Heap size error**: Already fixed in gradle.properties (2GB heap)
- **Build tools not found**: SDK Manager → Install Build Tools 34.0.0
- **Gradle sync failed**: Use "Gradle Wrapper" in Android Studio settings

## Database Configuration
- Update `DATABASE_URL` in production environment
- Run `npm run db:push` to create Supabase tables

## Features
- Complete breathing app with 7 protocols
- User authentication and session tracking
- Trial system (2 sessions) with upgrade prompts
- Modern holographic UI design
- Analytics and user management

Ready for Google Play Store deployment.