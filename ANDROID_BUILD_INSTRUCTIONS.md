# Android Studio Build Instructions

## Prerequisites
- Android Studio with SDK 34
- Java 17
- Node.js 18+ with npm

## Build Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Android Studio Setup**
   - Open Android Studio
   - File → Open → Select this project folder
   - Let Gradle sync complete
   - Build → Make Project

3. **Generate APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **APK Location**
   - Generated APK: `android/app/build/outputs/apk/release/app-release.apk`

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