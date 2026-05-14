import { useState, useEffect } from 'react';
import { client } from '../../sanity';
import './Skills.css';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const query = '*[_type == "skillCategory"]';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setSkillCategories(data);
          setActiveCategory(data[0]);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

  if (skillCategories.length === 0 || !activeCategory) {
    return (
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-label">capabilities</div>
          <h2 className="section-title">
            Tech <span className="accent">Stack</span>
          </h2>
          <p className="skills-subtitle">Loading skills from CMS...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="section-label">capabilities</div>
        <h2 className="section-title">
          Tech <span className="accent">Stack</span>
        </h2>
        <p className="skills-subtitle">
          Tools and technologies I work with daily.
        </p>

        <div className="skills-ide-layout">
          {/* Left Sidebar - Terminal Commands */}
          <div className="skills-sidebar">
            <div className="skills-sidebar-header">
              <div className="skills-sidebar-dots">
                <span /><span /><span />
              </div>
              <span className="skills-sidebar-title">~/portfolio/skills — bash</span>
            </div>
            
            <div className="skills-categories">
              {skillCategories.map((category) => (
                <button
                  key={category._id}
                  className={`skills-category-btn ${activeCategory._id === category._id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="cmd-prompt">$</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Skill Cards */}
          <div className="skills-content">
            <div className="skills-content-header">
              <span>{`> Output: ${activeCategory._id}/`}</span>
            </div>
            
            <div className="skills-content-body">
              <div className="skills-grid" key={activeCategory._id}>
                {activeCategory.skills.map((skill) => (
                  <div key={skill.name} className="skill-card">
                    <span className="skill-icon">{skill.icon}</span>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Bar */}
            <div className="skills-statusbar">
              <div className="skills-statusbar-left">
                <span>
                  <span className="circle-indicator"></span>
                  System Online
                </span>
                <span>{activeCategory.skills.length} items</span>
              </div>
              <div className="skills-statusbar-right">
                <span>UTF-8</span>
                <span>React JSX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
