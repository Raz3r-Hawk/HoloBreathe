# Android Studio Deployment Guide - Breathing App

## Complete Setup Instructions for Professional APK Generation

### Prerequisites Installation
```bash
# Ensure you have these installed:
- Android Studio 2022.3.1 or newer
- Node.js 18+
- Java Development Kit 11+
- Android SDK Platform-Tools
```

### Project Import
1. **Open Android Studio**
2. **Import Project**: Select the `android` folder (not the root project)
3. **Sync Project**: Android Studio will automatically sync Gradle files
4. **Wait for indexing** to complete

### Initial Setup
```bash
# In project root, install dependencies
npm install

# Start Metro bundler (keep this running)
npx react-native start --reset-cache
```

### Development Build
1. **Connect Device** or start emulator
2. **Build → Clean Project** in Android Studio
3. **Build → Rebuild Project**
4. **Run → Run 'app'** or click the green play button

### Release APK Generation

#### Step 1: Generate Signing Key
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore breathingapp-release-key.keystore -alias breathingapp -keyalg RSA -keysize 2048 -validity 10000
```

#### Step 2: Configure Signing
Create `android/gradle.properties` with:
```properties
MYAPP_UPLOAD_STORE_FILE=breathingapp-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=breathingapp
MYAPP_UPLOAD_STORE_PASSWORD=your_store_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

#### Step 3: Build Release APK
```bash
cd android
./gradlew assembleRelease

# APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk
```

### Design Verification Checklist

The app replicates the exact Replit design with:
- **Holographic Welcome Screen**: Dark gradient background with cyan "BREATHE" title
- **Diamond Cube Animation**: Multi-colored gradient cube with glow effects
- **Platform-Specific Shadows**: Android elevation vs iOS shadow properties
- **Responsive Layout**: Proper spacing and typography scaling
- **Gradient Buttons**: Cyan/blue for trial, magenta/purple for subscription
- **Protocol Cards**: Individual gradient cards for each breathing technique
- **Breathing Session**: Animated circle with real-time countdown and phase tracking

### Troubleshooting Common Issues

#### Metro Bundler Error 500
```bash
# Clear all caches
npx react-native start --reset-cache
rm -rf node_modules && npm install
cd android && ./gradlew clean && cd ..
```

#### Build Failures
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

#### Missing Dependencies
```bash
# Ensure all React Native dependencies are linked
npx react-native-asset
npx react-native link
```

### App Store Submission

#### Google Play Store
1. Generate signed APK using release keystore
2. Upload to Google Play Console
3. Complete store listing with:
   - **Title**: "Breathe - Holographic Breathing"
   - **Description**: "Advanced holographic breathing protocols for mindfulness and wellness"
   - **Category**: Health & Fitness
   - **Content Rating**: Everyone
4. Submit for review

#### Testing Checklist
- [ ] Welcome screen displays properly with holographic effects
- [ ] All 7 breathing protocols load correctly
- [ ] Trial mode allows access to one protocol
- [ ] Subscription flow works properly
- [ ] Breathing session timer functions accurately
- [ ] Navigation between screens works smoothly
- [ ] App handles device rotation gracefully
- [ ] Performance is smooth on target devices

### Performance Optimization

#### Bundle Size Optimization
- Hermes JavaScript engine enabled
- ProGuard minification for release builds
- Native module auto-linking

#### Memory Management
- Proper cleanup of timers and intervals
- Optimized image rendering
- Efficient gradient calculations

### Final Verification

The completed React Native app provides:
- Professional holographic breathing experience
- Complete mobile navigation system
- Platform-specific design adaptations
- Ready for Google Play Store deployment
- Identical visual experience to Replit version

**Your app is now ready for production deployment to Android devices.**