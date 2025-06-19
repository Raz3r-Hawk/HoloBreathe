-- Breathing App Database Schema for Supabase
-- Run this SQL script in your Supabase SQL Editor to create all tables

-- Session storage table for authentication
-- This table is mandatory for authentication, don't drop it
CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR PRIMARY KEY,
    sess JSONB NOT NULL,
    expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire);

-- User storage table
-- This table is mandatory for user management, don't drop it
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

-- Breathing sessions table for tracking user sessions
CREATE TABLE IF NOT EXISTS breathing_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    protocol_id VARCHAR NOT NULL,
    protocol_name VARCHAR NOT NULL,
    duration INTEGER NOT NULL, -- in seconds
    completed BOOLEAN DEFAULT false,
    session_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- User audio library table for personalized ambient sounds
CREATE TABLE IF NOT EXISTS user_audio_library (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    file_url VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    duration INTEGER, -- in seconds
    created_at TIMESTAMP DEFAULT NOW()
);

-- User feedback table for app ratings and feedback
CREATE TABLE IF NOT EXISTS user_feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    category VARCHAR NOT NULL,
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_breathing_sessions_user_id ON breathing_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_breathing_sessions_date ON breathing_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_user_audio_library_user_id ON user_audio_library(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add updated_at trigger for users table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default breathing protocols data (optional)
-- This creates some sample data to verify the connection
COMMENT ON TABLE users IS 'User accounts with profile information and preferences';
COMMENT ON TABLE breathing_sessions IS 'Tracking of completed breathing exercise sessions';
COMMENT ON TABLE user_audio_library IS 'User-uploaded ambient audio files for breathing sessions';
COMMENT ON TABLE user_feedback IS 'User feedback and ratings for the application';
COMMENT ON TABLE sessions IS 'Session storage for user authentication';