import React, { useState, useMemo } from 'react';
import { Plane, BedDouble, Car, Calendar as CalendarIcon } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import logo from '../../assets/logo.png';

const mockEvents = [
  {
    id: 1,
    type: 'flight',
    title: 'Flight to Paris',
    date: new Date(2025, 6, 15),
    details: 'Departure at 3:00 PM from JED',
  },
  {
    id: 2,
    type: 'hotel',
    title: 'Hotel Check-in: Ritz',
    date: new Date(2025, 6, 15),
    details: '2 nights in Paris',
  },
  {
    id: 3,
    type: 'car',
    title: 'Car Rental Pickup',
    date: new Date(2025, 6, 16),
    details: 'Paris Airport',
  },
  {
    id: 4,
    type: 'flight',
    title: 'Return Flight',
    date: new Date(2025, 6, 20),
    details: 'Departure at 8:00 AM to JED',
  },
];

const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export default function TravelCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const allEvents = useMemo(() => mockEvents, []);
  const eventDates = useMemo(() => allEvents.map((e) => normalizeDate(e.date)), [allEvents]);

  const selectedDayEvents = useMemo(() => {
    const normalized = normalizeDate(selectedDate);
    return allEvents.filter((e) => isSameDay(normalizeDate(e.date), normalized));
  }, [selectedDate, allEvents]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-5 h-5 text-blue-500" />;
      case 'hotel':
        return <BedDouble className="w-5 h-5 text-green-500" />;
      case 'car':
        return <Car className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'flight':
        return 'bg-blue-100 text-blue-700';
      case 'hotel':
        return 'bg-green-100 text-green-700';
      case 'car':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Custom class names for react-day-picker modifiers (day with event)
  const modifiers = {
    hasEvent: eventDates,
  };

  const modifiersClassNames = {
    hasEvent: 'day-with-event',
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <CalendarIcon className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Travel Calendar</h1>
          <p className="text-gray-500">See and manage your upcoming trips visually.</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Calendar Section */}
        <div className="relative">
          {/* Background logo with opacity */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${logo})` }}
          />
          <div className="relative bg-white rounded-lg shadow p-4">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              showOutsideDays
              className="react-day-picker"
            />
          </div>
        </div>

        {/* Event Details Section */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
          </h2>
          <p className="text-gray-600 mb-4">
            {selectedDayEvents.length > 0
              ? `${selectedDayEvents.length} event(s) scheduled.`
              : 'No events for this day.'}
          </p>

          <div className="flex flex-col space-y-4 overflow-y-auto">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-3 rounded-md shadow-sm border border-gray-200"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${getEventColor(
                      event.type
                    )}`}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{event.title}</p>
                    <p className="text-gray-600 text-sm">{event.details}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 mt-12 space-y-2">
                <CalendarIcon className="w-10 h-10" />
                <p>Select a day to see scheduled events.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tailwind CSS for day-with-event dot */}
      <style>{`
        .day-with-event::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #6366f1; /* Indigo-500 */
          border-radius: 9999px;
        }
        /* React Day Picker overrides */
        .react-day-picker {
          --rdp-cell-size: 3rem;
        }
        .react-day-picker .rdp-day {
          position: relative;
          width: var(--rdp-cell-size);
          height: var(--rdp-cell-size);
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .react-day-picker .rdp-day:hover {
          background-color: rgba(99, 102, 241, 0.1); /* Indigo-100 */
        }
      `}</style>
    </div>
  );
}
