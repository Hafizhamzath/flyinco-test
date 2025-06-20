import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="profile-button">
        <img src={user.avatar} alt={user.name} className="profile-avatar" />
        <span className="profile-name">{user.name}</span>
        <FiChevronDown className="profile-chevron" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <p className="name">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              // Navigate to profile
            }}
            className="dropdown-item"
          >
            <FiUser className="icon" />
            {t('profile')}
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="dropdown-item logout"
          >
            <FiLogOut className="icon" />
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
