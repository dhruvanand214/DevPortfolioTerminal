import { useState, useEffect, useRef } from 'react';
import './SoundToggle.css';

const generateClackSound = (audioCtx) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150 + Math.random() * 50, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);

  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 1.5;

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.05);
};

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!isMuted && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [isMuted]);

  useEffect(() => {
    const handleInteraction = (e) => {
      if (isMuted || !audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (e.type === 'keydown') {
        generateClackSound(audioCtxRef.current);
      } else if (e.type === 'mousedown') {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
          generateClackSound(audioCtxRef.current);
        }
      }
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
    };
  }, [isMuted]);

  return (
    <button 
      className={`sound-toggle ${isMuted ? 'muted' : ''}`} 
      onClick={() => setIsMuted(!isMuted)}
      title="Toggle mechanical key sounds"
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
};

export default SoundToggle;
