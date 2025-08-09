import React, { useState, useMemo } from 'react';

const mockCarRentals = [
  {
    id: 'c1',
    renterName: 'Mohammed Al-Qahtani',
    pickupLocation: 'Riyadh Airport',
    destinationLocation: 'Jeddah Terminal',
    carModel: 'Toyota Camry',
    pickupDate: '2024-06-28',
    returnDate: '2024-07-02',
    status: 'Confirmed'
  },
  {
    id: 'c2',
    renterName: 'Layla Harbi',
    pickupLocation: 'Jeddah Downtown',
    destinationLocation: 'Medina Central',
    carModel: 'Hyundai Sonata',
    pickupDate: '2024-06-25',
    returnDate: '2024-06-30',
    status: 'Pending'
  },
  {
    id: 'c3',
    renterName: 'Omar Nasser',
    pickupLocation: 'Dammam Port',
    destinationLocation: 'Riyadh East',
    carModel: 'Kia Sportage',
    pickupDate: '2024-07-01',
    returnDate: '2024-07-05',
    status: 'Cancelled'
  },
  {
    id: 'c4',
    renterName: 'Fatima Zahra',
    pickupLocation: 'Jubail Industrial Area',
    destinationLocation: 'Abha Center',
    carModel: 'Nissan Altima',
    pickupDate: '2024-07-10',
    returnDate: '2024-07-15',
    status: 'Confirmed'
  },
  {
    id: 'c5',
    renterName: 'Yousef Ahmed',
    pickupLocation: 'Yanbu Airport',
    destinationLocation: 'Tabuk Terminal',
    carModel: 'Chevrolet Malibu',
    pickupDate: '2024-06-29',
    returnDate: '2024-07-04',
    status: 'Pending'
  },
  {
    id: 'c6',
    renterName: 'Aisha Al-Sayed',
    pickupLocation: 'Hail Central Station',
    destinationLocation: 'Jeddah',
    carModel: 'Honda Accord',
    pickupDate: '2024-07-02',
    returnDate: '2024-07-06',
    status: 'Completed'
  },
  {
    id: 'c7',
    renterName: 'Musa Bin Salman',
    pickupLocation: 'Al Khobar',
    destinationLocation: 'Riyadh',
    carModel: 'Mazda 6',
    pickupDate: '2024-06-26',
    returnDate: '2024-07-01',
    status: 'Confirmed'
  },
  {
    id: 'c8',
    renterName: 'Noor Farhan',
    pickupLocation: 'Taif Terminal',
    destinationLocation: 'Najran',
    carModel: 'Ford Fusion',
    pickupDate: '2024-07-04',
    returnDate: '2024-07-09',
    status: 'Cancelled'
  },
  {
    id: 'c9',
    renterName: 'Salem Al-Rashid',
    pickupLocation: 'Al Ula Airport',
    destinationLocation: 'Hofuf Station',
    carModel: 'Volkswagen Passat',
    pickupDate: '2024-07-07',
    returnDate: '2024-07-12',
    status: 'Confirmed'
  },
  {
    id: 'c10',
    renterName: 'Noura Al-Hamdan',
    pickupLocation: 'Jazan Seaport',
    destinationLocation: 'Makkah',
    carModel: 'BMW 3 Series',
    pickupDate: '2024-07-03',
    returnDate: '2024-07-08',
    status: 'Pending'
  }
];

const statusColors = {
  Confirmed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
  Completed: 'bg-blue-100 text-blue-800',
};

const Cars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRental, setSelectedRental] = useState(null);

  // Filtered & searched data
  const filteredRentals = useMemo(() => {
    return mockCarRentals.filter((rental) => {
      const matchesSearch = rental.renterName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? rental.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Car Rentals Management</h1>
      <p className="text-gray-600">Manage and review all car rental bookings.</p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by renter name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-300">Renter Name</th>
              <th className="text-left px-4 py-3 border-b border-gray-300">Pickup Location</th>
              <th className="text-left px-4 py-3 border-b border-gray-300">Pickup Date</th>
              <th className="text-left px-4 py-3 border-b border-gray-300">Status</th>
              <th className="text-left px-4 py-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">No rentals found.</td>
              </tr>
            ) : (
              filteredRentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3 border-b border-gray-200">{rental.renterName}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{rental.pickupLocation}</td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {new Date(rental.pickupDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[rental.status]}`}
                    >
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedRental(rental)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRental && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedRental(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Rental Details</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Renter Name:</strong> {selectedRental.renterName}</li>
              <li><strong>Pickup Location:</strong> {selectedRental.pickupLocation}</li>
              <li><strong>Destination:</strong> {selectedRental.destinationLocation}</li>
              <li><strong>Car Model:</strong> {selectedRental.carModel}</li>
              <li><strong>Pickup Date:</strong> {new Date(selectedRental.pickupDate).toLocaleDateString()}</li>
              <li><strong>Return Date:</strong> {new Date(selectedRental.returnDate).toLocaleDateString()}</li>
              <li><strong>Status:</strong> {selectedRental.status}</li>
            </ul>
            <button
              onClick={() => setSelectedRental(null)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
