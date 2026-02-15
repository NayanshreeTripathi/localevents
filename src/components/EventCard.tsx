import { Link } from 'react-router-dom';
import { Calendar, MapPin, User } from 'lucide-react';
import type { Event } from '../lib/superbase';

interface EventCardProps {
  event: Event;
}

const typeColors: Record<string, string> = {
  Workshop: 'bg-green-100 text-green-800',
  Music: 'bg-pink-100 text-pink-800',
  Sports: 'bg-orange-100 text-orange-800',
  Meetup: 'bg-blue-100 text-blue-800',
  Fitness: 'bg-teal-100 text-teal-800',
  Social: 'bg-yellow-100 text-yellow-800',
  Entertainment: 'bg-red-100 text-red-800',
};

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
              typeColors[event.type] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {event.type}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 shrink-0" />
            <span>{event.host}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
