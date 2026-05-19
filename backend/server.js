const express = require('express');
const { getBlogs, saveBlogs, generateBlogArticle, runAutoScheduler } = require('./blogGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Pure CORS native implementation (No extra npm package needed!)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Root path status
app.get('/', (req, res) => {
  res.json({ status: "running", service: "AI Blog Engine Backend", uptime: process.uptime() });
});

// 1. GET /api/blogs - List all blogs
app.get('/api/blogs', (req, res) => {
  try {
    const blogs = getBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to read blogs data", details: err.message });
  }
});

// 2. POST /api/blogs/generate - Manually trigger AI generation
app.post('/api/blogs/generate', (req, res) => {
  try {
    const customTopic = req.body.topic ? req.body : null;
    const newBlog = generateBlogArticle(customTopic);
    res.status(201).json({ message: "Successfully generated technical blog article!", blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate blog", details: err.message });
  }
});

// 3. PUT /api/blogs/:id - Update / Edit a blog post (Publish/Unpublish, metadata changes)
app.put('/api/blogs/:id', (req, res) => {
  try {
    const blogs = getBlogs();
    const index = blogs.findIndex(b => b.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Merge changes
    blogs[index] = { ...blogs[index], ...req.body };
    saveBlogs(blogs);

    res.json({ message: "Blog post successfully updated", blog: blogs[index] });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog post", details: err.message });
  }
});

// 4. DELETE /api/blogs/:id - Remove a blog post
app.delete('/api/blogs/:id', (req, res) => {
  try {
    const blogs = getBlogs();
    const filteredBlogs = blogs.filter(b => b.id !== req.params.id);
    
    if (blogs.length === filteredBlogs.length) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    saveBlogs(filteredBlogs);
    res.json({ message: "Blog post successfully deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog post", details: err.message });
  }
});

// Start weekly scheduling process
runAutoScheduler();
console.log("Weekly AI Blog scheduling loop started successfully (Monday 9:00 AM).");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
