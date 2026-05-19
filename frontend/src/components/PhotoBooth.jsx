import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import './PhotoBooth.css';

const categories = ['All', 'Recent', 'Travel', 'Nature', 'Friends', 'Events'];

const photosData = [
  {
    id: 1,
    url: "/vaishno-devi-peak.jpg",
    title: "Vaishno Devi Peak",
    caption: "Standing tall amidst the scenic, sacred hills of Vaishno Devi. A breathtaking view that inspires devotion and strength.",
    category: "Travel",
    date: "May 2026",
    featured: true
  },
  {
    id: 2,
    url: "/vaishno-devi-bhawan.jpg",
    title: "Sacred Bhawan",
    caption: "An spectacular view of the holy Vaishno Devi Bhawan nestled beautifully in the folds of the Trikuta mountains.",
    category: "Travel",
    date: "May 2026",
    featured: false
  },
  {
    id: 3,
    url: "/peace-peak.jpg",
    title: "Peace at the Peak",
    caption: "Sitting atop the mountain cliffs, finding quiet, focus, and serenity away from the busy rhythms of life.",
    category: "Nature",
    date: "Apr 2026",
    featured: false
  },
  {
    id: 4,
    url: "/festival-lights.jpg",
    title: "Festive Sparkles",
    caption: "Dressed in ethnic attire, enjoying the golden string lights that light up the night and lift spirits.",
    category: "Events",
    date: "Oct 2025",
    featured: false
  },
  {
    id: 5,
    url: "/festival-canopy.jpg",
    title: "Colors of Celebration",
    caption: "A candid moment surrounded by colorful traditional canopies and festive warmth during the night celebrations.",
    category: "Events",
    date: "Oct 2025",
    featured: false
  },
  {
    id: 6,
    url: "/mussoorie.jpg",
    title: "Chilly Nights in Mussoorie",
    caption: "Wrapped in a traditional shawl under the warm glow of the street lamp, overlooking the twinkling lights of the Queen of Hills.",
    category: "Travel",
    date: "Jan 2026",
    featured: false
  },
  {
    id: 7,
    url: "/rishikesh.jpg",
    title: "Rishikesh Reflections",
    caption: "A peaceful night sitting by the sacred waters of the Ganges. Watching the lights shimmer on the river is pure magic.",
    category: "Travel",
    date: "Mar 2026",
    featured: false
  },
  {
    id: 8,
    url: "/college-bnw.jpg",
    title: "College Days Nostalgia",
    caption: "A timeless black and white frame capturing the thoughts, ambitions, and memories of college life.",
    category: "Friends",
    date: "Nov 2025",
    featured: false
  }
];

const PhotoBooth = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Filter photos based on category
  const filteredPhotos = photosData.filter(photo => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Recent') {
      // Show first 3 photos as recent
      return photosData.indexOf(photo) < 3;
    }
    return photo.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const featuredPhoto = photosData.find(photo => photo.featured);

  const openLightbox = (photoId) => {
    const index = filteredPhotos.findIndex(p => p.id === photoId);
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="photobooth" className="photobooth-section section-container">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="booth-badge glass">
          <Camera size={14} className="badge-icon" /> Photo Booth
        </div>
        <h2 className="section-title">Capturing Moments Beyond Code<span className="text-accent-gradient">.</span></h2>
        <p className="section-subtitle">
          A collection of my recent photographs, memories, and moments that inspire me outside of programming.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="filter-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Photo Section */}
      {activeCategory === 'All' && featuredPhoto && (
        <motion.div 
          className="featured-photo-card glass glow-box"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => openLightbox(featuredPhoto.id)}
        >
          <div className="featured-image-container">
            <img src={featuredPhoto.url} alt={featuredPhoto.title} />
            <div className="featured-overlay">
              <span className="featured-tag">Featured Capture</span>
              <h3 className="featured-title">{featuredPhoto.title}</h3>
              <p className="featured-desc">{featuredPhoto.caption}</p>
              <span className="featured-date">{featuredPhoto.date}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="empty-state glass">
          <p className="empty-text">New memories coming soon.</p>
        </div>
      ) : (
        <motion.div 
          className="gallery-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={photo.id}
                className="gallery-item glow-box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => openLightbox(photo.id)}
              >
                <div className="photo-container">
                  <img src={photo.url} alt={photo.title} />
                  <div className="photo-caption-overlay">
                    <span className="photo-tag">{photo.category}</span>
                    <h4 className="photo-title">{photo.title}</h4>
                    <p className="photo-desc">{photo.caption}</p>
                    <span className="photo-date">{photo.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            <button className="lightbox-nav prev" onClick={prevPhoto} aria-label="Previous Photo">
              <ChevronLeft size={32} />
            </button>

            <button className="lightbox-nav next" onClick={nextPhoto} aria-label="Next Photo">
              <ChevronRight size={32} />
            </button>

            <motion.div 
              className="lightbox-content-box"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="lightbox-image-container">
                <img 
                  src={filteredPhotos[selectedPhotoIndex].url} 
                  alt={filteredPhotos[selectedPhotoIndex].title} 
                />
              </div>
              <div className="lightbox-info glass">
                <span className="photo-tag">{filteredPhotos[selectedPhotoIndex].category}</span>
                <h3 className="lightbox-title">{filteredPhotos[selectedPhotoIndex].title}</h3>
                <p className="lightbox-desc">{filteredPhotos[selectedPhotoIndex].caption}</p>
                <span className="lightbox-date">{filteredPhotos[selectedPhotoIndex].date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoBooth;
