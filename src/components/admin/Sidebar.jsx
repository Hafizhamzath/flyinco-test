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
  Calendar as CalendarIcon,
} from 'lucide-react';

import logo from '../../assets/logo.png';
import { useLanguage } from '../../context/admin/LanguageContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const toggleSidebar = () => setCollapsed(!collapsed);
  const { t } = useLanguage();

  const navItems = [
    { icon: <Home />, label: 'dashboard', path: '' },
    { icon: <Users />, label: 'users', path: 'users' },
    { icon: <Plane />, label: 'flights', path: 'flights' },
    { icon: <Hotel />, label: 'hotels', path: 'hotels' },
    { icon: <Car />, label: 'cars', path: 'cars' },
    { icon: <BadgeCheck />, label: 'visa', path: 'visa' },
    { icon: <CalendarIcon />, label: 'calendar', path: 'calendar' },
  ];

  // Detect RTL or LTR from html or body attribute for tooltip position
  const dir = document.documentElement.dir || 'ltr';

  return (
    <div
      className={`fixed top-0 h-screen bg-purple-900 text-white flex flex-col transition-width duration-300 ease-in-out z-50
        ${collapsed ? 'w-20' : 'w-64'}
        ${dir === 'rtl' ? 'right-0' : 'left-0'}
      `}
    >
      <div className="flex items-center justify-between p-4 min-h-[60px] border-b border-purple-600 relative">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <img src={logo} alt="Flyinco Logo" className="h-10 w-10 object-contain" />
            <h1 className="font-bold text-xl text-purple-400 whitespace-nowrap">FLYINCO</h1>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`absolute top-4 ${dir === 'rtl' ? 'left-2' : 'right-2'} text-purple-400 focus:outline-none`}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      <nav className="flex flex-col flex-grow py-4 space-y-1">
        {navItems.map(({ icon, label, path }) => (
          <Link
            key={label}
            to={`/admin${path ? `/${path}` : ''}`}
            className="relative flex items-center gap-4 py-3 px-4 hover:bg-purple-700 transition-colors rounded-md"
            data-tooltip={t(label)}
          >
            <div className="text-purple-300">{icon}</div>
            {!collapsed && <span>{t(label)}</span>}

            {/* Tooltip for collapsed */}
            {collapsed && (
              <span
                className={`
                  absolute top-1/2 transform -translate-y-1/2
                  whitespace-nowrap bg-purple-600 text-white text-xs px-2 py-1 rounded
                  opacity-0 pointer-events-none
                  group-hover:opacity-100
                  transition-opacity duration-200
                  ${dir === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'}
                `}
              >
                {t(label)}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-purple-600 py-4">
        <a
          href="#"
          className="relative flex items-center gap-4 py-3 px-4 hover:bg-purple-700 transition-colors rounded-md"
          data-tooltip={t('logout')}
        >
          <LogOut className="text-purple-300" />
          {!collapsed && <span>{t('logout')}</span>}

          {/* Tooltip for collapsed */}
          {collapsed && (
            <span
              className={`
                absolute top-1/2 transform -translate-y-1/2
                whitespace-nowrap bg-purple-600 text-white text-xs px-2 py-1 rounded
                opacity-0 pointer-events-none
                group-hover:opacity-100
                transition-opacity duration-200
                ${dir === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'}
              `}
            >
              {t('logout')}
            </span>
          )}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
