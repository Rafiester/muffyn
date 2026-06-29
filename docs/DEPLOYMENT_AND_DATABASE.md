# Deployment and Database Integration Guide

This guide provides a comprehensive walkthrough for deploying your portfolio to **Vercel** and configuring **Supabase** as the database to store and sync your dynamic CMS configurations.

---

## 1. Deploying to Vercel

Vercel is the recommended hosting platform for Vite-based static and dynamic frontends.

### Prerequisites
- A **GitHub**, **GitLab**, or **Bitbucket** account with your portfolio repository pushed to it.
- A free **Vercel** account.

### Step-by-Step Vercel Setup

1. **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your Git provider.
2. **Import New Project**:
   - Click the **"Add New"** button in the dashboard, then select **"Project"**.
   - Under **"Import Git Repository"**, find your portfolio repository and click **"Import"**.
3. **Configure Project Settings**:
   - Vercel automatically detects **Vite** as the framework.
   - **Build Command**: `npm run build` (or `vite build`).
   - **Output Directory**: `dist`.
   - **Install Command**: `npm install`.
4. **Configure Environment Variables**:
   - If you have any environment variables (e.g. Supabase keys), expand the **"Environment Variables"** dropdown and enter them (see the Supabase section below).
5. **Deploy**:
   - Click **"Deploy"**. Vercel will build your static bundle and deploy it to a live production URL in under a minute.

---

## 2. Supabase Database Setup

Supabase is an open-source Firebase alternative that provides a Postgres database with auto-generated REST APIs.

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and log in.
2. Click **"New Project"**.
3. Select your organization, enter a **Project Name** (e.g. `portfolio-cms`), set a secure **Database Password**, and choose a hosting region close to your target users.
4. Click **"Create new project"** and wait for the database provisioning to complete (takes 1-2 minutes).

### Step 2: Create the Database Schema
To transition your local storage-based CMS into a Supabase database, you can store configurations in a single-row configuration table or a key-value schema. 

For simplicity and flexibility, we recommend a single-row JSON configuration table:

1. In your Supabase dashboard, click the **"SQL Editor"** icon in the sidebar.
2. Click **"New Query"** and paste the following SQL script:

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
3. Click **"Run"** to execute the script. This creates your table, populates defaults, and secures it with Row Level Security (RLS).

---

## 3. Connecting Supabase to your Vercel Project

Once the database is ready, you need to configure your frontend application to read and write from Supabase instead of local storage.

### Step 1: Install Supabase Client
In your local workspace terminal, install the Supabase JS client helper:
```bash
npm install @supabase/supabase-js
```

### Step 2: Configure Environment Variables
1. Go to your **Supabase Project Settings** > **API**.
2. Copy the **Project API URL** and the **anon public key**.
3. Create a local `.env` file or update your existing one:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 3: Add Environment Variables in Vercel
1. Go to your Vercel Dashboard, select your project, and navigate to **Settings** > **Environment Variables**.
2. Add the two variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Click **"Save"**. Vercel will automatically inject these variables into subsequent production builds.

### Step 4: Update CMS Access Layer (Code Implementation)
To integrate your project code with Supabase, you can modify `src/localCms.js` to perform CRUD queries on your `portfolio_config` table:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchPortfolioFromDb() {
  const { data, error } = await supabase
    .from('portfolio_config')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching from Supabase:', error);
    return null;
  }
  return data;
}

export async function savePortfolioToDb(siteData, socialLinks, clientLogos) {
  const { data, error } = await supabase
    .from('portfolio_config')
    .update({
      site_data: siteData,
      social_links: socialLinks,
      client_logos: clientLogos,
      updated_at: new Date()
    })
    .eq('id', 1);

  if (error) {
    throw error;
  }
  return data;
}
```

---

## 4. Verification Check
- Test your build locally using `npm run build && npm run preview` to ensure Vite resolves Supabase imports correctly.
- Push your changes to Git. Vercel will auto-build the commit.
- Open your live website, update text or the accent color in the Settings panel, save, and confirm that updates persist in the Supabase database.
