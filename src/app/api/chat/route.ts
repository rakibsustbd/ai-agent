import { streamText, tool, stepCountIs, zodSchema, convertToModelMessages } from 'ai';
import { google as googleAI } from '@ai-sdk/google';
import { z } from 'zod';
import { google } from 'googleapis';

export async function POST(req: Request) {
  const { messages, providerToken, email, agentName, agentId } = await req.json();

  console.log("Chat Request Received:", { 
    messageCount: messages?.length, 
    agentId,
    agentName,
    hasProviderToken: !!providerToken,
    email,
    hasGeminiKey: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY 
  });

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("CRITICAL: GOOGLE_GENERATIVE_AI_API_KEY is missing from environment variables.");
  }

  // SDK v6: messages arrive as UIMessage[] with parts arrays.
  // Strip the initial assistant greeting (no tool history in it) to keep the
  // first user message first, which is required by most model APIs.
  const filteredMessages = (messages || []).filter(
    (m: any, i: number) => !(i === 0 && m.role === 'assistant')
  );

  // Initialize Google OAuth client if token is provided
  const oauth2Client = new google.auth.OAuth2();
  if (providerToken) {
    oauth2Client.setCredentials({ access_token: providerToken });
  }

  const result = streamText({
    model: googleAI('gemini-2.5-flash'),
    system: `You are the ${agentName || 'Executive Assistant'} AI Agent. Your role is ${agentId || 'Operations'}. 
    Manage emails, schedule meetings, and help organize the user's day based on your specific expertise.
    The user's email address is: ${email || 'Unknown'}.
    You have access to tools to read emails, send emails, and check calendar availability.
    Always be professional, concise, and helpful. 
    Current date/time: ${new Date().toISOString()}`,
    messages: await convertToModelMessages(filteredMessages),
    stopWhen: stepCountIs(5),
    tools: {
      readEmails: tool({
        description: 'Read the latest unread emails from the user\'s Gmail inbox. Always use this to check for new messages.',
        inputSchema: zodSchema(z.object({
          maxResults: z.number().optional().describe('Maximum number of emails to return')
        })),
        execute: async ({ maxResults = 5 }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Gmail. Ask the user to connect their account.' };
          
          try {
             const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
             const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread', maxResults });
             
             if (!res.data.messages || res.data.messages.length === 0) {
               return { emails: [] };
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
        inputSchema: zodSchema(z.object({
          to: z.string().email().describe('Recipient email address'),
          subject: z.string().describe('Email subject'),
          body: z.string().describe('Email body (HTML supported)')
        })),
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
        inputSchema: zodSchema(z.object({
          timeMin: z.string().optional().describe('ISO string format for the start time'),
          maxResults: z.number().optional().describe('Maximum number of events to return')
        })),
        execute: async ({ timeMin, maxResults = 5 }): Promise<any> => {
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
        inputSchema: zodSchema(z.object({
          summary: z.string().describe('Title of the meeting'),
          description: z.string().optional().describe('Optional description'),
          startTime: z.string().describe('ISO string format for start time'),
          endTime: z.string().describe('ISO string format for end time'),
          attendeeEmails: z.array(z.string().email()).optional().describe('List of attendee emails')
        })),
        execute: async ({ summary, description, startTime, endTime, attendeeEmails }): Promise<any> => {
          if (!providerToken) return { error: 'Not connected to Google Calendar.' };
          
          try {
             const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
             const event = {
               summary,
               description,
               start: { dateTime: startTime, timeZone: 'UTC' }, 
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
      }),
      createAgentTask: tool({
        description: 'Record a new mission or task in the dashboard when the user asks you to perform an action. Call this to formally log the task before executing it.',
        inputSchema: zodSchema(z.object({
          title: z.string().describe('Title of the mission/task'),
          priority: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('Priority of the task')
        })),
        execute: async ({ title, priority }): Promise<any> => {
          return { success: true, title, priority };
        }
      })
    }
  });

  return result.toUIMessageStreamResponse();
}

