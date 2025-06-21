# Breathing App - Production Deployment Guide

## Database Setup (Supabase)

### 1. Supabase Configuration
- **Database URL**: `postgresql://postgres:Qe9DsDBxjPC2JMsO@db.mstkdpoenysyhdxdqzts.supabase.co:5432/postgres`
- **Connection**: Ready for production deployment
- **Schema**: Automatically created via Drizzle migrations

### 2. Environment Variables for Production
```env
DATABASE_URL=postgresql://postgres:Qe9DsDBxjPC2JMsO@db.mstkdpoenysyhdxdqzts.supabase.co:5432/postgres
NODE_ENV=production
```

### 3. Database Migration Commands
```bash
# Push schema to Supabase (run in production environment)
npm run db:push

# Verify tables are created
npm run db:studio
```

## Deployment Platforms

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `DATABASE_URL`: Supabase connection string
   - `NODE_ENV`: production
3. Deploy automatically on push to main branch

### Railway Deployment
1. Connect GitHub repository to Railway
2. Add PostgreSQL service (or use external Supabase)
3. Set environment variables in Railway dashboard
4. Deploy with automatic builds

### Manual Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Run database migrations: `npm run db:push`
4. Start production server: `npm start`

## Database Schema
The following tables will be automatically created in Supabase:

- **users**: User profiles with authentication data
- **breathing_sessions**: Session tracking and analytics
- **user_audio_library**: Personalized ambient audio
- **user_feedback**: User ratings and feedback
- **sessions**: Express session storage

## Features Ready for Production
- ✅ Complete user authentication system
- ✅ Session tracking and analytics
- ✅ Trial system with 2-session limit
- ✅ Subscription management
- ✅ Modern dark UI with holographic design
- ✅ Comprehensive breathing protocols
- ✅ Mobile-responsive design
- ✅ Database connectivity (Supabase ready)

## Post-Deployment Verification
1. Check database connection
2. Test user registration/login
3. Verify session recording
4. Test trial system limits
5. Confirm analytics tracking

The app is fully ready for production deployment with Supabase database connectivity.