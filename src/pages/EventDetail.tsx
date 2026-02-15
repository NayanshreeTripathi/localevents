import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';
import { useState } from 'react';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();
  const [showRSVPForm, setShowRSVPForm] = useState(false);

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to events
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to events
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8 sm:px-8 sm:py-12">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
            {event.type}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {event.title}
          </h1>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-start">
              <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium text-gray-900">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Host</p>
                <p className="font-medium text-gray-900">{event.host}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this event</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowRSVPForm(true)}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              RSVP for this event
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse more events
            </button>
          </div>
        </div>
      </div>

      {showRSVPForm && (
        <RSVPModal
          eventId={event.id}
          eventTitle={event.title}
          onClose={() => setShowRSVPForm(false)}
        />
      )}
    </div>
  );
}

function RSVPModal({
  eventId,
  eventTitle,
  onClose,
}: {
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { createRSVP } = useEvents();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await createRSVP({
        event_id: eventId,
        user_name: name.trim(),
        user_email: email.trim(),
      });

      navigate(`/rsvp-success?event=${encodeURIComponent(eventTitle)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit RSVP');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">RSVP for Event</h2>
        <p className="text-gray-600 mb-6">Reserve your spot for this amazing event!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Confirm RSVP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
