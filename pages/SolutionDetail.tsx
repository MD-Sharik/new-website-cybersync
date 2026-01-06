import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Cpu, Database, Globe, Briefcase, ShoppingCart, GraduationCap, Zap, ArrowRight, Layers, BarChart, Settings, Code, Shield, Eye, Truck, Server, MessageSquare, MessageCircle, Send, CheckCircle2, Workflow, Plug, Link2, GitBranch, RefreshCw, BarChart2, Wifi, HardDrive, Lock, FileText, Megaphone, PenTool, Search } from 'lucide-react';
import { Solution } from '../types';

const SOLUTIONS_DATA: Record<string, Solution> = {
  'workato-solutions': {
    id: 'workato-solutions',
    title: 'Workato Intelligent Automation',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Orchestrate your enterprise. The leading iPaaS for connecting apps, data, and teams.',
    fullDesc: 'Workato is not just an integration tool; it is an enterprise operating system. Cyber Sync leverages Workato to help you move beyond simple point-to-point connections to full-scale workflow orchestration. We bridge the gap between IT and Business by implementing "Recipes" that automate complex, cross-departmental processes. Whether it is syncing Salesforce with NetSuite, automating HR onboarding from Workday to Slack, or triggering ITSM tickets in ServiceNow, we deliver speed, security, and scalability.',
    benefits: [
        'Speed to Value: Deploy integrations 10x faster than traditional coding methods.',
        'Cost Reduction: Lower integration maintenance costs by up to 60%.',
        'Democratized Automation: Low-code/No-code interface allows business users to collaborate with IT.',
        'Enterprise Security: SOC 2 Type II compliant with governance over every workflow.'
    ],
    capabilities: [
        { title: 'Workflow Orchestration', desc: 'We design complex "Recipes" that handle conditional logic, loops, error handling, and human-in-the-loop approvals across multiple apps.', icon: Workflow },
        { title: 'Universal Connectivity', desc: 'Connect to over 1000+ pre-built SaaS apps (Salesforce, SAP, Oracle, Slack) or databases (Snowflake, Redshift) instantly.', icon: Link2 },
        { title: 'Custom Connector Dev', desc: 'Have a legacy on-prem system? We use the Workato SDK to build custom, secure connectors that expose your proprietary data to the cloud.', icon: Plug },
        { title: 'Lifecycle Management', desc: 'We implement rigorous CI/CD pipelines for your automations, ensuring recipes are tested in Sandbox and promoted to Production safely.', icon: GitBranch }
    ],
    useCases: [
        'Quote-to-Cash: Auto-convert Salesforce Opportunities to NetSuite Sales Orders.',
        'Hire-to-Retire: Sync Workday hires to Okta (Identity) and Slack (Communication).',
        'Incident Response: Datadog alerts trigger Jira tickets and Slack channels automatically.',
        'Marketing Ops: Route Marketo leads to specific Sales Reps based on territory logic.'
    ]
  },
  'engineering': {
    id: 'engineering',
    title: 'Engineering Modeling & Simulation',
    heroImage: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Accelerate product development with high-fidelity digital twins.',
    fullDesc: 'Cyber Sync provides advanced engineering simulation solutions powered by Maplesoft technology. Our consultative approach focuses on system-level modeling, allowing engineers to treat complex physical systems (mechanical, electrical, hydraulic) as unified models. We enable rapid prototyping, digital twin creation, and virtual commissioning to significantly reduce hardware dependency.',
    benefits: ['Reduce physical prototyping costs by up to 50%', 'Accelerate time-to-market for complex systems', 'Optimize multi-domain system performance', 'Validate control strategies virtually'],
    capabilities: [
        { title: 'Digital Twin Consulting', desc: 'We build high-fidelity virtual representations of physical machines for predictive maintenance and operational optimization.', icon: Layers },
        { title: 'Multi-Domain Simulation', desc: 'Simulate mechanical, electrical, and thermal systems in a single environment using MapleSim.', icon: Cpu },
        { title: 'Control Design Verification', desc: 'Develop and test control algorithms on virtual plant models to ensure safety and stability before deployment.', icon: Settings },
        { title: 'Design Optimization', desc: 'Automated parameter sweeping to find the optimal design configurations for weight, cost, and efficiency.', icon: BarChart }
    ],
    useCases: ['Automotive Powertrain Optimization', 'Industrial Robot Path Planning', 'EV Battery Management Systems', 'Aerospace Actuation Systems']
  },
  'data': {
    id: 'data',
    title: 'Data & Statistical Analytics',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Unlock hidden insights with powerful statistical tools and consulting.',
    fullDesc: 'Our Data & Analytics practice transforms raw data into strategic assets. Leveraging industry-standard tools like IBM SPSS, Stata, and SmartPLS, along with custom Big Data pipelines, we help organizations build robust data ecosystems. From Credit Risk Analytics in BFSI to Customer Intelligence in Retail, we cover the entire data lifecycle. We don\'t just provide the software; we help you interpret the output to drive business strategy.',
    benefits: ['Improve strategic decision accuracy with predictive modeling', 'Identify emerging market trends months before competitors', 'Optimize operational efficiency through statistical process control', 'Enhance customer targeting with cluster analysis'],
    capabilities: [
        { title: 'Risk Analytics Platform', desc: 'Comprehensive credit risk modeling, fraud detection, and regulatory compliance scoring (Basel III/IFRS 9).', icon: Shield },
        { title: 'Data Engineering', desc: 'Building scalable ETL pipelines, data lakes, and warehousing solutions on cloud infrastructure (AWS/Azure).', icon: Server },
        { title: 'Business Intelligence', desc: 'Visualizing KPIs and metrics in real-time dashboards for executive decision support (PowerBI/Tableau).', icon: BarChart2 },
        { title: 'Predictive Analytics', desc: 'Forecasting future trends using advanced regression models and time-series analysis.', icon: Database }
    ],
    useCases: ['Credit Risk Scoring Models (BFSI)', 'Retail Market Basket Analysis', 'Clinical Trial Data Analysis (Pharma)', 'Supply Chain Demand Forecasting']
  },
  'enterprise': {
    id: 'enterprise',
    title: 'Enterprise Software Solutions',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Custom ERP, CRM, and EDLI Solutions.',
    fullDesc: 'We architect and implement robust enterprise software tailored to your specific business processes. From Custom ERPs to complex legacy modernization projects, we act as your technical implementation partner. We focus on scalability, security, and seamless integration with your existing infrastructure.',
    benefits: ['Streamline complex internal workflows', 'Connect disparate apps without partnerships', 'Secure B2B document exchange', 'Scale without user license limitations'],
    capabilities: [
        { title: 'EDLI Services', desc: 'Electronic Data Interchange (EDLI) implementation for secure, automated document exchange between business partners (ANSI X12/EDIFACT).', icon: Globe },
        { title: 'Custom ERP Suites', desc: 'End-to-end resource planning covering finance, HR, supply chain, and operations tailored to your industry.', icon: Briefcase },
        { title: 'CRM Platforms', desc: 'Track leads, manage customer relationships, and automate sales pipelines with 360-degree customer views.', icon: Database },
        { title: 'Web & Mobile Apps', desc: 'Full-stack development of customer-facing portals and mobile applications.', icon: Code }
    ],
    useCases: ['Supplier EDI Onboarding', 'University Administration Portals', 'Hospital Management Systems', 'Logistics Tracking Portals']
  },
  'marketing': {
    id: 'marketing',
    title: 'End-to-End Digital Marketing & Growth',
    heroImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=2000',
    shortDesc: '360° Digital Strategy: SEO, Content Creation, and Automation.',
    fullDesc: 'Cyber Sync provides comprehensive digital marketing services designed to dominate your market. We don\'t just run ads; we build your brand authority. Our team handles everything from technical SEO and high-quality Content Creation to Performance Marketing and WhatsApp Automation. We are your complete digital growth partner, ensuring your message reaches the right audience at the right time.',
    benefits: ['Increase organic traffic via technical SEO', 'Establish thought leadership with expert content', 'Automate customer engagement with WhatsApp Bots', 'Maximize ROI on ad spend'],
    capabilities: [
        { title: 'SEO & Organic Growth', desc: 'Complete search engine optimization including on-page, off-page, technical SEO, and backlink strategies to rank #1 on SERPs.', icon: Search },
        { title: 'Content Creation Studio', desc: 'Professional blogs, whitepapers, video scripts, and social media assets created by domain experts to engage your audience.', icon: PenTool },
        { title: 'Performance Marketing', desc: 'Data-driven PPC campaigns on Google Ads, LinkedIn, and Meta (Facebook/Instagram) focused on lead generation.', icon: Megaphone },
        { title: 'WhatsApp & Chat Automation', desc: 'Official WhatsApp Business API integration for broadcast marketing, automated support bots, and green tick verification.', icon: MessageCircle }
    ],
    useCases: ['Brand Awareness Campaigns', 'B2B Lead Generation Funnels', 'E-commerce Conversion Optimization', 'Customer Retention Automation']
  },
  'sap': {
    id: 'sap',
    title: 'SAP Consulting Services',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Expert S/4HANA Implementation, Migration & Support.',
    fullDesc: 'Our SAP Center of Excellence provides end-to-end consulting for SAP environments. We specialize in helping organizations navigate the shift to the Intelligent Enterprise. Whether you are migrating to S/4HANA, optimizing your existing ECC landscape, or need dedicated Application Management Services (AMS), our certified consultants deliver tangible value. We ensure your SAP landscape is agile, cost-effective, and aligned with business goals.',
    benefits: ['Zero-downtime migration strategies', 'Customized ABAP development', 'Optimized business processes', '24/7 Application support'],
    capabilities: [
        { title: 'S/4HANA Implementation', desc: 'Greenfield and Brownfield implementation strategies for SAP S/4HANA.', icon: Layers },
        { title: 'Migration Services', desc: 'Seamless migration from legacy ECC systems to S/4HANA with data integrity assurance.', icon: RefreshCw },
        { title: 'SAP Fiori UX', desc: 'Designing modern, mobile-ready user interfaces to improve employee productivity.', icon: Code },
        { title: 'SAP AMS Support', desc: '24/7 Functional and Technical support to ensure your SAP landscape runs smoothly.', icon: Settings }
    ],
    useCases: ['Global Finance Rollouts', 'Supply Chain Integration', 'HR Payroll Automation', 'Real-time Analytics with HANA']
  },
  'pos': {
    id: 'pos',
    title: 'POS & Warehouse Management',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Retail and Supply Chain Efficiency Optimization.',
    fullDesc: 'Modernize your retail and supply chain operations with our integrated Point of Sale (POS) and Warehouse Management Systems (WMS). We provide real-time inventory tracking, barcode/RFID integration, and automated reordering systems to prevent stockouts and overstocking.',
    benefits: ['Real-time stock visibility', 'Faster checkout processes', 'Reduced shrinkage and waste', 'Automated supplier orders'],
    capabilities: [
        { title: 'Smart POS Systems', desc: 'Cloud-connected point of sale systems that work offline, sync online, and integrate with CRM.', icon: ShoppingCart },
        { title: 'Warehouse Management', desc: 'Advanced bin tracking, picking optimization (FIFO/LIFO), and shipment verification.', icon: Truck },
        { title: 'Inventory Optimization', desc: 'AI-driven demand forecasting to maintain optimal stock levels across multiple locations.', icon: BarChart },
        { title: 'Supply Chain Analytics', desc: 'End-to-end visibility of goods movement from manufacturer to end consumer.', icon: Globe }
    ],
    useCases: ['Multi-store Retail Chains', 'FMCG Distribution Centers', 'Pharmaceutical Warehousing', 'E-commerce Fulfillment']
  },
  'ai': {
    id: 'ai',
    title: 'RAG AI & Custom Development',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'RAG AI, NLP, and Computer Vision.',
    fullDesc: 'We push the boundaries of what is possible with AI. Our flagship offering in development is the RAG AI, a private AI wrapper ensuring data privacy similar to watsonx.ai. We also engineer sophisticated Natural Language Processing (NLP) models and Computer Vision systems. We help you move from AI proof-of-concept to production-grade deployment.',
    benefits: ['Secure, private AI interactions', 'Automate repetitive cognitive tasks', 'Modernize legacy applications', 'Secure cloud infrastructure'],
    capabilities: [
        { title: 'RAG Solution', desc: 'A secure, private GenAI wrapper built on open-source LLMs. Designed to be deployed within your infrastructure for data privacy.', icon: MessageSquare },
        { title: 'NLP Solutions', desc: 'Document summarization, sentiment analysis, and intelligent search engines using Large Language Models (LLMs).', icon: Code },
        { title: 'Computer Vision', desc: 'Automated visual inspection, facial recognition, and object detection systems for manufacturing and security.', icon: Eye },
        { title: 'ML Platforms', desc: 'End-to-end MLOps pipelines for training, deploying, and monitoring machine learning models.', icon: Cpu }
    ],
    useCases: ['Internal Corporate Knowledge Bots', 'Legal Document Review', 'Automated Visual Quality Control', 'FinTech Fraud Detection']
  },
  'education': {
    id: 'education',
    title: 'Digital Education Solutions',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'Transforming STEM Learning & Retention.',
    fullDesc: 'We provide comprehensive EdTech solutions centered around the Maplesoft ecosystem. From Maple Learn for remote teaching to the Maple Calculator for students, we help institutions digitize their math and engineering curriculum to improve outcomes.',
    benefits: ['Increase student engagement', 'Automate grading', 'Visual learning', 'Remote access'],
    capabilities: [
        { title: 'Interactive Courseware', desc: 'Deploy dynamic STEM content using Möbius.', icon: GraduationCap },
        { title: 'Virtual Labs', desc: 'Simulation-based experiments for engineering students.', icon: Cpu },
        { title: 'Campus Licensing', desc: 'Flexible licensing models for universities and schools.', icon: Briefcase }
    ],
    useCases: ['Remote Calculus Classes', 'Engineering Simulation Labs', 'Placement Testing', 'Online Homework Systems']
  },
  'it-infra': {
    id: 'it-infra',
    title: 'IT Infrastructure Solutions',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=2000',
    shortDesc: 'End-to-End Hardware Procurement & Network Security.',
    fullDesc: 'A robust digital transformation requires a rock-solid physical foundation. We provide comprehensive IT infrastructure solutions, supplying high-performance hardware and securing your network perimeter. From equipping your workforce with the latest workstations to securing your premises with advanced CCTV and firewalls, we are your one-stop IT procurement partner.',
    benefits: ['Single vendor for software & hardware', 'Enterprise-grade security hardware', 'Authorized reseller warranty support', 'Optimized for engineering workloads'],
    capabilities: [
        { title: 'Workstations & AIOs', desc: 'High-performance computing hardware (HP, Dell, Lenovo) optimized for simulation and CAD workloads.', icon: HardDrive },
        { title: 'Network Security', desc: 'Next-gen Firewalls (Sophos, Fortinet), Antivirus (Sophos, McAfee), and secure WiFi Access Points.', icon: Shield },
        { title: 'Surveillance Systems', desc: 'Advanced CCTV and IP Camera setups with NVR for office and warehouse security.', icon: Eye },
        { title: 'Graphic & Compute', desc: 'Enterprise GPUs (NVIDIA Quadro/RTX) for AI training and rendering tasks.', icon: Cpu }
    ],
    useCases: ['Corporate Office Setup', 'Engineering Design Labs', 'Secure Remote Work Infrastructure', 'Data Center Upgrades']
  }
};

