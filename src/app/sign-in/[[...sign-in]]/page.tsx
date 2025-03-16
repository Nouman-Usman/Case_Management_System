import { SignIn } from '@clerk/nextjs'
import { Background } from '@/components/ui/background'

export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center">
      <Background />
      <div className="w-full max-w-[400px] mx-auto p-4">
        <SignIn 
        fallbackRedirectUrl={'/sign-in'}
        forceRedirectUrl={'/onboarding'}
        />
      </div>
    </main>
  )
}