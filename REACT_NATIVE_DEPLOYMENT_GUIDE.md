# React Native Breathing App - Deployment Guide

## Project Structure Overview

This is a complete React Native conversion of your breathing app with the following structure:

```
BreathingAppRN/
├── src/
│   ├── screens/
│   │   ├── WelcomeScreen.tsx
│   │   ├── ProtocolSelectionScreen.tsx
│   │   ├── BreathingSessionScreen.tsx
│   │   ├── SubscriptionScreen.tsx
│   │   └── UpgradePromptScreen.tsx
│   ├── data/
│   │   └── breathingProtocols.ts
│   ├── types/
│   │   └── index.ts
│   └── components/ (ready for custom components)
├── App.tsx (main navigation)
├── index.js (app entry point)
├── package-react-native.json (RN dependencies)
├── metro.config.js
├── babel.config.js
├── react-native.config.js
└── app.json
```

## Prerequisites

### Development Environment Setup

#### For Both iOS and Android:
1. **Node.js 18+**: Download from nodejs.org
2. **React Native CLI**: 
   ```bash
   npm install -g @react-native-community/cli
   ```

#### For Android Development:
1. **Android Studio**: Download and install from developer.android.com
2. **Android SDK**: Install via Android Studio
3. **Java Development Kit (JDK) 11**: Required for Android builds
4. **Android Virtual Device (AVD)**: Set up via Android Studio

#### For iOS Development (macOS only):
1. **Xcode 14+**: Install from Mac App Store
2. **iOS Simulator**: Included with Xcode
3. **CocoaPods**: 
   ```bash
   sudo gem install cocoapods
   ```

## Setup Instructions

### Step 1: Initialize React Native Project

1. Create a new React Native project:
   ```bash
   npx react-native@latest init BreathingAppRN --template react-native-template-typescript
   cd BreathingAppRN
   ```

2. Install dependencies from package-react-native.json:
   ```bash
   npm install react-native@0.73.6 @react-navigation/native@^6.1.9 @react-navigation/stack@^6.3.20 react-native-screens@^3.29.0 react-native-safe-area-context@^4.8.2 react-native-gesture-handler@^2.14.1 react-native-reanimated@^3.6.2 @react-native-async-storage/async-storage@^1.21.0 react-native-linear-gradient@^2.8.3 react-native-vector-icons@^10.0.3 react-native-sound@^0.11.2 react-native-svg@^14.1.0
   ```

### Step 2: Replace Files

Copy all the files I've created into your React Native project:
- Replace `App.tsx`
- Copy `src/` folder with all screens, types, and data
- Copy configuration files (metro.config.js, babel.config.js, etc.)

### Step 3: Platform-Specific Setup

#### Android Setup:

1. **Configure MainApplication.java**:
   Add to `android/app/src/main/java/.../MainApplication.java`:
   ```java
   import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
   import com.swmansion.reanimated.ReanimatedPackage;
   ```

2. **Configure Gradle**:
   Add to `android/app/build.gradle`:
   ```gradle
   project.ext.vectoricons = [
       iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ]
   ]
   apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
   ```

3. **Enable Hermes** (optional but recommended):
   In `android/app/build.gradle`:
   ```gradle
   project.ext.react = [
       enableHermes: true
   ]
   ```

#### iOS Setup:

1. **Install Pods**:
   ```bash
   cd ios && pod install && cd ..
   ```

2. **Configure Info.plist**:
   Add to `ios/BreathingAppRN/Info.plist`:
   ```xml
   <key>UIAppFonts</key>
   <array>
     <string>MaterialIcons.ttf</string>
   </array>
   ```

### Step 4: Development and Testing

#### Run on Android:
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run Android
npx react-native run-android
```

#### Run on iOS:
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run iOS
npx react-native run-ios
```

## Building for Production

### Android APK Build

