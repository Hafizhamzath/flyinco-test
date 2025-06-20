import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiTruck, FiSend } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import PageWrapper from '../components/Layout/PageWrapper';
import { getBookings, pushToTraacs } from '../api/admin';
import '../styles/Cars.css';

const Cars = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cars, setCars] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const all = await getBookings();
    const filtered = all.filter(b => b.type === 'car');
    setCars(filtered);
  };

  const handlePush = async (id) => {
    const res = await pushToTraacs(id);
    setMsg(res.msg || 'Pushed to TRAACS');
    setTimeout(() => setMsg(''), 3000);
    loadCars();
  };

  const filteredCars = cars.filter(car => {
    const nameMatch = (car.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || car.status === statusFilter;
    return nameMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-active';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <PageWrapper>
      <div className="cars-page">
        <div className="cars-header">
          <div>
            <h1>{t('cars')}</h1>
            <p>Manage car rental bookings and push to TRAACS</p>
          </div>
        </div>

        {msg && <p className="success">{msg}</p>}

        <div className="card filters">
          <input
            type="text"
            placeholder="Search bookings or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn-secondary"><FiFilter /></button>
        </div>

        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Total</th>
                <th>Client</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car._id}>
                  <td>{car.type}</td>
                  <td><span className={getStatusColor(car.status)}>{car.status}</span></td>
                  <td>SAR {car.totalAmount}</td>
                  <td>{car.client?.name}</td>
                  <td>
                    <button onClick={() => handlePush(car._id)} title="Push to TRAACS"><FiSend /></button>
                    <button title="View Details"><FiEye /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Cars;
