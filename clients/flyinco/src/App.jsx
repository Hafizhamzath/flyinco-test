import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Flights from './pages/Flights'; // newly added

import './styles/Sidebar.css';
import './styles/Topbar.css';
import './index.css';
import Hotels from './pages/Hotels';
import Cars from './pages/Cars';
import Visas from './pages/Visas';
import TravelCalendar from './components/Travelcalender';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="flights" element={<Flights />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="cars" element={<Cars />} />
          <Route path="visa" element={<Visas />} />
          <Route path="calendar" element={<TravelCalendar />} />
          {/* Add more routes here: hotels, cars, visa, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
