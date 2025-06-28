import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="app-container" dir={isRTL ? 'rtl' : 'ltr'} data-dir={isRTL ? 'rtl' : 'ltr'}>
      {!isRTL && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
      
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      
      {isRTL && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
    </div>
  );
};

export default Layout;
