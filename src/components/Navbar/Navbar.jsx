import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'projects', href: '#projects' },
  { label: 'process', href: '#process' },
  { label: 'contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="logo-icon">&gt;_</span>
            <span className="logo-text">dhruv.anand</span>
            <span className="logo-cursor" />
          </a>

          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-status">
            <span className="status-dot" />
            <span>Available for hire</span>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            <span style={{ color: 'var(--accent-green)', marginRight: 8 }}>$</span>
            cd ~/{item.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
