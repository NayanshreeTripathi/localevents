import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  searchTerm: string;
  selectedType: string;
  selectedLocation: string;
  selectedDate: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  eventTypes: string[];
  locations: string[];
}

export default function FilterBar({
  searchTerm,
  selectedType,
  selectedLocation,
  selectedDate,
  onSearchChange,
  onTypeChange,
  onLocationChange,
  onDateChange,
  eventTypes,
  locations,
}: FilterBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const activeFiltersCount = [selectedType, selectedLocation, selectedDate].filter(Boolean).length;

  const clearAllFilters = () => {
    onTypeChange('');
    onLocationChange('');
    onDateChange('');
    onSearchChange('');
  };

  return (
    <div className="relative">
      <div className="bg-linear-to-r from-white via-blue-50/40 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-3 md:p-4 mb-6 border border-blue-100/40 backdrop-blur-sm animate-slideDown">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 group">
            <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-sm md:text-base font-bold text-gray-900 tracking-tight">Filter</h2>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 animate-slideIn"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
          <div className="relative group">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                isSearchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'
              }`}
            >
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 placeholder:text-gray-400 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 animate-fadeIn"
              >
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="relative group animate-fadeIn">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 appearance-none cursor-pointer text-sm ${
                selectedType ? 'border-blue-300 text-gray-900 font-medium' : 'border-gray-200 text-gray-600'
              }`}
            >
              <option value="">All Types</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  selectedType ? 'text-blue-500' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {selectedType && (
              <div className="absolute -top-2 -right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse text-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </div>

          <div className="relative group animate-fadeIn" style={{ animationDelay: '50ms' }}>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 appearance-none cursor-pointer text-sm ${
                selectedLocation ? 'border-blue-300 text-gray-900 font-medium' : 'border-gray-200 text-gray-600'
              }`}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  selectedLocation ? 'text-blue-500' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {selectedLocation && (
              <div className="absolute -top-2 -right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse text-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </div>

          <div className="relative group animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 cursor-pointer text-sm ${
                selectedDate ? 'border-blue-300 text-gray-900 font-medium' : 'border-gray-200 text-gray-600'
              }`}
            />
            {selectedDate && (
              <div className="absolute -top-2 -right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse text-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-3 pt-3 border-t border-blue-100/50">
            <div className="flex flex-wrap gap-1.5">
              {selectedType && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 animate-slideIn hover:scale-105 active:scale-95">
                  {selectedType}
                  <button
                    onClick={() => onTypeChange('')}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLocation && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 animate-slideIn hover:scale-105 active:scale-95" style={{ animationDelay: '50ms' }}>
                  {selectedLocation}
                  <button
                    onClick={() => onLocationChange('')}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDate && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 animate-slideIn hover:scale-105 active:scale-95" style={{ animationDelay: '100ms' }}>
                  {new Date(selectedDate).toLocaleDateString()}
                  <button
                    onClick={() => onDateChange('')}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 0.8;
        }

        select option {
          padding: 6px;
        }

        @media (max-width: 768px) {
          .grid {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
