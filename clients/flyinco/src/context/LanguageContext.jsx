import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    brand: "Flyinco Admin",
    dashboard: "Dashboard",
    users: "Users",
    flights: "Flights",
    hotels: "Hotels",
    cars: "Cars",
    visa: "Visa",
    logout: "Logout",
    chat: "Chat",
    translate: "Translate",
    theme: "Theme Toggle",
    profile: "Profile",
    userManagement: "User Management",
    userManagementDescription: "View, filter, and manage user accounts. Edit roles, verification status, and perform other administrative actions.",
    searchPlaceholder: "Search by name or email",
    for: "for",
    hotelManagement: "Hotel Reservations",
    hotelManagementDescription: "Oversee all hotel reservations. View statuses, dates, and guest info.",
    searchHotelsPlaceholder: "Search by guest or hotel name",
    viewDetails: "View details for",
  },
  ar: {
    brand: "فلاينكو المسؤول",
    dashboard: "لوحة التحكم",
    users: "المستخدمون",
    flights: "الرحلات",
    hotels: "الفنادق",
    cars: "السيارات",
    visa: "التأشيرة",
    logout: "تسجيل الخروج",
    chat: "محادثة",
    translate: "الترجمة",
    theme: "تغيير النمط",
    profile: "الملف الشخصي",
    userManagement: "إدارة المستخدمين",
    userManagementDescription: "عرض وتصفية وإدارة حسابات المستخدمين. تعديل الأدوار وحالة التحقق وأداء الإجراءات الإدارية الأخرى.",
    searchPlaceholder: "ابحث بالاسم أو البريد الإلكتروني",
    for: "لـ",
    hotelManagement: "حجوزات الفنادق",
    hotelManagementDescription: "تصفح جميع حجوزات الفنادق. عرض الحالة والتواريخ ومعلومات الضيف.",
    searchHotelsPlaceholder: "ابحث باسم الضيف أو الفندق",
    viewDetails: "عرض التفاصيل لـ"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('language') || 'en'
  );

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('language', nextLang);
  };

  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
