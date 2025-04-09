import { Session } from '@/types';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  attendees?: string[];
  videoLink?: string;
}

class CalendarService {
  private readonly GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
  private readonly OUTLOOK_CALENDAR_API = 'https://graph.microsoft.com/v1.0/me/calendar';

  async addToGoogleCalendar(session: Session, accessToken: string) {
    try {
      const event = this.sessionToCalendarEvent(session);
      
      const response = await fetch(`${this.GOOGLE_CALENDAR_API}/calendars/primary/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: event.title,
          description: event.description,
          start: {
            dateTime: event.start,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: event.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          attendees: event.attendees?.map(email => ({ email })),
          conferenceData: event.videoLink ? {
            createRequest: {
              requestId: session.id,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          } : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add event to Google Calendar');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding to Google Calendar:', error);
      throw error;
    }
  }

  async addToOutlookCalendar(session: Session, accessToken: string) {
    try {
      const event = this.sessionToCalendarEvent(session);
      
      const response = await fetch(`${this.OUTLOOK_CALENDAR_API}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: event.title,
          body: {
            contentType: 'HTML',
            content: event.description,
          },
          start: {
            dateTime: event.start,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: event.end,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          attendees: event.attendees?.map(email => ({
            emailAddress: { address: email },
            type: 'required',
          })),
          isOnlineMeeting: !!event.videoLink,
          onlineMeetingProvider: 'teamsForBusiness',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add event to Outlook Calendar');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding to Outlook Calendar:', error);
      throw error;
    }
  }

  async addToICalendar(session: Session): Promise<string> {
    try {
      const event = this.sessionToCalendarEvent(session);
      
      // Generate iCal format
      const icalContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SoulSeer//Calendar Service//EN',
        'BEGIN:VEVENT',
        `UID:${event.id}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${new Date(event.start).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTEND:${new Date(event.end).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `SUMMARY:${event.title}`,
        event.description ? `DESCRIPTION:${event.description}` : '',
        event.location ? `LOCATION:${event.location}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
      ].filter(Boolean).join('\r\n');

      // Create blob and download link
      const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `session-${session.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return icalContent;
    } catch (error) {
      console.error('Error generating iCal file:', error);
      throw error;
    }
  }

  private sessionToCalendarEvent(session: Session): CalendarEvent {
    return {
      id: session.id,
      title: `Psychic Reading Session with ${session.readerId}`,
      start: session.startTime,
      end: session.endTime || new Date(new Date(session.startTime).getTime() + 3600000).toISOString(),
      description: `
        Session Type: ${session.type}
        Duration: ${session.duration || 60} minutes
        
        Join URL: ${session.type === 'video' ? 'Video link will be provided before the session' : 'N/A'}
        
        Notes: ${session.notes || 'No additional notes'}
      `.trim(),
      attendees: [session.userId], // Add reader's email if available
      videoLink: session.type === 'video' ? 'Video link will be provided' : undefined,
    };
  }

  async getUpcomingSessions(userId: string, startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/sessions/upcoming?userId=${userId}&start=${startDate}&end=${endDate}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch upcoming sessions');
      }

      const sessions = await response.json();
      return sessions;
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
      throw error;
    }
  }

  async syncCalendars(userId: string, calendarIds: string[]) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/calendar-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calendarIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync calendars');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error syncing calendars:', error);
      throw error;
    }
  }
}

export const calendarService = new CalendarService(); 