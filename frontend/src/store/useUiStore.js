import { create } from 'zustand';

const useUiStore = create((set) => ({
  activeCategory: 'Semua',
  setActiveCategory: (category) => set({ activeCategory: category }),
  
  isReservationModalOpen: false,
  openReservationModal: () => set({ isReservationModalOpen: true }),
  closeReservationModal: () => set({ isReservationModalOpen: false }),
}));

export default useUiStore;
