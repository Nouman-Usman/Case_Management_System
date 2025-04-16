"use server"
import getUserId from "../../utils/userId";
import { createClerkClient } from '@clerk/nextjs/server'
import { clerkClient } from "@clerk/nextjs/server";
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

interface CalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  timeZone: string;
  attendees: { email: string }[];
}
interface CalendarEventResponse {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  status: string;
}

export async function getUserDetailsByUserId() {
  const userId = await getUserId();
  // const response = await clerkClient.users.getUser(userId)
  // const userDetails = await response.json();
  // console.log(userDetails);
  // return userDetails;

  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

  const client = clerkClient

  if (!userId) {
    throw new Error("User ID is null or undefined");
  }

  const userList = await client.users.getUserOauthAccessToken(userId, "google");
  if (!userList) {
    throw new Error("User not authorized to access this resource");
  }
  // console.log(userList.data);        
  const data = userList.data;

  // console.log(data);
}


// Function to add an event to Google Calendar, Example usage:
// addEventToCalendars({
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
// Note down the first one is the sender and the second one is the receiver
// and the receiver will get the email notification of the event.
export async function addEventToCalendars(eventDetails: CalendarEvent) {
  const userId = await getUserId();
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  if (!userId) {
    throw new Error("User ID is null or undefined");
  }

  // Get Google OAuth tokens for the current user
  const userTokens = await clerkClient.users.getUserOauthAccessToken(userId, "google");
  if (!userTokens?.data?.length) {
    throw new Error("No Google OAuth tokens found");
  }

  const accessToken = userTokens.data[0].token;
  console.log("Access Token is: ", accessToken);
  // Create the calendar event object
  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    location: eventDetails.location,
    start: {
      dateTime: eventDetails.startDateTime,
      timeZone: eventDetails.timeZone,
    },
    end: {
      dateTime: eventDetails.endDateTime,
      timeZone: eventDetails.timeZone,
    },
    attendees: eventDetails.attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    // Create Google Calendar API client
    const oAuth2Client = new OAuth2Client();
    oAuth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    // Insert event to primary calendar
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // This will send email notifications to attendees
    });

    return {
      success: true,
      eventLink: response.data.htmlLink,
      eventId: response.data.id
    };

  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
}



// Function to get available time slots for a specific date
// Example usage: getAvailableTimeByDate('2025-04-19')
export async function getAvailableTimeByDate(date: string) {
  const userId = await getUserId();
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  if (!userId) {
    throw new Error("User ID is null or undefined");
  }

  // Get Google OAuth tokens for the current user
  const userTokens = await clerkClient.users.getUserOauthAccessToken(userId, "google");
  if (!userTokens?.data?.length) {
    throw new Error("No Google OAuth tokens found");
  }

  const accessToken = userTokens.data[0].token;
  console.log("Access Token is: ", accessToken);


  // Create Google Calendar API client
  const oAuth2Client = new OAuth2Client();
  oAuth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    // Get the list of events for the specified date
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: `${date}T00:00:00Z`,
      timeMax: `${date}T23:59:59Z`,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    // json the events
    const formattedEvents: CalendarEventResponse[] = events?.map(event => ({
      id: event.id || '',
      summary: event.summary || '',
      start: {
        dateTime: event.start?.dateTime || '',
        timeZone: event.start?.timeZone || '',
      },
      end: {
        dateTime: event.end?.dateTime || '',
        timeZone: event.end?.timeZone || '',
      },
      status: event.status || '',
    })) || [];

    return {
      success: true,
      data: formattedEvents,
      count: formattedEvents.length,
      date: date
    };
    console.log('Events:', JSON.stringify(events, null, 2));
    // return JSON.stringify(events, null, 2);
    
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}