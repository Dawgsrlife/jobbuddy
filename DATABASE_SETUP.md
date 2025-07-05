# Database Setup Guide

## Prerequisites

1. **Supabase Account**: You'll need a Supabase account and project
2. **Environment Variables**: Set up your environment variables

## Setup Steps

### 1. Environment Variables

Copy `env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
```

Required variables:
- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Clerk dashboard
- `CLERK_SECRET_KEY`: From Clerk dashboard
- `SUPABASE_URL`: From Supabase dashboard
- `SUPABASE_ANON_KEY`: From Supabase dashboard

### 2. Database Migration

Run the following commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# (Optional) View your database
npx prisma studio
```

### 3. Verify Setup

1. Start your development server: `npm run dev`
2. Sign up with Clerk
3. Complete the onboarding process
4. Check your Supabase dashboard to see the data

## Database Schema

The application includes the following tables:

- **user_profiles**: User profile information
- **user_skills**: User skills (many-to-many)
- **user_companies**: Preferred companies (many-to-many)
- **applications**: Job applications
- **emails**: Email outreach tracking
- **jobs**: Job listings
- **contacts**: Hiring manager contacts
- **email_templates**: Email templates
- **analytics**: Performance tracking

## Troubleshooting

### Common Issues

1. **Prisma Client not found**: Run `npx prisma generate`
2. **Database connection failed**: Check your `DATABASE_URL`
3. **Migration failed**: Check your database permissions

### Getting Help

- Check the Prisma documentation: https://pris.ly/docs
- Check the Supabase documentation: https://supabase.com/docs 