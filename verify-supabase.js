// Test script to verify Supabase connection and create tables
import postgres from 'postgres';

const supabaseUrl = "postgresql://postgres:Qe9DsDBxjPC2JMsO@db.mstkdpoenysyhdxdqzts.supabase.co:5432/postgres";

async function setupSupabase() {
  console.log("🔌 Connecting to Supabase...");
  
  try {
    const sql = postgres(supabaseUrl, {
      ssl: 'require',
      max: 1
    });
    
    // Test connection
    const timeResult = await sql`SELECT NOW() as current_time`;
    console.log("✅ Connected successfully at:", timeResult[0].current_time);
    
    // Create tables
    console.log("📝 Creating database tables...");
    
    await sql`
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
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
          sid VARCHAR PRIMARY KEY,
          sess JSONB NOT NULL,
          expire TIMESTAMP NOT NULL
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS breathing_sessions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          protocol_id VARCHAR NOT NULL,
          protocol_name VARCHAR NOT NULL,
          duration INTEGER NOT NULL,
          completed BOOLEAN DEFAULT false,
          session_date TIMESTAMP DEFAULT NOW(),
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS user_audio_library (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          name VARCHAR NOT NULL,
          file_url VARCHAR NOT NULL,
          file_type VARCHAR NOT NULL,
          duration INTEGER,
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS user_feedback (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          category VARCHAR NOT NULL,
          feedback_text TEXT,
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_breathing_sessions_user_id ON breathing_sessions(user_id)`;
    
    console.log("✅ All tables created successfully");
    
    // Verify tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log("📋 Created tables:", tables.map(t => t.table_name).join(', '));
    
    await sql.end();
    console.log("🎉 Supabase setup complete!");
    
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  }
}

setupSupabase();