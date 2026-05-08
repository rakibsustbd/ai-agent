import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { google } from 'googleapis';

export async function POST(req: Request) {
  const { messages, providerToken, email } = await req.json();

  // Initialize Google OAuth client if token is provided
  const oauth2Client = new google.auth.OAuth2();
  if (providerToken) {
    oauth2Client.setCredentials({ access_token: providerToken });
  }

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are an Executive Assistant AI Agent. You manage emails, schedule meetings, and help organize the user's day.
    The user's email address is: ${email || 'Unknown'}.
    You have access to tools to read emails, send emails, and check calendar availability.
    Always be professional, concise, and helpful.`,
    messages,
    tools: {
      readEmails: tool({
        description: 'Read the latest unread emails from the user\'s Gmail inbox. Always use this to check for new messages.',
        parameters: z.object({
          maxResults: z.number().optional().default(5),
        }),
        // @ts-ignore
        execute: async ({ maxResults }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Gmail. Ask the user to connect their account.' };
          
          try {
             const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
             const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread', maxResults });
             
             if (!res.data.messages || res.data.messages.length === 0) {
               return { messages: [] };
             }

             const emails = [];
             for (const message of res.data.messages) {
               const msg = await gmail.users.messages.get({ userId: 'me', id: message.id! });
               const headers = msg.data.payload?.headers;
               const subject = headers?.find((h) => h.name === 'Subject')?.value || 'No Subject';
               const from = headers?.find((h) => h.name === 'From')?.value || 'Unknown';
               const snippet = msg.data.snippet;
               emails.push({ id: message.id, subject, from, snippet });
             }
             return { emails };
          } catch (error: any) {
             console.error("Gmail Error:", error);
             return { error: 'Failed to fetch emails: ' + error.message };
          }
        },
      }),
      sendEmail: tool({
        description: 'Send an email to a recipient.',
        parameters: z.object({
          to: z.string().email(),
          subject: z.string(),
          body: z.string(),
        }),
        // @ts-ignore
        execute: async ({ to, subject, body }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Gmail.' };
          
          try {
             const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
             const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
             const messageParts = [
               `To: ${to}`,
               'Content-Type: text/html; charset=utf-8',
               'MIME-Version: 1.0',
               `Subject: ${utf8Subject}`,
               '',
               body,
             ];
             const message = messageParts.join('\n');
             const encodedMessage = Buffer.from(message)
               .toString('base64')
               .replace(/\+/g, '-')
               .replace(/\//g, '_')
               .replace(/=+$/, '');
               
             await gmail.users.messages.send({
               userId: 'me',
               requestBody: { raw: encodedMessage },
             });
             return { success: true, message: `Email sent to ${to}` };
          } catch (error: any) {
             console.error("Gmail Send Error:", error);
             return { error: 'Failed to send email: ' + error.message };
          }
        },
      }),
      checkCalendar: tool({
        description: 'Check upcoming calendar events for the user.',
        parameters: z.object({
          timeMin: z.string().describe('ISO string format for the start time, e.g. 2026-05-10T00:00:00Z').optional(),
          maxResults: z.number().optional().default(5),
        }),
        // @ts-ignore
        execute: async ({ timeMin, maxResults }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Google Calendar.' };
          
          try {
             const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
             const res = await calendar.events.list({
               calendarId: 'primary',
               timeMin: timeMin || new Date().toISOString(),
               maxResults,
               singleEvents: true,
               orderBy: 'startTime',
             });
             
             const events = res.data.items?.map(event => ({
               id: event.id,
               summary: event.summary,
               start: event.start?.dateTime || event.start?.date,
               end: event.end?.dateTime || event.end?.date,
             })) || [];
             
             return { events };
          } catch (error: any) {
             console.error("Calendar Error:", error);
             return { error: 'Failed to fetch calendar: ' + error.message };
          }
        },
      }),
      createMeeting: tool({
        description: 'Create a new meeting/event in Google Calendar.',
        parameters: z.object({
          summary: z.string(),
          description: z.string().optional(),
          startTime: z.string().describe('ISO string format for start time'),
          endTime: z.string().describe('ISO string format for end time'),
          attendeeEmails: z.array(z.string().email()).optional(),
        }),
        // @ts-ignore
        execute: async ({ summary, description, startTime, endTime, attendeeEmails }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Google Calendar.' };
          
          try {
             const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
             const event = {
               summary,
               description,
               start: { dateTime: startTime, timeZone: 'UTC' }, // Adjust timezone as needed
               end: { dateTime: endTime, timeZone: 'UTC' },
               attendees: attendeeEmails?.map((email: string) => ({ email })),
             };
             
             const res = await calendar.events.insert({
               calendarId: 'primary',
               requestBody: event,
               sendUpdates: 'all',
             });
             
             return { success: true, eventLink: res.data.htmlLink, eventId: res.data.id };
          } catch (error: any) {
             console.error("Calendar Insert Error:", error);
             return { error: 'Failed to create meeting: ' + error.message };
          }
        },
      })
    }
  });

  return result.toTextStreamResponse();
}
