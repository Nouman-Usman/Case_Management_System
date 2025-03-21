import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const metadata: { onboardingComplete?: boolean; role?: string } = session.sessionClaims?.metadata || {};  

  
  // Only redirect if onboarding is complete
  if (metadata.onboardingComplete === true && metadata.role) {
    redirect(`/${metadata.role}/dashboard`);
  }

  return <>{children}</>
}