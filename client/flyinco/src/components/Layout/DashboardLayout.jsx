import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatPanel from '../Chat/ChatPanel';
import '../../styles/DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="dashboard-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="dashboard-content">
          <div className="dashboard-container">
            <Outlet /> {/* 👈 This will render your page content */}
          </div>
        </main>
      </div>

      {/* Chat Panel */}
      <ChatPanel />
    </div>
  );
};

export default DashboardLayout;
