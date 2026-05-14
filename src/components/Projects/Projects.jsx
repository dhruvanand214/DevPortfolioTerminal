import { useState, useEffect } from 'react';
import { client, urlFor } from '../../sanity';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = '*[_type == "project"]';
        const data = await client.fetch(query);
        console.log('Sanity projects fetched:', data);
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const activeProject = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCarouselItemClass = (index) => {
    if (index === activeIndex) return 'carousel-item active';
    if (index === (activeIndex + 1) % projects.length) return 'carousel-item next';
    if (index === (activeIndex - 1 + projects.length) % projects.length) return 'carousel-item prev';
    return 'carousel-item hidden';
  };

  if (projects.length === 0) {
    return (
      <section className="projects section" id="projects">
        <div className="container">
          <div className="projects-header">
            <h2 className="projects-title">
              <span className="accent">&gt;</span> PROJECTS.EXE
            </h2>
            <p className="projects-subtitle">Loading projects data from CMS...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects section" id="projects">
      <div className="container">
        
        <div className="projects-header">
          <h2 className="projects-title">
            <span className="accent">&gt;</span> PROJECTS.EXE
          </h2>
          <p className="projects-subtitle">
            Turning ideas into real-world solutions. Each project is a mission.
          </p>
        </div>

        <div className="projects-grid">
          {/* LEFT COLUMN: CAROUSEL */}
          <div className="projects-left">
            <div className="archive-title">
              <span className="accent">&gt;</span> PROJECT ARCHIVE
            </div>
            
            <div 
              className="carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project, index) => (
                <div 
                  key={project._id} 
                  className={getCarouselItemClass(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="carousel-card-header">
                    <div className="carousel-card-title-text" title={project.name}>
                      <span className="prompt">&gt;_</span> {project.name}
                    </div>
                    <span className="rating">⭐ 4.9</span>
                  </div>
                  <div className="carousel-card-body">
                    {/* Mocked inner layout of the card to look like the SS */}
                    <div className="carousel-card-content">
                      {project.image && (
                        <div className="project-card-image">
                          <img src={urlFor(project.image).url()} alt={project.name} />
                        </div>
                      )}
                      <p className="card-desc">{project.description.substring(0, 80)}...</p>
                      <div className="card-tech">
                        {project.tech.slice(0, 4).map(t => <span key={t}>{t}</span>)}
                      </div>
                      <div className="card-stats">
                        <span>⭐ {project.stars}</span>
                        <span>🔀 {project.forks}</span>
                        <span>👁 {project.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button className="control-btn" onClick={handlePrev}>&larr;</button>
              <div className="dots">
                {projects.map((_, i) => (
                  <span 
                    key={i} 
                    className={`dot ${i === activeIndex ? 'active' : ''}`} 
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
              <button className="control-btn" onClick={handleNext}>&rarr;</button>
            </div>

            <div className="available-commands">
              <h4 className="cmd-title">AVAILABLE COMMANDS</h4>
              <ul>
                <li><span className="cmd">&gt; open [project-name]</span> - Open a project in detail</li>
                <li><span className="cmd">&gt; list</span> - List all projects</li>
                <li><span className="cmd">&gt; filter [tech]</span> - Filter projects by technology</li>
                <li><span className="cmd">&gt; stats</span> - Show projects statistics</li>
                <li><span className="cmd">&gt; clear</span> - Clear screen</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="projects-right">
            <div className="details-panel">
              <div className="panel-header">PROJECT_DETAILS</div>
              
              <div className="panel-content">
                <div className="detail-section">
                  <h4 className="detail-label">SELECTED_PROJECT</h4>
                  <h3 className="detail-title">{activeProject.name}</h3>
                  <div className="cmd-text">&gt; open {activeProject.file}</div>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">OVERVIEW</h4>
                  {activeProject.image && (
                    <div className="project-detail-image">
                      <img src={urlFor(activeProject.image).url()} alt={activeProject.name} />
                    </div>
                  )}
                  <p className="detail-desc">{activeProject.description}</p>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">KEY_FEATURES</h4>
                  <ul className="terminal-list">
                    {activeProject.features.map((feature, i) => (
                      <li key={i}><span>*</span> {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">IMPACT</h4>
                  <div className="impact-grid">
                    {activeProject.impact.map((stat, i) => (
                      <div key={i} className="impact-card">
                        <div className="impact-value">{stat.value}</div>
                        <div className="impact-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">REPOSITORY</h4>
                  <div className="repo-link">github.com/dhruvanand214/{activeProject.file.replace('.exe', '')}</div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a href={activeProject.link} className="btn-view-github" target="_blank" rel="noreferrer">
                      &gt; VIEW ON GITHUB
                    </a>
                    {activeProject.liveLink && (
                      <a href={activeProject.liveLink} className="btn-view-github" target="_blank" rel="noreferrer" style={{borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)'}}>
                        &gt; LIVE DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
