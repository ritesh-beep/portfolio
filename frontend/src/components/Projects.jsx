import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: "Keythm",
    description: "Code that feels designed. Engineering that actually ships. A full-stack application built for performance and developer experience.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "NexFinance",
    description: "Modern financial dashboard with real-time analytics, smooth charts, and a premium dark mode interface.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80",
    tech: ["React", "Framer Motion", "Node.js"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AeroTech Web",
    description: "Corporate landing page for an aerospace technology startup featuring 3D models and interactive scroll animations.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&q=80",
    tech: ["Three.js", "Vite", "GSAP"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section section-container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Selected Work<span className="text-accent-gradient">.</span></h2>
        <p className="section-subtitle">A showcase of my finest projects, built with modern technologies.</p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            className="project-card glow-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href={project.liveUrl} className="overlay-btn"><ExternalLink size={20} /> Live</a>
                <a href={project.githubUrl} className="overlay-btn"><FaGithub size={20} /> Code</a>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
