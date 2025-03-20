import { auth, currentUser } from '@clerk/nextjs/server'
import DashboardContent from './dashboard-content'

export default async function AdminDashboard() {
  const { userId } = await auth()
  const Id = userId?.slice(16,userId.length) 
  const user = await currentUser()

  return <DashboardContent userId={Id} userName={user?.firstName || ''} />
}