import { useEffect, useRef, useState } from 'react';
import './MatrixOverlay.css';

const MatrixOverlay = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [showExitText, setShowExitText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|:;"<>,.?/\\~`'.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = [];

    // Init drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Random starting height
    }

    const draw = () => {
      // Translucent background to show trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const theme = document.documentElement.getAttribute('data-theme');
      ctx.fillStyle = theme === 'ubuntu' ? '#E95420' : '#00ff9f'; // Orange or Matrix Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
      setShowExitText(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="matrix-overlay" onClick={onClose} title="Click anywhere to exit">
      <canvas ref={canvasRef} />
      {showExitText && <div className="matrix-exit">System compromised = true.<br/>Click anywhere to restore connection.</div>}
    </div>
  );
};

export default MatrixOverlay;
