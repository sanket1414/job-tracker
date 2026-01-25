# Job Application Tracker

A responsive full-stack job application tracker web app built with Next.js, TypeScript, Tailwind CSS, and Supabase for tracking job applications in the Japan/Tokyo market.

## Features

- Track job applications with detailed information
- View summary statistics (Total, Applied, Interviewing, Offers)
- Add, edit, and delete job applications
- Responsive design for mobile, tablet, and desktop
- Japan/Tokyo market specific features (currency formatting, location support)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the database migration:
   - In your Supabase dashboard, go to SQL Editor
   - Copy and run the SQL from `supabase/migrations/001_create_job_applications.sql`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a service (PostgreSQL database)
- **Lucide React** - Icon library
