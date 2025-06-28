import React, { useState } from 'react';
import '../styles/Cars.css';
import DataTableShell from '../components/DataTableShell';
import { carColumns } from '../components/CarColumns';

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

const Cars = () => {
  const [visibleCols] = useState([
    'renterName',
    'pickupLocation',
    'pickupDate',
    'status',
    'actions'
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRental, setSelectedRental] = useState(null);

  const handleAction = (type, rental) => {
    if (type === 'view') {
      setSelectedRental(rental);
    } else if (type === 'search') {
      setSearchQuery(rental);
    } else if (type === 'filter') {
      setStatusFilter(rental);
    }
  };

  const closeModal = () => setSelectedRental(null);

  return (
    <div className="cars-page space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">Car Rentals</h1>
      <p className="text-muted-foreground">Monitor and manage all car rental bookings.</p>

      <DataTableShell
        data={mockCarRentals}
        columns={carColumns(visibleCols, handleAction)}
        searchKey="renterName"
        searchValue={searchQuery}
        filterKey="status"
        filterValue={statusFilter}
        filterOptions={['Confirmed', 'Pending', 'Cancelled', 'Completed']}
        onAction={handleAction}
        searchPlaceholder="Search renters..."
      />

      {selectedRental && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Rental Details</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Renter Name:</strong> {selectedRental.renterName}</li>
              <li><strong>Pickup Location:</strong> {selectedRental.pickupLocation}</li>
              <li><strong>Destination:</strong> {selectedRental.destinationLocation}</li>
              <li><strong>Car Model:</strong> {selectedRental.carModel}</li>
              <li><strong>Pickup Date:</strong> {new Date(selectedRental.pickupDate).toLocaleDateString()}</li>
              <li><strong>Return Date:</strong> {new Date(selectedRental.returnDate).toLocaleDateString()}</li>
              <li><strong>Status:</strong> {selectedRental.status}</li>
            </ul>
            <button onClick={closeModal} className="close-btn mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