1. **Generate Signing Key**:
   ```bash
   cd android/app
   keytool -genkeypair -v -storetype PKCS12 -keystore breathing-app-key.keystore -alias breathing-app-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Gradle Signing**:
   Add to `android/gradle.properties`:
   ```properties
   BREATHING_APP_UPLOAD_STORE_FILE=breathing-app-key.keystore
   BREATHING_APP_UPLOAD_KEY_ALIAS=breathing-app-alias
   BREATHING_APP_UPLOAD_STORE_PASSWORD=your_password
   BREATHING_APP_UPLOAD_KEY_PASSWORD=your_password
   ```

3. **Configure Build Gradle**:
   Add to `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               if (project.hasProperty('BREATHING_APP_UPLOAD_STORE_FILE')) {
                   storeFile file(BREATHING_APP_UPLOAD_STORE_FILE)
                   storePassword BREATHING_APP_UPLOAD_STORE_PASSWORD
                   keyAlias BREATHING_APP_UPLOAD_KEY_ALIAS
                   keyPassword BREATHING_APP_UPLOAD_KEY_PASSWORD
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

4. **Build APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS IPA Build

1. **Open Xcode**:
   ```bash
   open ios/BreathingAppRN.xcworkspace
   ```

2. **Configure Signing**:
   - Select your project in Xcode
   - Go to "Signing & Capabilities"
   - Select your Apple Developer Team
   - Ensure "Automatically manage signing" is checked

3. **Archive Build**:
   - In Xcode: Product → Archive
   - Once archived, click "Distribute App"
   - Choose "App Store Connect" or "Development"
   - Follow the wizard to generate IPA

4. **Command Line Build** (alternative):
   ```bash
   cd ios
   xcodebuild -workspace BreathingAppRN.xcworkspace -scheme BreathingAppRN -configuration Release -archivePath BreathingAppRN.xcarchive archive
   xcodebuild -exportArchive -archivePath BreathingAppRN.xcarchive -exportPath ./build -exportOptionsPlist exportOptions.plist
   ```

## Key Features Implemented

### Core Functionality:
- **Welcome Screen**: Trial and subscription options
- **Protocol Selection**: 7 breathing protocols with paywall logic
- **Breathing Session**: Animated breathing guide with timer
- **Subscription**: Razorpay payment integration (ready for API keys)
- **Upgrade Prompt**: Trial completion screen

### Technical Features:
- **AsyncStorage**: Local data persistence
- **React Navigation**: Stack navigation between screens
- **Linear Gradients**: Holographic visual design
- **Reanimated**: Smooth breathing animations
- **TypeScript**: Full type safety

## Payment Integration

The app is ready for Razorpay integration. You'll need to:

1. **Install Razorpay SDK**:
   ```bash
   npm install react-native-razorpay
   ```

2. **Add Razorpay Keys**:
   - Get keys from Razorpay Dashboard
   - Add to your environment configuration

3. **Replace Demo Payment**:
   - Update `SubscriptionScreen.tsx`
   - Replace simulated payment with actual Razorpay calls

## App Store Deployment

### Google Play Store (Android):
1. Create Developer Account ($25 one-time fee)
2. Upload APK via Google Play Console
3. Complete store listing with screenshots and descriptions
4. Submit for review

### Apple App Store (iOS):
1. Apple Developer Account ($99/year)
2. Upload IPA via App Store Connect
3. Complete app metadata and screenshots
4. Submit for App Store review

## Troubleshooting

### Common Issues:

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build fails**: Clean with `cd android && ./gradlew clean`
3. **iOS build fails**: Clean build folder in Xcode (Cmd+Shift+K)
4. **Missing dependencies**: Run `npm install` and `pod install` (iOS)

### Performance Optimization:
- Enable Hermes for Android
- Use Flipper for debugging
- Optimize images and animations
- Test on physical devices

This React Native version maintains all the features of your web app while being optimized for mobile devices with native performance and the ability to generate APK/IPA files for app store distribution.