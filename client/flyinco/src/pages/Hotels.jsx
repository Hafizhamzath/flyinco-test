import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiMapPin, FiSend } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Hotels.css';
import PageWrapper from '../components/Layout/PageWrapper';
import { getBookings, pushToTraacs } from '../api/admin';

const Hotels = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hotels, setHotels] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    const all = await getBookings();
    const filtered = all.filter(b => b.type === 'hotel');
    setHotels(filtered);
  };

  const handlePush = async (id) => {
    const res = await pushToTraacs(id);
    setMsg(res.msg || 'Pushed to TRAACS');
    setTimeout(() => setMsg(''), 3000);
    loadHotels();
  };

  const filteredHotels = hotels.filter(hotel => {
    const searchMatch = (hotel.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || hotel.status === statusFilter;
    return searchMatch && statusMatch;
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
      <div className="hotels-container">
        <div className="hotels-header">
          <div>
            <h1>{t('hotels')}</h1>
            <p>Manage hotel bookings and push to TRAACS</p>
          </div>
        </div>

        {msg && <p className="success">{msg}</p>}

        <div className="filter-card">
          <div className="filter-group">
            <div className="search-input">
              <FiSearch className="icon" />
              <input
                type="text"
                placeholder="Search bookings or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn-secondary"><FiFilter /></button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Client</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map(h => (
                <tr key={h._id}>
                  <td>{h.type}</td>
                  <td><span className={getStatusColor(h.status)}>{h.status}</span></td>
                  <td>SAR {h.totalAmount}</td>
                  <td>{h.client?.name}</td>
                  <td>
                    <button onClick={() => handlePush(h._id)} title="Push to TRAACS">
                      <FiSend />
                    </button>
                    <button title="View Details">
                      <FiEye />
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

export default Hotels;
