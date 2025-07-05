import { createClient } from '@supabase/supabase-js'

export const RESUME_BUCKET = 'resumes'

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local file.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export interface DownloadResult {
  success: boolean
  blob?: Blob
  error?: string
}

/**
 * Upload resume file to Supabase storage
 */
export async function uploadResume(
  file: File,
  userId: string
): Promise<UploadResult> {
  try {
    const supabase = getSupabaseClient()
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(RESUME_BUCKET)
      .getPublicUrl(filePath)

    return {
      success: true,
      url: urlData.publicUrl
    }
  } catch (error: any) {
    console.error('Upload exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Download resume file from Supabase storage
 */
export async function downloadResume(
  resumeUrl: string
): Promise<DownloadResult> {
  try {
    const supabase = getSupabaseClient()
    
    // Extract file path from URL
    const url = new URL(resumeUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.indexOf(RESUME_BUCKET)
    
    if (bucketIndex === -1) {
      return { success: false, error: 'Invalid resume URL' }
    }

    const filePath = pathParts.slice(bucketIndex + 1).join('/')

    // Download file from Supabase storage
    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .download(filePath)

    if (error) {
      console.error('Download error:', error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      blob: data
    }
  } catch (error: any) {
    console.error('Download exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete resume file from Supabase storage
 */
export async function deleteResume(
  resumeUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseClient()
    
    // Extract file path from URL
    const url = new URL(resumeUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.indexOf(RESUME_BUCKET)
    
    if (bucketIndex === -1) {
      return { success: false, error: 'Invalid resume URL' }
    }

    const filePath = pathParts.slice(bucketIndex + 1).join('/')

    // Delete file from Supabase storage
    const { error } = await supabase.storage
      .from(RESUME_BUCKET)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Delete exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get file info from resume URL
 */
export function getResumeFileInfo(resumeUrl: string): { fileName: string; fileExt: string } | null {
  try {
    const url = new URL(resumeUrl)
    const pathParts = url.pathname.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const fileExt = fileName.split('.').pop() || ''
    
    return { fileName, fileExt }
  } catch (error) {
    console.error('Error parsing resume URL:', error)
    return null
  }
} 