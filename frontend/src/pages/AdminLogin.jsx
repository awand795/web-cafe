import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { adminLogin } from '../api/admin';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLogin(email, password);
      const { token, user } = res.data.data;
      setAuth(token, user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            Bikin <span>Cafe</span>
          </div>
          <div className="admin-login-sub">Panel Admin</div>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bikincafe.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Memproses...' : '✦ Masuk'}
          </button>
        </form>

        <a href="/" className="admin-login-back">← Kembali ke Beranda</a>
      </div>
    </div>
  );
};

export default AdminLogin;
