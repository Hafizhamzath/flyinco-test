import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../context/admin/LanguageContext';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const expandedWidth = 250; // Sidebar expanded width in px
  const collapsedWidth = 80; // Sidebar collapsed width in px

  const sidebarWidth = collapsed ? collapsedWidth : expandedWidth;

  return (
    <div className="app-container" dir={isRTL ? 'rtl' : 'ltr'} data-dir={isRTL ? 'rtl' : 'ltr'}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="flex flex-col flex-grow min-h-screen transition-padding duration-300 ease-in-out"
        style={{
          paddingLeft: !isRTL ? sidebarWidth : undefined,
          paddingRight: isRTL ? sidebarWidth : undefined,
        }}
      >
        <Topbar collapsed={collapsed} />

        <main className="page-content p-4 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
