import React from 'react';
import {
  MessageCircle,
  Languages,
  Sun,
  Moon,
  User,
  Calendar as CalendarIcon,
} from 'lucide-react';

import { useTheme } from '../../context/admin/ThemeContext';
import { useLanguage } from '../../context/admin/LanguageContext';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage, t } = useLanguage();

  return (
    <div
      className="sticky top-0 z-50 flex justify-between items-center h-16 px-6 border-b border-gray-300 bg-white text-gray-900"
    >
      <div>
        <h2 className="text-xl font-semibold text-purple-900">{t('brand')}</h2>
      </div>

      <div className="flex gap-6 text-purple-900">
        <IconWrapper tooltip={t('calendar')}>
          <CalendarIcon />
        </IconWrapper>

        <IconWrapper tooltip={t('chat')}>
          <MessageCircle />
        </IconWrapper>

        <IconWrapper tooltip={t('translate')} onClick={toggleLanguage} clickable>
          <Languages />
        </IconWrapper>

        <IconWrapper tooltip={t('theme')} onClick={toggleTheme} clickable>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </IconWrapper>

        <IconWrapper tooltip={t('profile')}>
          <User />
        </IconWrapper>
      </div>
    </div>
  );
};

const IconWrapper = ({ tooltip, children, onClick, clickable }) => (
  <div
    className={`relative flex items-center p-1 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
    onClick={onClick}
    tabIndex={clickable ? 0 : -1}
    role={clickable ? 'button' : undefined}
    onKeyDown={(e) => {
      if (clickable && (e.key === 'Enter' || e.key === ' ')) {
        onClick();
      }
    }}
    aria-label={tooltip}
  >
    {children}
    <span className="absolute bottom-[-1.6rem] left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-purple-900 px-2 py-1 text-xs text-white opacity-0 pointer-events-none transition-opacity hover:opacity-100">
      {tooltip}
    </span>
  </div>
);

export default Topbar;
