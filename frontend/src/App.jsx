import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Catalog from './components/Catalog';
import ReservationModal from './components/ReservationModal';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// ===== PUBLIC HOME =====
function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('section-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Catalog />
      </main>
      <Footer />
      <ReservationModal />
    </>
  );
}

// ===== PROTECTED ROUTE =====
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

// ===== APP =====
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
