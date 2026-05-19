import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: "TechNova Solutions",
    role: "Software Engineer",
    duration: "2025 - Present",
    achievements: [
      "",
      "Improved application performance by 40% through code splitting and lazy loading.",
      "Mentored junior developers and established code review best practices."
    ]
  },
  {
    company: "Creative Digital",
    role: "Backend Engineer",
    duration: "2025 - current ",
    achievements: [
      "Developed high-converting landing pages with complex Framer Motion animations.",
      "Integrated GraphQL APIs to reduce data over-fetching.",
      "Collaborated closely with UI/UX designers to implement pixel-perfect designs."
    ]
  }

];

const Experience = () => {
  return (
    <section id="experience" className="experience-section section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Experience<span className="text-accent-gradient">.</span></h2>
        <p className="section-subtitle">My professional journey and career highlights.</p>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="timeline-node glow-box"></div>
            <div className="timeline-content glass">
              <div className="timeline-header">
                <div>
                  <h3 className="role">{exp.role}</h3>
                  <h4 className="company text-accent-gradient">{exp.company}</h4>
                </div>
                <span className="duration">{exp.duration}</span>
              </div>
              <ul className="achievements-list">
                {exp.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
