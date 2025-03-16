import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'

// Define route matchers
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])
const isHomeRoute = createRouteMatcher(['/'])
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
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next()
  }
  if (userId && isChmaberRoute(req) && metadata?.role !== 'chamber') {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }
  if (userId && isClientRoute(req) && metadata?.role !== 'client') {
  const onboardingUrl = new URL('/onboarding', req.url)
  return NextResponse.redirect(onboardingUrl)
  }
  if (userId && isAssistantRoute(req) && metadata?.role !== 'assistant') {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }
  if (userId && isLawyerRoute(req) && metadata?.role !== 'lawyer') {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }
  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req))
  {
    return redirectToSignIn({ returnBackUrl: req.url })
  }
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}