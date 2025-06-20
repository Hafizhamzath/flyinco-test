import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiNavigation,
  FiMapPin,
  FiTruck,
  FiFileText,
  FiX,
  FiGlobe,
} from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: FiHome },
    { name: t('users'), href: '/users', icon: FiUsers },
    { name: t('flights'), href: '/flights', icon: FiNavigation },
    { name: t('hotels'), href: '/hotels', icon: FiMapPin },
    { name: t('cars'), href: '/cars', icon: FiTruck },
    { name: t('visas'), href: '/visas', icon: FiFileText },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <FiGlobe className="brand-icon" />
            <span className="brand-name">Flyinco</span>
          </div>
          <button onClick={onClose} className="sidebar-close-btn">
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <Icon className="sidebar-icon" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
