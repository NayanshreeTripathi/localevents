import { Link, Outlet } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <nav className="bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 sticky top-0 z-50 border-b border-gray-100 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-all duration-300 group"
            >
              <div className="relative">
                <Calendar className="w-6 h-6 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="relative">
                LocalEvents
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              to="/create"
              className="relative inline-flex items-center px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-sm sm:text-base overflow-hidden group hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="w-4 h-4 mr-2 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline relative z-10">Create Event</span>
              <span className="sm:hidden relative z-10">Create</span>
              <div className="absolute inset-0 z-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="animate-fadeIn">
        <Outlet />
      </main>

      <footer className="bg-linear-to-br from-white to-gray-50 border-t border-gray-200 mt-16 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-4 group cursor-default">
              <Calendar className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg font-semibold text-gray-900">LocalEvents</span>
            </div>
            <p className="text-gray-600 font-medium mb-2">Discover and join community events near you</p>
            <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700">
              Built to connect people and foster local communities. Made with ❤️.
            </p>
            <div className="mt-6 flex justify-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
