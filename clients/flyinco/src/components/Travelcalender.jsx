import React, { useMemo, useState } from 'react';
import { Calendar as CalendarIcon, Plane, Hotel, Car } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { Card } from '../components/UI/Card';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../styles/Calendar.css';
import logo from '../assets/logo.png';

const mockEvents = [
  {
    id: 1,
    type: 'flight',
    title: 'Flight to Paris',
    date: new Date(2025, 5, 28),
    details: 'Departure at 3:00 PM from JED',
  },
  {
    id: 2,
    type: 'hotel',
    title: 'Hotel Check-in: Ritz',
    date: new Date(2025, 5, 28),
    details: '2 nights in Paris',
  },
  {
    id: 3,
    type: 'car',
    title: 'Car Rental Pickup',
    date: new Date(2025, 5, 29),
    details: 'Riyadh Airport',
  },
];

const normalizeDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const TravelCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const allEvents = useMemo(() => mockEvents, []);
  const eventDates = useMemo(
    () => allEvents.map((e) => normalizeDate(e.date)),
    [allEvents]
  );

  const selectedDayEvents = useMemo(() => {
    const normalizedSelected = normalizeDate(selectedDate);
    return allEvents.filter((e) => isSameDay(normalizeDate(e.date), normalizedSelected));
  }, [selectedDate, allEvents]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane size={18} />;
      case 'hotel':
        return <Hotel size={18} />;
      case 'car':
        return <Car size={18} />;
      default:
        return null;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'flight':
        return 'bg-blue-500';
      case 'hotel':
        return 'bg-green-500';
      case 'car':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="calendar-page space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <CalendarIcon className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Travel Calendar</h1>
          <p className="text-muted-foreground">Plan, view, and manage your upcoming trips.</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="relative lg:col-span-2 p-6 shadow-xl rounded-xl overflow-hidden bg-white border">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${logo})` }}
          />
          <div className="relative z-10">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ hasEvent: eventDates }}
              modifiersClassNames={{ hasEvent: 'day-with-event' }}
              className="custom-calendar"
            />
          </div>
        </Card>

        {/* Event Details */}
        <Card className="p-6 space-y-4 bg-muted/40 shadow-md rounded-xl" role="region" aria-label="Event details panel">
          {selectedDate && (
            <>
              <div>
                <h2 className="text-xl font-semibold">{format(selectedDate, 'MMMM d, yyyy')}</h2>
                <p className="text-muted-foreground">{selectedDayEvents.length} event(s)</p>
              </div>

              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 bg-white/80 border p-3 rounded-lg shadow-sm"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${getEventColor(
                        event.type
                      )}`}
                    >
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 mb-2" />
                  <p>No events for this day.</p>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TravelCalendar;
