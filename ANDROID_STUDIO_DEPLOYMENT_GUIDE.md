# Android Studio Deployment Guide - HoloBreathe

## Complete Setup Instructions for APK Generation

### Prerequisites
1. **Android Studio** (latest version)
2. **Java Development Kit** (JDK 17 or higher)
3. **Node.js** (18 or higher)
4. **Expo CLI** installed globally: `npm install -g @expo/cli`

### Step 1: Environment Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo-url>
   cd holobreathe
   npm install
   ```

2. **Configure Environment Variables**
   Create `.env` file in root directory:
   ```
   SUPABASE_URL=https://qbvvzfgkrydazkhbqmfj.supabase.co
   SUPABASE_ANON_KEY=your-actual-supabase-anon-key
   ```

3. **Setup Supabase Database**
   - Go to your Supabase dashboard
   - Open SQL Editor
   - Run the SQL commands from `supabase-init.sql`

### Step 2: Android Project Setup

1. **Generate Android Files**
   ```bash
   npx expo prebuild --platform android
   ```

2. **Open Android Studio**
   - Launch Android Studio
   - Open project: `File` → `Open` → Select `android` folder in your project

3. **Configure Gradle (if needed)**
   Update `android/app/build.gradle`:
   ```gradle
   android {
       compileSdkVersion 34
       buildToolsVersion "34.0.0"
       
       defaultConfig {
           applicationId "com.geeksgrow.holobreathe"
           minSdkVersion 24
           targetSdkVersion 34
           versionCode 1
           versionName "1.0.0"
       }
   }
   ```

### Step 3: Development Build

1. **Start Metro Bundler**
   ```bash
   npx expo start
   ```

2. **Run on Android Device/Emulator**
   ```bash
   npx expo run:android
   ```

### Step 4: Production APK Build

1. **Create Keystore (for signing)**
   ```bash
   keytool -genkeypair -v -keystore holobreathe-upload-key.keystore -alias holobreathe-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Signing in Android Studio**
   - Go to `Build` → `Generate Signed Bundle / APK`
   - Choose `APK`
   - Create new keystore or use existing
   - Fill in keystore details

3. **Build Release APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **APK Location**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Step 5: Testing APK

1. **Install APK on Device**
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

2. **Test Core Features**
   - User registration/login
   - Breathing session functionality
   - Theme switching
   - Session tracking

### Step 6: App Store Preparation

1. **Generate App Bundle (for Google Play)**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

2. **Upload to Google Play Console**
   - File location: `android/app/build/outputs/bundle/release/app-release.aab`
   - Use Google Play Console upload interface

### Troubleshooting

**Common Issues:**

1. **Metro bundler errors**
   ```bash
   npx expo start --clear
   ```

2. **Gradle sync failures**
   - Clean and rebuild in Android Studio
   - `Build` → `Clean Project` → `Rebuild Project`

3. **Permission issues**
   - Check `android/app/src/main/AndroidManifest.xml`
   - Ensure required permissions are declared

4. **Signing errors**
   - Verify keystore path and passwords
   - Check signing configuration in `build.gradle`

### App Configuration

**Package Name**: `com.geeksgrow.holobreathe`
**Version Code**: 1
**Version Name**: 1.0.0
**Target SDK**: 34
**Min SDK**: 24

### Features Verified
- ✅ Beautiful glassmorphism UI with adaptive themes
- ✅ 7 breathing protocols with real-time animations
- ✅ Supabase authentication and session tracking
- ✅ Haptic feedback and audio support
- ✅ React Navigation with smooth transitions
- ✅ Privacy policy and app store compliance
- ✅ Session analytics and progress tracking

### Final Steps
1. Test APK thoroughly on multiple devices
2. Update app store listing with screenshots
3. Submit to Google Play Store for review
4. Monitor for any crash reports or user feedback

The APK is now ready for distribution and Google Play Store submission.