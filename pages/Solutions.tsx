import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Database, Cpu, Settings, Briefcase, ShoppingCart, Code, Check, MessageSquare, ArrowRight, Loader2, CheckCircle2, AlertCircle, Workflow, Server, Megaphone } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SOLUTIONS_LIST = [
  {
    id: 'workato-solutions',
    title: 'Workato Automation',
    description: 'The leader in Enterprise Automation. Orchestrate workflows across HR, Sales, and IT with AI-powered recipes. Automate Quote-to-Cash and Employee Onboarding seamlessly.',
    icon: './product/Workato.png',
    color: 'text-orange-500',
    items: [
      'Workflow Orchestration (iPaaS)',
      'Custom Connector Dev',
      'Recipe Architecture',
      'API Management'
    ]
  },
  {
    id: 'engineering',
    title: 'Engineering Modeling',
    description: 'Advanced mathematical computing and simulation. From digital twins to system-level modeling, we provide the tools to test before you build.',
    icon: './product/EngineeringModeling.png',
    color: 'text-cyber-maple',
    items: [
      'Digital Twins',
      'System Modeling',
      'Optimization',
      'Control Design'
    ]
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    description: 'Turn raw data into actionable insights with our suite of analytics and BI services. We help organizations build robust data pipelines.',
    icon:'./product/dataanalytics.avif',
    color: 'text-cyber-primary',
    items: [
      'Risk Analytics Platform',
      'Data Engineering',
      'Business Intelligence',
      'Predictive Analytics'
    ]
  },
  {
    id: 'ai',
    title: 'Enterprise AI & ML',
    description: 'Next-gen AI development. Featuring our custom Enterprise GPT wrapper (in dev) and scalable ML platforms.',
    icon:'./product/ai.jpg',
    color: 'text-cyber-secondary',
    items: [
      'Enterprise GPT Wrapper',
      'NLP Solutions',
      'Computer Vision',
      'ML Platforms'
    ]
  },
  {
    id: 'sap',
    title: 'SAP Consulting',
    description: 'Strategic implementation and management of SAP ecosystems. Experts in S/4HANA migration and support.',
    icon:'./product/sapconsulting.avif',
    color: 'text-blue-400',
    items: [
      'S/4HANA Migration',
      'SAP Implementation',
      'Fiori UX Design',
      'AMS Support'
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing & Growth',
    description: 'Complete 360° digital strategy. From ranking #1 on Google with SEO to creating engaging content and automating customer retention.',
    icon:'./product/marketing.jpeg',
    color: 'text-green-500',
    items: [
      'SEO & SERP Ranking',
      'Content Creation',
      'PPC & Ad Management',
      'WhatsApp Bots'
    ]
  },
  {
    id: 'it-infra',
    title: 'IT Infra Solutions',
    description: 'Hardware and Security infrastructure. Workstations, Firewalls, CCTV, and Networking gear for the modern office.',
    icon:'./product/ITInfra.jpg',
    color: 'text-yellow-500',
    items: [
      'Workstations & AIOs',
      'Network Security',
      'CCTV & Surveillance',
      'WiFi Access Points'
    ]
  },
  {
    id: 'pos',
    title: 'POS & Warehouse',
    description: 'Streamlining retail and supply chain operations with real-time tracking, WMS, and automated logistics.',
    icon:'./product/warehouse.avif',
    color: 'text-cyber-accent',
    items: [
      'Smart POS Systems',
      'Warehouse Management',
      'Supply Chain Analytics',
      'Inventory Optimization'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Systems',
    description: 'Custom cloud-based solutions (XaaS). Specialists in EDLI data interchange and custom ERPs.',
    icon:'./product/Enterprise.png',
    color: 'text-white',
    items: [
      'EDLI Solutions',
      'Custom ERP & CRM',
      'Web & Mobile Apps',
      'Legacy Modernization'
    ]
  }
];

export const Solutions: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendConsultationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // REPLACE WITH YOUR EMAILJS KEYS (See Contact.tsx for instructions)
    const SERVICE_ID = 'YOUR_SERVICE_ID'; 
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; 
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; 

    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        // Fallback for simulation
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
            if(formRef.current) formRef.current.reset();
        }, 1500);
        return;
    }

    setLoading(true);
    setStatus('idle');

    if (formRef.current) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
          .then(() => {
              setLoading(false);
              setStatus('success');
              if(formRef.current) formRef.current.reset();
          }, (error) => {
              setLoading(false);
              setStatus('error');
              console.error(error);
          });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Solutions & Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We bridge the gap between traditional systems and futuristic innovation with tailored XaaS (Everything as a Service) solutions.
          </p>
        </div>

        {/* Grid Layout - Same as Products Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 perspective-1000">
           {SOLUTIONS_LIST.map((sol, idx) => (
             <Link 
               to={`/solutions/${sol.id}`}
               key={idx} 
               className="group relative bg-cyber-panel border border-white/5 rounded-xl overflow-hidden hover:border-cyber-primary/50 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transform hover:-translate-y-2 hover:rotate-x-12"
             >
             

                <div className="p-8 flex-1">
                   <div className="flex items-center justify-between mb-6">
                      <div className={` h-14 rounded-xl flex items-center justify-center border border-white/10 transition-colors group-hover:scale-110 duration-300 bg-white/5 ${sol.color}`}>
                        <img 
                src={sol.icon} 
                alt={sol.title}
                className="w-full h-full object-contain p-2"
              />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-black/30">
                        Solution
                      </span>
                   </div>

                   <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-primary transition-colors">
                      {sol.title}
                   </h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {sol.description}
                   </p>

                   <div className="space-y-2">
                      {sol.items.map((item, i) => (
                         <div key={i} className="flex items-center text-xs text-gray-500 font-mono">
                            <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2"></span>
                            {item}
                         </div>
                      ))}
                   </div>
                </div>

                <div className="p-6 pt-0 mt-auto flex items-center justify-between text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">
                   <span>View Details</span>
                   <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform text-cyber-primary" />
                </div>
             </Link>
           ))}
        </div>
        
        

      </div>
    </div>
  );
};