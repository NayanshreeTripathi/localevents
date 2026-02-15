import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, Sparkles, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  host: string;
  type: string;
}

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
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      <div className="relative h-full bg-linear-to-br from-white via-teal-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-200/50 hover:border-amber-300 hover:scale-105">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-400 via-teal-400 to-blue-500"></div>

        <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-amber-100 to-transparent rounded-full -mr-20 -mt-20 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-yellow-100 to-transparent rounded-full -ml-16 -mb-16 opacity-30"></div>

        <div className="relative p-6 h-full flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:bg-linear-to-r group-hover:from-amber-600 group-hover:to-yellow-600 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2 flex-1">
              {event.title}
            </h3>
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${
                typeColors[event.type] || 'bg-amber-100 text-amber-800'
              } shadow-sm`}
            >
              {event.type}
            </span>
          </div>

          <div className="w-12 h-0.5 bg-linear-to-r from-amber-400 to-yellow-400 mb-4"></div>

          <p className="text-gray-700 text-sm mb-5 line-clamp-2 grow leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <Calendar className="w-4 h-4 mr-3 shrink-0 text-amber-500" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700 font-medium">
              <MapPin className="w-4 h-4 mr-3 shrink-0 text-amber-500" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700 font-medium">
              <User className="w-4 h-4 mr-3 shrink-0 text-amber-500" />
              <span>{event.host}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-amber-200/50">
            <Link
              to={`/event/${event.id}`}
              className="flex-1 px-4 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
