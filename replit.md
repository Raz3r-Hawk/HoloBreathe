# Breathing App with Razorpay Paywall

## Project Overview
A modern mobile breathing app with holographic design featuring guided breathing protocols and a Razorpay-based subscription paywall. Users can try one free protocol before needing to subscribe for full access.

## Architecture
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js with session-based authentication
- **Payment**: Razorpay integration for subscription management
- **UI**: Tailwind CSS + shadcn/ui components with holographic/neon theme
- **Storage**: In-memory storage for demo purposes

## Payment System
- **Provider**: Razorpay (Indian payment gateway)
- **Model**: Monthly subscription at ₹999/month
- **Trial**: One free protocol trial per user
- **Features**: 
  - Session-based subscription tracking
  - Payment verification with signature validation
  - Automatic subscription activation

## Recent Changes
- **2024-06-19**: Implemented Razorpay paywall system
  - Added subscription status tracking in user schema
  - Created subscription page with Razorpay checkout
  - Implemented trial mode allowing one free protocol
  - Added paywall logic to protocol selection
  - Updated Welcome page with trial and subscription options

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