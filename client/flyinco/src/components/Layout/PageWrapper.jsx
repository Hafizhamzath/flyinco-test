import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatPanel from '../Chat/ChatPanel';
import '../../styles/DashboardLayout.css';

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dashboard-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="dashboard-content">
          <div className="dashboard-container">{children}</div>
        </main>
      </div>
      <ChatPanel />
    </div>
  );
};

export default PageWrapper;
