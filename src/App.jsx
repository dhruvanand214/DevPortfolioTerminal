import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Workflow from './components/Workflow'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import MatrixOverlay from './components/MatrixOverlay'
import Sidebar from './components/Sidebar'
import SoundToggle from './components/SoundToggle'
import ResumeModal from './components/ResumeModal'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isResumeOpen]);

  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

      // Triggers for easter egg
      if (keyBuffer.endsWith('matrix') || keyBuffer.endsWith('sudo')) {
        setEasterEggActive(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {easterEggActive && <MatrixOverlay onClose={() => setEasterEggActive(false)} />}
      <SoundToggle />
      
      {!loading && (
        <>
          <Sidebar />
          <Navbar />
          <ScrollToTop />
          <main className="fade-in-main">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Workflow />
            <Contact />
          </main>
        </>
      )}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  )
}

export default App
