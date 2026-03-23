import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
  {
    id: 1,
    name: 'EventLedger',
    techLabel: 'MERN Stack Architecture',
    file: 'event-ledger/README.md',
    description: 'A high-concurrency event tracking system built for real-time data synchronization and complex search operations.',
    features: [
      'JWT-secured authentication with custom middleware',
      'Real-time data synchronization across clients',
      'Optimized MongoDB indexing — query response times reduced from 1.2s to under 200ms'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'WebSocket'],
    link: '#',
    liveLink: 'https://eventledger.vercel.app/'
  },
  {
    id: 2,
    name: 'GhostKitchen',
    techLabel: 'Full Stack Delivery System',
    file: 'ghost-kitchen/README.md',
    description: 'An end-to-end order management engine with a custom workflow state machine for real-time status updates.',
    features: [
      'Custom workflow state machine for order lifecycle management',
      'Unified admin dashboard automating 10+ manual tasks',
      'Increased operational efficiency by 35%'
    ],
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'Redux'],
    link: '#',
    liveLink: 'https://ghost-kitchen-frontend.vercel.app/'
  },
  {
    id: 3,
    name: 'Mega Blog Platform',
    techLabel: 'React.js (2025)',
    file: 'mega-blog/README.md',
    description: 'A full-stack blog platform with CRUD operations, authentication, and real-time database powered by Appwrite.',
    features: [
      'React Hook Form for validation and clean form architecture',
      'Appwrite backend for real-time database and auth',
      'Responsive UI with reusable component design patterns'
    ],
    tech: ['React', 'Appwrite', 'React Hook Form', 'CSS'],
    link: '#'
  },
  {
    id: 4,
    name: 'Weather API Dashboard',
    techLabel: 'Frontend Data Viz',
    file: 'weather-dash/README.md',
    description: 'A performance-focused weather dashboard integrating third-party APIs with graphical data representation.',
    features: [
      'Configured Webpack & Babel for efficient bundling',
      'Implemented debounced search queries reducing API load',
      'Custom SVG charting for temperature trends'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API', 'Webpack'],
    link: '#'
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        setScrollProgress(scrolled / scrollableDistance);
      } else if (scrolled < 0) {
        setScrollProgress(0);
      } else if (scrolled > scrollableDistance) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const itemsCount = projects.length + 1;
  const maxTranslatePercent = (projects.length / itemsCount) * 100;

  return (
    <section className="projects section" id="projects">
      <div 
        className="projects-container" 
        ref={containerRef}
        style={{ height: `${itemsCount * 100}vh` }}
      >
        
        <div className="projects-sticky-wrap">
          <div 
            className="projects-scroll-track" 
            ref={trackRef}
            style={{ 
              transform: `translate3d(-${scrollProgress * maxTranslatePercent}%, 0, 0)` 
            }}
          >
            
            {/* Intro Section inside the track */}
            <div className="projects-intro">
              <div className="section-label">work</div>
              <h2 className="section-title">
                Featured <br/><span className="accent">Projects</span>
              </h2>
              <p className="projects-subtitle">
                Key projects showcasing my engineering capabilities. <br/>
                Scroll to explore &rarr;
              </p>
            </div>

            {/* Project Cards */}
            {projects.map((project, index) => (
              <div className="project-card" key={project.id}>
                <div className="project-card-inner">
                  <div className="project-card-header">
                    <div className="project-controls">
                      <span /><span /><span />
                    </div>
                    <div className="project-tabs">
                      <div className="project-tab">
                        <span style={{color: 'var(--text-muted)'}}>{String(index + 1).padStart(2, '0')} / 04</span> &nbsp;
                        {project.file}
                      </div>
                    </div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.name}</h3>
                    <div className="project-subtitle">{project.techLabel}</div>
                    
                    <p className="project-desc">{project.description}</p>
                    
                    <ul className="project-features">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>

                    <div className="project-tech">
                      {project.tech.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-footer" style={{ display: 'flex', gap: '12px' }}>
                      <a href={project.link} className="btn-github" target="_blank" rel="noreferrer">
                        <span style={{color: 'var(--text-muted)'}}>$</span> ./run GitHub
                      </a>
                      {project.liveLink && (
                        <a href={project.liveLink} className="btn-github" target="_blank" rel="noreferrer">
                          <span style={{color: 'var(--text-muted)'}}>$</span> ./run Live_Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="projects-progress-bar">
            <div 
              className="projects-progress-fill" 
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
