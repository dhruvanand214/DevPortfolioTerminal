import { useEffect, useRef, useState } from 'react';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'Tech Mahindra',
    location: 'Pune, India',
    period: 'Aug 2023 — Present',
    file: 'tech-mahindra.ts',
    highlights: [
      {
        text: 'Engineered a frontend optimization strategy using OnPush Change Detection and Lazy Loading, resulting in a measurable 20% increase in Core Web Vitals.',
        keywords: ['OnPush Change Detection', 'Lazy Loading', '20%']
      },
      {
        text: 'Spearheaded the migration of 100+ legacy AngularJS components to Angular 14+, reducing the codebase size by 15% and eliminating critical security vulnerabilities.',
        keywords: ['100+ legacy AngularJS', 'Angular 14+', '15%']
      },
      {
        text: 'Architected a centralized Reusable Component Library used by 3 separate project teams, slashing feature development time by 25%.',
        keywords: ['Reusable Component Library', '3 separate project teams', '25%']
      },
      {
        text: 'Identified and patched a recursive memory leak using Chrome DevTools profiling, preventing application crashes for 5,000+ active users.',
        keywords: ['Chrome DevTools', '5,000+ active users']
      },
      {
        text: 'Optimized backend-to-frontend data flow by implementing RxJS-based state management, reducing redundant API calls by 40%.',
        keywords: ['RxJS-based state management', '40%']
      },
    ]
  },
  {
    id: 2,
    role: 'Frontend Developer Intern',
    company: 'Growth India',
    location: 'Remote',
    period: 'Sep 2022 — Nov 2022',
    file: 'growth-india.ts',
    highlights: [
      {
        text: 'Built responsive UI modules using HTML, CSS, JavaScript, and Bootstrap for the company\'s web platform.',
        keywords: ['HTML, CSS, JavaScript', 'Bootstrap']
      },
      {
        text: 'Improved UI layout, page structure, and mobile experience to enhance user engagement across devices.',
        keywords: ['mobile experience', 'user engagement']
      },
      {
        text: 'Integrated PHP backend APIs for dynamic content rendering, bridging the frontend-backend interface.',
        keywords: ['PHP backend APIs', 'dynamic content rendering']
      },
      {
        text: 'Identified and resolved UI defects, improving stability and overall performance.',
        keywords: ['UI defects', 'stability']
      },
    ]
  },
];

const highlightText = (text, keywords) => {
  let result = text;
  keywords.forEach(keyword => {
    result = result.replace(keyword, `<span class="exp-highlight">${keyword}</span>`);
  });
  return result;
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scrollable distance within the container
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      let progress = 0;
      
      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        // User is scrolling through the sticky section
        progress = scrolled / scrollableDistance;
        
        // Calculate the active index based on scroll progress
        // e.g. for 2 items: 0% to 50% = item 0, 50% to 100% = item 1
        const maxIndex = experiences.length - 1;
        
        // This math divides the scroll space into equally sized chunks for each index
        const indexFloat = progress * experiences.length;
        
        // Clamp to valid array indices
        let idx = Math.floor(indexFloat);
        if (idx > maxIndex) idx = maxIndex;
        if (idx < 0) idx = 0;
        
        setActiveIndex(idx);
        setScrollProgress(progress * 100);
      } else if (scrolled < 0) {
        setActiveIndex(0);
        setScrollProgress(0);
      } else if (scrolled > scrollableDistance) {
        setActiveIndex(experiences.length - 1);
        setScrollProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="experience section" id="experience">
      <div className="experience-container" ref={containerRef}>
        
        {/* Sticky wrapper */}
        <div className="experience-sticky-wrap">
          <div className="container experience-content">
            <div className="section-label">career</div>
            <h2 className="section-title">
              Work <span className="accent">Experience</span>
            </h2>
            <p className="experience-subtitle">
              My professional journey as a software engineer. <br/>
              Scroll to explore &darr;
            </p>

            <div className="experience-timeline">
              
              {/* Timeline Track (Left) */}
              <div className="timeline-track" style={{ '--progress': `${scrollProgress}%` }}>
                {/* Visual Line Progress */}
                <div className="timeline-track-progress" />
                
                {/* Timeline Dots */}
                {experiences.map((exp, index) => {
                  let dotClass = 'timeline-dot';
                  if (index === activeIndex) dotClass += ' active';
                  else if (index < activeIndex) dotClass += ' past';
                  
                  return <div key={exp.id} className={dotClass} />;
                })}
              </div>

              {/* Slotted Cards (Right) */}
              <div className="timeline-cards-container">
                {experiences.map((exp, index) => {
                  let itemClass = 'timeline-item';
                  if (index === activeIndex) {
                    itemClass += ' active';
                  } else if (index < activeIndex) {
                    itemClass += ' past';
                  } else {
                    itemClass += ' future';
                  }
                  
                  return (
                    <div key={exp.id} className={itemClass}>
                      <div className="timeline-card">
                        <div className="timeline-card-header">
                          <div className="timeline-card-dots">
                            <span /><span /><span />
                          </div>
                          <span className="timeline-card-path">
                            ~/experience/{exp.file}
                          </span>
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
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
