// Simple file-based blog storage for demonstration
// Each blog post: { id, title, content, image, author, category, date }
import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'blog', 'posts');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export function getAllBlogs() {
  try {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json'));
    return files.map(file => {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('Error reading blogs:', err);
    return [];
  }
}

export function addBlog({ title, content, image, author, category }) {
  const id = Date.now().toString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const blog = { 
    id, 
    slug,
    title, 
    content, 
    image: image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    author: author || 'Admin',
    category: category || 'General',
    date: new Date().toISOString(),
    excerpt: content.slice(0, 160) + '...'
  };
  fs.writeFileSync(path.join(BLOG_DIR, `${id}.json`), JSON.stringify(blog, null, 2));
  return blog;
}

export function getBlogById(id) {
  const file = path.join(BLOG_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, 'utf-8');
  return JSON.parse(content);
}
