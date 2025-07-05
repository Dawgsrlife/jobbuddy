"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const { user, isLoaded } = useUser()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus("idle")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)

    // Simulate file processing
    setTimeout(() => {
      // Mock extracted keywords
      const mockKeywords = [
        "JavaScript",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "Software Engineering",
        "Frontend Development",
        "API Development",
        "Database Design",
        "Agile Methodology",
      ]

      setKeywords(mockKeywords)
      setUploadStatus("success")
      setUploading(false)
    }, 2000)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type === "text/plain")) {
      setFile(droppedFile)
      setUploadStatus("idle")
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to upload your resume</h1>
          <p className="text-gray-400">You need to be authenticated to use this feature.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📄 Upload Your Resume</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your resume to extract key skills and get personalized job matches
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Area */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                file ? "border-green-400 bg-green-400/10" : "border-white/20 hover:border-white/40"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="font-semibold text-white">{file.name}</p>
                    <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-white mb-2">Drop your resume here or click to browse</p>
                  <p className="text-gray-400">Supports PDF and TXT files up to 10MB</p>
                </div>
              )}

              <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" id="resume-upload" />
              <label
                htmlFor="resume-upload"
                className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Choose File
              </label>
            </div>

            {/* Upload Button */}
            {file && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Processing..." : "Parse Resume"}
                </button>
              </div>
            )}
          </div>

          {/* Upload Status */}
          {uploadStatus === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-400">Resume processed successfully!</span>
              </div>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Error processing resume. Please try again.</span>
              </div>
            </div>
          )}

          {/* Extracted Keywords */}
          {keywords.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">🎯 Extracted Skills & Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <a href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Go to Dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
