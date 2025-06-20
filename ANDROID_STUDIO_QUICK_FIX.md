# Android Studio Quick Fix - Breathing App

## Immediate Solutions for Gradle Sync Issues

### Step 1: SDK Path Configuration
In Android Studio:
1. **File → Project Structure → SDK Location**
2. Set **Android SDK location** to your SDK path (usually `~/Library/Android/sdk` on Mac or `%LOCALAPPDATA%\Android\Sdk` on Windows)
3. Set **Android NDK location** if needed

### Step 2: Gradle Wrapper Fix
If you see "gradle-wrapper.jar not found" errors:

```bash
# In Android Studio Terminal (bottom panel):
cd android
gradle wrapper --gradle-version 8.0.1
```

### Step 3: Clean and Sync
1. **Build → Clean Project**
2. **File → Sync Project with Gradle Files**
3. Wait for sync to complete

### Step 4: Fix Missing Dependencies
If React Native dependencies are missing:
```bash
# In project root:
npm install
npx react-native-asset
```

### Step 5: Start Metro Bundler
Before running the app:
```bash
# In project root (separate terminal):
npx react-native start --reset-cache
```

### Step 6: Run on Device/Emulator
1. Connect Android device or start emulator
2. **Run → Run 'app'** (green play button)

## Common Error Solutions

### "Could not resolve all dependencies"
- Check internet connection
- **File → Invalidate Caches and Restart**

### "SDK not found"
- Update `android/local.properties` with correct SDK path:
```properties
sdk.dir=/path/to/your/Android/sdk
```

### "Java not found"
- Install Java 11 JDK
- Set JAVA_HOME environment variable

### Metro Bundler Issues
```bash
npx react-native start --reset-cache
rm -rf node_modules && npm install
```

## Verification Checklist
- [ ] Android SDK properly configured
- [ ] Gradle sync completes without errors
- [ ] Metro bundler running
- [ ] Device/emulator connected
- [ ] App builds and installs successfully

Your holographic breathing app should now run perfectly in Android Studio with the complete UI matching your Replit design.