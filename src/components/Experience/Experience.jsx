import { useState, useEffect } from 'react';
import { client } from '../../sanity';
import './Experience.css';

const highlightText = (text, keywords) => {
  let result = text;
  keywords.forEach(keyword => {
    result = result.replace(keyword, `<span class="exp-highlight">${keyword}</span>`);
  });
  return result;
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeIds, setActiveIds] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const query = '*[_type == "experience"]';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setExperiences(data);
          setActiveIds(data.map(exp => exp._id));
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };
    fetchExperiences();
  }, []);

  const toggleExperience = (id) => {
    setActiveIds(prev => 
      prev.includes(id) 
        ? prev.filter(activeId => activeId !== id)
        : [...prev, id]
    );
  };

  const reversedExperiences = [...experiences].reverse();
  const activeExperiences = reversedExperiences.filter(exp => activeIds.includes(exp._id));
  const minimizedExperiences = reversedExperiences.filter(exp => !activeIds.includes(exp._id));

  if (experiences.length === 0) {
    return (
      <section className="experience section" id="experience">
        <div className="experience-container">
          <div className="container experience-content">
            <div className="section-label">career</div>
            <h2 className="section-title">
              Work <span className="accent">Experience</span>
            </h2>
            <p className="experience-subtitle">Loading experiences from CMS...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="experience section" id="experience">
      <div className="experience-container">
        <div className="container experience-content">
          <div className="section-label">career</div>
          <h2 className="section-title">
            Work <span className="accent">Experience</span>
          </h2>
          <p className="experience-subtitle">
            Exploring my professional journey and the impact I've made.
          </p>

          <div className="experience-stack">
            {activeExperiences.map((exp, index) => (
              <div 
                key={exp._id} 
                className="timeline-card-wrapper active"
                style={{
                  '--index': index,
                  zIndex: index
                }}
              >
                <div className="timeline-card">
                  <div className="timeline-card-header" onClick={() => toggleExperience(exp._id)}>
                    <div className="timeline-card-title">
                      <span className="exp-icon">💼</span>
                      <span className="exp-file">experience@{exp.file}</span>
                    </div>
                    
                    <div className="timeline-card-controls">
                      <span className="exp-period">{exp.period}</span>
                      <button className="window-btn minimize-btn" aria-label="Minimize" onClick={(e) => { e.stopPropagation(); toggleExperience(exp._id); }}>
                        <span className="icon-minus">_</span>
                      </button>
                      <button className="window-btn maximize-btn" aria-label="Maximize" onClick={(e) => { e.stopPropagation(); toggleExperience(exp._id); }}>
                        <span className="icon-square">□</span>
                      </button>
                      <button className="window-btn close-btn" aria-label="Close">
                        <span className="icon-cross">×</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="timeline-card-body">
                    <div className="exp-code-line">
                      <span className="exp-line-num">1</span>
                      <span className="exp-code-content">
                        <span className="syntax-keyword">const</span>{' '}
                        <span className="syntax-property">role</span> ={' '}
                        <span className="syntax-string">"{exp.role}"</span>;
                      </span>
                    </div>
                    <div className="exp-code-line">
                      <span className="exp-line-num">2</span>
                      <span className="exp-code-content">
                        <span className="syntax-keyword">const</span>{' '}
                        <span className="syntax-property">company</span> ={' '}
                        <span className="syntax-string">"{exp.company}"</span>;
                      </span>
                    </div>
                    <div className="exp-code-line">
                      <span className="exp-line-num">3</span>
                      <span className="exp-code-content">
                        <span className="syntax-keyword">const</span>{' '}
                        <span className="syntax-property">period</span> ={' '}
                        <span className="syntax-value">"{exp.period}"</span>;
                      </span>
                    </div>
                    <div className="exp-code-line">
                      <span className="exp-line-num">4</span>
                      <span className="exp-code-content">
                        <span className="syntax-keyword">const</span>{' '}
                        <span className="syntax-property">location</span> ={' '}
                        <span className="syntax-string">"{exp.location}"</span>;
                      </span>
                    </div>
                    <div className="exp-code-line">
                      <span className="exp-line-num">5</span>
                      <span className="exp-code-content"></span>
                    </div>
                    <div className="exp-code-line">
                      <span className="exp-line-num">6</span>
                      <span className="exp-code-content syntax-comment">
                        // Key Achievements and Responsibilities
                      </span>
                    </div>

                    <div className="exp-bullets">
                      {exp.highlights.map((highlight, i) => (
                        <div key={i} className="exp-bullet">
                          <span className="exp-bullet-icon">{'>'}</span>
                          <span dangerouslySetInnerHTML={{ __html: highlightText(highlight.text, highlight.keywords) }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {minimizedExperiences.length > 0 && (
            <div className="minimized-dock">
              {minimizedExperiences.map((exp) => (
                <div key={exp._id} className="timeline-card minimized-tile" onClick={() => toggleExperience(exp._id)}>
                  <div className="timeline-card-header">
                    <div className="timeline-card-title">
                      <span className="exp-icon">💼</span>
                      <span className="exp-file">{exp.file}</span>
                    </div>
                    <div className="timeline-card-controls">
                      <button className="window-btn maximize-btn" aria-label="Maximize">
                        <span className="icon-square">□</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
