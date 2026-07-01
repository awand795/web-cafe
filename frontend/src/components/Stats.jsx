import React, { useEffect, useRef } from 'react';
import './Stats.css';

const stats = [
  { icon: '☕', target: 50, suffix: '+', label: 'Menu Spesial' },
  { icon: '🏆', target: 8, suffix: '', label: 'Tahun Berdiri' },
  { icon: '❤️', target: 15000, suffix: '+', label: 'Pelanggan Puas' },
];

const Stats = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEls = el.querySelectorAll('.stats-number');
          numEls.forEach((numEl, i) => {
            const stat = stats[i];
            if (!stat) return;
            let current = 0;
            const target = stat.target;
            const step = Math.max(1, Math.ceil(target / 50));
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              numEl.textContent = current.toLocaleString('id-ID') + stat.suffix;
            }, 25);
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={containerRef}>
      <div className="stats-container">
        {stats.map((stat, i) => (
          <div className="stats-item" key={i}>
            <div className="stats-icon-wrap">
              <span className="stats-icon">{stat.icon}</span>
            </div>
            <div className="stats-info">
              <div className="stats-number">0{stat.suffix}</div>
              <div className="stats-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
