import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    flights: 'Flights',
    hotels: 'Hotels',
    cars: 'Cars',
    visas: 'Visas',
    profile: 'Profile',
    logout: 'Logout',
    search: 'Search',
    filter: 'Filter',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    welcome: 'Welcome to Travel Management Dashboard',
    totalUsers: 'Total Users',
    totalBookings: 'Total Bookings',
    pendingApplications: 'Pending Applications',
    revenue: 'Revenue',
    onlineUsers: 'Online Users',
    chat: 'Chat',
    sendMessage: 'Send Message',
    typeMessage: 'Type your message...',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    users: 'المستخدمين',
    flights: 'الطيران',
    hotels: 'الفنادق',
    cars: 'السيارات',
    visas: 'التأشيرات',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    search: 'بحث',
    filter: 'تصفية',
    status: 'الحالة',
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'معلق',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    role: 'الدور',
    actions: 'الإجراءات',
    edit: 'تحرير',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    add: 'إضافة',
    welcome: 'مرحباً بك في لوحة إدارة السفر',
    totalUsers: 'إجمالي المستخدمين',
    totalBookings: 'إجمالي الحجوزات',
    pendingApplications: 'الطلبات المعلقة',
    revenue: 'الإيرادات',
    onlineUsers: 'المستخدمين المتصلين',
    chat: 'الدردشة',
    sendMessage: 'إرسال رسالة',
    typeMessage: 'اكتب رسالتك...',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};