/**
 * Authentication Test Script
 * This script tests various authentication scenarios to ensure everything works correctly
 */

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔐 Testing Authentication Configuration...\n')

// Test 1: Check environment variables
console.log('1. Checking environment variables...')
const envPath = path.join(__dirname, '..', '.env.local')
const envExamplePath = path.join(__dirname, '..', 'env.example')

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists')
  const envContent = fs.readFileSync(envPath, 'utf8')
  
  const requiredVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ]
  
  const missingVars = requiredVars.filter(varName => !envContent.includes(varName))
  
  if (missingVars.length === 0) {
    console.log('✅ All required authentication environment variables are present')
  } else {
    console.log('❌ Missing environment variables:', missingVars)
    console.log('Please check your .env.local file and add the missing variables')
  }
} else {
  console.log('❌ .env.local file not found')
  console.log('Please copy env.example to .env.local and add your API keys')
}

// Test 2: Check middleware configuration
console.log('\n2. Checking middleware configuration...')
const middlewarePath = path.join(__dirname, '..', 'middleware.ts')
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8')
  
  if (middlewareContent.includes('clerkMiddleware')) {
    console.log('✅ Clerk middleware is properly configured')
  } else {
    console.log('❌ Clerk middleware not found in middleware.ts')
  }
  
  if (middlewareContent.includes('/(api|trpc)(.*)')) {
    console.log('✅ API routes are protected by middleware')
  } else {
    console.log('❌ API routes may not be properly protected')
  }
} else {
  console.log('❌ middleware.ts file not found')
}

// Test 3: Check API route authentication
console.log('\n3. Checking API route authentication...')
const apiRoutes = [
  'app/api/onboarding/route.ts',
  'app/api/resume/upload/route.ts',
  'app/api/resume/download/route.ts'
]

apiRoutes.forEach(routePath => {
  const fullPath = path.join(__dirname, '..', routePath)
  if (fs.existsSync(fullPath)) {
    const routeContent = fs.readFileSync(fullPath, 'utf8')
    
    if (routeContent.includes('auth()') && routeContent.includes('userId')) {
      console.log(`✅ ${routePath} - Authentication check present`)
    } else {
      console.log(`❌ ${routePath} - Missing authentication check`)
    }
    
    if (routeContent.includes('Unauthorized') && routeContent.includes('401')) {
      console.log(`✅ ${routePath} - Proper error handling for unauthorized access`)
    } else {
      console.log(`❌ ${routePath} - Missing unauthorized error handling`)
    }
  } else {
    console.log(`❌ ${routePath} - File not found`)
  }
})

// Test 4: Check protected pages
console.log('\n4. Checking protected pages...')
const protectedPages = [
  'app/dashboard/page.tsx',
  'app/onboarding/page.tsx',
  'app/profile/page.tsx'
]

protectedPages.forEach(pagePath => {
  const fullPath = path.join(__dirname, '..', pagePath)
  if (fs.existsSync(fullPath)) {
    const pageContent = fs.readFileSync(fullPath, 'utf8')
    
    if (pageContent.includes('useUser') && pageContent.includes('@clerk/nextjs')) {
      console.log(`✅ ${pagePath} - Uses Clerk authentication`)
    } else {
      console.log(`❌ ${pagePath} - Missing Clerk authentication`)
    }
    
    if (pageContent.includes('!user') && pageContent.includes('router.push')) {
      console.log(`✅ ${pagePath} - Has redirect for unauthenticated users`)
    } else {
      console.log(`❌ ${pagePath} - Missing redirect for unauthenticated users`)
    }
  } else {
    console.log(`❌ ${pagePath} - File not found`)
  }
})

// Test 5: Check onboarding redirect logic
console.log('\n5. Checking onboarding redirect logic...')
const onboardingRedirectPath = path.join(__dirname, '..', 'components', 'OnboardingRedirect.tsx')
if (fs.existsSync(onboardingRedirectPath)) {
  const redirectContent = fs.readFileSync(onboardingRedirectPath, 'utf8')
  
  if (redirectContent.includes('useUser') && redirectContent.includes('checkProfileCompletion')) {
    console.log('✅ OnboardingRedirect component properly checks user authentication')
  } else {
    console.log('❌ OnboardingRedirect component missing authentication checks')
  }
  
  if (redirectContent.includes('/api/onboarding')) {
    console.log('✅ OnboardingRedirect makes authenticated API calls')
  } else {
    console.log('❌ OnboardingRedirect missing API integration')
  }
} else {
  console.log('❌ OnboardingRedirect component not found')
}

// Test 6: Check layout authentication
console.log('\n6. Checking layout authentication...')
const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx')
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8')
  
  if (layoutContent.includes('ClerkProvider')) {
    console.log('✅ ClerkProvider is properly configured in layout')
  } else {
    console.log('❌ ClerkProvider missing in layout')
  }
  
  if (layoutContent.includes('OnboardingRedirect')) {
    console.log('✅ OnboardingRedirect is included in layout')
  } else {
    console.log('❌ OnboardingRedirect missing in layout')
  }
} else {
  console.log('❌ Layout file not found')
}

console.log('\n🔐 Authentication Test Complete!\n')

// Test 7: Check if development server is running
console.log('7. Checking if development server is accessible...')
const http = require('http')

const checkServer = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 5000
  }

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Development server is running on http://localhost:3000')
      console.log('🚀 You can now test authentication manually:')
      console.log('   1. Go to http://localhost:3000')
      console.log('   2. Try signing up/in')
      console.log('   3. Test the onboarding flow')
      console.log('   4. Upload a resume')
      console.log('   5. Test downloading from profile and dashboard')
    } else {
      console.log('❌ Development server returned status:', res.statusCode)
    }
  })

  req.on('error', (err) => {
    console.log('❌ Development server is not running')
    console.log('   Start it with: pnpm dev')
  })

  req.on('timeout', () => {
    console.log('❌ Development server request timed out')
    req.destroy()
  })

  req.end()
}

setTimeout(checkServer, 1000)

// Summary
console.log('\n📋 Authentication Summary:')
console.log('- All API routes should be protected with auth() checks')
console.log('- All protected pages should redirect unauthenticated users')
console.log('- OnboardingRedirect should handle user flow properly')
console.log('- Clerk middleware should protect all routes')
console.log('- Resume upload/download should require authentication')
console.log('\nIf any tests failed, please fix the issues before proceeding.') 