import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, BookOpen, Send, Plus, Trash2, Eye, EyeOff, X, Heart, Bookmark, Share2 } from 'lucide-react';
import './Blog.css';

const categories = [
  "All",
  "Web Development",
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "Spring Boot",
  "AI",
  "Career Tips",
  "Open Source"
];

// Offline fallback mock data in case backend server is not running
const fallbackBlogs = [
  {
    id: "top-10-react-best-practices-2026",
    title: "Top 10 React Best Practices in 2026",
    slug: "top-10-react-best-practices-2026",
    excerpt: "Explore the modern architectural patterns, custom hooks designs, and compiler optimizations that are dominating React applications in 2026.",
    category: "React",
    tags: ["React", "Web Dev", "JavaScript", "Frontend", "2026"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&q=80",
    content: `# Top 10 React Best Practices in 2026\n\nReact has evolved significantly over the years, and with the latest features, the way we build interfaces has reached new heights of performance and maintainability. In this post, we discuss the top 10 best practices you should follow for production-ready React apps in 2026.\n\n## 1. Embrace React Compiler (Zero-Dependency Memoization)\nGone are the days of manual \`useMemo\` and \`useCallback\` micro-optimizations. In 2026, the automatic compiler automatically optimizes component renders.\n\`\`\`javascript\n// No need for manual useMemo, React Compiler handles this automatically!\nconst ProductList = ({ items }) => {\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n};\n\`\`\`\n\n## 2. Server Components by Default\nAdopt React Server Components (RSC) to fetch data directly inside server component functions. This keeps your client bundle light and fast!\n\n## 3. Strict State Colocation\nKeep state as close to where it is used as possible. Avoid massive global contexts unless absolutely necessary for universal states.\n\n## 4. Optimized Asset Loading\nLeverage modern image lazy-loading, responsive srcsets, and vector SVGs to maintain high Lighthouse scores and blazing-fast loading.\n\n## Conclusion\nFollowing these rules will elevate your personal development practices and deliver exceptional, smooth software solutions.`,
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    readingTime: "5 min read",
    published: true,
    author: { name: "Ritesh Prasad", role: "Software Engineer" }
  },
  {
    id: "spring-boot-vs-express-js",
    title: "Spring Boot vs Express.js: Finding the Perfect Backend",
    slug: "spring-boot-vs-express-js",
    excerpt: "An in-depth, hands-on architectural comparison between Spring Boot's robust structured framework and Express.js's lightweight flexibility.",
    category: "Java",
    tags: ["Spring Boot", "Express", "Backend", "Architecture", "Java", "NodeJS"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80",
    content: `# Spring Boot vs Express.js: Finding the Perfect Backend\n\nChoosing the right backend framework is critical to the scaling and longevity of any web application. Today, we put Java's powerhouse **Spring Boot** and Node.js's favorite **Express.js** side-by-side.\n\n## Spring Boot: Enterprise Scaling\nSpring Boot excels in massive, highly-structured applications. With features like dependency injection, JPA, and deep type safety, it's designed for stable engineering.\n\`\`\`java\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    @GetMapping\n    public List<User> getUsers() {\n        return userService.findAll();\n    }\n}\n\`\`\`\n\n## Express.js: Rapid Adaptability\nExpress.js is lightweight, unopinionated, and highly flexible. Ideal for startups and small-to-medium systems, it runs on JavaScript and leverages asynchronous event loops.\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/api/users', (req, res) => {\n  res.json(users);\n});\n\`\`\`\n\n## Which Should You Choose?\n- Choose **Spring Boot** if you need high security, enterprise architecture, or robust multithreading.\n- Choose **Express.js** if you need fast MVPs, unified JS stack (MERN), or highly flexible server design.`,
    date: new Date(Date.now() - 3600000 * 24 * 8).toISOString(),
    readingTime: "6 min read",
    published: true,
    author: { name: "Ritesh Prasad", role: "Software Engineer" }
  }
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBlog, setActiveBlog] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [adminStatus, setAdminStatus] = useState("");
  const [likedBlogs, setLikedBlogs] = useState({});
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState({});

  const API_URL = "https://portfolio-2k7s.vercel.app/api/blogs";

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.warn("Backend server not responding, using offline fallback data.", err);
      setBlogs(fallbackBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter & Search Logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Latest blog as Featured
  const featuredBlog = filteredBlogs.find(b => b.published);
  const regularBlogs = filteredBlogs.filter(b => b.id !== (featuredBlog ? featuredBlog.id : null));

  // Admin Manual Generator trigger
  const triggerManualGeneration = async () => {
    try {
      setAdminStatus("Generating AI article...");
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setAdminStatus("Success! Weekly blog published.");
      // Refresh list
      fetchBlogs();
      setTimeout(() => setAdminStatus(""), 4000);
    } catch (err) {
      setAdminStatus("Error triggering AI generator.");
      console.error(err);
    }
  };

  // Admin Delete Handler
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs(prev => prev.filter(b => b.id !== id));
      setAdminStatus("Article deleted.");
      setTimeout(() => setAdminStatus(""), 4000);
    } catch (err) {
      // Offline fallback deletion
      setBlogs(prev => prev.filter(b => b.id !== id));
      setAdminStatus("Article deleted (Local/Offline).");
      setTimeout(() => setAdminStatus(""), 4000);
    }
  };

  // Admin Toggle Publish Handler
  const togglePublish = async (blog) => {
    try {
      const updatedPublishState = !blog.published;
      const res = await fetch(`${API_URL}/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: updatedPublishState })
      });
      if (!res.ok) throw new Error("Failed to toggle publish");

      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: updatedPublishState } : b));
      setAdminStatus(updatedPublishState ? "Article Published!" : "Article Unpublished!");
      setTimeout(() => setAdminStatus(""), 4000);
    } catch (err) {
      // Offline fallback toggle
      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: !b.published } : b));
      setAdminStatus(!blog.published ? "Article Published (Offline)!" : "Article Unpublished (Offline)!");
      setTimeout(() => setAdminStatus(""), 4000);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setNewsletterSubscribed(true);
    setEmailInput("");
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const toggleLike = (id) => {
    setLikedBlogs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarkedBlogs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getRelatedPosts = (currentBlog) => {
    return blogs.filter(b => b.id !== currentBlog.id && b.category === currentBlog.category).slice(0, 2);
  };

  return (
    <section id="blog" className="blog-section section-container">
      {/* Visual glowing spotlight */}
      <div className="blog-radial-glow"></div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="blog-badge glass">
          <BookOpen size={14} className="badge-icon" /> AI Blog Engine
        </div>
        <h2 className="section-title">
          Weekly Technical <span className="text-accent-gradient italic-serif">Insights & Articles.</span>
        </h2>
        <p className="section-subtitle">
          High-quality articles on React, Spring Boot, Web Architecture, and AI, generated automatically every week.
        </p>
      </motion.div>

      {/* Developer Admin collapsible controls */}
      <div className="admin-drawer-container">
        <button className="admin-toggle-btn glass glow-box" onClick={() => setIsAdminOpen(!isAdminOpen)}>
          {isAdminOpen ? "Close Admin Dashboard" : "🛠️ Open AI Engine Admin"}
        </button>

        <AnimatePresence>
          {isAdminOpen && (
            <motion.div
              className="admin-dashboard-panel glass"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="admin-header">
                <h4>AI Engine & Publication Controls</h4>
                {adminStatus && <span className="admin-status-badge">{adminStatus}</span>}
              </div>
              <div className="admin-actions">
                <button className="admin-action-btn primary-admin-btn glow-box" onClick={triggerManualGeneration}>
                  <Plus size={16} /> Generate AI Blog Post Now
                </button>
                <button className="admin-action-btn secondary-admin-btn" onClick={fetchBlogs}>
                  Sync / Refresh Database
                </button>
              </div>
              <div className="admin-post-list">
                <h5>Stored Technical Articles</h5>
                {blogs.map(b => (
                  <div key={b.id} className="admin-post-row">
                    <span className="admin-row-title">{b.title}</span>
                    <span className="admin-row-category">{b.category}</span>
                    <div className="admin-row-controls">
                      <button
                        onClick={() => togglePublish(b)}
                        className={`admin-icon-btn ${b.published ? 'published' : 'unpublished'}`}
                        title={b.published ? "Unpublish Post" : "Publish Post"}
                      >
                        {b.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => deleteBlog(b.id)}
                        className="admin-icon-btn delete"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search & Categories Bar */}
      <div className="blog-filters-bar">
        <div className="search-box glass glow-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by keywords, tags, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-scroll">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Blog Post */}
      {featuredBlog && searchQuery === "" && selectedCategory === "All" && (
        <motion.div
          className="featured-blog-card glass glow-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setActiveBlog(featuredBlog)}
        >
          <div className="featured-blog-img">
            <img src={featuredBlog.coverImage} alt={featuredBlog.title} />
            <span className="featured-tag">Latest AI Capture</span>
          </div>
          <div className="featured-blog-info">
            <span className="blog-card-cat">{featuredBlog.category}</span>
            <h3 className="featured-blog-title">{featuredBlog.title}</h3>
            <p className="featured-blog-excerpt">{featuredBlog.excerpt}</p>
            <div className="featured-tags-row">
              {featuredBlog.tags.map(t => <span key={t} className="blog-tag">#{t}</span>)}
            </div>
            <div className="featured-footer">
              <div className="author-badge">
                <div className="author-avatar">{featuredBlog.author.name.charAt(0)}</div>
                <div>
                  <h5 className="author-name">{featuredBlog.author.name}</h5>
                  <p className="author-role">{featuredBlog.author.role}</p>
                </div>
              </div>
              <div className="blog-meta">
                <span><Calendar size={12} /> {new Date(featuredBlog.date).toLocaleDateString()}</span>
                <span><Clock size={12} /> {featuredBlog.readingTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="empty-state glass">
          <p className="empty-text">Fresh insights are coming soon.</p>
        </div>
      ) : (
        <div className="blog-grid-layout">
          {((searchQuery !== "" || selectedCategory !== "All") ? filteredBlogs : regularBlogs).map((blog) => (
            <motion.div
              key={blog.id}
              className="blog-card glass glow-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => setActiveBlog(blog)}
            >
              <div className="blog-card-img">
                <img src={blog.coverImage} alt={blog.title} />
                <span className="blog-card-cat">{blog.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta-top">
                  <span><Calendar size={12} /> {new Date(blog.date).toLocaleDateString()}</span>
                  <span><Clock size={12} /> {blog.readingTime}</span>
                </div>
                <h4 className="blog-card-title">{blog.title}</h4>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-tags-list">
                  {blog.tags.map(t => <span key={t} className="blog-card-tag">#{t}</span>)}
                </div>
                <button className="blog-card-btn">Read Full Article &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Newsletter Block */}
      <motion.div
        className="newsletter-section glass glow-box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="newsletter-info">
          <h3>Subscribe to Ritesh's Tech Newsletter</h3>
          <p>Get high-quality weekly coding articles, frameworks updates, and software insights delivered directly to your inbox.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button type="submit" className="newsletter-btn glow-box">
            Subscribe <Send size={14} />
          </button>
        </form>
        {newsletterSubscribed && (
          <p className="newsletter-success">Thank you for subscribing! Fresh technical content will arrive soon.</p>
        )}
      </motion.div>

      {/* Full-Screen Blog Detail Lightbox Modal */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            className="blog-detail-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
          >
            <motion.div
              className="blog-detail-container glass"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="blog-detail-close" onClick={() => setActiveBlog(null)}>
                <X size={20} />
              </button>

              <div className="blog-detail-header-image">
                <img src={activeBlog.coverImage} alt={activeBlog.title} />
                <div className="blog-detail-header-overlay">
                  <span className="blog-detail-cat">{activeBlog.category}</span>
                  <h1 className="blog-detail-title">{activeBlog.title}</h1>

                  <div className="blog-detail-meta-row">
                    <div className="detail-author">
                      <div className="detail-avatar">{activeBlog.author.name.charAt(0)}</div>
                      <div>
                        <h6>{activeBlog.author.name}</h6>
                        <p>{activeBlog.author.role}</p>
                      </div>
                    </div>
                    <div className="detail-meta-text">
                      <span><Calendar size={14} /> {new Date(activeBlog.date).toLocaleDateString()}</span>
                      <span><Clock size={14} /> {activeBlog.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blog-detail-body">
                {/* Bookmarks, Likes & Share Controls */}
                <div className="blog-detail-floating-actions">
                  <button
                    className={`detail-action-btn ${likedBlogs[activeBlog.id] ? 'active' : ''}`}
                    onClick={() => toggleLike(activeBlog.id)}
                    title="Like Post"
                  >
                    <Heart size={18} fill={likedBlogs[activeBlog.id] ? "#ef4444" : "none"} />
                    <span>{likedBlogs[activeBlog.id] ? 25 : 24}</span>
                  </button>
                  <button
                    className={`detail-action-btn ${bookmarkedBlogs[activeBlog.id] ? 'active' : ''}`}
                    onClick={() => toggleBookmark(activeBlog.id)}
                    title="Bookmark Post"
                  >
                    <Bookmark size={18} fill={bookmarkedBlogs[activeBlog.id] ? "#3b82f6" : "none"} />
                  </button>
                  <button className="detail-action-btn" title="Share Post">
                    <Share2 size={18} />
                  </button>
                </div>

                {/* Main Article Content */}
                <div className="blog-detail-content-markdown">
                  {activeBlog.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return <h2 key={index}>{paragraph.replace('# ', '')}</h2>;
                    }
                    if (paragraph.startsWith('## ')) {
                      return <h3 key={index}>{paragraph.replace('## ', '')}</h3>;
                    }
                    if (paragraph.startsWith('```')) {
                      const lines = paragraph.split('\n');
                      const codeLines = lines.slice(1, lines.length - 1).join('\n');
                      return (
                        <pre key={index} className="blog-code-block">
                          <code>{codeLines}</code>
                        </pre>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>

                {/* Related Posts Section */}
                {getRelatedPosts(activeBlog).length > 0 && (
                  <div className="related-blogs-section">
                    <h4>Related Articles</h4>
                    <div className="related-blogs-grid">
                      {getRelatedPosts(activeBlog).map(rel => (
                        <div key={rel.id} className="related-blog-card glass" onClick={() => setActiveBlog(rel)}>
                          <img src={rel.coverImage} alt={rel.title} />
                          <h5>{rel.title}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
