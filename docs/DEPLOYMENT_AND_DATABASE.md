# Deployment and Database Integration Guide

This guide provides a comprehensive walkthrough for deploying your portfolio to **Vercel** and configuring **Supabase** as the database to store and sync your dynamic CMS configurations, matching our performance and security specifications.

---

## 1. Security First: Untracked `.env`
For security reasons, your sensitive database credentials should **never** be committed to Git.
- Ensure your `.env` is added to `.gitignore`.
- Your local credentials remain safe in your local `.env`, but they will not be pushed to GitHub.
- Consequently, you **must** configure your environment variables in the Vercel Dashboard so Vercel can connect to your Supabase database.

---

## 2. Serverless & Database Connection Optimization
Vercel serverless instances connect and disconnect rapidly. To prevent database connection limits from being exhausted:
- **Connection Pooler URL (`DATABASE_URL`)**: Point this to port `6543` using the transaction-mode pooler parameter `?pgbouncer=true`.
- **Optimal Pool Parameters**: Limit each serverless instance to `connection_limit=3` and set `pool_timeout=30` to prevent database connection limits from being reached.
- **Direct Connection URL (`DIRECT_URL`)**: Use port `5432` for direct database modifications or running migration scripts.

---

## 3. Function Region Optimization (Crucial for Speed)
By default, Vercel creates serverless functions in the **Washington, D.C. (us-east-1)** datacenter. Because your Supabase database is in **Singapore (ap-southeast-1)**, every database query must travel cross-continent, resulting in ~200ms of extra latency per network round-trip.

To eliminate this latency and make page loads fast:
1. Log into your **[Vercel Dashboard](https://vercel.com)**.
2. Select your project and navigate to the **Settings** tab.
3. Click on **Functions** in the left sidebar.
4. Scroll down to **Function Region** and change it from **Washington, D.C. (us-east-1)** to **Singapore (sin1)**.
5. Click **Save**.
6. *Note*: This change will apply to your next deployment.

---

## 4. Deploying to Vercel

Vercel is the recommended hosting platform for Vite-based static and dynamic frontends.

### Step-by-Step Vercel Setup

1. **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your Git provider.
2. **Import New Project**:
   - Click the **"Add New"** button in the dashboard, then select **"Project"**.
   - Under **"Import Git Repository"**, find your portfolio repository and click **"Import"**.
3. **Configure Project Settings**:
   - Vercel automatically detects your project configuration.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Configure Environment Variables**:
   You can configure your environment variables in Vercel in two ways:

   ### Option A: Use Vercel's Official Supabase Integration (Recommended & Automatic)
   1. In your Vercel Dashboard, go to your project's page and select the **Integrations** tab.
   2. Search for **Supabase** and click **Add Integration**.
   3. Choose your Vercel scope and connect it to your project.
   4. Select your Supabase Organization and link it to your existing project (`iqlzfuoftervcvrgxzvx`).
   5. Vercel will automatically populate all database connection URLs and API keys (`POSTGRES_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.).
   6. Because the codebase natively supports fallbacks for Vercel's default keys, this connection works instantly without any additional configuration!

   ### Option B: Manual Environment Variable Setup
   Expand the **"Environment Variables"** dropdown and add the following keys:

   | Key | Value Example | Description |
   | :--- | :--- | :--- |
   | **`DATABASE_URL`** | `postgresql://postgres.iqlzfuoftervcvrgxzvx:[your-pass]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=3&pool_timeout=30` | Supabase **Transaction Pooler** URL (Port 6543) |
   | **`DIRECT_URL`** | `postgresql://postgres.iqlzfuoftervcvrgxzvx:[your-pass]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres` | Supabase **Direct Connection** URL (Port 5432) |
   | **`VITE_SUPABASE_URL`** (or `NEXT_PUBLIC_SUPABASE_URL`) | `https://iqlzfuoftervcvrgxzvx.supabase.co` | Supabase REST API URL |
   | **`VITE_SUPABASE_ANON_KEY`** (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) | `eyJhbGciOiJIUzI1...` | Supabase Anon Public Key |

5. Click **Deploy**.

---

## 5. Supabase Database Schema Setup

If you need a table to store your portfolio settings, execute the following SQL in your Supabase dashboard:

1. Click the **"SQL Editor"** icon in the sidebar.
2. Create a new query and execute this script to build the schema:

```sql
-- Create the portfolio configuration table
create table public.portfolio_config (
  id integer primary key default 1,
  site_data jsonb not null,
  social_links jsonb not null,
  client_logos jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint single_row check (id = 1) -- Enforce only a single config row
);

-- Enable Row Level Security (RLS)
alter table public.portfolio_config enable row level security;

-- Create a policy allowing anyone to read the portfolio data
create policy "Allow public read access" 
  on public.portfolio_config 
  for select 
  using (true);

-- Create a policy allowing only authenticated admins to modify the portfolio data
create policy "Allow admin write access" 
  on public.portfolio_config 
  for all 
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Insert default placeholder data
insert into public.portfolio_config (id, site_data, social_links, client_logos)
values (
  1,
  '{
    "navbar_logo": "RAFI",
    "nav_home": "Home",
    "nav_services": "Services",
    "nav_portfolio": "Portfolio",
    "nav_experience": "Experience",
    "nav_about": "About me",
    "nav_cta_text": "Get In Touch",
    "nav_cta_url": "https://wa.me/6281336191660",
    "theme_accent": "#bd3636"
  }'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb
)
on conflict (id) do nothing;
```
3. Click **"Run"** to execute.

---

## 6. Accessing Supabase in Code

Install the Supabase JS library locally:
```bash
npm install @supabase/supabase-js
```

### Step 4: Code Implementation Structure

The project uses a local-first cache strategy with background synchronization to connect to Supabase:

#### A. Supabase Client ([src/supabase.js](file:///Users/flo/portfolio_dummy/src/supabase.js))
Loads credentials from environmental variables and instantiates the client safely (returns `null` in case credentials are not configured):
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
```

#### B. Synchronization Engine ([src/localCms.js](file:///Users/flo/portfolio_dummy/src/localCms.js))
Provides background sync-down routines and automatically updates the Supabase table on dashboard save actions:
```javascript
  async saveData(data) {
    // 1. Updates LocalStorage Cache
    // 2. Triggers dynamic CSS accents
    // 3. Writes directly to Supabase if client is initialized:
    if (supabase && data.siteData) {
      try {
        await supabase
          .from('portfolio_config')
          .update({
            site_data: data.siteData,
            social_links: data.socialLinks || [],
            client_logos: data.clientLogos || [],
            updated_at: new Date()
          })
          .eq('id', 1);
      } catch (err) {
        console.error('Supabase write error:', err);
      }
    }
  },

  async syncFromSupabase(callback) {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('portfolio_config')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error syncing from Supabase:', error);
        return;
      }

      if (data) {
        // Sync cache and execute callbacks
        localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data.site_data));
        localStorage.setItem(SOCIAL_LINKS_KEY, JSON.stringify(data.social_links));
        localStorage.setItem(CLIENT_LOGOS_KEY, JSON.stringify(data.client_logos));
        
        if (data.site_data && data.site_data.theme_accent) {
          applyThemeColor(data.site_data.theme_accent);
        }

        if (callback) {
          callback({
            siteData: data.site_data,
            socialLinks: data.social_links,
            clientLogos: data.client_logos
          });
        }
      }
    } catch (err) {
      console.error('Failed to sync from Supabase:', err);
    }
  }
```

