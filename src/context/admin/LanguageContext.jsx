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

    // Dashboard specific
    totalUsers: "Total Users",
    flightBookings: "Flight Bookings",
    hotelReservations: "Hotel Reservations",
    carRentals: "Car Rentals",
    visaApplications: "Visa Applications",
    totalRevenue: "Total Revenue",
    welcomeTitle: "Welcome to Flyinco Admin!",
    welcomeDescription: "Your command center for corporate travel excellence.\nEasily manage users, bookings, and applications across all services — flights, hotels, cars, and visas — from a single powerful interface.\nLeverage insights, streamline operations, and deliver exceptional experiences every step of the journey.",
    loading: "Loading dashboard data...",
    error: "Failed to fetch analytics",
    activityOverview: "Recent Activity Overview",
    sectorWiseBookings: "Sector-Wise Bookings",
    monthlyRevenueTrend: "Monthly Revenue Trend",

    //user specifc
    loadingUsers: "Loading users...",
    failedToLoadUsers: "Failed to load users",

    //flight specifc
    flightManagement: "Flight Bookings",
    flightManagementDescription: "Manage all flight bookings. Filter by status, view details, and push confirmed bookings to TRAACS.",
    searchFlightsPlaceholder: "Search by passenger name or flight",
    loadingFlights: "Loading flights...",
    flightDetails: "Flight Details",
    passenger: "Passenger",
    flight: "Flight",
    route: "Route",
    departure: "Departure",
    status: "Status",
    pnr: "PNR",
    close: "Close",

    //hotel specific
    hotelBookingDetails: "Hotel Booking Details",
    guestName: "Guest Name",
    hotel: "Hotel",
    city: "City",
    checkIn: "Check-In",
    checkOut: "Check-Out",

    //car specific
    carManagementDescription: "Monitor and manage all car rental bookings.",
    searchCarsPlaceholder: "Search renters...",
    rentalDetails: "Rental Details",
    renterName: "Renter Name",
    pickupLocation: "Pickup Location",
    destination: "Destination",
    carModel: "Car Model",
    pickupDate: "Pickup Date",
    returnDate: "Return Date",

    //visa specific
    visaManagementDescription: "Track and manage all visa applications.",
    searchApplicantsPlaceholder: "Search applicants...",
    visaDetails: "Visa Details",
    applicantName: "Applicant Name",
    country: "Country",
    visaType: "Visa Type",
    submissionDate: "Submission Date",
    applicationId: "Application ID",

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
    viewDetails: "عرض التفاصيل لـ",

    // Dashboard specific
    totalUsers: "إجمالي المستخدمين",
    flightBookings: "حجوزات الرحلات",
    hotelReservations: "حجوزات الفنادق",
    carRentals: "تأجير السيارات",
    visaApplications: "طلبات التأشيرة",
    totalRevenue: "إجمالي الإيرادات",
    welcomeTitle: "مرحبًا بك في لوحة فلاينكو!",
    welcomeDescription: "مركز التحكم الخاص بك لتجربة سفر احترافية.\nقم بإدارة المستخدمين والحجوزات والطلبات لجميع الخدمات - الرحلات، الفنادق، السيارات، والتأشيرات - من مكان واحد.\nاستفد من التحليلات وسهّل العمليات ووفّر تجربة استثنائية في كل خطوة.",
    loading: "جارٍ تحميل بيانات لوحة التحكم...",
    error: "فشل في جلب بيانات التحليلات",
    activityOverview: "نظرة عامة على النشاط الأخير",
    sectorWiseBookings: "الحجوزات حسب القطاع",
    monthlyRevenueTrend: "اتجاه الإيرادات الشهرية",
    //userspecific
    loadingUsers: "جارٍ تحميل المستخدمين...",
    failedToLoadUsers: "فشل في تحميل المستخدمين",
    //flight specific
     flightManagement: "حجوزات الرحلات",
      flightManagementDescription: "قم بإدارة جميع حجوزات الرحلات. صفِّ حسب الحالة، اعرض التفاصيل، وادفع الحجوزات المؤكدة إلى TRAACS.",
      searchFlightsPlaceholder: "ابحث باسم الراكب أو الرحلة",
      loadingFlights: "جارٍ تحميل الرحلات...",
      flightDetails: "تفاصيل الرحلة",
      passenger: "الراكب",
      flight: "الرحلة",
      route: "المسار",
      departure: "المغادرة",
      status: "الحالة",
      pnr: "رقم الحجز (PNR)",
      close: "إغلاق",
      //hotel specific
      hotelBookingDetails: "تفاصيل حجز الفندق",
      guestName: "اسم الضيف",
      hotel: "الفندق",
      city: "المدينة",
      checkIn: "تسجيل الوصول",
      checkOut: "تسجيل المغادرة",
      //car specific
      carManagementDescription: "راقب وأدر جميع حجوزات تأجير السيارات.",
      searchCarsPlaceholder: "ابحث عن المستأجرين...",
      rentalDetails: "تفاصيل التأجير",
      renterName: "اسم المستأجر",
      pickupLocation: "مكان الاستلام",
      destination: "الوجهة",
      carModel: "طراز السيارة",
      pickupDate: "تاريخ الاستلام",
      returnDate: "تاريخ الإرجاع",

      //visa specific
      visaManagementDescription: "تتبع وإدارة جميع طلبات التأشيرة.",
      searchApplicantsPlaceholder: "ابحث عن المتقدمين...",
      visaDetails: "تفاصيل التأشيرة",
      applicantName: "اسم المتقدم",
      country: "الدولة",
      visaType: "نوع التأشيرة",
      submissionDate: "تاريخ التقديم",
      applicationId: "رقم الطلب",


      
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
