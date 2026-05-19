import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "Java", "Python", "HTML5", "CSS3", "C++", "Solidity"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Express.js", "Node.js", "Tailwind CSS", "Framer Motion", "Java Spring Boot"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "Vercel", "Linux"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Skills & Expertise<span className="text-accent-gradient">.</span></h2>
        <p className="section-subtitle">A collection of technologies I'm proficient with, from languages to frameworks and tools.</p>
      </motion.div>

      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map(skill => (
                <div key={skill} className="skill-pill glow-box">
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
