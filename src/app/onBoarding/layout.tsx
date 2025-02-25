import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const metadata: { onboardingComplete?: boolean; role?: string } = session.sessionClaims?.metadata || {};
  // console.log(metadata);
  if (metadata.onboardingComplete === true && metadata.role === 'client') {
    redirect('/client/dashboard');
  }
  else if (metadata.onboardingComplete === true && metadata.role === 'chamber') {
    redirect('/chamber/dashboard');
  }
  return <>{children}</>
}