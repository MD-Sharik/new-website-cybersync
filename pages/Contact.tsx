import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const incomingState: any = (location && (location as any).state) || {};
  const prefillProduct = incomingState.productName || incomingState.productId || '';

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedInterest, setSelectedInterest] = useState('Maplesoft Products');
  const [subProducts, setSubProducts] = useState<string[]>([]);
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);

  // Dynamic Sub-product Lists
  const productOptions: Record<string, string[]> = {
    'Maplesoft Products': ['Maple', 'MapleSim', 'Maple Flow', 'Maple Learn', 'Student Success Platform'],
    'SPSS / Analytics': ['SPSS Statistics', 'SPSS Modeler', 'Amos', 'Text Analytics'],
    'Enterprise AI': ['Custom LLM Development', 'AI Consulting', 'On-Premises Deployment', 'Agentic Workflows'],
    'Consulting': ['Strategic Planning', 'Technical Implementation', 'Training'],
    'Partnership Inquiry': ['Reseller Program', 'Technology Partner', 'Academic Partner'],
    'Other': [],
  };

  useEffect(() => {
    // If prefillProduct matches a known sub-product, find its parent category
    if (prefillProduct) {
      // Simple heuristic: default to Maplesoft if string contains "Maple"
      if (prefillProduct.includes('Maple')) setSelectedInterest('Maplesoft Products');
      // Add more logic if needed
    }
  }, [prefillProduct]);

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterest(e.target.value);
    setSubProducts([]); // reset sub-selections
  };

  const handleSubProductChange = (product: string) => {
    setSubProducts(prev =>
      prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product]
    );
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!terms) {
      alert("Please accept the Terms and Conditions.");
      return;
    }

    // capture form data
    const formEl = formRef.current;
    if (!formEl) return;
    const formData = new FormData(formEl);

    const payload = {
      from_name: formData.get('from_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      job_title: formData.get('job_title'),
      company: formData.get('company'),
      country: formData.get('country'),
      role: formData.get('role'), // Radio value
      licenses: formData.get('licenses'),
      interest: selectedInterest,
      detailed_interests: subProducts,
      message: formData.get('message'),
      newsletter: newsletter,
    };

    console.log('Submitting detailed quote form:', payload);

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setLoading(false);
        setStatus('success');
        if (formRef.current) formRef.current.reset();
        setSubProducts([]);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sidebar Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-6">Request a Price Quote</h1>
              <p className="text-gray-400 mb-8 text-lg">
                Complete this form to request pricing for licenses, custom development, or strategic consultations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Mail size={20} className="text-cyber-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-base">Email Us</h3>
                  <a href="mailto:info@cyber-sync.in" className="text-gray-400 hover:text-white transition-colors block text-sm">info@cyber-sync.in</a>
                  <a href="mailto:sales@cyber-sync.in" className="text-gray-400 hover:text-white transition-colors block text-sm">sales@cyber-sync.in</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Phone size={20} className="text-cyber-secondary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-base">Call Us</h3>
                  <p className="text-gray-400 text-sm">+91 8920652855</p>
                  <p className="text-[10px] text-gray-500 mt-1">Mon-Fri, 9am - 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-cyber-panel rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin size={20} className="text-cyber-accent" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-bold text-base">Visit HQ</h3>
                  <p className="text-gray-400 text-sm">Gurugram, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-2 bg-cyber-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            {status === 'success' && (
              <div className="absolute inset-0 bg-cyber-black/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <CheckCircle2 size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-gray-400 max-w-md">Thank you for your interest. A Cyber Sync representative will review your requirements and send a quote shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">Submit Another Request</button>
              </div>
            )}

            <form ref={formRef} className="space-y-6" onSubmit={sendEmail}>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address <span className="text-red-500">*</span></label>
                  <input required name="email" type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone</label>
                  <input name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name <span className="text-red-500">*</span></label>
                  <input required name="from_name" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name <span className="text-red-500">*</span></label>
                  <input required name="last_name" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Company / Institution <span className="text-red-500">*</span></label>
                  <input required name="company" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Job Title <span className="text-red-500">*</span></label>
                  <input required name="job_title" type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Country <span className="text-red-500">*</span></label>
                  <select required name="country" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors">
                    <option value="">Select Country...</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Total Potential Licenses</label>
                  <select name="licenses" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors">
                    <option value="1">1</option>
                    <option value="2-5">2 - 5</option>
                    <option value="6-10">6 - 10</option>
                    <option value="11-50">11 - 50</option>
                    <option value="51+">51+</option>
                    <option value="Site License">Site License</option>
                  </select>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 block">What best describes you? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  {['Academic', 'Commercial', 'Government', 'Student', 'Hobbyist/Retiree'].map((role) => (
                    <label key={role} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
                      <input required type="radio" name="role" value={role} className="w-4 h-4 text-cyber-primary focus:ring-cyber-primary bg-transparent border-gray-600" />
                      <span className="text-gray-300 text-sm">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              {/* Product Interest */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Primary Interest Area</label>
                  <select
                    name="interest"
                    value={selectedInterest}
                    onChange={handleInterestChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors"
                  >
                    {Object.keys(productOptions).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {productOptions[selectedInterest]?.length > 0 && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-sm font-medium text-gray-300">I am interested in:</label>
                    <div className="grid grid-cols-2 gap-3">
                      {productOptions[selectedInterest].map((sub) => (
                        <label key={sub} className="flex items-center space-x-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={subProducts.includes(sub)}
                            onChange={() => handleSubProductChange(sub)}
                            className="w-4 h-4 rounded text-cyber-primary focus:ring-cyber-primary bg-black/40 border-gray-600"
                          />
                          <span className="text-gray-400 text-sm">{sub}</span>
                        </label>
                      ))}
                      <label className="flex items-center space-x-3 cursor-pointer select-none">
                        <input type="checkbox" className="w-4 h-4 rounded text-cyber-primary focus:ring-cyber-primary bg-black/40 border-gray-600" />
                        <span className="text-gray-400 text-sm">Other</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Questions / Comments (Optional)</label>
                <textarea name="message" rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-primary outline-none transition-colors" placeholder="Please provide any additional context..." defaultValue={prefillProduct ? `Interested in ${prefillProduct}.` : ''}></textarea>
              </div>

              {/* Opt-in and Terms */}
              <div className="space-y-3 pt-2">
                {/* <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-cyber-primary focus:ring-cyber-primary bg-black/40 border-gray-600"
                  />
                  <span className="text-gray-400 text-xs leading-relaxed">
                    I would like to hear about new products, promotions, and exclusive content.
                  </span>
                </label> */}
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded text-cyber-primary focus:ring-cyber-primary bg-black/40 border-gray-600"
                  />
                  <span className="text-gray-400 text-xs leading-relaxed">
                    I agree to the <Link to="/terms" className="text-cyber-primary hover:underline">Terms and Conditions</Link> of the Cyber Sync website.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-primary hover:bg-white text-black font-bold py-4 rounded-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,180,0.3)] hover:shadow-[0_0_30px_rgba(0,255,180,0.5)]"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Processing...' : 'Submit Request'}
              </button>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded justify-center">
                  <AlertCircle size={16} />
                  <span>Failed to submit. Please check your connection or contact us directly.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div >
    </div >
  );
};