export const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = id ? SOLUTIONS_DATA[id] : null;

  if (!solution) {
     return (
        <div className="pt-32 pb-20 bg-cyber-black min-h-screen text-center px-4 flex flex-col items-center justify-center">
             <div className="text-6xl text-cyber-primary font-bold mb-4">404</div>
             <h2 className="text-3xl text-white mb-4">Solution Not Found</h2>
             <Link to="/solutions" className="px-6 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-all">View All Solutions</Link>
        </div>
     );
  }

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/solutions" className="inline-flex items-center text-gray-500 hover:text-cyber-primary mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} className="mr-2" />
          Back to Solutions
        </Link>

        {/* Hero Area */}
        <div className="mb-16 animate-fade-in">
           {solution.heroImage && (
               <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12 relative group shadow-2xl border border-white/5">
                   <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent z-10 opacity-90"/>
                   <div className="absolute inset-0 bg-cyber-primary/10 mix-blend-overlay z-10"/>
                   <img 
                        src={solution.heroImage} 
                        alt={solution.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute bottom-8 left-8 z-20">
                       <div className="inline-block px-4 py-1.5 bg-cyber-primary/90 text-black rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg backdrop-blur-md">
                          Solution Center
                       </div>
                       <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                         {solution.title}
                       </h1>
                   </div>
               </div>
           )}
           
           {!solution.heroImage && (
               <>
                   <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                      Solution Center
                   </div>
                   <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                     {solution.title}
                   </h1>
               </>
           )}

           <p className="text-xl text-gray-300 max-w-4xl leading-relaxed border-l-4 border-cyber-secondary pl-6">
             {solution.fullDesc}
           </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 perspective-1000">
           {solution.capabilities.map((cap, idx) => (
              <div key={idx} className="bg-cyber-panel p-6 rounded-xl border border-white/5 hover:border-cyber-primary/50 transition-all duration-500 hover:rotate-x-12 hover:-translate-y-2 group shadow-xl">
                 <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyber-primary group-hover:text-black transition-colors">
                    <cap.icon size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                 <p className="text-gray-400 leading-relaxed text-sm">
                    {cap.desc}
                 </p>
              </div>
           ))}
        </div>

        {/* Two Column Layout: Benefits & Use Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           
           {/* Benefits */}
           <div className="bg-white/5 rounded-2xl p-10 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-primary/5 rounded-full blur-[80px]"></div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                 <Zap className="text-yellow-500" /> Key Benefits
              </h2>
              <ul className="space-y-6 relative z-10">
                 {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                       <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/50 mt-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                          <CheckCircle size={14} />
                       </span>
                       <span className="text-gray-300 font-medium text-lg">{benefit}</span>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Use Cases */}
           <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <Briefcase className="text-cyber-secondary" /> Industry Use Cases
              </h2>
              <div className="grid grid-cols-1 gap-4">
                 {solution.useCases.map((useCase, idx) => (
                    <div key={idx} className="bg-cyber-panel p-6 rounded-lg border-l-4 border-cyber-secondary shadow-lg hover:translate-x-2 transition-transform cursor-default">
                       <span className="text-white font-bold block text-lg">{useCase}</span>
                    </div>
                 ))}
              </div>

              {/* Call to Action */}
              <div className="mt-12 bg-gradient-to-r from-cyber-primary to-cyber-secondary p-[1px] rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                 <div className="bg-cyber-black rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-white font-bold text-xl mb-4 relative z-10">Need this solution?</h3>
                    <p className="text-gray-400 mb-6 text-sm relative z-10">Our solution architects are ready to design your roadmap.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold uppercase tracking-wide rounded hover:bg-gray-200 transition-colors relative z-10 group">
                       Contact Sales <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};
