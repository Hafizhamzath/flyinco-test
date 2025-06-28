import React from 'react';
import {
  Home,
  Users,
  Plane,
  Hotel,
  Car,
  BadgeCheck,
  LogOut,
  Menu,
  X,
  Calendar as CalendarIcon
} from 'lucide-react';

import '../styles/Sidebar.css';
import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const toggleSidebar = () => setCollapsed(!collapsed);
  const { t } = useLanguage();

  const navItems = [
    { icon: <Home />, label: 'dashboard' },
    { icon: <Users />, label: 'users' },
    { icon: <Plane />, label: 'flights' },
    { icon: <Hotel />, label: 'hotels' },
    { icon: <Car />, label: 'cars' },
    { icon: <BadgeCheck />, label: 'visa' },
    { icon: <CalendarIcon />, label: 'Calendar' } // ✅ Travel Calendar added
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="logo-container">
            <img src={logo} alt="Flyinco Logo" className="logo" />
            <h1 className="brand">FLYINCO</h1>
          </div>
        )}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <Menu /> : <X />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ icon, label }) => (
          <Link
            to={label === 'dashboard' ? '/' : `/${label}`}
            key={label}
            className="nav-item"
            data-tooltip={t(label)}
          >
            {icon}
            {!collapsed && <span>{t(label)}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="#" className="nav-item" data-tooltip={t('logout')}>
          <LogOut />
          {!collapsed && <span>{t('logout')}</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
