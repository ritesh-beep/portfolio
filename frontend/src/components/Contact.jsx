import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section section-container">
      <motion.div
        className="contact-container glass"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-content">
          <h2 className="contact-title">
            Let's build something <span className="text-accent-gradient italic-serif">extraordinary.</span>
          </h2>
          <p className="contact-subtitle">
            I'm currently available for freelance work and full-time opportunities.
            If you have a project that needs some creative magic, I'd love to hear about it.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <Mail className="info-icon" size={20} />
              <span>aritesh400@gmail.com</span>
            </div>
            <div className="info-item">
              <Phone className="info-icon" size={20} />
              <span>+91 8303838137</span>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" size={20} />
              <span>Bokaro City, Jharkhand, India</span>
            </div>
          </div>
        </div>

        <div className="contact-action">
          <button className="primary-btn glow-box">
            Send a Message <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
