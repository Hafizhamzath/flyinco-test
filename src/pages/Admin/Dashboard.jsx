import React, { useEffect, useState } from 'react';
import {
  User, Plane, Hotel, Car, FileText, DollarSign
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../context/admin/LanguageContext';

const mockAnalytics = {
  users: 120,
  flights: 85,
  hotels: 60,
  cars: 35,
  visas: 25,
  revenue: 175000,
  revenueByMonth: [
    { month: 'Jan', revenue: 20000 },
    { month: 'Feb', revenue: 25000 },
    { month: 'Mar', revenue: 30000 },
    { month: 'Apr', revenue: 28000 },
    { month: 'May', revenue: 35000 },
    { month: 'Jun', revenue: 37000 },
  ],
};

const Dashboard = () => {
  const { t } = useLanguage();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate loading delay and then set mock data
    const timer = setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = analytics
    ? [
        { icon: <User className="text-indigo-600 w-8 h-8" />, label: t('totalUsers'), value: analytics.users, link: '/users' },
        { icon: <Plane className="text-indigo-600 w-8 h-8" />, label: t('flightBookings'), value: analytics.flights, link: '/flights' },
        { icon: <Hotel className="text-indigo-600 w-8 h-8" />, label: t('hotelReservations'), value: analytics.hotels, link: '/hotels' },
        { icon: <Car className="text-indigo-600 w-8 h-8" />, label: t('carRentals'), value: analytics.cars, link: '/cars' },
        { icon: <FileText className="text-indigo-600 w-8 h-8" />, label: t('visaApplications'), value: analytics.visas, link: '/visa' },
        { icon: <DollarSign className="text-indigo-600 w-8 h-8" />, label: t('totalRevenue'), value: `SAR ${analytics.revenue.toLocaleString()}`, link: null },
      ]
    : [];

  const bookingsData = analytics
    ? [
        { sector: t('flights'), value: analytics.flights },
        { sector: t('hotels'), value: analytics.hotels },
        { sector: t('cars'), value: analytics.cars },
        { sector: t('users'), value: analytics.users },
        { sector: t('visa'), value: analytics.visas },
      ]
    : [];

  const revenueData = analytics?.revenueByMonth || [];

  return (
    <div className="p-6 flex flex-col space-y-8">
      {/* Welcome Card */}
      <div className="flex items-center gap-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-xl p-6 text-white shadow-lg">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-2xl font-semibold">{t('welcomeTitle')}</h2>
          <p className="opacity-90 max-w-3xl">{t('welcomeDescription')}</p>
        </div>
      </div>

      {/* Loading and Error */}
      {loading ? (
        <p className="text-center text-gray-600">{t('loading')}</p>
      ) : error ? (
        <p role="alert" className="text-center text-red-600 font-semibold">{error}</p>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.map(({ icon, label, value, link }) => (
              <div
                key={label}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div>{icon}</div>
                <h4 className="mt-3 text-lg font-medium text-gray-700">{label}</h4>
                <p className="mt-1 text-xl font-bold text-indigo-600">{value}</p>
                {link && (
                  <Link
                    to={link}
                    className="mt-2 text-indigo-600 hover:underline text-sm font-semibold"
                  >
                    {t('viewDetails')} →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-center mb-6">{t('activityOverview')}</h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="w-full max-w-lg">
                <h4 className="text-center text-lg font-medium mb-3">{t('sectorWiseBookings')}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366F1" /> {/* Indigo-500 */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full max-w-lg">
                <h4 className="text-center text-lg font-medium mb-3">{t('monthlyRevenueTrend')}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#EC4899" /> {/* Pink-500 */}
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
