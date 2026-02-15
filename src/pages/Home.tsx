import { useState, useMemo } from 'react';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { Loader2, Sparkles } from 'lucide-react';

export default function Home() {
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const eventTypes = useMemo(() => {
    const types = new Set(events.map((event) => event.type));
    return Array.from(types).sort();
  }, [events]);

  const locations = useMemo(() => {
    const locs = new Set(events.map((event) => event.location));
    return Array.from(locs).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.host.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !selectedType || event.type === selectedType;
      const matchesLocation = !selectedLocation || event.location === selectedLocation;
      const matchesDate = !selectedDate || event.date === selectedDate;

      return matchesSearch && matchesType && matchesLocation && matchesDate;
    });
  }, [events, searchTerm, selectedType, selectedLocation, selectedDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-linear-to-b from-white to-gray-50">
        <div className="text-center animate-fadeIn">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeInUp">
        <div className="bg-linear-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6 text-red-800 shadow-lg backdrop-blur-sm">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-lg">Error loading events</p>
              <p className="text-sm mt-2 text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Explore</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 leading-tight">
            Discover Local Events
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl leading-relaxed">
            Find and join community events happening near you. Curated experiences, real connections.
          </p>
        </div>

        <div className="mb-12 animate-fadeInUp stagger-2">
          <FilterBar
            searchTerm={searchTerm}
            selectedType={selectedType}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            onSearchChange={setSearchTerm}
            onTypeChange={setSelectedType}
            onLocationChange={setSelectedLocation}
            onDateChange={setSelectedDate}
            eventTypes={eventTypes}
            locations={locations}
          />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 animate-fadeInUp stagger-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xl text-gray-600 mb-2 font-medium">No events found</p>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Try adjusting your filters or search criteria to discover more events.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedLocation('');
                setSelectedDate('');
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 animate-fadeInUp stagger-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700 font-medium">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-stagger"
                  style={{
                    animationDelay: `${Math.min(index * 0.1, 0.5)}s`,
                  }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
