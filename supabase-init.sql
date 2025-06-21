-- HoloBreathe Database Schema for Supabase PostgreSQL
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication and profiles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  gender VARCHAR,
  date_of_birth DATE,
  profile_picture VARCHAR,
  theme VARCHAR DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'auto')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Breathing sessions table for tracking user practice
CREATE TABLE breathing_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  protocol_id VARCHAR NOT NULL,
  protocol_name VARCHAR NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  completed_duration INTEGER NOT NULL, -- in seconds
  cycles INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User audio library for custom ambient sounds
CREATE TABLE user_audio_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  file_url VARCHAR NOT NULL,
  duration INTEGER, -- in seconds
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User feedback for app ratings and suggestions
CREATE TABLE user_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  category VARCHAR, -- 'bug', 'feature', 'general', etc.
  message TEXT,
  app_version VARCHAR,
  device_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table for authentication (Supabase Auth compatibility)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_breathing_sessions_user_id ON breathing_sessions(user_id);
CREATE INDEX idx_breathing_sessions_created_at ON breathing_sessions(created_at);
CREATE INDEX idx_breathing_sessions_protocol_id ON breathing_sessions(protocol_id);
CREATE INDEX idx_user_audio_library_user_id ON user_audio_library(user_id);
CREATE INDEX idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX idx_sessions_expire ON sessions(expire);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE breathing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_audio_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for breathing_sessions table
CREATE POLICY "Users can view own sessions" ON breathing_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON breathing_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON breathing_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON breathing_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_audio_library table
CREATE POLICY "Users can view own audio library" ON user_audio_library
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own audio" ON user_audio_library
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audio" ON user_audio_library
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audio" ON user_audio_library
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_feedback table
CREATE POLICY "Users can view own feedback" ON user_feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert feedback" ON user_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default audio files (optional)
INSERT INTO user_audio_library (id, user_id, name, file_url, duration, is_default) VALUES
(uuid_generate_v4(), NULL, 'Ocean Waves', 'https://example.com/ocean.mp3', 300, true),
(uuid_generate_v4(), NULL, 'Forest Rain', 'https://example.com/rain.mp3', 300, true),
(uuid_generate_v4(), NULL, 'Tibetan Bowls', 'https://example.com/bowls.mp3', 300, true),
(uuid_generate_v4(), NULL, 'White Noise', 'https://example.com/whitenoise.mp3', 300, true);

-- Update RLS policy for default audio files
DROP POLICY IF EXISTS "Users can view own audio library" ON user_audio_library;
CREATE POLICY "Users can view audio library" ON user_audio_library
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);