import React, { useState } from 'react';
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiGlobe,
  FiMessageCircle
} from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useChat } from '../../contexts/ChatContext';
import ProfileDropdown from '../Profile/ProfileDropdown';
import '../../styles/Header.css';

const Header = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toggleChat, onlineUsers } = useChat();

  const onlineCount = onlineUsers.filter(user => user.status === 'online').length;

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="menu-button-wrapper">
          <button className="menu-button" onClick={onMenuClick}>
            <FiMenu className="icon" />
          </button>
        </div>

        <div className="header-actions">
          <button className="icon-button" onClick={toggleChat}>
            <FiMessageCircle className="icon" />
            {onlineCount > 0 && (
              <span className="badge">{onlineCount}</span>
            )}
          </button>

          <button className="icon-button" onClick={toggleLanguage}>
            <FiGlobe className="icon" />
            <span className="lang">{language.toUpperCase()}</span>
          </button>

          <button className="icon-button" onClick={toggleTheme}>
            {isDark ? <FiSun className="icon" /> : <FiMoon className="icon" />}
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
