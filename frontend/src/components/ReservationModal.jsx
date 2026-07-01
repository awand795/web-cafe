import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useUiStore from '../store/useUiStore';
import { submitReservation } from '../api';
import './ReservationModal.css';

const ReservationModal = () => {
  const { isReservationModalOpen, closeReservationModal } = useUiStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_request: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  const mutation = useMutation({
    mutationFn: submitReservation,
    onSuccess: () => {
      setSuccessMsg('Meja Anda berhasil dipesan.');
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setSuccessMsg('');
          setFadeOut(false);
          closeReservationModal();
          setFormData({ name: '', phone: '', date: '', time: '', guests: 2, special_request: '' });
        }, 300);
      }, 2500);
    },
  });

  if (!isReservationModalOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        closeReservationModal();
      }, 300);
    }
  };

  return (
    <div className={`modal-backdrop ${fadeOut ? 'fade-out' : ''}`} onClick={handleBackdropClick}>
      <div className={`modal-content ${fadeOut ? 'scale-out' : ''}`}>
        <button className="modal-close" onClick={() => {
          setFadeOut(true);
          setTimeout(() => { setFadeOut(false); closeReservationModal(); }, 300);
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-header">
          <span className="modal-emoji">✦</span>
          <h2>Reservasi Meja</h2>
          <p>Bergabunglah untuk pengalaman tak terlupakan.</p>
          <div className="modal-divider"></div>
        </div>

        {successMsg ? (
          <div className={`success-message ${fadeOut ? 'fade-out' : ''}`}>
            <div className="success-icon-wrapper">
              <span className="success-icon">✓</span>
            </div>
            <p>{successMsg}</p>
          </div>
        ) : (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Masukkan nama Anda" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+62 8xx-xxxx-xxxx" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Tanggal</label>
                <input type="date" id="date" name="date" min={today} value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="time">Waktu</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guests">Jumlah Tamu</label>
              <div className="guest-select-wrapper">
                <select id="guests" name="guests" value={formData.guests} onChange={handleChange}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Tamu</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="special_request">Permintaan Khusus</label>
              <textarea id="special_request" name="special_request" rows="3" value={formData.special_request} onChange={handleChange} placeholder="Alergi, perayaan, atau hal lain yang perlu kami ketahui..."></textarea>
            </div>

            {mutation.isError && (
              <div className="error-message">
                <span>⚠</span> Gagal memesan meja. Periksa kembali data Anda.
              </div>
            )}

            <button type="submit" className="btn btn-primary submit-btn" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Mengonfirmasi...
                </span>
              ) : (
                '✦ Konfirmasi Reservasi'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
