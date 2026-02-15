import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function RSVPSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventTitle = searchParams.get('event') || 'the event';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">RSVP Confirmed!</h1>

        <p className="text-lg text-gray-700 mb-2">
          You've successfully registered for:
        </p>
        <p className="text-xl font-semibold text-blue-600 mb-6">{eventTitle}</p>

        <p className="text-gray-600 mb-8">
          A confirmation email will be sent to you shortly with all the event details(Version_2).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse More Events
          </button>
          <button
            onClick={() => navigate(-2)}
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Event
          </button>
        </div>
      </div>
    </div>
  );
}
