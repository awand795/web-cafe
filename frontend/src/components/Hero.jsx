import React, { useEffect, useRef } from 'react';
import useUiStore from '../store/useUiStore';
import './Hero.css';

const Hero = () => {
  const openReservationModal = useUiStore((state) => state.openReservationModal);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Floating particles
    const container = particlesRef.current;
    if (!container) return;
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        animation-delay: ${Math.random() * 10}s;
        animation-duration: ${8 + Math.random() * 8}s;
        opacity: ${0.05 + Math.random() * 0.15};
      `;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach(p => p.remove());
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-grain"></div>
      <div className="hero-glow"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>
      <div ref={particlesRef} className="hero-particles"></div>

      <div className="hero-content">
        <div className="hero-badge animate-fade-up delay-1">
          <span className="badge-dot"></span>
          Buka Setiap Hari · 07.00 – 21.00
        </div>

        <h1 className="heading-hero animate-fade-up delay-2">
          Nikmati<br />
          <span className="hero-highlight">Setiap Sajian</span>
        </h1>
        <div className="hero-divider animate-fade-up delay-2"></div>

        <p className="hero-subtitle animate-fade-up delay-3">
          Setiap tegukan bercerita, setiap gigitan terasa seperti di rumah
        </p>

        <div className="hero-cta animate-fade-up delay-4">
          <button className="btn btn-primary" onClick={openReservationModal}>
            ✦ Pesan Meja
          </button>
          <a href="#menu" className="btn btn-outline">
            Lihat Menu ↓
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line"></div>
        <span>Gulir</span>
      </div>
    </section>
  );
};

export default Hero;
