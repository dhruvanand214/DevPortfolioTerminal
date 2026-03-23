import { useState, useEffect } from 'react';
import './Sidebar.css';

const treeItems = [
  { label: 'home.js', href: '#home', type: 'file' },
  { label: 'about.md', href: '#about', type: 'file' },
  { label: 'skills.json', href: '#skills', type: 'file' },
  { label: 'experience/', href: '#experience', type: 'folder' },
  { label: 'projects/', href: '#projects', type: 'folder' },
  { label: 'process.ts', href: '#process', type: 'file' },
  { label: 'contact.sh', href: '#contact', type: 'file' },
];

const Sidebar = () => {
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = treeItems.map(item => item.href.substring(1));
      let current = '#home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
           current = `#${section}`;
        }
      }
      setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveHash(href);
  };

  return (
    <aside className="global-sidebar">
      <div className="sidebar-header">
        EXPLORER
      </div>
      <div className="sidebar-tree">
        <div className="tree-root">
          <span className="tree-icon">v</span> portfolio
        </div>
        <ul className="tree-list">
          {treeItems.map((item, index) => (
            <li key={item.label} className={activeHash === item.href ? 'active' : ''}>
              <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
                <span className="tree-branch">
                  {index === treeItems.length - 1 ? '└──' : '├──'}
                </span>
                <span className={`tree-item-icon ${item.type}`}>
                  {item.type === 'folder' ? '📁' : '📄'}
                </span>
                <span className="tree-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;
