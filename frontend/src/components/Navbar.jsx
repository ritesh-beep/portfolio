import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Photo Booth', 'Blog', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container glass">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item} className="nav-item">
              <a 
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                className={`nav-link ${active === item ? 'active' : ''}`}
                onClick={() => setActive(item)}
              >
                {item}
                {active === item && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="active-indicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a href="#contact" className="cta-button glow-box">Book a Call</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
