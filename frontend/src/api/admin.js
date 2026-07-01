import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const adminApi = axios.create({
  baseURL: 'http://localhost:8000/api/admin',
});

// Attach token to every request
adminApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — auto logout
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.hash = '#/admin/login';
    }
    return Promise.reject(err);
  }
);

// ===== AUTH =====
export const adminLogin = (email, password) =>
  adminApi.post('/login', { email, password });

export const adminLogout = () => adminApi.post('/logout');

export const adminMe = () => adminApi.get('/me');

// ===== MENUS =====
export const fetchAdminMenus = () => adminApi.get('/menus');
export const fetchAdminMenu = (id) => adminApi.get(`/menus/${id}`);
export const createAdminMenu = (data) => adminApi.post('/menus', data);
export const updateAdminMenu = (id, data) => adminApi.put(`/menus/${id}`, data);
export const deleteAdminMenu = (id) => adminApi.delete(`/menus/${id}`);

// ===== CATEGORIES =====
export const fetchAdminCategories = () => adminApi.get('/categories');
export const createAdminCategory = (name) => adminApi.post('/categories', { name });
export const updateAdminCategory = (id, name) => adminApi.put(`/categories/${id}`, { name });
export const deleteAdminCategory = (id) => adminApi.delete(`/categories/${id}`);

// ===== RESERVATIONS =====
export const fetchAdminReservations = () => adminApi.get('/reservations');
export const fetchAdminReservation = (id) => adminApi.get(`/reservations/${id}`);
export const updateReservationStatus = (id, status) => adminApi.put(`/reservations/${id}/status`, { status });
export const deleteAdminReservation = (id) => adminApi.delete(`/reservations/${id}`);
