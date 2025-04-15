// Make a simple appointments page that shows a list of appointments
// and allows the user to create a new appointment
// and view the details of an existing appointment
// and edit the details of an existing appointment


import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {addEventToCalendars, getAvailableTimeByDate}  from '@/lib/appointments/appointment'



export default async function AppointmentsPage() {
    // const { userId } = await auth()
    // // const userId = await getUserId();   
    // if (!userId) {
    //     redirect('/sign-in')
    // }
    // const res = await addEventToCalendars({
    //     summary: 'Testing the Google Calendar API',
    //     description: 'Discussion about project requirements',
    //     location: 'Virtual Meeting',
    //     startDateTime: '2025-04-19T10:00:00Z',
    //     endDateTime: '2025-04-19T11:00:00Z',
    //     timeZone: 'UTC',
    //     attendees: [
    //       { email: 'noumanusman.uet@gmail.com' },
    //       { email: 'noumanmughal0123@gmail.com' }
    //     ]
    // });
    // console.log(res);

    const res = await getAvailableTimeByDate('2025-04-19')
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Appointments</h1>
            <p className="mt-4 text-lg">The available time zones are, {JSON.stringify(res)}</p>
        </div>
    )
}
