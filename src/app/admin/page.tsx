import { auth, currentUser } from '@clerk/nextjs/server'

export default async function AdminDashboard() {
  const { userId } = await auth()
  const user = await currentUser()
    return <p>This is the protected admin dashboard restricted to users with the `{userId}` and details:.</p>
  }