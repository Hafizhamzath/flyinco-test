import React, { useEffect, useState } from 'react';
import {
  User, Plane, Hotel, Car, FileText, DollarSign
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Dashboard.css';
import logo from '../assets/logo.png';
import { getAnalytics } from '../Api/AdminApi';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAnalytics()
      .then((data) => {
        // Provide fallback demo data if backend is empty or undefined
        setAnalytics({
          users: data?.users ?? 50,
          flights: data?.flights ?? 40,
          hotels: data?.hotels ?? 30,
          cars: data?.cars ?? 20,
          visas: data?.visas ?? 10,
          revenue: data?.revenue ?? 100000,
          revenueByMonth: data?.revenueByMonth?.length ? data.revenueByMonth : [
            { month: 'Jan', revenue: 10000 },
            { month: 'Feb', revenue: 15000 },
            { month: 'Mar', revenue: 20000 },
            { month: 'Apr', revenue: 25000 },
            { month: 'May', revenue: 30000 },
            { month: 'Jun', revenue: 35000 }
          ]
        });
      })
      .catch(() => setError('Failed to fetch analytics'))
      .finally(() => setLoading(false));
  }, []);

  const stats = analytics ? [
    { icon: <User />, label: 'Total Users', value: analytics.users, link: '/users' },
    { icon: <Plane />, label: 'Flight Bookings', value: analytics.flights, link: '/flights' },
    { icon: <Hotel />, label: 'Hotel Reservations', value: analytics.hotels, link: '/hotels' },
    { icon: <Car />, label: 'Car Rentals', value: analytics.cars, link: '/cars' },
    { icon: <FileText />, label: 'Visa Applications', value: analytics.visas, link: '/visa' },
    { icon: <DollarSign />, label: 'Total Revenue', value: `SAR ${analytics.revenue.toLocaleString()}`, link: null },
  ] : [];

  const bookingsData = analytics ? [
    { sector: 'Flights', value: analytics.flights },
    { sector: 'Hotels', value: analytics.hotels },
    { sector: 'Cars', value: analytics.cars },
    { sector: 'Users', value: analytics.users },
    { sector: 'Visa', value: analytics.visas },
  ] : [];

  const revenueData = analytics?.revenueByMonth || [];

  return (
    <div className="dashboard-page space-y-8">
      {/* Welcome Card */}
      <div className="welcome-card">
        <img src={logo} alt="Logo" />
        <div>
          <h2>Welcome to Flyinco Admin!</h2>
          <p className="welcome-description">
            Your command center for corporate travel excellence.<br />
            Easily manage users, bookings, and applications across all services — flights, hotels, cars, and visas — from a single powerful interface.
            Leverage insights, streamline operations, and deliver exceptional experiences every step of the journey.
          </p>
        </div>
      </div>

      {/* Conditional States */}
      {loading ? (
        <p>Loading dashboard data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map(({ icon, label, value, link }) => (
              <div className="summary-card" key={label}>
                <div className="icon">{icon}</div>
                <div className="info">
                  <h4>{label}</h4>
                  <p>{value}</p>
                  {link && <a href={link}>View Details →</a>}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="chart-card card-animated">
            <h3>Recent Activity Overview</h3>
            <div className="charts">
              <div className="chart-box">
                <h4>Sector-Wise Bookings</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-box">
                <h4>Monthly Revenue Trend</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-accent)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
