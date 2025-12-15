import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const incomingState: any = (location && (location as any).state) || {};
  const prefillProduct = incomingState.productName || incomingState.productId || '';

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // capture form data
    const formEl = formRef.current;
    const formData = formEl ? new FormData(formEl) : null;
    
    const payload = {
      from_name: formData?.get('from_name') || '',
      last_name: formData?.get('last_name') || '',
      reply_to: formData?.get('reply_to') || '',
      interest: formData?.get('interest') || '',
      message: formData?.get('message') || '',
      product: formData?.get('product') || '',
    };

    console.log('Submitting contact form:', payload);

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setLoading(false);
        setStatus('success');
        if (formRef.current) formRef.current.reset();
      } else {
        setLoading(false);
        setStatus('error');
        console.error('Failed to send:', result.message);
      }
    } catch (error) {
      setLoading(false);
      setStatus('error');
      console.error('Error sending contact form:', error);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">Let's Build the Future Together</h1>
            <p className="text-gray-400 mb-12 text-lg">
              Whether you need enterprise licensing for Maplesoft, custom AI development, or a strategic consultation, our team is ready to deploy.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Mail className="text-cyber-primary" />
                </div>
                <div className="ml-6">
                  <h3 className="text-white font-bold text-lg">Email Us</h3>
                  <a href="mailto:info@cyber-sync.in" className="text-gray-400 hover:text-white transition-colors block">info@cyber-sync.in</a>
                  <a href="mailto:sales@cyber-sync.in" className="text-gray-400 hover:text-white transition-colors block">sales@cyber-sync.in</a>
                </div>
              </div>

              <div className="flex items-start">
                 <div className="w-12 h-12 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Phone className="text-cyber-secondary" />
                </div>
                <div className="ml-6">
                  <h3 className="text-white font-bold text-lg">Call Us</h3>
                  <p className="text-gray-400">+91 8920652855</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am - 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start">
                 <div className="w-12 h-12 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin className="text-cyber-accent" />
                </div>
                <div className="ml-6">
                  <h3 className="text-white font-bold text-lg">Visit HQ</h3>
                  <p className="text-gray-400">
                    Gurugram, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
             {status === 'success' && (
                <div className="absolute inset-0 bg-cyber-black/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                    <CheckCircle2 size={64} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Thank you for contacting Cyber Sync. Our team will respond to your inquiry shortly.</p>
                    <button onClick={() => setStatus('idle')} className="mt-6 text-cyber-primary hover:text-white underline">Send another message</button>
                </div>
             )}

            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form ref={formRef} className="space-y-6" onSubmit={sendEmail}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm text-gray-400 mb-2">First Name</label>
                   <input required name="from_name" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                   <input required name="last_name" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
              </div>
              
              <div>
                 <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                 <input required name="reply_to" type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
              </div>

              <div>
                 <label className="block text-sm text-gray-400 mb-2">Area of Interest</label>
                 <select name="interest" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors">
                   <option>Maplesoft Products</option>
                   <option>SPSS / Analytics</option>
                   <option>Enterprise AI</option>
                   <option>Consulting</option>
                   <option>Partnership Inquiry</option>
                   <option>Other</option>
                 </select>
              </div>

              <div>
                 <label className="block text-sm text-gray-400 mb-2">Message</label>
                 <textarea required name="message" rows={4} defaultValue={prefillProduct ? `I'm interested in ${prefillProduct}. Please send pricing and licensing info.` : ''} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors"></textarea>
              </div>

              {/* pass product info into the email template as a hidden field */}
              <input type="hidden" name="product" value={prefillProduct} />

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-cyber-primary hover:bg-white text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Sending...' : 'Submit Request'}
              </button>

              {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded">
                      <AlertCircle size={16} />
                      <span>Failed to send message. Please try again or email us directly.</span>
                  </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};