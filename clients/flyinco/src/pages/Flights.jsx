import React, { useState, useEffect } from 'react';
import '../styles/Flights.css';
import DataTableShell from '../components/DataTableShell';
import { flightColumns } from '../components/FlightColumns';
import { useLanguage } from '../context/LanguageContext';

const mockFlights = [
  { id: 'f1', passengerName: 'Hafiz A H', flight: 'XY101', route: 'JED - DXB', departure: '2024-07-01', status: 'Confirmed', pnr: 'PNR1001' },
  { id: 'f2', passengerName: 'Sarah Khan', flight: 'XY102', route: 'RUH - IST', departure: '2024-07-02', status: 'Pending', pnr: 'PNR1002' },
  { id: 'f3', passengerName: 'Ali Rehman', flight: 'XY103', route: 'DMM - CAI', departure: '2024-07-03', status: 'Cancelled', pnr: 'PNR1003' },
  { id: 'f4', passengerName: 'Amina Yusuf', flight: 'XY104', route: 'JED - DOH', departure: '2024-07-04', status: 'Confirmed', pnr: 'PNR1004' },
  { id: 'f5', passengerName: 'Omar Bashir', flight: 'XY105', route: 'RUH - LHR', departure: '2024-07-05', status: 'Pending', pnr: 'PNR1005' },
  { id: 'f6', passengerName: 'Fatima Noor', flight: 'XY106', route: 'DMM - MCT', departure: '2024-07-06', status: 'Confirmed', pnr: 'PNR1006' },
  { id: 'f7', passengerName: 'Zaid Ahmad', flight: 'XY107', route: 'MED - DXB', departure: '2024-07-07', status: 'Cancelled', pnr: 'PNR1007' },
  { id: 'f8', passengerName: 'Lina Harbi', flight: 'XY108', route: 'JED - BAH', departure: '2024-07-08', status: 'Pending', pnr: 'PNR1008' },
  { id: 'f9', passengerName: 'Nabil Faris', flight: 'XY109', route: 'RUH - KWI', departure: '2024-07-09', status: 'Confirmed', pnr: 'PNR1009' },
  { id: 'f10', passengerName: 'Maya Alawi', flight: 'XY110', route: 'DMM - AMM', departure: '2024-07-10', status: 'Confirmed', pnr: 'PNR1010' },
];

const Flights = () => {
  const { t } = useLanguage();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [visibleCols] = useState(['passengerName', 'flight', 'route', 'departure', 'status', 'pnr', 'actions']);
  const [activeId, setActiveId] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    setFlights(mockFlights);
    setLoading(false);
  }, []);

  const handleAction = (type, flight) => {
    if (type === 'view') {
      setSelectedFlight(flight);
    }
  };

  const closeModal = () => setSelectedFlight(null);

  return (
    <div className="flights-page space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('flightManagement')}</h1>
      <p className="text-muted-foreground">
        {t('Manage all flight bookings. Filter by status, view details, and push confirmed bookings to TRAACS.')}
      </p>

      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <DataTableShell
          data={flights}
          columns={flightColumns(visibleCols, handleAction, activeId, setActiveId)}
          searchKey="passengerName"
          searchValue={searchQuery}
          filterKey="status"
          filterValue={statusFilter}
          filterOptions={['Confirmed', 'Pending', 'Cancelled']}
          onAction={(action, value) => {
            if (action === '__filter__') setStatusFilter(value);
          }}
          searchPlaceholder={t('searchFlightsPlaceholder')}
        />
      )}

      {selectedFlight && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Flight Details</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Passenger:</strong> {selectedFlight.passengerName}</li>
              <li><strong>Flight:</strong> {selectedFlight.flight}</li>
              <li><strong>Route:</strong> {selectedFlight.route}</li>
              <li><strong>Departure:</strong> {new Date(selectedFlight.departure).toLocaleDateString()}</li>
              <li><strong>Status:</strong> {selectedFlight.status}</li>
              <li><strong>PNR:</strong> {selectedFlight.pnr}</li>
            </ul>
            <button onClick={closeModal} className="close-btn mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
