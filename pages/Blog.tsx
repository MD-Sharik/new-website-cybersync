import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { apiCall } from '../services/apiClient';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCall('blogs')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.blogs)) {
          setPosts(data.blogs.map((post: any) => ({
            id: post.id || post._id,
            title: post.title,
            excerpt: post.excerpt || (post.content ? post.content.slice(0, 150) + '...' : ''),
            author: post.author || 'Admin',
            category: post.category || 'General',
            image: post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
            date: post.date ? new Date(post.date).toLocaleDateString() : '',
            content: post.content
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);



  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitting(true);
      apiCall('subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
          } else {
            console.error('Subscription error:', data.message);
          }
        })
        .catch(err => console.error('Subscription error:', err))
        .finally(() => setIsSubmitting(false));
    }
  };


  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
            Insights & <span className="text-cyber-primary">News</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Latest updates on simulation technology, data analytics, and enterprise innovation.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto" size={40} />
            <p className="mt-4 text-gray-400">Loading blogs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <article key={post.id} className="group bg-cyber-panel border border-white/5 rounded-2xl overflow-hidden hover:border-cyber-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col h-full">
                <div className="h-64 overflow-hidden relative flex-shrink-0">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-cyber-black/80 backdrop-blur-md text-cyber-primary text-xs font-bold uppercase tracking-wider rounded border border-cyber-primary/30">
                      {post.category}
                    </span>
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-panel to-transparent opacity-90"></div>
                </div>

                <div className="p-8 relative -mt-12 z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyber-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-6 leading-relaxed flex-1 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-sm font-bold text-white hover:text-cyber-primary uppercase tracking-wider transition-colors mt-auto">
                    Read Article <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 p-12 rounded-2xl border border-white/10 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyber-secondary/20 rounded-full blur-3xl"></div>
           
           <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Stay Ahead of the Curve</h3>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
              Subscribe to our newsletter to receive the latest case studies, white papers, and product updates directly in your inbox.
           </p>
           
           {isSubscribed ? (
             <div className="inline-flex items-center gap-2 px-6 py-4 bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg animate-fade-in relative z-10">
                <CheckCircle2 size={20} />
                <span className="font-bold">Subscription Confirmed! Welcome aboard.</span>
             </div>
           ) : (
             <form className="max-w-md mx-auto flex gap-2 relative z-10" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-cyber-primary text-black font-bold px-6 py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] flex justify-center items-center"
                >
                   {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Subscribe'}
                </button>
             </form>
           )}
        </div>

      </div>
    </div>
  );
};