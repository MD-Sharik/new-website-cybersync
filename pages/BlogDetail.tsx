import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Copy, Linkedin, Twitter, Check } from 'lucide-react';
import { BlogPost } from '../types';
import { DEFAULT_POSTS } from './Blog';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Get posts from local storage
    const storedPostsStr = localStorage.getItem('cyber_blog_posts');
    const storedPosts: BlogPost[] = storedPostsStr ? JSON.parse(storedPostsStr) : [];
    
    // 2. Merge with defaults
    const allPosts = [...storedPosts, ...DEFAULT_POSTS];
    
    // 3. Find matching post
    if (id) {
        const found = allPosts.find(p => p.id.toString() === id);
        setPost(found || null);
    }
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
      if (!post) return;
      const text = encodeURIComponent(post.title);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
  };

  const shareOnLinkedin = () => {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=550,height=520');
  };

  if (!post) {
    return (
        <div className="min-h-screen bg-cyber-black pt-32 text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-cyber-primary hover:underline">Return to Blog</Link>
        </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-[400px] relative">
         <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60" />
         <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <Link to="/blog" className="inline-flex items-center text-cyber-primary font-bold uppercase text-xs mb-6 hover:text-white transition-colors tracking-widest">
                    <ArrowLeft size={16} className="mr-2" /> Back to Blog
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4 font-mono">
                    <span className="px-3 py-1 bg-cyber-primary/20 text-cyber-primary rounded border border-cyber-primary/30 uppercase text-xs font-bold">{post.category}</span>
                    <div className="flex items-center gap-1"><Calendar size={14}/> {post.date}</div>
                    <div className="flex items-center gap-1"><User size={14}/> {post.author}</div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
         {/* Introduction/Excerpt */}
         <div className="text-xl text-gray-300 leading-relaxed mb-10 border-l-4 border-cyber-secondary pl-6 font-light italic">
            {post.excerpt}
         </div>

         {/* Main Body */}
         <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-cyber-primary prose-strong:text-white prose-code:text-cyber-secondary"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
         >
         </div>

         {/* Share / Footer */}
         <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="text-gray-500 text-sm">© Cyber Sync Blog</div>
             
             <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Share:</span>
                
                {/* LinkedIn */}
                <button 
                   onClick={shareOnLinkedin}
                   className="p-2 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white text-gray-400 transition-colors"
                   title="Share on LinkedIn"
                >
                   <Linkedin size={18} />
                </button>

                {/* Twitter / X */}
                <button 
                   onClick={shareOnTwitter}
                   className="p-2 bg-white/5 rounded-full hover:bg-black hover:text-white border border-transparent hover:border-white/20 text-gray-400 transition-colors"
                   title="Share on X (Twitter)"
                >
                   <Twitter size={18} />
                </button>

                {/* Copy Link */}
                <button 
                   onClick={handleCopyLink} 
                   className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                       copied ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                   }`}
                >
                   {copied ? <Check size={16} /> : <Copy size={16} />}
                   {copied ? 'Copied' : 'Copy Link'}
                </button>
             </div>
         </div>
      </div>
    </div>
  );
};