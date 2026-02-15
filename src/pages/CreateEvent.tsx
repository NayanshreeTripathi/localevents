import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { ArrowLeft, Sparkles, Calendar, MapPin, User, FileText, Zap } from 'lucide-react';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    location: '',
    host: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Workshop',
    'Music',
    'Sports',
    'Meetup',
    'Fitness',
    'Social',
    'Entertainment',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Event type is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.host.trim()) {
      newErrors.host = 'Host name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await createEvent({
        title: formData.title.trim(),
        type: formData.type,
        date: formData.date,
        location: formData.location.trim(),
        host: formData.host.trim(),
        description: formData.description.trim(),
      });

      navigate('/?created=true');
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : 'Failed to create event',
      });
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-cyan-200/30 via-transparent to-transparent"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-all duration-300 hover:-translate-x-1"
        >
          <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors mr-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to events</span>
        </button>

        <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-cyan-50/50"></div>

          <div className="relative p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Create New Event
              </h1>
            </div>
            <p className="text-gray-600 mb-10 text-lg">
              Share your event with the community and bring people together
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                  <Zap className="w-4 h-4" />
                  Event Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                      focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                      outline-none transition-all duration-300 text-gray-900 placeholder-gray-400
                      hover:bg-gray-50/80 backdrop-blur-sm
                      ${errors.title ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                    placeholder="e.g., Community Yoga Session"
                    disabled={loading}
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-400/0 via-blue-400/5 to-cyan-400/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="type" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                    <Sparkles className="w-4 h-4" />
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                        focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                        outline-none transition-all duration-300 text-gray-900
                        hover:bg-gray-50/80 backdrop-blur-sm appearance-none cursor-pointer
                        ${errors.type ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                      disabled={loading}
                    >
                      <option value="" className="bg-white">Select a type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} className="bg-white">
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-blue-500 rotate-45 transform"></div>
                    </div>
                  </div>
                  {errors.type && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.type}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                      focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                      outline-none transition-all duration-300 text-gray-900
                      hover:bg-gray-50/80 backdrop-blur-sm
                      scheme-light
                      ${errors.date ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                    disabled={loading}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="location" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                      focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                      outline-none transition-all duration-300 text-gray-900 placeholder-gray-400
                      hover:bg-gray-50/80 backdrop-blur-sm
                      ${errors.location ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                    placeholder="e.g., Bangalore"
                    disabled={loading}
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="host" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                    <User className="w-4 h-4" />
                    Host Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="host"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                      focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                      outline-none transition-all duration-300 text-gray-900 placeholder-gray-400
                      hover:bg-gray-50/80 backdrop-blur-sm
                      ${errors.host ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                    placeholder="e.g., Yoga with Anu"
                    disabled={loading}
                  />
                  {errors.host && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.host}
                    </p>
                  )}
                </div>
              </div>

              <div className="group">
                <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                  <FileText className="w-4 h-4" />
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-5 py-4 bg-white/50 border-2 rounded-xl
                    focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                    outline-none transition-all duration-300 text-gray-900 placeholder-gray-400
                    hover:bg-gray-50/80 backdrop-blur-sm resize-none
                    ${errors.description ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-gray-300'}`}
                  placeholder="Describe your event in detail..."
                  disabled={loading}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Minimum 20 characters required
                  </p>
                  <p className={`text-sm font-mono ${formData.description.length >= 20 ? 'text-blue-600' : 'text-gray-500'}`}>
                    {formData.description.length} / 20
                  </p>
                </div>
              </div>

              {errors.submit && (
                <div className="relative overflow-hidden bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="absolute inset-0 bg-linear-to-r from-red-100/5 to-transparent"></div>
                  <p className="relative text-red-600 font-medium">{errors.submit}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={loading}
                  className="relative flex-1 px-8 py-4 bg-white/50 border-2 border-gray-300 rounded-xl
                    font-semibold text-gray-700 hover:bg-gray-100/80 hover:border-gray-400
                    transition-all duration-300 disabled:opacity-50 group overflow-hidden"
                >
                  <span className="relative z-10">Cancel</span>
                  <div className="absolute inset-0 bg-linear-to-r from-gray-200/0 via-gray-200/50 to-gray-200/0
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex-1 px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500
                    rounded-xl font-semibold text-white shadow-lg shadow-blue-300
                    hover:shadow-xl hover:shadow-blue-400 hover:scale-[1.02]
                    transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100
                    group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Create Event
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0
                    group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-200/30 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-cyan-200/30 to-transparent rounded-full filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
