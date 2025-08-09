import React, { useState, useEffect } from 'react';
import DataTableShell from '../../components/admin/Datatableshell';
import { flightColumns } from '../../components/admin/FlightColumns';
import { useLanguage } from '../../context/admin/LanguageContext';

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
    <div className="p-6 space-y-6 bg-white text-gray-900 min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-indigo-700">{t('flightManagement')}</h1>
      <p className="text-gray-500">{t('flightManagementDescription')}</p>

      {loading ? (
        <p>{t('loadingFlights')}</p>
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <input
              type="search"
              placeholder={t('searchFlightsPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[180px] max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex flex-col gap-1 min-w-[160px]">
              <label htmlFor="statusFilter" className="text-sm text-gray-700">{t('filterByStatus')}:</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">{t('allStatuses')}</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* DataTable */}
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
        </>
      )}

      {/* Modal */}
      {selectedFlight && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg max-w-lg w-11/12 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{t('flightDetails')}</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>{t('passenger')}:</strong> {selectedFlight.passengerName}</li>
              <li><strong>{t('flight')}:</strong> {selectedFlight.flight}</li>
              <li><strong>{t('route')}:</strong> {selectedFlight.route}</li>
              <li><strong>{t('departure')}:</strong> {new Date(selectedFlight.departure).toLocaleDateString()}</li>
              <li><strong>{t('status')}:</strong> {selectedFlight.status}</li>
              <li><strong>{t('pnr')}:</strong> {selectedFlight.pnr}</li>
            </ul>
            <button
              onClick={closeModal}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
