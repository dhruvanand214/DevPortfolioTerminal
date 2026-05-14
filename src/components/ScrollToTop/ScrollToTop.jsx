import { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`scroll-top-btn ${visible ? 'visible' : ''}`} 
      onClick={scrollToTop}
      title="Scroll to Top"
      aria-label="Scroll to top"
    >
      <span className="scroll-prefix">$</span>
      <span className="scroll-command">clear</span>
    </button>
  );
};

export default ScrollToTop;
