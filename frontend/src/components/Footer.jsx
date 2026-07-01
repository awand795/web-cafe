import React, { useState } from 'react';
import './Footer.css';

const Icons = {
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  TikTok: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      alert('Terima kasih! Anda telah berlangganan newsletter kami.');
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-orb footer-orb-1"></div>
      <div className="footer-orb footer-orb-2"></div>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Bikin<br />Cafe</h3>
            <div className="footer-brand-line"></div>
            <p>
              Nikmati setiap sajian, rasakan kehangatannya. Pengalaman butik 
              untuk para pecinta kopi dan kuliner Nusantara.
            </p>

            <div className="footer-newsletter">
              <div className="footer-newsletter-label">✉ Newsletter</div>
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Email Anda..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Langganan</button>
              </form>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Jam Buka</h4>
              <ul>
                <li><span>Senin – Jumat</span> 07.00 – 20.00</li>
                <li><span>Sabtu</span> 08.00 – 21.00</li>
                <li><span>Minggu</span> 08.00 – 18.00</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontak</h4>
              <ul>
                <li>Jl. Kopi Nikmat No. 123</li>
                <li>Kel. Cicendo, Bandung 40112</li>
                <li><a href="mailto:halo@bikincafe.com">halo@bikincafe.com</a></li>
                <li><a href="tel:+6281234567890">+62 812-3456-7890</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Sosial Media</h4>
              <div className="footer-socials">
                <a href="#" className="social-link" aria-label="Instagram">
                  <Icons.Instagram />
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <Icons.Facebook />
                </a>
                <a href="#" className="social-link" aria-label="Twitter / X">
                  <Icons.Twitter />
                </a>
                <a href="#" className="social-link" aria-label="TikTok">
                  <Icons.TikTok />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <Icons.YouTube />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Bikin Cafe. Dibuat dengan penuh cinta.</p>
          <div className="footer-bottom-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
