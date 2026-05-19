import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Award, BookOpen, Heart, CheckCircle2, Download, User } from 'lucide-react';
import './About.css';

const aboutImages = [
  "/user-portrait-landing.jpg",
  "/college-bnw.jpg",
  "/vaishno-devi-peak.jpg",
  "/mussoorie.jpg",
  "/festival-lights.jpg"
];

const stats = [
  { id: 1, value: "10+", label: "Projects Completed", icon: Cpu },
  { id: 2, value: "8+", label: "Tech Mastered", icon: Award },
  { id: 3, value: "100%", label: "Dedication", icon: Heart },
  { id: 4, value: "Continuous", label: "Learning", icon: BookOpen }
];

const highlights = [
  "Full Stack Web Development",
  "REST API Development",
  "Database Design",
  "Problem Solving",
  "Responsive UI Development",
  "Clean Code Practices"
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto transition images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="about-section section-container">
      {/* Background spotlights */}
      <div className="about-radial-glow"></div>

      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-badge glass">
          <User size={14} className="badge-icon" /> About Me
        </div>
        <h2 className="section-title">
          Passionate About Building Technology That <span className="text-accent-gradient italic-serif">Makes a Difference.</span>
        </h2>
        <p className="section-subtitle">
          A Full Stack Developer and Software Engineer dedicated to transforming ideas into scalable, high-performance digital solutions.
        </p>
      </motion.div>

      <div className="about-grid">
        {/* Left Side: Animated Image Slider */}
        <div className="about-left">
          <div className="slideshow-container glow-box">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={aboutImages[currentImageIndex]}
                alt={`Ritesh Prasad Portfolio Slide ${currentImageIndex}`}
                className="slideshow-image"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className="slideshow-indicator-bar">
              {aboutImages.map((_, index) => (
                <div 
                  key={index} 
                  className={`indicator-dot ${currentImageIndex === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Bio details */}
        <div className="about-right">
          <motion.div 
            className="about-bio"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="bio-greeting">Hi, I'm Ritesh Prasad</h3>
            <p className="bio-paragraph">
              A passionate Full Stack Developer and Computer Applications student at Quantum University. I specialize in building modern, elegant, and highly interactive web applications using standard technologies like <strong>React, Node.js, Express, Java, Spring Boot, and MySQL</strong>.
            </p>
            <p className="bio-paragraph">
              I enjoy solving real-world challenges through clean, maintainable code structures and pixel-perfect user experiences. From crafting high-speed frontends to designing scalable API backends, I write software that delivers lasting real-world value.
            </p>
            <p className="bio-paragraph">
              Beyond standard programming, I spend my time exploring emerging web technologies, contributing to open-source codebases, and developing personalized tools to sharpen my skills.
            </p>

            {/* Highlights Checklist */}
            <div className="highlights-grid">
              {highlights.map((hl, index) => (
                <div key={index} className="highlight-item">
                  <CheckCircle2 size={16} className="highlight-icon" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Personal Note */}
            <div className="personal-note glass">
              <p>
                <strong>Personal Note:</strong> When I'm not writing code, I enjoy exploring new ideas, learning about tech paradigms, and capturing cinematic moments with my camera.
              </p>
            </div>

            {/* CTA Button */}
            <div className="about-action">
              <a href="#contact" className="primary-btn glow-box download-resume-btn">
                Download Resume <Download size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-row">
        {stats.map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <motion.div 
              key={stat.id}
              className="stat-card glass glow-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon-wrapper">
                <StatIcon size={24} className="stat-icon" />
              </div>
              <h4 className="stat-value">{stat.value}</h4>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
