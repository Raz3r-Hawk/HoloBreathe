# Breathing App - React Native Mobile Deployment Guide

A comprehensive holographic breathing application built with React Native for Android and iOS deployment.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ 
- React Native CLI
- Android Studio (for Android deployment)
- Xcode (for iOS deployment)
- Java Development Kit 11+

### Installation
```bash
# Clone and install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

## 📱 Android Deployment

### Development Mode
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run Android
npx react-native run-android
```

### Release APK Generation
```bash
# Generate release APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### Android Studio Setup
1. Open `android` folder in Android Studio
2. Sync project with Gradle files
3. Build → Clean Project
4. Build → Rebuild Project
5. Run on device or emulator

### APK Signing (Production)
```bash
# Generate signing key
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Add to android/gradle.properties:
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=****
MYAPP_UPLOAD_KEY_PASSWORD=****
```

## 🍎 iOS Deployment

### Development Mode
```bash
# Run iOS simulator
npx react-native run-ios

# Run on specific device
npx react-native run-ios --device "iPhone 15"
```

### Xcode Setup
1. Open `ios/BreathingApp.xcworkspace` in Xcode
2. Select development team and bundle identifier
3. Build and run on simulator or device

### IPA Generation (Production)
1. Open Xcode → Product → Archive
2. Distribute App → App Store Connect
3. Upload for TestFlight or App Store release

## 🎨 Design Features

### Holographic Visual System
- **Gradient Backgrounds**: Dark theme with cyan/magenta/purple gradients
- **Holographic Cube**: Animated diamond symbol with multi-color gradients
- **Platform-Specific Shadows**: Elevation on Android, shadowColor on iOS
- **Typography**: Bold cyan titles with text shadow effects

### Responsive Design
- **Portrait Lock**: Optimized for mobile breathing sessions
- **Platform Adaptation**: Android elevation vs iOS shadows
- **Screen Size Support**: Dynamic sizing with Dimensions API
- **Status Bar**: Light content with dark background

## 🏗️ Project Structure

```
├── src/
│   ├── App.tsx                 # Main navigation container
│   └── screens/
│       ├── WelcomeScreen.tsx   # Holographic landing page
│       ├── ProtocolSelectionScreen.tsx
│       ├── BreathingSessionScreen.tsx
│       ├── SubscriptionScreen.tsx
│       └── UpgradePromptScreen.tsx
├── android/                    # Android native code
│   ├── app/build.gradle       # Android build configuration
│   └── app/src/main/
├── ios/                       # iOS native code
│   └── BreathingApp/
│       └── Info.plist         # iOS app configuration
├── index.js                   # React Native entry point
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration Files

### Key Configuration Updates
- **app.json**: App name and display name set to "BreathingApp"
- **Android Package**: `com.breathingapp` with proper permissions
- **iOS Bundle**: Portrait orientation with light status bar
- **Metro Config**: Clean React Native bundler setup

### Dependencies
- `@react-navigation/native` - Navigation system
- `react-native-linear-gradient` - Gradient backgrounds
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-safe-area-context` - Safe area handling

## 🚨 Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clean build
cd android && ./gradlew clean && cd ..
```

### Android Build Errors
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

### iOS Build Errors
```bash
# Clean iOS build
cd ios
rm -rf build/
pod install
cd ..
```

## 📦 Build Commands

### Development
```bash
npm run android      # Run Android development
npm run ios         # Run iOS development
```

### Production
```bash
# Android Release APK
cd android && ./gradlew assembleRelease

# iOS Archive (via Xcode)
# Product → Archive in Xcode
```

## 🎯 App Store Deployment

### Google Play Store
1. Generate signed APK with release keystore
2. Upload to Google Play Console
3. Complete store listing with app description
4. Submit for review

### Apple App Store
1. Archive app in Xcode
2. Upload to App Store Connect
3. Complete App Store listing
4. Submit for TestFlight and App Store review

## 🔐 Security & Permissions

### Android Permissions
- `INTERNET` - Network requests
- `VIBRATE` - Haptic feedback during breathing sessions
- `SYSTEM_ALERT_WINDOW` - Development overlay

### iOS Capabilities
- Portrait orientation lock
- Background audio (for breathing session sounds)
- Local storage access

## 📊 Performance Optimization

### Bundle Size
- Hermes JavaScript engine enabled
- ProGuard minification for release builds
- Native module auto-linking

### Visual Performance
- Hardware acceleration for gradients
- Optimized shadow rendering per platform
- Smooth navigation transitions

## 🔄 Version Management

### Android Versioning
- `versionCode`: Increment for each release
- `versionName`: Semantic versioning (1.0.0)

### iOS Versioning
- `CFBundleVersion`: Build number
- `CFBundleShortVersionString`: Marketing version

---

## 📞 Support

For deployment issues or questions, refer to the React Native documentation or create an issue in the project repository.

**Ready for App Store deployment with professional holographic breathing experience.**