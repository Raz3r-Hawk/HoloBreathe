# React Native Mobile App Deployment Guide

This guide will help you generate APK and IPA files for the Breathing App mobile version.

## Prerequisites

### Android APK Generation
1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install Android SDK (API level 34)
   - Install Android Build Tools (34.0.0)

2. **Install Java Development Kit (JDK)**
   - Install JDK 17 or higher
   - Set JAVA_HOME environment variable

### iOS IPA Generation (Mac only)
1. **Install Xcode**
   - Download from Mac App Store
   - Install Command Line Tools: `xcode-select --install`

2. **iOS Developer Account**
   - Apple Developer Program membership required for distribution
   - Configure signing certificates and provisioning profiles

## Environment Setup

### Android Environment Variables
Add these to your shell profile (.bashrc, .zshrc, etc.):

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### React Native CLI
```bash
npm install -g @react-native-community/cli
```

## Project Setup

1. **Navigate to project directory**
   ```bash
   cd /path/to/breathing-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Link native dependencies (if needed)**
   ```bash
   npx react-native link
   ```

## Android APK Generation

### Debug APK (Development)
```bash
cd android
./gradlew assembleDebug
```
Generated APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (Production)

1. **Generate signing key**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore breathing-app-release-key.keystore -alias breathing-app-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in android/app/build.gradle**
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                   storeFile file(MYAPP_RELEASE_STORE_FILE)
                   storePassword MYAPP_RELEASE_STORE_PASSWORD
                   keyAlias MYAPP_RELEASE_KEY_ALIAS
                   keyPassword MYAPP_RELEASE_KEY_PASSWORD
               }
           }
       }
       buildTypes {
           release {
               ...
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Create gradle.properties in android folder**
   ```properties
   MYAPP_RELEASE_STORE_FILE=breathing-app-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=breathing-app-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=your_store_password
   MYAPP_RELEASE_KEY_PASSWORD=your_key_password
   ```

4. **Generate release APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   Generated APK location: `android/app/build/outputs/apk/release/app-release.apk`

## iOS IPA Generation

### Debug Build (Development)
```bash
npx react-native run-ios --configuration=Debug
```

### Release IPA (Production)

1. **Open Xcode project**
   ```bash
   open ios/BreathingApp.xcworkspace
   ```

2. **Configure signing**
   - Select project in navigator
   - Go to "Signing & Capabilities"
   - Select your development team
   - Choose provisioning profile

3. **Archive the app**
   - Product → Archive
   - Once archived, click "Distribute App"
   - Choose distribution method:
     - App Store Connect (for App Store)
     - Ad Hoc (for testing)
     - Enterprise (for internal distribution)

4. **Export IPA**
   - Follow Xcode's export wizard
   - IPA will be saved to chosen location

## App Store Deployment

### Google Play Store (Android)

1. **Create Google Play Console account**
   - Visit https://play.google.com/console
   - Pay one-time $25 registration fee

2. **Prepare app metadata**
   - App name: "Breathing App"
   - Description: Focus on mindfulness and breathing exercises
   - Screenshots: Capture from different screen sizes
   - Privacy Policy: Use the one from `/client/src/pages/privacy-policy.tsx`

3. **Upload APK/AAB**
   - Use Android App Bundle (AAB) for better optimization:
     ```bash
     cd android
     ./gradlew bundleRelease
     ```
   - Upload generated AAB: `android/app/build/outputs/bundle/release/app-release.aab`

4. **Content rating questionnaire**
   - Complete Google Play's content rating
   - App is suitable for all ages

### Apple App Store (iOS)

1. **Create Apple Developer account**
   - Visit https://developer.apple.com
   - Annual fee: $99 USD

2. **Create app in App Store Connect**
   - Visit https://appstoreconnect.apple.com
   - Create new app with bundle ID: `com.breathingapp.breathingapp`

3. **Upload IPA using Xcode**
   - Archive and upload directly from Xcode
   - Or use Application Loader

4. **Complete app metadata**
   - App name: "Breathing App"
   - Subtitle: "Mindful Breathing Exercises"
   - Keywords: breathing, meditation, mindfulness, wellness
   - Privacy Policy URL: Your deployed web app privacy policy

## App Compliance

### Required Information
- **Privacy Policy**: Available at `/privacy-policy` in web app
- **About Us**: Available at `/about` in web app
- **Contact**: contact@geeksgrow.com
- **Company**: GeeksGrow (Made in India)
- **Developer**: Mr. Varun Mukesh Bhambhani

### App Store Guidelines
- No medical claims - focus on wellness and mindfulness
- Subscription model clearly disclosed
- User data handling explained in privacy policy
- Age rating: 4+ (suitable for all ages)

## Testing Before Release

### Android Testing
```bash
# Install debug APK on device
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Check logs
adb logcat | grep ReactNativeJS
```

### iOS Testing
```bash
# Run on simulator
npx react-native run-ios --simulator="iPhone 15"

# Run on device (with valid provisioning)
npx react-native run-ios --device
```

## Troubleshooting

### Common Android Issues
- **Gradle build fails**: Clear cache with `cd android && ./gradlew clean`
- **Metro bundler issues**: Reset with `npx react-native start --reset-cache`
- **Missing dependencies**: Run `npx react-native link`

### Common iOS Issues
- **CocoaPods issues**: `cd ios && pod install --repo-update`
- **Build fails**: Clean build folder in Xcode (Product → Clean Build Folder)
- **Signing issues**: Check certificates in Keychain Access

## Build Scripts

Add these scripts to package.json for easier building:

```json
{
  "scripts": {
    "android:build": "cd android && ./gradlew assembleRelease",
    "android:clean": "cd android && ./gradlew clean",
    "ios:build": "npx react-native run-ios --configuration=Release",
    "build:all": "npm run android:build && npm run ios:build"
  }
}
```

## Final Checklist

### Before Submitting to Stores
- [ ] Test app on multiple devices/simulators
- [ ] Verify all features work without internet connection where applicable
- [ ] Test subscription flow thoroughly
- [ ] Ensure privacy policy is accessible
- [ ] Screenshots for all required device sizes
- [ ] App icon in all required sizes (see assets folder)
- [ ] Version numbers match across platforms
- [ ] All required permissions declared and justified

### Store Submission
- [ ] Google Play Console: APK/AAB uploaded and reviewed
- [ ] Apple App Store: IPA uploaded and metadata complete
- [ ] Both stores: Age rating and content warnings set
- [ ] Both stores: Privacy policy and terms of service linked
- [ ] Testing completed on physical devices

## Support

For deployment issues:
- Email: contact@geeksgrow.com
- Check React Native documentation: https://reactnative.dev/docs/signed-apk-android
- iOS deployment guide: https://reactnative.dev/docs/publishing-to-app-store