import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiSend } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import PageWrapper from '../components/Layout/PageWrapper';
import { getBookings, pushToTraacs } from '../api/admin';
import '../styles/Visas.css';

const Visas = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visas, setVisas] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadVisas();
  }, []);

  const loadVisas = async () => {
    const all = await getBookings();
    const filtered = all.filter(b => b.type === 'visa');
    setVisas(filtered);
  };

  const handlePush = async (id) => {
    const res = await pushToTraacs(id);
    setMsg(res.msg || 'Pushed to TRAACS');
    setTimeout(() => setMsg(''), 3000);
    loadVisas();
  };

  const filteredVisas = visas.filter(visa => {
    const nameMatch = (visa.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || visa.status === statusFilter;
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
      <div className="visas-container">
        <div className="visas-header">
          <div>
            <h1>{t('visas')}</h1>
            <p>Manage visa bookings and push to TRAACS</p>
          </div>
        </div>

        {msg && <p className="success">{msg}</p>}

        <div className="card filter-card">
          <input
            type="text"
            placeholder="Search client or status"
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

        <div className="card table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Client</th>
                <th>Status</th>
                <th>Amount</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisas.map((visa) => (
                <tr key={visa._id}>
                  <td>{visa._id.slice(-6).toUpperCase()}</td>
                  <td>{visa.client?.name}</td>
                  <td><span className={getStatusColor(visa.status)}>{visa.status}</span></td>
                  <td>SAR {visa.totalAmount}</td>
                  <td>
                    <button onClick={() => handlePush(visa._id)} title="Push to TRAACS"><FiSend /></button>
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

export default Visas;
