import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo text-accent-gradient">Portfolio.</span>
            <p className="footer-tagline">Building modern digital experiences.</p>
          </div>
          
          <div className="footer-socials">
            <a 
              href="https://www.linkedin.com/in/its-ritesh-prasad/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit my LinkedIn profile"
            >
              <FaLinkedin size={18} />
            </a>
            <a 
              href="https://github.com/ritesh-beep" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit my GitHub profile"
            >
              <FaGithub size={18} />
            </a>
            <a 
              href="mailto:aritesh400@gmail.com" 
              className="social-icon"
              aria-label="Send me an email"
            >
              <FaEnvelope size={18} />
            </a>
            <a 
              href="https://www.instagram.com/alex_rk143/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit my Instagram profile"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ritesh Prasad. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
