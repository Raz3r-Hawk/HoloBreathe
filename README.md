# HoloBreathe - Advanced Breathing & Meditation App

**A comprehensive React Native breathing application with beautiful UI/UX, Supabase authentication, and complete app store compliance.**

## 🌟 Features

### Core Functionality
- **7 Breathing Protocols** with different difficulty levels and benefits
- **Real-time Session Tracking** with detailed analytics and progress insights
- **Beautiful Animated UI** with adaptive light/dark themes
- **Supabase Authentication** with secure user management
- **Session Analytics** with streaks, goals, and completion rates
- **Apple-grade Design** with glassmorphism and smooth animations

### User Management
- **Complete Authentication** (Sign up, Sign in, Password reset)
- **User Profiles** with personal information and preferences
- **Theme Preferences** (Light/Dark/Auto with system sync)
- **Account Management** (Profile editing, Account deletion)
- **Privacy Compliance** with comprehensive privacy policy

### App Store Ready
- **iOS & Android Support** with platform-specific optimizations
- **Privacy Policy** and Terms of Service implementation
- **Rating & Feedback** system for app store requirements
- **About Section** with proper attribution
- **Accessibility** compliance for app store approval

## 🏗️ Architecture

### Tech Stack
- **React Native** with TypeScript for cross-platform development
- **Expo** for streamlined development and deployment
- **Supabase** for backend services and PostgreSQL database
- **React Navigation 6** for smooth navigation
- **Reanimated 3** for high-performance animations
- **Linear Gradient & Blur** for beautiful visual effects

### Project Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   └── breathing/          # Breathing-specific components
├── screens/                # App screens
├── contexts/               # React contexts (Auth, Theme)
├── services/               # API services
├── types/                  # TypeScript type definitions
├── data/                   # Static data (breathing protocols)
├── theme/                  # Theme configuration
└── config/                 # App configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/holobreathe.git
   cd holobreathe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create `.env` file:
   ```
   SUPABASE_URL=https://qbvvzfgkrydazkhbqmfj.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Setup Supabase Database**
   Run the SQL commands in `supabase-init.sql` to create required tables:
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email VARCHAR UNIQUE NOT NULL,
     first_name VARCHAR,
     last_name VARCHAR,
     theme VARCHAR DEFAULT 'dark',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Breathing sessions table
   CREATE TABLE breathing_sessions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id),
     protocol_id VARCHAR NOT NULL,
     protocol_name VARCHAR NOT NULL,
     duration INTEGER NOT NULL,
     completed_duration INTEGER NOT NULL,
     cycles INTEGER DEFAULT 0,
     completed BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Development

1. **Start the Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

## 📱 Building for Production

### Android APK

1. **Generate Android Bundle**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **APK Location**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### iOS IPA

1. **Open in Xcode**
   ```bash
   cd ios
   open HoloBreathe.xcworkspace
   ```

2. **Archive and Export**
   - Select "Product" → "Archive"
   - Export for App Store or Ad Hoc distribution

### Android Studio Setup

1. **Open Android Studio**
2. **Import Project** → Select `android` folder
3. **Build** → Generate APK
4. **Release Configuration**:
   - Update `android/app/build.gradle`
   - Configure signing keys
   - Set version codes and names

## 🎨 Breathing Protocols

### Available Protocols
1. **Foundation** (4-4-4-4) - Focus & Balance - 5 min - Beginner
2. **Calm** (4-0-6-0) - Deep Relaxation - 6 min - Beginner  
3. **Energize** (3-1-3-1) - Energy Boost - 3 min - Beginner
4. **Advanced** (4-7-8-0) - Deep Sleep - 5 min - Intermediate
5. **Power** (5-5-5-5) - Mental Strength - 4 min - Intermediate
6. **Elite** (6-6-6-6) - Peak Performance - 5 min - Advanced
7. **Balance** (4-2-4-2) - Emotional Harmony - 6 min - Intermediate

### Adding New Protocols
Edit `src/data/breathingProtocols.ts` to add new breathing patterns with:
- Pattern timing array
- Difficulty level
- Color theme
- Benefits description

## 🎯 Analytics & Tracking

### Session Metrics
- **Total Sessions** - Complete session count
- **Total Minutes** - Accumulated practice time
- **Completion Rate** - Percentage of completed sessions
- **Streak Tracking** - Consecutive days with sessions
- **Weekly Goals** - Progress toward weekly targets
- **Protocol Preferences** - Most used breathing patterns

### Data Storage
All session data is securely stored in Supabase with:
- Real-time synchronization
- Offline capability
- Privacy-compliant data handling
- Export functionality for user data

## 🔐 Privacy & Security

### Data Protection
- **End-to-end Encryption** for sensitive user data
- **GDPR Compliance** with data export and deletion
- **Minimal Data Collection** only for app functionality
- **Secure Authentication** with Supabase Auth

### Privacy Features
- **Data Export** - Users can download their data
- **Account Deletion** - Complete data removal
- **Privacy Policy** - Comprehensive privacy documentation
- **Consent Management** - Clear opt-in/opt-out controls

## 🏪 App Store Deployment

### iOS App Store
1. **App Store Connect** setup
2. **Privacy Policy** URL configuration
3. **App Categories**: Health & Fitness, Lifestyle
4. **Age Rating**: 4+ (suitable for all ages)
5. **Screenshots** in all required resolutions

### Google Play Store
1. **Google Play Console** setup
2. **App Bundle** upload (.aab format)
3. **Content Rating** questionnaire
4. **Privacy Policy** and data handling disclosure
5. **Target SDK** compliance (API level 33+)

### Required Assets
- **App Icons** (iOS: 1024x1024, Android: various sizes)
- **Screenshots** (multiple device sizes)
- **Feature Graphics** (Google Play)
- **Privacy Policy** accessible URL
- **App Description** and keywords

## 🛠️ Development Guidelines

### Code Style
- **TypeScript** strict mode enabled
- **ESLint** and **Prettier** for code formatting
- **Conventional Commits** for version control
- **Component Documentation** with prop descriptions

### Performance
- **Reanimated 3** for 60fps animations
- **Image Optimization** with proper caching
- **Bundle Splitting** to reduce app size
- **Memory Management** for long sessions

### Testing
- **Unit Tests** with Jest
- **Integration Tests** with React Native Testing Library
- **E2E Tests** with Detox
- **Performance Testing** with Flipper

## 📞 Support & Contact

### Technical Support
- **Email**: contact@geeksgrow.com
- **Documentation**: See inline code comments
- **Issues**: GitHub Issues tracker

### Attribution
- **Developed by**: Mr. Varun Mukesh Bhambhani
- **Company**: GeeksGrow Technologies
- **Location**: Made in India 🇮🇳

## 📄 License

This project is proprietary software. All rights reserved.

---

**HoloBreathe** - Transform your mind with guided breathing exercises. Available on iOS and Android.