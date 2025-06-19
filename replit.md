# Breathing App - React Native Conversion

## Project Overview
A modern mobile breathing application converted from React web app to React Native for iOS and Android deployment. Features guided breathing protocols with holographic design and Razorpay-based subscription paywall. Users can try one free protocol before needing to subscribe for full access.

## Dual Architecture (Web + Mobile)

### Web Version (Original)
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js with session-based authentication
- **Payment**: Razorpay integration for subscription management
- **UI**: Tailwind CSS + shadcn/ui components with holographic/neon theme
- **Storage**: In-memory storage for demo purposes

### Mobile Version (React Native)
- **Framework**: React Native 0.73.6 with TypeScript
- **Navigation**: React Navigation stack navigator
- **UI**: Native components with LinearGradient for holographic effects
- **Storage**: AsyncStorage for local data persistence
- **Animation**: React Native Reanimated for breathing animations
- **Deployment**: Ready for APK/IPA generation

## Payment System
- **Provider**: Razorpay (Indian payment gateway)
- **Model**: Monthly subscription at ₹999/month
- **Trial**: One free protocol trial per user
- **Features**: 
  - Session-based subscription tracking (web)
  - AsyncStorage subscription tracking (mobile)
  - Payment verification with signature validation
  - Automatic subscription activation

## Recent Changes
- **2025-06-19**: Complete React Native conversion
  - Created 5 React Native screens with native navigation
  - Converted all breathing protocols and session logic
  - Implemented AsyncStorage for mobile data persistence
  - Added animated breathing circle with React Native Reanimated
  - Set up complete project structure for APK/IPA builds
  - Created comprehensive deployment guide with build instructions
  - Maintained holographic design with LinearGradient components
  - Ready for Razorpay mobile SDK integration

## API Endpoints
- `GET /api/subscription-status` - Check user subscription status
- `POST /api/create-payment-order` - Create Razorpay payment order
- `POST /api/verify-payment` - Verify payment and activate subscription

## User Flow
1. **Welcome Page**: Choose between free trial or subscription
2. **Trial Mode**: Access one protocol without payment
3. **Subscription**: Razorpay checkout for ₹999/month
4. **Protocol Access**: Full access with active subscription
5. **Paywall**: Redirect to subscription after trial used

## Environment Variables Needed
- `RAZORPAY_KEY_ID`: Razorpay publishable key (starts with rzp_test_ or rzp_live_)
- `RAZORPAY_KEY_SECRET`: Razorpay secret key
- Demo keys are included for testing purposes

## User Preferences
- Uses localStorage for trial tracking
- Session-based subscription management
- Holographic/neon design theme maintained throughout paywall