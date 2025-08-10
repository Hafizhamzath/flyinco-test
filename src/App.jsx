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

// Login component
import Login from './pages/corporate/Login'; // Make sure to create this page/component

// Styles
import './index.css';


import VisaPage from './pages/corporate/visa';
import SignUpPage from './pages/corporate/Signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUpPage />} />

        {/* Public (Corporate) Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="visa" element={<VisaPage />} />
          {/* Add more public routes here */}
        </Route>

        {/* Admin Dashboard Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="flights" element={<Flights />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="cars" element={<Cars />} />
          <Route path="visa" element={<Visas />} />
          <Route path="calendar" element={<TravelCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
