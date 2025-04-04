import React from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function AdminDashboard() {
  const { userId } = await auth()
  console.log("User Id without slice", userId)
  const Id = userId?.slice(16,userId.length) 
  const user = await currentUser()
    return <p className='flex flex-col items-center justify-center m-10 col-span-2'>
      This is the protected lawyer dashboard restricted to users with the `{Id}` and details.</p>
}