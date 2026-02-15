import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, type Event, type RSVP } from '../lib/superbase';

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  getEventById: (id: string) => Event | undefined;
  createEvent: (event: Omit<Event, 'id' | 'created_at'>) => Promise<void>;
  createRSVP: (rsvp: Omit<RSVP, 'id' | 'created_at'>) => Promise<void>;
  getRSVPsForEvent: (eventId: string) => Promise<RSVP[]>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('events')
        .insert([eventData]);

      if (insertError) throw insertError;

      await fetchEvents();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  const createRSVP = async (rsvpData: Omit<RSVP, 'id' | 'created_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('rsvps')
        .insert([rsvpData]);

      if (insertError) throw insertError;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create RSVP');
    }
  };

  const getRSVPsForEvent = async (eventId: string): Promise<RSVP[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('rsvps')
        .select('*')
        .eq('event_id', eventId);

      if (fetchError) throw fetchError;

      return data || [];
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        getEventById,
        createEvent,
        createRSVP,
        getRSVPsForEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
