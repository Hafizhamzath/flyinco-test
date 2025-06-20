import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import PageWrapper from '../components/Layout/PageWrapper';
import { getUsers, resetOtpLimit } from '../api/admin';
import '../styles/Users.css';

const Users = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err.message);
    }
  };

  const handleResetOTP = async (userId, userName) => {
    try {
      await resetOtpLimit(userId);
      setMessage(`✅ OTP limit reset for ${userName}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isVerified) || 
      (statusFilter === 'pending' && !user.isVerified) ||
      (statusFilter === 'inactive' && user.status === 'inactive');
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <PageWrapper>
      <div className="users-page">
        <div className="users-header">
          <div>
            <h1>{t('users')}</h1>
            <p>Manage user accounts, roles, and verification status</p>
          </div>
          <button className="btn-primary">
            <FiPlus />
            <span>{t('add')} User</span>
          </button>
        </div>

        {message && <p className="success">{message}</p>}

        <div className="users-filters">
          <div className="users-filters-left">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder={`${t('search')} users...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="users-filters-right">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">{t('active')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="inactive">{t('inactive')}</option>
            </select>
            <button className="btn-secondary">
              <FiFilter />
            </button>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('email')}</th>
                <th>{t('role')}</th>
                <th>{t('status')}</th>
                <th>Verified</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><span className={getStatusClass(user.status)}>{user.status || 'N/A'}</span></td>
                  <td>{user.isVerified ? '✓' : '✗'}</td>
                  <td>
                    <button title="Edit"><FiEdit /></button>
                    <button title="Reset OTP" onClick={() => handleResetOTP(user._id, user.name)}><FiRefreshCw /></button>
                    <button title="Delete"><FiTrash2 /></button>
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

export default Users;
