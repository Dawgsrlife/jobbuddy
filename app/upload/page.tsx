"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Upload Your Resume</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume to extract key skills and get personalized job matches
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="bg-white rounded-full shadow-lg px-6 py-3">
            <div className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Job Feed
              </a>
              <a href="/upload" className="text-blue-600 font-semibold">
                Upload Resume
              </a>
              <a href="/apply" className="text-gray-600 hover:text-blue-600 transition-colors">
                Quick Apply
              </a>
            </div>
          </nav>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-blue-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">{file.name}</p>
                    <p className="text-sm text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">Drop your resume here or click to browse</p>
                  <p className="text-gray-500">Supports PDF and TXT files up to 10MB</p>
                </div>
              )}

              <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" id="resume-upload" />
              <label
                htmlFor="resume-upload"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Resume processed successfully!</span>
              </div>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Error processing resume. Please try again.</span>
              </div>
            </div>
          )}

          {/* Extracted Keywords */}
          {keywords.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Extracted Skills & Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Find Matching Jobs
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
