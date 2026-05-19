const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'blogs.json');

// Ensure data directory and file exist
const initializeDb = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialBlogs, null, 2));
  }
};

const getBlogs = () => {
  initializeDb();
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

const saveBlogs = (blogs) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(blogs, null, 2));
};

const categories = [
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

const initialBlogs = [
  {
    id: "top-10-react-best-practices-2026",
    title: "Top 10 React Best Practices in 2026",
    slug: "top-10-react-best-practices-2026",
    excerpt: "Explore the modern architectural patterns, custom hooks designs, and compiler optimizations that are dominating React applications in 2026.",
    category: "React",
    tags: ["React", "Web Dev", "JavaScript", "Frontend", "2026"],
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&q=80",
    content: `# Top 10 React Best Practices in 2026

React has evolved significantly over the years, and with the latest features, the way we build interfaces has reached new heights of performance and maintainability. In this post, we discuss the top 10 best practices you should follow for production-ready React apps in 2026.

## 1. Embrace React Compiler (Zero-Dependency Memoization)
Gone are the days of manual \`useMemo\` and \`useCallback\` micro-optimizations. In 2026, the automatic compiler automatically optimizes component renders.
\`\`\`javascript
// No need for manual useMemo, React Compiler handles this automatically!
const ProductList = ({ items }) => {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
};
\`\`\`

## 2. Server Components by Default
Adopt React Server Components (RSC) to fetch data directly inside server component functions. This keeps your client bundle light and fast!

## 3. Strict State Colocation
Keep state as close to where it is used as possible. Avoid massive global contexts unless absolutely necessary for universal states.

## 4. Custom Hook Abstractions
Encapsulate complex UI logics and side-effects into elegant custom hooks to promote clean, reusable codebases.

## 5. Optimized Asset Loading
Leverage modern image lazy-loading, responsive srcsets, and vector SVGs to maintain high Lighthouse scores and blazing-fast loading.

## Conclusion
Following these rules will elevate your personal development practices and deliver exceptional, smooth software solutions.`,
    date: "2026-05-18T09:00:00Z",
    readingTime: "5 min read",
    published: true,
    author: {
      name: "Ritesh Prasad",
      role: "Software Engineer"
    }
  },
  {
    id: "spring-boot-vs-express-js",
    title: "Spring Boot vs Express.js: Finding the Perfect Backend",
    slug: "spring-boot-vs-express-js",
    excerpt: "An in-depth, hands-on architectural comparison between Spring Boot's robust structured framework and Express.js's lightweight flexibility.",
    category: "Java",
    tags: ["Spring Boot", "Express", "Backend", "Architecture", "Java", "NodeJS"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80",
    content: `# Spring Boot vs Express.js: Finding the Perfect Backend

Choosing the right backend framework is critical to the scaling and longevity of any web application. Today, we put Java's powerhouse **Spring Boot** and Node.js's favorite **Express.js** side-by-side.

## Spring Boot: Enterprise Scaling
Spring Boot excels in massive, highly-structured applications. With features like dependency injection, JPA, and deep type safety, it's designed for stable engineering.
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }
}
\`\`\`

## Express.js: Rapid Adaptability
Express.js is lightweight, unopinionated, and highly flexible. Ideal for startups and small-to-medium systems, it runs on JavaScript and leverages asynchronous event loops.
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json(users);
});
\`\`\`

## Which Should You Choose?
- Choose **Spring Boot** if you need high security, enterprise architecture, or robust multithreading.
- Choose **Express.js** if you need fast MVPs, unified JS stack (MERN), or highly flexible server design.`,
    date: "2026-05-11T09:00:00Z",
    readingTime: "6 min read",
    published: true,
    author: {
      name: "Ritesh Prasad",
      role: "Software Engineer"
    }
  }
];

// Rich topics to generate dynamic articles from
const topics = [
  {
    category: "AI",
    title: "AI Tools Every Developer Should Master in 2026",
    excerpt: "Discover the state-of-the-art AI code editors, coding copilots, and automatic debugging agents transforming software engineering.",
    tags: ["AI", "Coding", "Automation", "Future", "Software Engineering"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1000&q=80",
    content: `# AI Tools Every Developer Should Master in 2026

Artificial Intelligence has transformed from a simple code completion tool into a comprehensive paired coding assistant. To stay ahead as a software engineer, you must master the state-of-the-art AI systems of 2026.

## 1. Autonomous Agent Frameworks
Unlike simple prompts, autonomous agents can read full codebases, research terminal outputs, edit multiple files, and verify builds dynamically.

## 2. Advanced Prompt Engineering
Learning how to contextualize prompts, provide exact file links, and define strict constraints dramatically improves the quality of AI-generated code.

## 3. Real-time Debugging Tools
Modern debuggers can analyze stack traces instantly, find memory leaks, and generate highly targeted Git patch files to resolve production failures.

## Conclusion
AI doesn't replace engineers; engineers who use AI replace those who don't. Build smart, iterate fast!`
  },
  {
    category: "Open Source",
    title: "Getting Started with Open Source Contributions",
    excerpt: "A step-by-step roadmap to finding your first open-source repository, writing meaningful commits, and getting your pull requests approved.",
    tags: ["Open Source", "Git", "GitHub", "Community", "Collaboration"],
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=1000&q=80",
    content: `# Getting Started with Open Source Contributions

Contributing to open-source software is one of the most rewarding ways to grow your technical skills, build an outstanding developer portfolio, and connect with the global engineering community.

## Why Contribute?
1. **Real-world codebase experience:** Work on production systems with rigid code standards, CI/CD validations, and review structures.
2. **Networking:** Connect with senior maintainers who can offer mentorship, collaborations, and career opportunities.
3. **Build your brand:** Your GitHub commits are permanent proofs of your expertise.

## How to Find Your First Issue
Look for tags like \`good first issue\`, \`documentation\`, or \`beginner-friendly\` inside repositories you actively use in your personal projects.

## Best Practices
- Always read the \`CONTRIBUTING.md\` file.
- Explain your implementation clearly in the Pull Request description.
- Be receptive to code review feedback. Happy coding!`
  },
  {
    category: "Web Development",
    title: "How I Built My Portfolio Website",
    excerpt: "An architectural walkthrough of my portfolio's high-performance stack: React, Vite, Framer Motion, and HSL custom luxury design systems.",
    tags: ["Portfolio", "Vite", "React", "Web Dev", "CSS", "Aesthetics"],
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80",
    content: `# How I Built My Portfolio Website

Your portfolio is the digital home of your personal engineering brand. I built this portfolio with three key constraints: blazing-fast speed, breathtaking luxury styling, and a clean code layout.

## 1. Blazing Fast Client: Vite + React
By adopting Vite, compilation is nearly instantaneous (under 500ms). This creates an extremely fast developer loop and premium user hot-reloads.

## 2. Dynamic Micro-Animations: Framer Motion
Framer Motion was crucial to introducing high-fidelity scrolling behaviors, spring modal transitions, and elastic hover interactions.

## 3. Dark Luxury Visual Palette
I curated deep blacks (#000000, #050816) combined with soft, glowing radial highlights to produce an aesthetic similar to award-winning creative agencies.

## Conclusion
A great portfolio represents your standards of quality. Keep experimenting and building technology that stands out!`
  }
];

const generateBlogArticle = (customTopic = null) => {
  const blogs = getBlogs();
  
  // Select topic
  let selectedTopic;
  if (customTopic) {
    selectedTopic = {
      category: customTopic.category || "AI",
      title: customTopic.title || "Fresh AI Perspectives",
      excerpt: customTopic.excerpt || "New tech discussion and code structures.",
      tags: customTopic.tags || ["Tech", "Engineering"],
      coverImage: customTopic.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80",
      content: customTopic.content || "# Fresh Technical Insight\n\nMore coding guidelines coming soon."
    };
  } else {
    // Pick a topic that hasn't been generated yet, or pick randomly
    const generatedTitles = blogs.map(b => b.title);
    const unusedTopics = topics.filter(t => !generatedTitles.includes(t.title));
    selectedTopic = unusedTopics.length > 0 ? unusedTopics[0] : topics[Math.floor(Math.random() * topics.length)];
  }

  const slug = selectedTopic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const newBlog = {
    id: `${slug}-${Date.now()}`,
    title: selectedTopic.title,
    slug: slug,
    excerpt: selectedTopic.excerpt,
    category: selectedTopic.category,
    tags: selectedTopic.tags,
    coverImage: selectedTopic.coverImage,
    content: selectedTopic.content,
    date: new Date().toISOString(),
    readingTime: `${Math.ceil(selectedTopic.content.split(' ').length / 150)} min read`,
    published: true,
    author: {
      name: "Ritesh Prasad",
      role: "Software Engineer"
    }
  };

  blogs.unshift(newBlog);
  saveBlogs(blogs);

  return newBlog;
};

// Scheduler simulator: Checks every 1 minute if a new weekly post should be generated
// (Normally runs on server startup, runs dynamically in server.js)
const runAutoScheduler = () => {
  setInterval(() => {
    const now = new Date();
    // Monday at 9:00 AM (Monday is day 1, hours = 9, minutes = 0)
    if (now.getDay() === 1 && now.getHours() === 9 && now.getMinutes() === 0) {
      console.log("Weekly Auto-Scheduler Triggered: Generating new AI Blog Post...");
      try {
        generateBlogArticle();
      } catch (err) {
        console.error("Auto-scheduler failed to generate blog:", err);
      }
    }
  }, 60000); // check every minute
};

module.exports = {
  getBlogs,
  saveBlogs,
  generateBlogArticle,
  runAutoScheduler
};
