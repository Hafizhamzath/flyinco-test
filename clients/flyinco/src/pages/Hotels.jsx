import React, { useState, useEffect } from 'react';
import '../styles/Hotels.css';
import DataTableShell from '../components/DataTableShell';
import { hotelColumns } from '../components/HotelColumns';
import { useLanguage } from '../context/LanguageContext';

const mockHotelBookings = [
  { id: 'h1', guestName: 'Ahmed Salem', hotelName: 'Hilton Riyadh', city: 'Riyadh', checkIn: '2024-06-28', checkOut: '2024-07-02', status: 'Confirmed' },
  { id: 'h2', guestName: 'Sara Alawi', hotelName: 'Sheraton Jeddah', city: 'Jeddah', checkIn: '2024-06-25', checkOut: '2024-06-30', status: 'Pending' },
  { id: 'h3', guestName: 'Khalid Musa', hotelName: 'Marriott Makkah', city: 'Makkah', checkIn: '2024-07-01', checkOut: '2024-07-05', status: 'Cancelled' },
  { id: 'h4', guestName: 'Mona Fahad', hotelName: 'Hyatt Regency', city: 'Medina', checkIn: '2024-07-10', checkOut: '2024-07-12', status: 'Confirmed' },
  { id: 'h5', guestName: 'Tariq Zaman', hotelName: 'DoubleTree Jeddah', city: 'Jeddah', checkIn: '2024-06-30', checkOut: '2024-07-03', status: 'Pending' },
  { id: 'h6', guestName: 'Noura Aziz', hotelName: 'Crowne Plaza Riyadh', city: 'Riyadh', checkIn: '2024-07-04', checkOut: '2024-07-06', status: 'Confirmed' },
  { id: 'h7', guestName: 'Faisal Omar', hotelName: 'Four Seasons', city: 'Makkah', checkIn: '2024-07-06', checkOut: '2024-07-09', status: 'Cancelled' },
  { id: 'h8', guestName: 'Huda Jamal', hotelName: 'Park Inn', city: 'Jeddah', checkIn: '2024-06-29', checkOut: '2024-07-01', status: 'Confirmed' },
  { id: 'h9', guestName: 'Majid Noor', hotelName: 'Holiday Inn', city: 'Dammam', checkIn: '2024-07-02', checkOut: '2024-07-04', status: 'Pending' },
  { id: 'h10', guestName: 'Reem Al-Mansour', hotelName: 'InterContinental', city: 'Riyadh', checkIn: '2024-07-05', checkOut: '2024-07-07', status: 'Confirmed' }
];

const Hotels = () => {
  const { t } = useLanguage();
  const [visibleCols] = useState(['guestName', 'hotel', 'checkIn', 'checkOut', 'status', 'actions']);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleAction = (type, booking) => {
    if (type === 'view') {
      setSelectedBooking(booking);
    }
  };

  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="hotels-page space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('hotelManagement')}</h1>
      <p className="text-muted-foreground">{t('hotelManagementDescription')}</p>
      
      <DataTableShell
        data={mockHotelBookings}
        columns={hotelColumns(visibleCols, handleAction, activeId, setActiveId)}
        searchKey="guestName"
        searchValue={searchQuery}
        filterKey="status"
        filterValue={statusFilter}
        filterOptions={['Confirmed','Pending','Cancelled']}
        onAction={(action, value) => {
          if (action === '__filter__') setStatusFilter(value);
        }}
        searchPlaceholder={t('searchHotelsPlaceholder')}
      />

      {selectedBooking && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Hotel Booking Details</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Guest Name:</strong> {selectedBooking.guestName}</li>
              <li><strong>Hotel:</strong> {selectedBooking.hotelName}</li>
              <li><strong>City:</strong> {selectedBooking.city}</li>
              <li><strong>Check-In:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}</li>
              <li><strong>Check-Out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}</li>
              <li><strong>Status:</strong> {selectedBooking.status}</li>
            </ul>
            <button onClick={closeModal} className="close-btn mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
