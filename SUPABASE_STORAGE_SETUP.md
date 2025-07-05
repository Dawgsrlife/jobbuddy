# Supabase Storage Setup for Resume Files

This guide explains how to set up Supabase storage for handling resume uploads and downloads in JobBuddy.

## Prerequisites

1. A Supabase project created at [supabase.com](https://supabase.com)
2. Environment variables configured in your `.env.local` file:
   ```
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## Automatic Setup

Run the setup script to create the storage bucket:

```bash
node scripts/setup-supabase-storage.js
```

## Manual Setup

If you prefer to set up manually, follow these steps:

### 1. Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** > **Buckets**
3. Click **Create bucket**
4. Configure the bucket:
   - **Name**: `resumes`
   - **Public**: `false` (private bucket for security)
   - **File size limit**: `10MB`
   - **Allowed MIME types**: 
     - `application/pdf`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### 2. Set Up Row Level Security (RLS) Policies

1. Go to **Storage** > **Policies**
2. Select the `resumes` bucket
3. Create the following policies:

#### INSERT Policy
- **Name**: Users can upload their own resumes
- **Command**: INSERT
- **Definition**: `auth.uid()::text = (storage.foldername(name))[1]`

#### SELECT Policy
- **Name**: Users can view their own resumes
- **Command**: SELECT
- **Definition**: `auth.uid()::text = (storage.foldername(name))[1]`

#### UPDATE Policy
- **Name**: Users can update their own resumes
- **Command**: UPDATE
- **Definition**: `auth.uid()::text = (storage.foldername(name))[1]`

#### DELETE Policy
- **Name**: Users can delete their own resumes
- **Command**: DELETE
- **Definition**: `auth.uid()::text = (storage.foldername(name))[1]`

## How It Works

### File Organization
Files are stored in the following structure:
```
resumes/
├── user-id-1/
│   └── user-id-1-timestamp.pdf
├── user-id-2/
│   └── user-id-2-timestamp.docx
└── ...
```

### Security
- Each user can only access files in their own folder (user-id)
- Files are stored in a private bucket (not publicly accessible)
- RLS policies ensure users can only access their own files
- File type validation prevents uploading of non-resume files

### API Endpoints

The following API endpoints are available:

#### Upload Resume
```
POST /api/resume/upload
Content-Type: multipart/form-data

Body: FormData with 'file' field
```

#### Download Resume
```
GET /api/resume/download
```

### Frontend Integration

Resume upload and download functionality is integrated into:

1. **Onboarding Form** (`/onboarding`) - Step 3
2. **Profile Page** (`/profile`) - Resume section
3. **Dashboard** (`/dashboard`) - User dropdown menu

## File Types Supported

- **PDF**: `.pdf` files
- **Microsoft Word**: `.doc` and `.docx` files
- **Maximum size**: 10MB per file

## Troubleshooting

### Common Issues

1. **"Unauthorized" errors**: Check that your Supabase environment variables are correct
2. **"Bucket does not exist"**: Run the setup script or create the bucket manually
3. **Upload failures**: Check file size (max 10MB) and file type restrictions
4. **Download failures**: Ensure the user has a resume uploaded

### Environment Variables

Make sure these are set in your `.env.local` file:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase dashboard under **Settings** > **API**.

## Testing

To test the integration:

1. Sign up for a new account
2. Complete the onboarding process and upload a resume
3. Go to your profile page and verify the resume shows as uploaded
4. Click the download button to test the download functionality
5. Try uploading a different resume to test the replacement functionality 