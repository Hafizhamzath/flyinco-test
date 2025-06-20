import React, { useEffect, useState } from 'react';
import {
  FiUsers, FiNavigation, FiClock, FiDollarSign, FiTrendingUp, FiArrowUp
} from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import { getAnalytics, getUsers, getBookings } from '../api/admin';
import '../styles/Dashboard.css';
import PageWrapper from '../components/Layout/PageWrapper';

const Dashboard = () => {
  const { t } = useLanguage();
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    (async () => {
      const stats = await getAnalytics();
      const userList = await getUsers();
      const allBookings = await getBookings();

      setAnalytics(stats);
      setUsers(userList);
      setRecent(allBookings.slice(0, 4));
    })();
  }, []);

  const stats = analytics && [
    {
      name: t('totalUsers'),
      value: users.length.toString(),
      change: '+12%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'blue'
    },
    {
      name: t('totalBookings'),
      value: analytics.totalBookings,
      change: '+8%',
      changeType: 'increase',
      icon: FiNavigation,
      color: 'green'
    },
    {
      name: t('pendingApplications'),
      value: recent.filter(b => b.status === 'pending').length,
      change: '-3%',
      changeType: 'decrease',
      icon: FiClock,
      color: 'yellow'
    },
    {
      name: t('revenue'),
      value: `SAR ${analytics.totalRevenue}`,
      change: '+23%',
      changeType: 'increase',
      icon: FiDollarSign,
      color: 'purple'
    }
  ];

  return (
    <PageWrapper>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>{t('welcome')}</h1>
          <p>Track your travel business performance and manage operations efficiently.</p>
        </div>

        <div className="dashboard-stats">
          {stats && stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="dashboard-card">
                <div className={`dashboard-card-icon bg-${stat.color}`}><Icon /></div>
                <div>
                  <p className="stat-name">{stat.name}</p>
                  <h2>{stat.value}</h2>
                </div>
                <div className={`dashboard-change ${stat.changeType}`}>
                  <FiArrowUp className={stat.changeType === 'decrease' ? 'down' : ''} />
                  <span>{stat.change}</span>
                  <span className="dashboard-label">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="dashboard-main">
          <div className="dashboard-recent">
            <div className="dashboard-section-header">
              <h3>Recent Bookings</h3>
              <button>View all</button>
            </div>
            {recent.map((b) => (
              <div key={b._id} className="dashboard-booking">
                <div>
                  <p>{b.client?.name}</p>
                  <small>{b.type} • {new Date(b.bookingDate).toLocaleDateString()}</small>
                </div>
                <div className="dashboard-booking-right">
                  <p>{b.totalAmount} SAR</p>
                  <span className={`status ${b.status}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-actions">
            <h3>Quick Actions</h3>
            <div className="dashboard-actions-grid">
              <button className="btn-primary"><FiUsers /><div><p>Add User</p><small>Create new user account</small></div></button>
              <button className="btn-secondary"><FiNavigation /><div><p>New Booking</p><small>Process flight booking</small></div></button>
              <button className="btn-accent"><FiClock /><div><p>Review Applications</p><small>Check pending requests</small></div></button>
              <button className="btn-secondary"><FiTrendingUp /><div><p>Analytics</p><small>View detailed reports</small></div></button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
