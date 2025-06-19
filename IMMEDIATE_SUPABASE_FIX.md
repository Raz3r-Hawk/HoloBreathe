# IMMEDIATE FIX: Connect Your App to Supabase

## Current Issue
Your app is still connected to the old Replit database instead of Supabase. That's why you see "Email already registered" but no data in Supabase.

## Step 1: Update Replit Secrets (CRITICAL)

1. **Open Replit Secrets**
   - Click the lock icon (🔒) in your Replit sidebar
   - This opens the "Secrets" panel

2. **Update DATABASE_URL**
   - Find the existing `DATABASE_URL` secret
   - Click to edit it
   - Replace the entire value with:
   ```
   postgresql://postgres:Qe9DsDBxjPC2JMsO@db.mstkdpoenysyhdxdqzts.supabase.co:5432/postgres
   ```
   - Save the secret

3. **Restart Application**
   - Your app will automatically restart with the new database connection

## Step 2: Create Supabase Tables

1. **Go to Supabase SQL Editor**
   - Visit: https://supabase.com/dashboard/projects
   - Open your project
   - Click "SQL Editor" in sidebar

2. **Run This SQL Script**
   ```sql
   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       email VARCHAR UNIQUE,
       password_hash VARCHAR NOT NULL,
       first_name VARCHAR,
       last_name VARCHAR,
       gender VARCHAR,
       date_of_birth DATE,
       profile_picture VARCHAR,
       theme VARCHAR DEFAULT 'auto',
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Create sessions table for authentication
   CREATE TABLE IF NOT EXISTS sessions (
       sid VARCHAR PRIMARY KEY,
       sess JSONB NOT NULL,
       expire TIMESTAMP NOT NULL
   );

   -- Create breathing_sessions table
   CREATE TABLE IF NOT EXISTS breathing_sessions (
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       protocol_id VARCHAR NOT NULL,
       protocol_name VARCHAR NOT NULL,
       duration INTEGER NOT NULL,
       completed BOOLEAN DEFAULT false,
       session_date TIMESTAMP DEFAULT NOW(),
       created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create user_audio_library table
   CREATE TABLE IF NOT EXISTS user_audio_library (
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       name VARCHAR NOT NULL,
       file_url VARCHAR NOT NULL,
       file_type VARCHAR NOT NULL,
       duration INTEGER,
       created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create user_feedback table
   CREATE TABLE IF NOT EXISTS user_feedback (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
       rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
       category VARCHAR NOT NULL,
       feedback_text TEXT,
       created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create indexes
   CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire);
   CREATE INDEX IF NOT EXISTS idx_breathing_sessions_user_id ON breathing_sessions(user_id);
   CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
   ```

## Step 3: Test the Connection

After updating the secret and creating tables:
1. Try registering a new user in your app
2. Check the Supabase Table Editor to see if data appears
3. You should see the new user in the `users` table

## Why This Happened

Your app was still using the old Replit database because:
- The `.env` file doesn't override Replit secrets
- Environment variables need to be set in Replit's secrets panel
- The app caches database connections

## Verification

Once fixed, you'll see:
- New user registrations appear in Supabase Table Editor
- No more "Email already registered" errors for new emails
- Proper data flow between your app and Supabase

The most critical step is updating the DATABASE_URL in Replit's secrets panel.