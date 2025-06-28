import React from 'react';
import {
  MessageCircle, Languages, Sun, Moon, User, Calendar as CalendarIcon
} from 'lucide-react';

import '../styles/Topbar.css';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>{t('brand')}</h2>
      </div>
      <div className="topbar-right">
        <div className="icon-wrapper" data-tooltip={t('calendar')}>
          <CalendarIcon />
        </div>
        <div className="icon-wrapper" data-tooltip={t('chat')}>
          <MessageCircle />
        </div>
        <div
          className="icon-wrapper"
          data-tooltip={t('translate')}
          onClick={toggleLanguage}
        >
          <Languages />
        </div>
        <div
          className="icon-wrapper"
          data-tooltip={t('theme')}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </div>
        <div className="icon-wrapper" data-tooltip={t('profile')}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
