import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../services/apiClient';

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!title || !content) {
      setMessage('Title and content are required');
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiCall('blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content,
          image: imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
          author: author || 'Admin',
          category: category
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✓ Blog post created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/blog');
        }, 2000);
      } else {
        setMessage(data.message || 'Error adding blog');
      }
    } catch (error) {
      setMessage('Error: Failed to add blog');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div style={{ maxWidth: 700, margin: '40px auto', padding: '20px' }} className="px-4">
        <h1 style={{ color: '#00f0ff', marginBottom: '30px' }} className="text-4xl font-bold">Create Blog Post</h1>
        
        <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title *</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              placeholder="Enter blog title"
              style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: '1px solid #444', borderRadius: '5px' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Author</label>
            <input 
              value={author} 
              onChange={e => setAuthor(e.target.value)} 
              placeholder="Your name (optional)"
              style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: '1px solid #444', borderRadius: '5px' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: '1px solid #444', borderRadius: '5px' }}
            >
              <option value="General">General</option>
              <option value="Technology">Technology</option>
              <option value="AI & Tech">AI & Tech</option>
              <option value="Analytics">Analytics</option>
              <option value="Education">Education</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Image URL</label>
            <input 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              placeholder="https://example.com/image.jpg (optional)"
              style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: '1px solid #444', borderRadius: '5px' }} 
            />
            <small style={{ color: '#888', marginTop: '5px', display: 'block' }}>Use direct image links only (no file uploads)</small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Content *</label>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
              rows={12}
              placeholder="Write your blog content here..."
              style={{ width: '100%', padding: '10px', background: '#0a0a0a', color: '#fff', border: '1px solid #444', borderRadius: '5px', fontFamily: 'monospace' }} 
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#00f0ff', 
              color: '#000', 
              border: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Publishing...' : 'Publish Blog Post'}
          </button>

          {message && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: message.includes('✓') ? '#0a3a0a' : '#3a0a0a',
              color: message.includes('✓') ? '#00ff00' : '#ff6b6b',
              borderRadius: '5px',
              border: `1px solid ${message.includes('✓') ? '#00aa00' : '#aa0000'}`
            }}>
              {message}
            </div>
          )}
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="/#/blog" style={{ color: '#00f0ff', textDecoration: 'none', fontSize: '14px' }}>
            ← View All Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
