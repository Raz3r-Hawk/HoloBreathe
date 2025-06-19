# Breathing App - Comprehensive User Management System

## Project Overview
A comprehensive breathing application with advanced user management, authentication, session analytics, and subscription system. Features guided breathing protocols with holographic design, detailed user profiles, and complete app compliance for Google/Apple store deployment.

## Current Architecture

### Web Version
- **Frontend**: React + TypeScript + Vite with shadcn/ui components
- **Backend**: Express.js with PostgreSQL database integration
- **Authentication**: Secure password-based auth with bcrypt hashing
- **Database**: PostgreSQL with Drizzle ORM for data persistence
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

## Recent Changes
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