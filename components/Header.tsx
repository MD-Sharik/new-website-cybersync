import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle, ArrowRight, Cpu, Globe } from 'lucide-react';
import { NavItem } from '../types';

const PRODUCT_MENU: NavItem[] = [
  { label: 'Mathematical Computing', href: '/products?cat=Mathematical Computing', isSectionHeader: true },
  { label: 'Maple 2025', href: '/products/maple' },
  { label: 'MapleSim', href: '/products/maplesim' },
  { label: 'Maple Flow', href: '/products/mapleflow' },
  { label: 'Maple Learn', href: '/products/maplelearn' },
  
  { label: 'Statistical Software', href: '/products?cat=Statistical Software', isSectionHeader: true },
  { label: 'IBM SPSS Statistics', href: '/products/spss' },
  { label: 'SPSS Amos', href: '/products/amos' },
  { label: 'SPSS Modeler', href: '/products/modeler' },
  { label: 'Stata', href: '/products/stata' },
  { label: 'EViews', href: '/products/eviews' },
  { label: 'SmartPLS', href: '/products/smartpls' },

  { label: 'Qualitative Research', href: '/products?cat=Qualitative Research', isSectionHeader: true },
  { label: 'ATLAS.ti', href: '/products/atlas-ti' },
  { label: 'MAXQDA', href: '/products/maxqda' },

  { label: 'Education', href: '/products?cat=Education', isSectionHeader: true },
  { label: 'Student Success Platform', href: '/products/student-success' },
  
  { label: 'Enterprise Automation', href: '/products?cat=Enterprise Automation', isSectionHeader: true },
  { label: 'Workato', href: '/products/workato' },
];

const SOLUTION_MENU: NavItem[] = [
  { label: 'Automation & Integration', href: '/solutions/workato-solutions', isSectionHeader: true },
  { label: 'Workato Integration', href: '/solutions/workato-solutions' },
  { label: 'Workflow Orchestration', href: '/solutions/workato-solutions' },
  { label: 'API Management', href: '/solutions/workato-solutions' },

  { label: 'Data & Analytics', href: '/solutions/data', isSectionHeader: true },
  { label: 'Business Intelligence', href: '/solutions/data' },
  { label: 'Risk Analytics', href: '/solutions/data' },
  { label: 'Data Engineering', href: '/solutions/data' },
  
  { label: 'Engineering', href: '/solutions/engineering', isSectionHeader: true },
  { label: 'Mathematical Modeling', href: '/solutions/engineering' },
  { label: 'Digital Twins', href: '/solutions/engineering' },
  { label: 'Control Design', href: '/solutions/engineering' },

  { label: 'RAG AI', href: '/solutions/ai', isSectionHeader: true },
  { label: 'NLP Solutions', href: '/solutions/ai' },
  { label: 'Computer Vision', href: '/solutions/ai' },
  { label: 'ML Platforms', href: '/solutions/ai' },
  { label: 'Enterprise GPT', href: '/solutions/ai' },

  { label: 'SAP Consulting', href: '/solutions/sap', isSectionHeader: true },
  { label: 'S/4HANA Migration', href: '/solutions/sap' },
  { label: 'Implementation', href: '/solutions/sap' },
  { label: 'AMS Support', href: '/solutions/sap' },

  { label: 'Enterprise Systems', href: '/solutions/enterprise', isSectionHeader: true },
  { label: 'Custom ERP/CRM', href: '/solutions/enterprise' },
  { label: 'Web & Mobile Apps', href: '/solutions/enterprise' },
  { label: 'IT Infrastructure', href: '/solutions/it-infra' },
  { label: 'EDLI Solutions', href: '/solutions/enterprise' },

  { label: 'POS & Inventory', href: '/solutions/pos', isSectionHeader: true },
  { label: 'Smart POS', href: '/solutions/pos' },
  { label: 'Warehouse Management', href: '/solutions/pos' },
  { label: 'Supply Chain Analytics', href: '/solutions/pos' },

  { label: 'Marketing & Growth', href: '/solutions/marketing', isSectionHeader: true },
  { label: 'Digital Marketing & SEO', href: '/solutions/marketing' },
  { label: 'Content Creation', href: '/solutions/marketing' },
  { label: 'WhatsApp Automation', href: '/solutions/marketing' },
];

