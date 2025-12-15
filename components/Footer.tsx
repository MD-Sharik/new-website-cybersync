import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, MapPin, Phone, Mail, ArrowRight, ShieldCheck, FileText, Loader2, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribeStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-cyber-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyber-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
               <img 
                 src="/logo.png" 
                 alt="Cybersync" 
                 className="h-10 w-auto object-contain"
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}
               />
               <span className="hidden font-sans text-2xl font-bold text-white tracking-wide">Cybersync</span>
            </Link>
            
            <div className="space-y-2">
                <p className="text-white font-bold text-sm tracking-wide">
                  Partnered with Maplesoft | Serving India & Global Clients
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Custom simulation, automation, analytics, and platform development.
                </p>
            </div>

            <div className="flex space-x-4">
              <a href="https://x.com/Cybersync2024?t=_hJCpwW4CbQHfm3NPnXpjQ&s=08" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-cyber-primary hover:text-black hover:border-cyber-primary transition-all duration-300 group">
                <Twitter size={18} className="transform group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/company/cybersynctech/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-cyber-secondary hover:text-white hover:border-cyber-secondary transition-all duration-300 group">
                <Linkedin size={18} className="transform group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group">
                <Facebook size={18} className="transform group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Quick Links / Products */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-cyber-primary rounded-full"></span>
              Key Products
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/products/maple" className="hover:text-cyber-primary hover:pl-2 transition-all block">Maple 2025</Link></li>
              <li><Link to="/products/maplesim" className="hover:text-cyber-primary hover:pl-2 transition-all block">MapleSim</Link></li>
              <li><Link to="/products/spss" className="hover:text-cyber-primary hover:pl-2 transition-all block">IBM SPSS Statistics</Link></li>
              <li><Link to="/products/student-success" className="hover:text-cyber-primary hover:pl-2 transition-all block">Student Success Platform</Link></li>
              <li><Link to="/products/smartpls" className="hover:text-cyber-primary hover:pl-2 transition-all block">SmartPLS 4</Link></li>
              <li><Link to="/products/workato" className="hover:text-cyber-primary hover:pl-2 transition-all block">Workato Automation</Link></li>
            </ul>
          </div>

          {/* Solutions - FIXED LINKS */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-cyber-secondary rounded-full"></span>
              Our Solutions
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/solutions/data" className="hover:text-cyber-secondary hover:pl-2 transition-all block">Data & Analytics</Link></li>
              <li><Link to="/solutions/engineering" className="hover:text-cyber-secondary hover:pl-2 transition-all block">Engineering Modeling</Link></li>
              <li><Link to="/solutions/ai" className="hover:text-cyber-secondary hover:pl-2 transition-all block">Enterprise AI & GPT</Link></li>
              <li><Link to="/solutions/sap" className="hover:text-cyber-secondary hover:pl-2 transition-all block">SAP Consulting</Link></li>
              <li><Link to="/solutions/enterprise" className="hover:text-cyber-secondary hover:pl-2 transition-all block">Custom ERP & EDLI</Link></li>
              <li><Link to="/solutions/pos" className="hover:text-cyber-secondary hover:pl-2 transition-all block">POS & Supply Chain</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-cyber-maple rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400 mb-8">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-cyber-primary group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                <span>Gurugram, India</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-cyber-primary group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                <span className="font-mono">+91 8920652855</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-cyber-primary group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@cyber-sync.in" className="hover:text-white transition-colors">info@cyber-sync.in</a>
                  <a href="mailto:sales@cyber-sync.in" className="hover:text-white transition-colors">sales@cyber-sync.in</a>
                </div>
              </li>
            </ul>

            {/* Mini Newsletter */}
            <div>
               <h4 className="text-xs font-bold text-white uppercase mb-2">Subscribe to Updates</h4>
               {subscribeStatus === 'success' ? (
                   <div className="flex items-center gap-2 text-green-500 text-xs font-bold py-2 animate-fade-in">
                       <CheckCircle2 size={14} /> Subscribed!
                   </div>
               ) : (
                   <form onSubmit={handleSubscribe} className="flex relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address" 
                        className="w-full bg-white/5 border border-white/10 rounded-l px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-primary disabled:opacity-50"
                        disabled={isSubmitting}
                        required
                      />
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-cyber-primary text-black px-3 py-2 rounded-r hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
                      >
                         {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                      </button>
                   </form>
               )}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © 2024 Cyber Sync. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
             <Link to="/privacy" className="hover:text-cyber-primary transition-colors flex items-center gap-1">
               <ShieldCheck size={12} /> Privacy Policy
             </Link>
             <Link to="/terms" className="hover:text-cyber-primary transition-colors flex items-center gap-1">
               <FileText size={12} /> Terms of Service
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};