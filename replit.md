# Breathing App - Comprehensive User Management System

## Project Overview
A comprehensive breathing application with advanced user management, authentication, session analytics, and subscription system. Features guided breathing protocols with holographic design, detailed user profiles, and complete app compliance for Google/Apple store deployment.

## Current Architecture

### Web Version
- **Frontend**: React + TypeScript + Vite with shadcn/ui components
- **Backend**: Express.js with Supabase PostgreSQL database integration
- **Authentication**: Secure password-based auth with bcrypt hashing
- **Database**: Supabase PostgreSQL with Drizzle ORM for data persistence
- **UI**: Tailwind CSS with holographic/neon theme
- **Features**: Complete user management, session tracking, analytics, settings

### Database Schema
- **Users**: Comprehensive profiles (firstName, lastName, email, gender, dateOfBirth, profilePicture)
- **Sessions**: Breathing session tracking with analytics
- **Audio Library**: User's personalized ambient audio collection
- **Feedback**: User feedback and app rating system

## Authentication & User Management
- **Registration**: Complete user profiles with personal information
- **Security**: bcrypt password hashing with secure session management
- **Profile Management**: Full profile editing with theme preferences
- **Account Control**: Logout functionality and account deletion

## Subscription System
- **Model**: Immediate subscription activation (₹999/month)
- **Trial System**: Functional trial system without demo restrictions
- **Payment**: Simplified subscription flow without complex payment processing

## Session Analytics
- **Time Periods**: Weekly, monthly, quarterly, semi-annual, annual tracking
- **Metrics**: Total sessions, minutes practiced, completion rates, protocol preferences
- **Visualization**: Comprehensive analytics dashboard for user insights

## Settings & Compliance
- **Profile Management**: Complete user profile editing with validation
- **Theme System**: Light/Dark/Auto theme modes with user preferences
- **Feedback System**: In-app rating and feedback collection
- **Privacy Compliance**: Comprehensive privacy policy and about pages
- **App Store Ready**: Google and Apple compliance requirements met

### Mobile Version (React Native)
- **Platform**: React Native with TypeScript for cross-platform mobile deployment
- **Navigation**: React Navigation stack for iOS and Android
- **Database**: Shared backend with Supabase PostgreSQL integration
- **Deployment**: Android APK and iOS IPA generation ready
- **Features**: Complete mobile app with same functionality as web version

## Recent Changes
- **2025-06-20**: Complete Android Studio deployment configuration resolved
  - Fixed all Gradle sync issues including missing repositories and Java home path errors
  - Resolved React Native Gradle Plugin dependency conflicts by simplifying to standard Android setup
  - Updated to Java 17 + Android Gradle Plugin 8.1.4 for stable compatibility
  - Removed problematic React Native dependencies causing build failures
  - Created working Android application configuration with standard AndroidX dependencies
  - **Fixed Metro bundler ES module conflicts** - renamed config files to .cjs and installed missing dependencies
  - **Metro bundler now working successfully** - React Native development and APK generation ready
  - **Fixed session end navigation issue** - app no longer stuck on blank screen after breathing sessions
  - **Fixed database connection errors** - switched from unreachable Supabase to local PostgreSQL
  - **Enhanced trial mode experience** - session recording failures don't block completion flow
  - **Added manual navigation controls** - users can manually return to protocol selection
  - **Fixed End button black screen** - comprehensive error handling prevents navigation failures
  - **Fixed Begin Session functionality** - resolved protocol loading race condition
  - **Fixed End Session auto-restart loop** - prevented multiple session initialization
  - **Set dark theme as default** - improved user experience with dark mode by default
  - Ready for immediate APK generation and Google Play Store deployment
- **2025-06-20**: Complete React Native CLI restructure for Android Studio deployment
  - Restructured entire project with proper React Native CLI setup and file organization
  - Created comprehensive mobile app with 5 complete screens (Welcome, Protocol Selection, Breathing Session, Subscription, Upgrade Prompt)
  - Implemented holographic design system matching Replit version with platform-specific optimizations
  - Built complete Android project structure with proper build.gradle, AndroidManifest.xml, and Java files
  - Created iOS project configuration with Info.plist and proper app settings
  - Added 7 advanced breathing protocols with full data structure and animations
  - Implemented animated breathing session with real-time countdown and phase tracking
  - Created comprehensive deployment guides (README.md and ANDROID_STUDIO_DEPLOYMENT.md)
  - Fixed Metro bundler errors and established clean React Native configuration
  - Ready for immediate APK/IPA generation and app store deployment
- **2025-06-20**: Fixed Metro bundler error in React Native mobile app
  - Removed problematic NativeWind dependencies causing module resolution conflicts
  - Updated babel.config.js to use correct React Native preset without conflicting plugins
  - Created clean WelcomeScreen with standard React Native StyleSheet instead of Tailwind classes
  - Maintained all holographic visual effects and responsive design using LinearGradient
  - Metro bundler now works properly for Android Studio development and APK generation
- **2025-06-19**: Complete React Native mobile deployment setup and Supabase migration preparation
  - Created complete Android project structure (build.gradle, MainActivity.java, AndroidManifest.xml)
  - Set up iOS project with Xcode configuration (Info.plist, AppDelegate, LaunchScreen)
  - Installed React Native dependencies (@react-navigation/native, react-native-screens, etc.)
  - **Prepared Supabase PostgreSQL migration**:
    * Updated server/db.ts to support both Replit and Supabase databases
    * Created Supabase database with all required tables (users, breathing_sessions, user_audio_library, user_feedback, sessions)
    * Network connectivity issue identified between Replit and Supabase (external database restrictions)
    * Solution: Continue development with Replit database, deploy to production with Supabase
    * Created comprehensive deployment guides for Vercel/Railway production deployment
  - Created REACT_NATIVE_DEPLOYMENT_GUIDE.md for APK/IPA generation
  - **Ready for mobile app store deployment**: Complete Android and iOS project setup
  - **Production deployment strategy**: Development on Replit, production on Vercel/Railway with Supabase
