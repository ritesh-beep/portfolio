import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaChevronDown, FaReact, FaNodeJs, FaJava, FaDatabase } from 'react-icons/fa';
import './Hero.css';

const words = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Open Source Contributor",
  "Java & Spring Boot Developer"
];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(80);
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section id="home" className="hero-section">
      {/* Semi-transparent huge background name overlay with parallax speed */}
      <div className="bg-name-overlay">Ritesh Prasad</div>

      {/* Futuristic Cinematic Lights */}
      <div className="hero-radial-glow"></div>
      <div className="bottom-horizon-glow"></div>

      {/* Floating Tech Icons in Background */}
      <div className="floating-icons-container">
        <motion.div 
          className="floating-tech-icon tech-react"
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <FaReact size={32} />
        </motion.div>
        <motion.div 
          className="floating-tech-icon tech-node"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <FaNodeJs size={34} />
        </motion.div>
        <motion.div 
          className="floating-tech-icon tech-java"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        >
          <FaJava size={30} />
        </motion.div>
        <motion.div 
          className="floating-tech-icon tech-db"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        >
          <FaDatabase size={26} />
        </motion.div>
      </div>

      <div className="hero-container-landing">
        {/* Availability Badge */}
        <motion.div 
          className="availability-badge glass glow-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="available-dot"></span>
          Available for Internships & Freelance Projects
        </motion.div>

        {/* Circular Profile Photo with glowing ring */}
        <motion.div 
          className="profile-photo-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="profile-photo-glowing-ring">
            <img 
              src="/user-portrait-landing.jpg" 
              alt="Ritesh Prasad" 
              className="profile-photo-img"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="landing-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm Ritesh Prasad
        </motion.h1>

        {/* Typewriter Text Loop */}
        <motion.div 
          className="typewriter-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I am a <span className="typing-text">{currentText}</span>
          <span className="typing-cursor">|</span>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="landing-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          I build scalable web applications, AI-powered solutions, and impactful digital experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="landing-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects" className="glass-btn primary-glass">
            Explore Projects
          </a>
          <a href="#blog" className="glass-btn tertiary-glass">
            AI Blog
          </a>
          <a href="#photobooth" className="glass-btn quaternary-glass">
            Photo Booth
          </a>
          <a href="#contact" className="glass-btn secondary-glass">
            Contact Me
          </a>
        </motion.div>

        {/* Contact Email Link Text */}
        <motion.div
          className="landing-contact-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="mailto:aritesh400@gmail.com" className="contact-email-link">aritesh400@gmail.com</a>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          className="landing-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a 
            href="https://www.linkedin.com/in/its-ritesh-prasad/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-social-icon"
            aria-label="Visit my LinkedIn profile"
          >
            <FaLinkedin size={22} />
          </a>
          <a 
            href="https://github.com/ritesh-beep" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-social-icon"
            aria-label="Visit my GitHub profile"
          >
            <FaGithub size={22} />
          </a>
          <a 
            href="mailto:aritesh400@gmail.com" 
            className="landing-social-icon"
            aria-label="Send me an email"
          >
            <FaEnvelope size={22} />
          </a>
          <a 
            href="https://www.instagram.com/alex_rk143/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="landing-social-icon"
            aria-label="Visit my Instagram profile"
          >
            <FaInstagram size={22} />
          </a>
        </motion.div>

        {/* Achievement Stats Grid */}
        <motion.div 
          className="hero-stats-grid glass glow-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="hero-stat-item">
            <h3 className="hero-stat-number">25+</h3>
            <p className="hero-stat-label">Projects Completed</p>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <h3 className="hero-stat-number">80+</h3>
            <p className="hero-stat-label">GitHub Repos</p>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <h3 className="hero-stat-number">300+</h3>
            <p className="hero-stat-label">DSA Problems</p>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <h3 className="hero-stat-number">10+</h3>
            <p className="hero-stat-label">Certifications</p>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div 
        className="scroll-down-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="scroll-text">Scroll Down</span>
        <FaChevronDown size={14} className="scroll-arrow" />
      </motion.div>
    </section>
  );
};

export default Hero;
