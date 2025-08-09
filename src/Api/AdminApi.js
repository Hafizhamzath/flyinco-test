const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiGet(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return await res.json();
}

async function apiPost(endpoint, data = {}) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return await res.json();
}

// Admin-related data fetches
export const getAnalytics = () => apiGet('admin/analytics');
export const getUsers = () => apiGet('admin/users');
export const getBookings = () => apiGet('admin/bookings');
export const getFlightBookings = () => apiGet('admin/bookings?type=flight');
export const getHotelBookings = () => apiGet('admin/bookings?type=hotel');
export const getCarBookings = () => apiGet('admin/bookings?type=car');
export const getVisaBookings = () =>
  apiGet('admin/bookings?type=visa');


export const resetOtpLimit = (userId) =>
  apiPost(`admin/users/${userId}/reset-otp`);



// Push a booking to TRAACS
export const pushToTraacs = (bookingId) =>
  apiPost(`admin/bookings/${bookingId}/push-traacs`);