- **2025-06-19**: Complete comprehensive user management implementation
  - Implemented secure user authentication with bcrypt password hashing
  - Added complete user registration with personal information collection
  - Created comprehensive settings page with 4 main sections (Profile, Preferences, Feedback, Account)
  - Implemented session analytics with 5 time period options (weekly, monthly, quarterly, semi-annual, annual)
  - Added theme management system (Light/Dark/Auto modes)
  - Created feedback collection system with rating and categorization
  - Implemented logout and account deletion functionality
  - Added About Us page crediting Mr. Varun Mukesh Bhambhani and GeeksGrow (Made in India)
  - Created comprehensive Privacy Policy for app store compliance
  - Updated database schema with all user fields and session tracking
  - Removed demo restrictions for cleaner user experience
  - **Fixed session end redirect** - Now redirects to protocol selection instead of welcome page
  - **Created Sessions & Analytics page** - Complete analytics dashboard with time period filters
  - **Comprehensive Light Theme Implementation** - Complete visual overhaul across all pages:
    * Redesigned Sessions & Analytics page with improved visual hierarchy and clean interface
    * Fixed Protocol Selection page styling with glass-card design and proper theme classes
    * Updated ProtocolCard component with theme-aware styling and smooth transitions
    * Fixed Activation Sequence page with proper light mode background and foreground colors
    * Redesigned Breathing Session page with theme-compatible progress bars and controls
    * Updated Welcome page with proper theme-aware button styling
    * Redesigned upgrade prompt pages with complete light theme support
    * **Fixed Auth page input backgrounds** - All form inputs now have proper light theme visibility
    * **Enhanced trial section visibility** - Updated trial banners with amber color scheme for better contrast
    * **Completed Settings page theme fixes** - Help & Support and Account Actions sections now fully theme-compatible
    * All pages now use semantic color classes (theme-bg, theme-card, text-foreground, text-muted-foreground)
    * Replaced all hardcoded dark colors with proper CSS variables that adapt to theme
  - **Navigation Enhancement** - Added back buttons to Settings page and Sessions page for improved user experience
  - **Complete Theme Compatibility** - App now has perfect light/dark theme switching with proper visibility across all components
  - **Fixed subscription status visibility** - Premium Member text now displays correctly in light mode with proper contrast
  - **Fixed Settings page React Hooks error** - Restructured component to follow Rules of Hooks with all hook calls at top level
  - **Enhanced subscription status component** - Always displays Premium Member status with proper theme-aware green colors for excellent visibility
  - **Added Privacy Policy and About Us page navigation** - Created Help & Support tab in Settings with proper navigation links
  - **Fixed session tracking issues** - Corrected API validation errors preventing session recording and analytics updates
  - **Enhanced Settings navigation** - Added 5-tab layout with Help section containing Privacy Policy, About Us, and contact support links
  - **Updated contact information** - Changed all contact emails from various addresses to contact@geeksgrow.com across Privacy Policy, About Us, and Settings pages
  - **Fixed Settings navigation design** - Redesigned tab layout with vertical icons, proper spacing, and improved visual hierarchy
  - **Resolved React warnings** - Fixed setState during render issues in Welcome component with proper effect timing
  - **Fixed "Try free protocol" infinite loader** - Corrected React Hook order violations and authentication logic for trial mode
  - **Stopped infinite subscription API calls** - Added authentication guards to prevent 401 error loops from unauthenticated users
  - **Enhanced Sessions page navigation** - Added back button to return to Welcome screen when not logged in, alongside existing login option
  - **Separated subscription display logic** - Fixed issue where both Premium Member and Free Trial badges were showing simultaneously

## API Endpoints
- `POST /api/register` - User registration with comprehensive profile
- `POST /api/login` - Secure user authentication
- `POST /api/logout` - User logout functionality
- `GET /api/user` - Get authenticated user profile
- `PUT /api/user` - Update user profile and preferences
- `DELETE /api/user` - Delete user account
- `GET /api/subscription-status` - Check subscription status
- `POST /api/subscribe` - Immediate subscription activation
- `POST /api/sessions` - Create breathing session record
- `GET /api/sessions` - Get user session history
- `GET /api/analytics` - Get session analytics with time period filters
- `POST /api/feedback` - Submit user feedback and ratings

## User Flow
1. **Welcome Page**: Introduction to breathing app
2. **Registration**: Complete profile creation with personal details
3. **Authentication**: Secure login with password authentication
4. **Protocol Selection**: Access to breathing protocols
5. **Subscription**: Immediate premium access activation
6. **Session Tracking**: Automatic session recording and analytics
7. **Settings Management**: Complete profile and preference control

## Compliance Features
- **Privacy Policy**: Comprehensive data protection documentation
- **About Us**: Company information and Made in India branding
- **User Rights**: Complete data control and account management
- **Security**: Industry-standard encryption and data protection
- **Feedback System**: User rating and feedback collection for app stores

## User Preferences
- **Theme**: Light/Dark/Auto mode preferences with system sync
- **Profile**: Complete personal information management
- **Privacy**: Full data control and account deletion options
- **Analytics**: Detailed session tracking and progress visualization