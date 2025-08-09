import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Admin components
import AdminLayout from './components/admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Flights from './pages/Admin/Flights';
import Hotels from './pages/Admin/Hotels';
import Cars from './pages/Admin/Cars';
import Visas from './pages/Admin/Visas';
import TravelCalendar from './components/admin/Travelcalender';

// Corporate components
import Layout from './components/corporate/Layout';
import Home from './pages/corporate/Home'; // create this page if it doesn't exist


// Styles

import './index.css';

import  VisaApplicationForm  from './components/corporate/Forms/visa_application';
import VisaPage from './pages/corporate/visa';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public (Corporate) Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/visa" element={<VisaPage />} />
          {/* Add more public routes here */}
        </Route>

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/flights" element={<Flights />} />
          <Route path="/admin/hotels" element={<Hotels />} />
          <Route path="/admin/cars" element={<Cars />} />
          <Route path="/admin/visa" element={<Visas />} />
          <Route path="/admin/calendar" element={<TravelCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
