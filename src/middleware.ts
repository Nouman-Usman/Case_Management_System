import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'

// Define route matchers
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/'
])
const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isClientRoute = createRouteMatcher(['/client(.*)'])
const isChmaberRoute = createRouteMatcher(['/chamber(.*)'])
const isLawyerRoute = createRouteMatcher(['/lawyer(.*)'])
const isAssistantRoute = createRouteMatcher(['/assistant(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()
  const metadata: { onboardingComplete?: boolean; role?: string } = sessionClaims?.metadata || {};
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // Protect role-specific routes
  if (isClientRoute(req) && metadata?.role !== 'client') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  if (isChmaberRoute(req) && metadata?.role !== 'chamber') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  if (isLawyerRoute(req) && metadata?.role !== 'lawyer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  if (isAssistantRoute(req) && metadata?.role !== 'assistant') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  if (isAdminRoute(req) && metadata?.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  // Base onboarding route handling with role protection
  if (req.nextUrl.pathname === '/onboarding') {
    if (!userId) return redirectToSignIn({ returnBackUrl: req.url })
    if (metadata?.role === 'lawyer') {
      return NextResponse.redirect(new URL('/onboarding/lawyer', req.url))
    }
    if (metadata?.role === 'assistant') {
      return NextResponse.redirect(new URL('/onboarding/assistant', req.url))
    }
    

    if (metadata?.onboardingComplete) {
      return NextResponse.redirect(new URL(`/${metadata.role}/dashboard`, req.url))
    }
    // Only allow specific roles to access base onboarding
    // if (!['client', 'chamber', 'lawyer', 'assistant'].includes(metadata?.role || '')) {
    //   return NextResponse.redirect(new URL('/', req.url))
    // }
    return NextResponse.next()
  }

  // Protect specific onboarding routes
  if (req.nextUrl.pathname === '/onboarding/lawyer' && metadata?.role !== 'lawyer') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }
  if (req.nextUrl.pathname === '/onboarding/assistant' && metadata?.role !== 'assistant') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  // Handle completed users trying to access public routes
  if (userId && isPublicRoute(req) && metadata?.onboardingComplete) {
    return NextResponse.redirect(new URL(`/${metadata.role}/dashboard`, req.url))
  }

  // Handle unauthenticated users
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}