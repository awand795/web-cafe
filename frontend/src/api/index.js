import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchMenus = async ({ queryKey } = {}) => {
  const params = {};
  // queryKey bisa berupa ['menus'] atau ['menus', { page: 1 }]
  if (queryKey && queryKey[1]) {
    if (queryKey[1].page) params.page = queryKey[1].page;
    if (queryKey[1].per_page) params.per_page = queryKey[1].per_page;
  }
  return await api.get('/menus', { params });
};

export const submitReservation = async (data) => {
  return await api.post('/reservations', data);
};
