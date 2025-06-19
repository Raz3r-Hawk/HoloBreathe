# Supabase Database Migration Guide

This guide helps you migrate your Breathing App from Replit's database to Supabase PostgreSQL.

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)
   - Sign up or log in to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: "breathing-app"
   - Set a strong database password (save this!)
   - Select your preferred region
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 2-3 minutes
   - You'll see a setup progress indicator

## Step 2: Get Database Connection String

1. **Navigate to Settings**
   - In your project dashboard, click "Settings" in sidebar
   - Go to "Database" section

2. **Copy Connection String**
   - Under "Connection string", select "Transaction pooler"
   - Copy the URI that looks like:
     ```
     postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
     ```
   - Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Update Environment Variables

1. **In Replit Secrets**
   - Go to your Replit project
   - Open the Secrets tab (lock icon in sidebar)
   - Update `DATABASE_URL` with your Supabase connection string

2. **Verify Format**
   Your DATABASE_URL should look like:
   ```
   postgresql://postgres.xxxxx:your_password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

## Step 4: Create Database Schema

1. **Run Database Migration**
   ```bash
   npm run db:push
   ```
   This will create all tables in your Supabase database.

2. **Verify Tables Created**
   - Go to Supabase dashboard → Table Editor
   - You should see these tables:
     - `users`
     - `breathing_sessions` 
     - `user_audio_library`
     - `user_feedback`
     - `sessions` (for authentication)

## Step 5: Test Connection

1. **Restart Your Application**
   - The app will automatically restart after environment changes
   - Check the console for any connection errors

2. **Test Database Operations**
   - Try registering a new user
   - Verify user data appears in Supabase Table Editor
   - Test breathing session creation

## Migration Benefits

### Why Supabase?
- **Better Performance**: Dedicated PostgreSQL with connection pooling
- **Real-time Features**: Built-in real-time subscriptions
- **Dashboard**: Visual table editor and query builder
- **Backup & Recovery**: Automated daily backups
- **Scaling**: Automatic scaling based on usage
- **Security**: Row Level Security (RLS) policies

### Cost Comparison
- **Supabase Free Tier**: 
  - 500MB database storage
  - 2GB bandwidth per month
  - Up to 50,000 monthly active users
  - Perfect for development and small apps

- **Paid Plans**: Start at $25/month for production use

## Troubleshooting

### Connection Issues

**Error: "Connection refused"**
- Verify your DATABASE_URL is correct
- Check that password doesn't contain special characters that need URL encoding
- Ensure you're using the "Transaction pooler" connection string

**Error: "SSL required"**
- Supabase requires SSL connections by default
- Our postgres.js client handles this automatically

### Migration Issues

**Error: "relation does not exist"**
- Run `npm run db:push` to create tables
- Check Supabase dashboard for any error messages

**Authentication Errors**
- Verify your password is correct in the connection string
- Check that your IP is not blocked (Supabase allows all IPs by default)

### Performance Optimization

1. **Connection Pooling**
   - Supabase provides connection pooling by default
   - Use the pooler connection string for better performance

2. **Indexes**
   - Our schema includes necessary indexes
   - Monitor query performance in Supabase dashboard

## Supabase Features You Can Use

### Real-time Subscriptions
```typescript
// Example: Real-time breathing session updates
const { data, error } = await supabase
  .from('breathing_sessions')
  .select('*')
  .eq('user_id', userId)
  .subscribe()
```

### Row Level Security
```sql
-- Example: Secure user data access
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);
```

### Built-in Authentication
- Supabase has built-in auth, but we'll keep our current system
- Future enhancement: Can migrate to Supabase Auth later

## Data Export/Import (If Needed)

### Export from Current Database
```bash
# If you have existing data to migrate
pg_dump $OLD_DATABASE_URL > backup.sql
```

### Import to Supabase
```bash
# Import existing data
psql $SUPABASE_DATABASE_URL < backup.sql
```

## Monitoring and Maintenance

### Supabase Dashboard Features
- **Table Editor**: Visual data management
- **SQL Editor**: Run custom queries
- **API Logs**: Monitor all database requests
- **Performance**: Query performance metrics

### Regular Maintenance
- Monitor database size (free tier: 500MB limit)
- Review slow queries in performance dashboard
- Set up backup alerts for production use

## Next Steps After Migration

1. **Test All Features**
   - User registration/login
   - Breathing session tracking
   - Analytics dashboard
   - Settings management

2. **Monitor Performance**
   - Check response times
   - Monitor connection usage
   - Review error logs

3. **Optional Enhancements**
   - Set up Supabase Edge Functions for API endpoints
   - Implement real-time features
   - Add Row Level Security policies

## Support

If you encounter issues:
- Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord community
- Email: contact@geeksgrow.com

The migration maintains all existing functionality while providing better performance and additional features for future enhancements.