// Helper to group flat menu items into sections
const groupItems = (items: NavItem[]) => {
  return items.reduce((acc, item) => {
    if (item.isSectionHeader) {
      acc.push({ title: item.label, href: item.href, items: [] });
    } else if (acc.length > 0) {
      acc[acc.length - 1].items.push(item);
    }
    return acc;
  }, [] as { title: string; href: string; items: NavItem[] }[]);
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const groupedProducts = groupItems(PRODUCT_MENU);
  const groupedSolutions = groupItems(SOLUTION_MENU);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // CONTENT MAPPING
  const menuContent = {
    'Products': {
      groups: groupedProducts,
      sidebar: {
        icon: Cpu,
        color: 'bg-cyber-maple',
        textColor: 'text-cyber-primary',
        glow: 'bg-cyber-maple/20',
        title: 'Featured: Maple 2025',
        desc: 'The essential tool for mathematics, modeling, and simulation. Experience the power of symbolic computation with new AI capabilities.',
        linkText: 'Explore Now',
        linkHref: '/products/maple',
        viewAllHref: '/products'
      }
    },
    'Solutions': {
      groups: groupedSolutions,
      sidebar: {
        icon: Globe,
        color: 'bg-cyber-maple',
        textColor: 'text-cyber-primary',
        glow: 'bg-cyber-maple/20',
        title: 'RAG AI',
        desc: 'Transform your business with custom ERP, CRM, and Generative AI solutions tailored to your workflow.',
        linkText: 'Discover AI',
        linkHref: '/solutions/ai',
        viewAllHref: '/solutions'
      }
    }
  };

  const activeContent = activeDropdown ? menuContent[activeDropdown as keyof typeof menuContent] : null;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-cyber-black/40 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center z-50">
             <img 
               src="/logo.png" 
               alt="Cybersync" 
               className="h-12 w-auto object-contain"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }}
             />
             <img src="cybersync.svg" alt="Cybersync" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            <Link to="/" className="font-sans text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide">Home</Link>
            <Link to="/about" className="font-sans text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide">About Us</Link>
            
            {/* Products Trigger */}
            <div 
              className="relative h-full flex items-center pt-6 cursor-pointer"
              onMouseEnter={() => setActiveDropdown('Products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/products" 
                className="flex items-center gap-1 font-sans text-sm font-bold text-gray-300 hover:text-cyber-primary transition-colors uppercase tracking-wide -mt-6"
              >
                Products 
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${activeDropdown === 'Products' ? 'rotate-180 text-cyber-primary' : ''}`}
                />
              </Link>
            </div>

            {/* Solutions Trigger */}
            <div 
              className="relative h-full flex items-center pt-6 cursor-pointer"
              onMouseEnter={() => setActiveDropdown('Solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to="/solutions" 
                className="flex items-center gap-1 font-sans text-sm font-bold text-gray-300 hover:text-cyber-primary transition-colors uppercase tracking-wide -mt-6"
              >
                Solutions 
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${activeDropdown === 'Solutions' ? 'rotate-180 text-cyber-primary' : ''}`}
                />
              </Link>
            </div>

            <Link to="/blog" className="font-sans text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide">Blog</Link>
            <Link to="/contact" className="font-sans text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide">Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4 z-50">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-6 py-2.5 rounded border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <UserCircle size={18} />
              <span>Join Network</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4 z-50">
             <Link to="/dashboard" className="text-cyber-primary">
                <UserCircle size={24} />
             </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyber-primary p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- UNIFIED SINGLE MEGA MENU CONTAINER --- */}
      {/* This ensures the exact same positioning and layout for both menus */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-40 transition-all duration-300 origin-top ${
          activeDropdown && activeContent ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
        onMouseEnter={() => setActiveDropdown(activeDropdown)} // Keep open when hovering the menu itself
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className={`bg-cyber-black/95 backdrop-blur-xl border rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex max-h-[80vh] ${
            activeDropdown === 'Solutions' ? 'border-cyber-primary/30' : 'border-cyber-primary/30'
        }`}>
          {/* Dynamic Sidebar */}
          <div className="w-1/3 bg-gradient-to-br from-cyber-panel to-black p-8 flex flex-col justify-between border-r border-white/5 relative overflow-hidden hidden md:flex">
              {activeContent && (
                <>
                  <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] ${activeContent.sidebar.glow}`}></div>
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg ${activeContent.sidebar.color}`}>
                        <activeContent.sidebar.icon size={24} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{activeContent.sidebar.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {activeContent.sidebar.desc}
                    </p>
                    <Link to={activeContent.sidebar.linkHref} className={`${activeContent.sidebar.textColor} text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all`}>
                        {activeContent.sidebar.linkText} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="mt-8">
                    <Link to={activeContent.sidebar.viewAllHref} className="block w-full py-3 bg-white/5 hover:bg-white/10 text-center rounded border border-white/10 text-xs font-bold uppercase text-gray-300 transition-colors">
                        View All
                    </Link>
                  </div>
                </>
              )}
          </div>
          
          {/* Dynamic Content Grid */}
          <div className={`flex-1 p-8 overflow-y-auto ${activeDropdown === 'Solutions' ? 'custom-scrollbar-secondary' : 'custom-scrollbar'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                  {activeContent?.groups.map((group, idx) => (
                      <div key={idx}>
                          <Link to={group.href} className={`font-bold text-xs uppercase tracking-wider mb-4 block hover:text-white transition-colors border-b border-white/5 pb-2 ${activeDropdown === 'Solutions' ? 'text-cyber-primary' : 'text-cyber-primary'}`}>
                              {group.title}
                          </Link>
                          <ul className="space-y-3">
                              {group.items.map((item, i) => (
                                  <li key={i}>
                                      <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors block hover:pl-1">
                                          {item.label}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-cyber-black/95 backdrop-blur-xl border-b border-white/10 absolute top-24 left-0 w-full h-[calc(100vh-96px)] overflow-y-auto z-40">
          <div className="px-4 pt-4 pb-20 space-y-2">
            <Link to="/" className="block px-4 py-3 text-lg font-bold text-white border-b border-white/5" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block px-4 py-3 text-lg font-bold text-white border-b border-white/5" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            
            <div className="px-4 py-3">
              <Link to="/products" className="text-cyber-primary font-bold uppercase tracking-widest text-xs mb-2 block" onClick={() => setIsMenuOpen(false)}>Products (View All)</Link>
              {PRODUCT_MENU.map((item, idx) => (
                !item.isSectionHeader && (
                  <Link key={idx} to={item.href} className="block py-2 text-gray-400 hover:text-white pl-4 border-l border-white/10" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
                )
              ))}
            </div>

            <div className="px-4 py-3">
              <Link to="/solutions" className="text-cyber-secondary font-bold uppercase tracking-widest text-xs mb-2 block" onClick={() => setIsMenuOpen(false)}>Solutions (View All)</Link>
              {SOLUTION_MENU.map((item, idx) => (
                !item.isSectionHeader && (
                  <Link key={idx} to={item.href} className="block py-2 text-gray-400 hover:text-white pl-4 border-l border-white/10" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
                )
              ))}
            </div>

            <Link to="/blog" className="block px-4 py-3 text-lg font-bold text-white border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/contact" className="block px-4 py-3 text-lg font-bold text-white border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};
