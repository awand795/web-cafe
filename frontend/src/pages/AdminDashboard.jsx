import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { adminLogout } from '../api/admin';
import {
  fetchAdminMenus, createAdminMenu, updateAdminMenu, deleteAdminMenu,
  fetchAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory,
  fetchAdminReservations, updateReservationStatus, deleteAdminReservation,
} from '../api/admin';
import './AdminDashboard.css';

// ===== HELPERS =====
const formatPrice = (p) => `Rp ${Number(p).toLocaleString('id-ID')}`;
const getEmoji = (cat) => {
  const map = { Kopi: '☕', 'Non Kopi': '🌸', 'Makanan Ringan': '🍟', 'Makanan Berat': '🍛', Dessert: '🍰', 'Roti & Pastry': '🥐' };
  return map[cat] || '✨';
};

// ===== MODAL =====
const Modal = ({ title, children, onClose }) => (
  <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="admin-modal">
      <h3>{title}</h3>
      {children}
    </div>
  </div>
);

// ===== MENUS TAB =====
const MenusTab = ({ menus, categories, refresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ category_id: '', name: '', description: '', price: '', image_url: '', is_popular: false });

  const openAdd = () => { setEditId(null); setForm({ category_id: categories[0]?.id || '', name: '', description: '', price: '', image_url: '', is_popular: false }); setShowModal(true); };
  const openEdit = (m) => { setEditId(m.id); setForm({ category_id: m.category_id, name: m.name, description: m.description || '', price: m.price, image_url: m.image_url || '', is_popular: !!m.is_popular }); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editId) await updateAdminMenu(editId, payload);
    else await createAdminMenu(payload);
    setShowModal(false);
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus menu ini?')) {
      await deleteAdminMenu(id);
      refresh();
    }
  };

  return (
    <>
      <div className="admin-content-header">
        <h2>📋 Daftar Menu</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Tambah Menu</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th></th><th>Nama</th><th>Kategori</th><th>Harga</th><th>Favorit</th><th></th></tr></thead>
          <tbody>
            {menus.length === 0 && <tr><td colSpan={6}><div className="admin-empty">Belum ada menu</div></td></tr>}
            {menus.map((m) => (
              <tr key={m.id}>
                <td>
                  {m.image_url ? <img src={m.image_url} className="menu-img" alt="" />
                    : <span className="menu-img-placeholder">{getEmoji(m.category?.name)}</span>}
                </td>
                <td><strong>{m.name}</strong><br /><span style={{ fontSize: '0.78rem', color: '#9B8B80' }}>{m.description?.slice(0, 50)}</span></td>
                <td>{m.category?.name}</td>
                <td>{formatPrice(m.price)}</td>
                <td>{m.is_popular ? '⭐' : '—'}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => openEdit(m)}>✏ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(m.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title={editId ? 'Edit Menu' : 'Tambah Menu'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Kategori</label>
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Nama Menu</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Deskripsi</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Harga (Rp)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Favorit?</label>
                <select value={form.is_popular ? '1' : '0'} onChange={(e) => setForm({ ...form, is_popular: e.target.value === '1' })}>
                  <option value="0">Tidak</option>
                  <option value="1">Ya ⭐</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>URL Gambar</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

// ===== CATEGORIES TAB =====
const CategoriesTab = ({ categories, refresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const openAdd = () => { setEditId(null); setName(''); setError(''); setShowModal(true); };
  const openEdit = (c) => { setEditId(c.id); setName(c.name); setError(''); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      if (editId) await updateAdminCategory(editId, name);
      else await createAdminCategory(name);
      setShowModal(false);
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus kategori ini?')) {
      try {
        await deleteAdminCategory(id);
        refresh();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal hapus');
      }
    }
  };

  return (
    <>
      <div className="admin-content-header">
        <h2>📂 Kategori</h2>
        <button className="btn btn-primary" onClick={openAdd}>+ Tambah Kategori</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Nama</th><th>Slug</th><th>Jumlah Menu</th><th></th></tr></thead>
          <tbody>
            {categories.length === 0 && <tr><td colSpan={4}><div className="admin-empty">Belum ada kategori</div></td></tr>}
            {categories.map((c) => (
              <tr key={c.id}>
                <td><strong>{getEmoji(c.name)} {c.name}</strong></td>
                <td style={{ color: '#9B8B80', fontSize: '0.82rem' }}>{c.slug}</td>
                <td>{c.menus_count}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => openEdit(c)}>✏ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(c.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title={editId ? 'Edit Kategori' : 'Tambah Kategori'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSave}>
            {error && <div className="admin-login-error">{error}</div>}
            <div className="form-group">
              <label>Nama Kategori</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="cth: Minuman Segar" required />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

// ===== RESERVATIONS TAB =====
const ReservationsTab = ({ reservations, refresh }) => {
  const handleStatus = async (id, status) => {
    await updateReservationStatus(id, status);
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus reservasi ini?')) {
      await deleteAdminReservation(id);
      refresh();
    }
  };

  const statusClass = (s) => {
    const map = { pending: 'status-pending', confirmed: 'status-confirmed', cancelled: 'status-cancelled', completed: 'status-completed' };
    return map[s] || 'status-pending';
  };

  return (
    <>
      <div className="admin-content-header">
        <h2>📅 Reservasi</h2>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Nama</th><th>Telepon</th><th>Tanggal</th><th>Waktu</th><th>Tamu</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {reservations.length === 0 && <tr><td colSpan={7}><div className="admin-empty">Belum ada reservasi</div></td></tr>}
            {reservations.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.name}</strong></td>
                <td style={{ fontSize: '0.82rem' }}>{r.phone}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
                <td>
                  <select
                    className={`status-badge ${statusClass(r.status)}`}
                    value={r.status}
                    onChange={(e) => handleStatus(r.id, e.target.value)}
                    style={{ border: 'none', cursor: 'pointer', appearance: 'auto' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="actions">
                  <button className="delete-btn" onClick={() => handleDelete(r.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ===== DASHBOARD =====
const AdminDashboard = () => {
  const [tab, setTab] = useState('menus');
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const [mRes, cRes, rRes] = await Promise.all([
        fetchAdminMenus(), fetchAdminCategories(), fetchAdminReservations(),
      ]);
      setMenus(mRes.data.data);
      setCategories(cRes.data.data);
      setReservations(rRes.data.data);
    } catch { /* auto logout by interceptor */ }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleLogout = async () => {
    try { await adminLogout(); } catch {}
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { key: 'menus', label: '📋 Menu', count: menus.length },
    { key: 'categories', label: '📂 Kategori', count: categories.length },
    { key: 'reservations', label: '📅 Reservasi', count: reservations.length },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-topbar-brand">Bikin <span>Cafe</span></div>
        </div>
        <div className="admin-topbar-user">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Keluar</button>
        </div>
      </div>

      <div className="admin-body">
        <div className="admin-sidebar">
          {tabs.map((t) => (
            <button key={t.key} className={`admin-sidebar-item ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {t.label} <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#9B8B80' }}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="admin-content">
          {tab === 'menus' && <MenusTab menus={menus} categories={categories} refresh={fetchAll} />}
          {tab === 'categories' && <CategoriesTab categories={categories} refresh={fetchAll} />}
          {tab === 'reservations' && <ReservationsTab reservations={reservations} refresh={fetchAll} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
