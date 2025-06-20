import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiSend, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Flights.css';
import PageWrapper from '../components/Layout/PageWrapper';
import { getBookings, pushToTraacs } from '../api/admin';

const Flights = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    const all = await getBookings();
    const flightBookings = all.filter(b => b.type === 'flight');
    setFlights(flightBookings);
  };

  const handlePush = async (id) => {
    const res = await pushToTraacs(id);
    setMessage(res.msg || 'Pushed to TRAACS');
    setTimeout(() => setMessage(''), 3000);
    loadFlights();
  };

  const filtered = flights.filter(f =>
    (f.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || f.status === statusFilter)
  );

  const getStatusClass = (status) => {
    return status === 'confirmed' ? 'status-active'
         : status === 'pending'   ? 'status-pending'
         : 'status-inactive';
  };

  return (
    <PageWrapper>
      <div className="flights-container">
        <div className="flights-header">
          <div>
            <h1>{t('flights')}</h1>
            <p>Manage flight bookings and push to TRAACS system</p>
          </div>
          <div className="flights-actions">
            <button className="btn-secondary"><FiCalendar /> Export</button>
            <button className="btn-primary">New Booking</button>
          </div>
        </div>

        {message && <p className="success">{message}</p>}

        <div className="card filter-bar">
          <div className="search-box">
            <FiSearch className="icon" />
            <input
              type="text"
              placeholder="Search flights or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn-secondary"><FiFilter /></button>
          </div>
        </div>

        <div className="card flights-table-wrapper">
          <table className="flights-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Client</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f._id}>
                  <td>{f.type}</td>
                  <td><span className={getStatusClass(f.status)}>{f.status}</span></td>
                  <td>SAR {f.totalAmount}</td>
                  <td>{f.client?.name || '—'}</td>
                  <td>
                    <button onClick={() => handlePush(f._id)}>
                      <FiSend /> Push
                    </button>
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

export default Flights;
