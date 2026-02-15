import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Sparkles, Award } from 'lucide-react';

export default function RSVPSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventTitle = searchParams.get('event') || 'the event';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl w-full relative">
        <div className="absolute inset-0 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500"></div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-amber-100 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-yellow-100 to-transparent rounded-full -ml-24 -mb-24 opacity-50"></div>

          <div className="relative px-8 py-12 sm:px-12 sm:py-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-yellow-500 rounded-full blur-md opacity-50"></div>
                <div className="relative w-24 h-24 bg-linear-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl">
                  <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -left-1">
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-6 h-6 text-amber-500" />
                <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                  RSVP Confirmed!
                </h1>
                <Award className="w-6 h-6 text-amber-500" />
              </div>

              <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>

              <p className="text-lg text-gray-700 mb-3 font-medium">
                You've successfully secured your spot for:
              </p>
              <div className="bg-linear-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-xl p-6 mb-6 border border-amber-200 shadow-inner">
                <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  {eventTitle}
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-8">
                <p className="text-gray-700 font-medium">
                  A confirmation email will be sent to you shortly with all the event details(Version_2).
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="group relative px-8 py-4 bg-linear-to-r from-amber-500 via-yellow-500 to-amber-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Browse More Events
                </span>
              </button>
              <button
                onClick={() => navigate(-2)}
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-bold text-lg border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Back to Event
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Premium Experience Confirmed</span>
            <Award className="w-4 h-4 text-amber-500" />
          </p>
        </div>
      </div>
    </div>
  );
}
