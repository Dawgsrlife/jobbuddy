/**
 * Setup script to create Supabase storage bucket for resumes
 * Run this script after setting up your Supabase project
 */

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('- SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_KEY (or SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  try {
    console.log('Setting up Supabase storage...')

    // Create the resumes bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('resumes', {
      public: false, // Private bucket for security
      allowedMimeTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      fileSizeLimit: 10 * 1024 * 1024, // 10MB limit
    })

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✓ Storage bucket "resumes" already exists')
      } else {
        console.error('Error creating bucket:', bucketError)
        return
      }
    } else {
      console.log('✓ Created storage bucket "resumes"')
    }

    // Set up RLS (Row Level Security) policies
    console.log('Setting up storage policies...')

    // Policy: Users can upload their own resumes
    const uploadPolicy = {
      name: 'Users can upload their own resumes',
      definition: `auth.uid()::text = (storage.foldername(name))[1]`,
      check: `auth.uid()::text = (storage.foldername(name))[1]`,
      command: 'INSERT'
    }

    // Policy: Users can view their own resumes
    const selectPolicy = {
      name: 'Users can view their own resumes',
      definition: `auth.uid()::text = (storage.foldername(name))[1]`,
      check: `auth.uid()::text = (storage.foldername(name))[1]`,
      command: 'SELECT'
    }

    // Policy: Users can update their own resumes
    const updatePolicy = {
      name: 'Users can update their own resumes',
      definition: `auth.uid()::text = (storage.foldername(name))[1]`,
      check: `auth.uid()::text = (storage.foldername(name))[1]`,
      command: 'UPDATE'
    }

    // Policy: Users can delete their own resumes
    const deletePolicy = {
      name: 'Users can delete their own resumes',
      definition: `auth.uid()::text = (storage.foldername(name))[1]`,
      check: `auth.uid()::text = (storage.foldername(name))[1]`,
      command: 'DELETE'
    }

    console.log('✓ Storage setup completed!')
    console.log('')
    console.log('NOTE: You may need to manually set up RLS policies in your Supabase dashboard:')
    console.log('1. Go to Storage > Policies in your Supabase dashboard')
    console.log('2. Create policies for the "resumes" bucket with the following rules:')
    console.log('   - INSERT: auth.uid()::text = (storage.foldername(name))[1]')
    console.log('   - SELECT: auth.uid()::text = (storage.foldername(name))[1]')
    console.log('   - UPDATE: auth.uid()::text = (storage.foldername(name))[1]')
    console.log('   - DELETE: auth.uid()::text = (storage.foldername(name))[1]')
    console.log('')
    console.log('This ensures users can only access their own resume files.')

  } catch (error) {
    console.error('Error setting up storage:', error)
    process.exit(1)
  }
}

// Run the setup
setupStorage() 