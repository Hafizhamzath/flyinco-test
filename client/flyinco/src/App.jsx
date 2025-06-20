import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Cars from './pages/Cars';
import Visas from './pages/Visas';
import Profile from './pages/Profile';
import './styles/index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ChatProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/visas" element={<Visas />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </ChatProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
