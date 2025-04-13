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
    console.log("Access Token is: ",accessToken);
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
  
  // Example usage:

  