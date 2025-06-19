import postgres from 'postgres';

const connectionString = "postgresql://postgres:Qe9DsDBxjPC2JMsO@db.mstkdpoenysyhdxdqzts.supabase.co:5432/postgres";

async function testConnection() {
  try {
    const sql = postgres(connectionString);
    
    // Test basic connection
    console.log("Testing Supabase connection...");
    const result = await sql`SELECT NOW() as current_time`;
    console.log("✅ Connection successful:", result[0].current_time);
    
    // Check if tables exist
    console.log("\nChecking existing tables...");
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log("Existing tables:", tables.map(t => t.table_name));
    
    // Check if users table exists and has data
    try {
      const userCount = await sql`SELECT COUNT(*) as count FROM users`;
      console.log(`Users table exists with ${userCount[0].count} records`);
    } catch (error) {
      console.log("❌ Users table does not exist:", error.message);
    }
    
    await sql.end();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

testConnection();