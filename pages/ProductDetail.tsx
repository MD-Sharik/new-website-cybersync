import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, ExternalLink, Activity, Layers, Cpu, Code, Book, MonitorPlay, Zap, BarChart2, Image } from 'lucide-react';
import { Product } from '../types';

const PRODUCTS_DATA: Record<string, Product> = {
  // MATH
  'maple': {
    id: 'maple',
    name: 'Maple 2025',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/Maple_logo.jpg',
    heroImageUrl: './product/maplesoft.jpg',
    galleryImages:['./product/maplesoft1.jpg','./product/maplesoft2.jpg','./product/maplesoft4.jpg'],
    oemUrl: 'https://www.maplesoft.com/products/maple/',
    shortDescription: 'The premier computational engine for advanced mathematics and engineering simulation.',
    fullDescription: 'Maple 2025 represents the gold standard in symbolic computation. Cyber Sync provides this powerful engine to Indian engineers and researchers who need more than just a calculator. It combines an intuitive document-based interface with the world’s most robust math engine, allowing you to derive mathematical concepts, analyze data, and visualize solutions without the limitations of traditional numeric-only tools.',
    features: ['Advanced Symbolic Computation', 'Numeric Solvers', '2D & 3D Visualization', 'Data Import/Export', 'Connectivity with MATLAB/Excel', 'Automatic Code Generation'],
    sections: [
      {
        title: "Why Cyber Sync recommends Maple?",
        content: "We find that Maple uniquely bridges the gap between derivation and documentation. Unlike other tools where code is hidden, Maple allows you to present your math, text, and plots in a single, audit-ready document.",
        bullets: [
          "Zero-Error Derivations: Solve complex calculus and algebraic problems symbolically, ensuring no precision loss.",
          "Knowledge Capture: Create 'executable papers' that document your engineering intent alongside the calculations.",
          "Rapid Prototyping: Develop sophisticated algorithms in Maple's high-level language before deploying to C or Python."
        ]
      },
      {
        title: "Key Capabilities",
        content: "Maple empowers you to tackle problems that are intractable by hand or standard spreadsheets.",
        bullets: [
          "Symbolic & Numeric Engine: Seamlessly switch between exact symbolic answers and high-precision numeric approximations.",
          "Engineering Visualization: Over 150 unique plot types to reveal patterns in your data.",
          "Seamless Integration: Connects with your existing toolchain including MATLAB, Excel, SolidWorks, and Autodesk.",
          "Code Generation: Auto-generate optimized code in C, Java, Python, and R for deployment."
        ]
      },
      {
        title: "What's New in Maple 2025",
        content: "The latest version integrates cutting-edge AI features and performance boosts.",
        bullets: [
          "AI-Assisted Formula Generation: Leverage natural language prompts to construct complex mathematical expressions instantly.",
          "Enhanced Step-by-Step Tutors: Great for educators, showing the logic behind the solution with new AI explanations.",
          "Signal Processing Upgrades: Faster algorithms for engineering signal analysis in real-time.",
          "Modern UI: Fully revamped interface with support for high-DPI 4K monitors and dark mode."
        ]
      }
    ]
  },
  'maplesim': {
    id: 'maplesim',
     galleryImages:['./product/maplesim1.jpg','./product/maplesim2.jpg','./product/maplesim3.jpg'],
    name: 'MapleSim',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/maplesim.jpg',
    heroImageUrl: './product/maplesim.jpg',
    oemUrl: 'https://www.maplesoft.com/products/maplesim/',
    shortDescription: 'High-performance multidomain system modeling and simulation.',
    fullDescription: 'MapleSim offers a modern approach to physical modeling. By using a symbolic engine to generate the system equations, Cyber Sync helps clients create models that are not only accurate but also run fast enough for real-time applications. It is the ideal tool for building high-fidelity Digital Twins.',
    features: ['Multi-domain Modeling', 'Modelica Support', 'Digital Twin Creation', 'Real-time Simulation', 'Control Design Integration'],
    sections: [
      {
        title: "The Strategic Advantage",
        content: "Traditional simulation tools rely on black-box numeric solvers. MapleSim reveals the equations underneath, allowing for drastic simplification and optimization of the model code.",
        bullets: [
          "Virtual Commissioning: Test your PLC code against a virtual machine before the hardware is built.",
          "Digital Twins: Create physics-based models for predictive maintenance.",
          "Unified Environment: Simulate mechanics, hydraulics, and electronics in one diagram."
        ]
      },
      {
        title: "Engineering Applications",
        content: "",
        bullets: [
            "Multibody Dynamics: Visualize complex 3D kinematic chains.",
            "Battery Modeling: Specialized libraries for EV thermal management and design.",
            "Automation: Validate sizing of motors and actuators.",
            "FMI Connectivity: Export optimized FMUs to Simulink or LabVIEW."
        ]
      }
    ]
  },
  'mapleflow': {
    id: 'mapleflow',
    name: 'Maple Flow',
     galleryImages:['./product/mapleflow1.jpg','./product/mapleflow2.jpg','./product/mapleflow3.jpg'],
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/mapleflow-icon.png',
    heroImageUrl: './product/mapleflow5.png',
    oemUrl: 'https://www.maplesoft.com/products/mapleflow/',
    shortDescription: 'The digital scratchpad for engineering calculations.',
    fullDescription: 'Engineers rarely think in straight lines. Maple Flow mimics the freeform nature of a whiteboard but adds the power of a math engine. You can place equations, text, and images anywhere, and the results update instantly as you refine your design.',
    features: ['Freeform Interface', 'Live Calculations', 'Engineering Units', 'PDF Reporting'],
    sections: [
      {
        title: "Streamline Your Design Docs",
        content: "Stop wrestling with spreadsheets for complex unit conversions. Maple Flow handles the units for you.",
        bullets: [
          "Smart Unit Tracking: Prevents disastrous conversion errors automatically.",
          "Audit-Ready Reports: Generate clean, readable PDFs for design reviews.",
          "Underlying Power: Access the full Maple library without the syntax overhead."
        ]
      }
    ]
  },
  'maplelearn': {
    id: 'maplelearn',
    name: 'Maple Learn',
     galleryImages:['./product/maplelearn3.jpg','./product/maplelearn2.jpg','./product/maplelearn3.jpg'],
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/MapleLearn.jpg',
    heroImageUrl: './product/maplelearn3.jpg',
    oemUrl: 'https://www.maplesoft.com/products/learn/',
    shortDescription: 'Interactive online math learning environment.',
    fullDescription: 'Maple Learn is redefining remote STEM education. It is a cloud-based environment where students can solve problems, visualize graphs, and check their work step-by-step. Cyber Sync implements this for institutions looking to digitize their math curriculum.',
    features: ['Cloud-based', 'Interactive Graphing', 'Step-by-Step Solutions', 'Shareable Documents'],
    sections: [
      {
        title: "Empowering Educators",
        content: "Turn static lessons into dynamic explorations. Students can interact with sliders and graphs to build intuition.",
        bullets: [
          "Browser-Based: No installation required, works on tablets and phones.",
          "Instant Feedback: Students see where they went wrong immediately.",
          "Easy Sharing: Teachers can send lesson links instantly.",
          "Content Library: Thousands of pre-built templates available."
        ]
      }
    ]
  },

  // STATS
  'spss': {
    id: 'spss',
    name: 'IBM SPSS Statistics',
    heroImageUrl: './product/ibmspss.avif',
    galleryImages:['./product/ibmspss1.webp','./product/imbspss2.webp','./product/ibmspss.avif'],
    category: 'Statistical Software',
    partner: 'IBM',
    logoUrl: './product/IBMSPSS.webp',
    oemUrl: 'https://www.ibm.com/products/spss-statistics',
    shortDescription: 'The global standard for social science and business data analysis.',
    fullDescription: 'IBM SPSS Statistics remains the most widely used tool for ad-hoc analysis, hypothesis testing, and predictive modeling. Cyber Sync provides licensing and support to help you uncover patterns, trends, and relationships in your data with ease.',
    features: ['Comprehensive Statistics', 'Integration with R and Python', 'Data Preparation', 'Bootstrapping', 'Advanced Visualization'],
    sections: [
      {
        title: "Why Businesses Use SPSS",
        content: "From basic descriptions to advanced regressions, SPSS offers a user-friendly GUI that removes the need for complex coding.",
        bullets: ["Intuitive Interface: Drag-and-drop menus for complex analysis.", "Automated Data Prep: Clean your data faster.", "Production Reporting: Generate presentation-ready charts."]
      }
    ]
  },
  'amos': {
    id: 'amos',
    name: 'IBM SPSS Amos',
    category: 'Statistical Software',
    partner: 'IBM',
   heroImageUrl: './product/ibmspss.avif',
    galleryImages:['./product/ibmspss1.webp','./product/imbspss2.webp','./product/ibmspss.avif'],
    logoUrl: './product/spss-logo.png',
    oemUrl: 'https://www.ibm.com/products/structural-equation-modeling-sem',
    shortDescription: 'Structural Equation Modeling (SEM) made accessible.',
    fullDescription: 'IBM SPSS Amos allows researchers to support their theories by extending standard multivariate analysis methods. It enables you to build attitudinal and behavioral models that reflect complex relationships more accurately than standard statistics.',
    features: ['Structural Equation Modeling', 'Path Analysis', 'Confirmatory Factor Analysis', 'Bayesian Estimation'],
  },
  'modeler': {
    id: 'modeler',
    name: 'IBM SPSS Modeler',
    category: 'Statistical Software',
   heroImageUrl: './product/ibmspss.avif',
    galleryImages:['./product/ibmspss1.webp','./product/imbspss2.webp','./product/ibmspss.avif'],
    partner: 'IBM',
    logoUrl: './product/ibmspss.avif',
    oemUrl: 'https://www.ibm.com/products/spss-modeler',
    shortDescription: 'Visual data science and predictive analytics.',
    fullDescription: 'SPSS Modeler is a visual platform that brings predictive intelligence to decisions made by individuals, groups, systems, and enterprises. It provides a range of advanced algorithms and analysis techniques without requiring coding.',
    features: ['Visual Modeling', 'Automated Modeling', 'Text Analytics', 'Geospatial Analytics'],
  },
  'smartpls': {
    id: 'smartpls',
    name: 'SmartPLS 4',
     heroImageUrl: './product/spss1.png',
    galleryImages:['./product/smartpls2.jpeg','./product/smartpls3.jpg','./product/spss1.png'],
    category: 'Statistical Software',
    partner: 'SmartPLS',
    logoUrl: './product/smart pls.jpg',
    oemUrl: 'https://www.smartpls.com/',
    shortDescription: 'The definitive tool for PLS-SEM analysis.',
    fullDescription: 'SmartPLS has revolutionized the application of Partial Least Squares Structural Equation Modeling (PLS-SEM). With its modern GUI and advanced algorithms, it is the go-to choice for researchers in marketing, management, and social sciences.',
    features: ['PLS-SEM', 'CB-SEM', 'Process Analysis', 'Regressions'],
  },
  'stata': {
    id: 'stata',
     heroImageUrl: './product/Stata.png',
    galleryImages:['./product/stata1.webp','./product/stata2.webp','./product/stata3.png'],
    name: 'Stata',
    category: 'Statistical Software',
    partner: 'StataCorp',
    logoUrl: './product/Stata.png',
    oemUrl: 'https://www.stata.com/',
    shortDescription: 'Integrated software for data science and econometrics.',
    fullDescription: 'Stata provides a complete, integrated statistical software package that provides everything you need for data analysis, data management, and graphics. It is renowned for its reproducibility and comprehensive documentation.',
    features: ['Linear Models', 'Panel Data', 'Survival Analysis', 'Multilevel Models', 'Python Integration'],
  },
  'eviews': {
    id: 'eviews',
    heroImageUrl: './product/eviews1.png',
    galleryImages:['./product/eviews1.png','./product/eviews2.png','./product/eviews3.png'],
    name: 'EViews 14',
    category: 'Statistical Software',
    partner: 'IHS Markit',
    logoUrl: './product/Eviews.jpg',
    oemUrl: 'https://www.eviews.com/',
    shortDescription: 'Advanced econometric modeling and forecasting.',
    fullDescription: 'EViews offers academic researchers, corporations, and government agencies access to powerful statistical, forecasting, and modeling tools through an innovative, easy-to-use object-oriented interface.',
    features: ['Econometrics', 'Forecasting', 'Time Series', 'Model Simulation'],
  },

  // QUALITATIVE
  'atlas-ti': {
    id: 'atlas-ti',
    name: 'ATLAS.ti',
    category: 'Qualitative Research',
     heroImageUrl: './product/atlas4.webp',
    galleryImages:['./product/atlas1.png','./product/atlas2.jpg','./product/atlas3.png'],
    partner: 'ATLAS.ti',
    logoUrl: './product/atlasti.jpg',
    oemUrl: 'https://atlasti.com/',
    shortDescription: 'Uncover deep insights from qualitative data.',
    fullDescription: 'ATLAS.ti helps you uncover actionable insights from unstructured data. Whether it is text, audio, video, or images, this tool provides a sophisticated workbench for qualitative analysis, coding, and visualization.',
    features: ['AI Coding', 'Team Collaboration', 'Survey Import', 'Data Visualization'],
  },
  'maxqda': {
    id: 'maxqda',
    name: 'MAXQDA',
    category: 'Qualitative Research',
    heroImageUrl: './product/maxqda4.webp',
    galleryImages:['./product/maxqda1.png','./product/maxqda2.png','./product/maxqda3.png'],
    partner: 'VERBI Software',
    logoUrl: './product/maxqda4.webp',
    oemUrl: 'https://www.maxqda.com/',
    shortDescription: 'The art of data analysis for mixed methods.',
    fullDescription: 'MAXQDA is a world-leading software package for qualitative and mixed methods research. It helps you analyze all kinds of data – from texts, images, and audio/video files to websites, tweets, focus group discussions, and survey responses.',
    features: ['Mixed Methods', 'Visual Tools', 'Quantitative Text Analysis'],
  },
  // Workato
  'workato': {
    id: 'workato',
    name: 'Workato', heroImageUrl: './product/Workato.png',
    galleryImages:['./product/workato1.png','./product/workato2.png','./product/workato3.webp'],
    category: 'Enterprise Automation' as any,
    partner: 'Workato',
    logoUrl: './product/Workato.png',
    oemUrl: 'https://www.workato.com/',
    shortDescription: 'The leading Enterprise Automation Platform.',
    fullDescription: 'Workato helps you automate business workflows across your organization. It combines enterprise-grade integration and automation into a single platform that is easy enough for business users and powerful enough for IT. Cyber Sync provides implementation services to help you connect apps like Salesforce, Workday, ServiceNow, and more.',
    features: ['API Management', 'Workflow Automation', '1000+ Connectors', 'Enterprise Security'],
    sections: [
        {
            title: "Integration Services",
            content: "Our certified architects help you build robust recipes to automate complex business logic.",
            bullets: [
                "Salesforce to NetSuite Sync",
                "Automated Employee Onboarding (HRIS)",
                "Order-to-Cash Automation"
            ]
        }
    ]
  },

  // EDUCATION
  'student-success': {
    id: 'student-success', heroImageUrl: './product/maplesoft.jpg',
    galleryImages:['./product/maplestudent.jpg','./product/maplestudent2.png','./product/maplelearn3.jpg'],
    name: 'Maplesoft Student Success Platform',
    category: 'Education',
    partner: 'Maplesoft',
    logoUrl: './product/maple.jpg',
    oemUrl: 'https://www.maplesoft.com/student-success-platform/',
    shortDescription: 'A holistic ecosystem to improve STEM retention and outcomes.',
    fullDescription: 'The Maplesoft Student Success Platform is not just software; it is a methodology. Cyber Sync helps universities implement this ecosystem to solve the retention crisis in STEM. It combines diagnostic testing, adaptive leveling courses, and interactive content to support students from placement through to graduation.',
    features: ['Placement Testing', 'Bridge Courses', 'Interactive Courseware', 'Automated Grading', 'Maple Learn Integration', 'Möbius Platform'],
    sections: [
        {
            title: "Methodology: The Three Pillars",
            content: "We implement a proven strategy to ensure student readiness:",
            bullets: [
                "Evaluate: Use robust placement testing to accurately assess incoming student skills.",
                "Level Up: Automatically assign remediation and bridge courses to close knowledge gaps.",
                "Learn: Deliver engaging, interactive courseware that provides instant feedback."
            ]
        },
        {
            title: "Powered by Möbius",
            content: "Möbius is the engine that makes this possible. Unlike standard LMS quizzes, Möbius understands complex mathematics.",
            bullets: [
                "Deep Grading: It grades algebraic expressions, free-body diagrams, and open-ended questions instantly.",
                "Algorithmic Randomization: Every student gets a unique version of the problem, preventing cheating.",
                "LMS Integration: Works seamlessly with Canvas, Blackboard, Moodle, and D2L."
            ]
        },
        {
            title: "Modern Tools for Students",
            content: "We include Maple Learn for online exploration and the Maple Calculator app, allowing students to digitize handwritten math instantly.",
        },
        {
             title: "Placement Test Suite",
             content: "Save administrative time with our ready-to-deploy Placement Test Suite, featuring thousands of validated questions to assess student readiness effectively."
        }
    ]
  }
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? PRODUCTS_DATA[id] : null;

  if (!product) {
     return (
        <div className="pt-32 pb-20 bg-cyber-black min-h-screen text-center px-4 flex flex-col items-center justify-center">
             <div className="text-6xl text-cyber-primary font-bold mb-4">404</div>
             <h2 className="text-3xl text-white mb-4">Product Not Found</h2>
             <Link to="/products" className="px-6 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-all">Back to Products</Link>
        </div>
     );
  }

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-cyber-primary mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>

        {/* Hero Section of Product */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
             <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-mono font-bold rounded uppercase tracking-wider">{product.partner}</span>
                 <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-mono font-bold rounded uppercase tracking-wider">{product.category}</span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">{product.name}</h1>
             
             {/* Hero Image if available */}
             {product.heroImageUrl && (
                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-white/10 relative group my-6">
                    <img 
                        src={product.heroImageUrl} 
                        alt={`${product.name} Banner`} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('bg-cyber-panel', 'flex', 'items-center', 'justify-center');
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-gray-600 font-mono text-xs uppercase">Product Image Placeholder</span>';
                        }}
                    />
                </div>
             )}
             
             <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-cyber-secondary pl-6">
               {product.fullDescription}
             </p>

             {/* Features Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start bg-cyber-panel/50 p-4 rounded border border-white/5 hover:border-white/20 transition-colors">
                      <CheckCircle className="w-5 h-5 text-cyber-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm font-bold">{feature}</span>
                    </div>
                  ))}
             </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="bg-cyber-panel p-8 rounded-xl border border-cyber-primary/20 sticky top-28 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-slide-up">
               
               {/* Product Logo */}
               <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center mb-8 border border-white/10 p-6">
                   <img 
                        src={product.logoUrl} 
                        alt={`${product.partner} Logo`} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Fallback to icon
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                   />
                   <div className="hidden">
                        {product.category === 'Mathematical Computing' ? <Cpu className="text-cyber-maple w-12 h-12" /> :
                        product.category === 'Education' ? <Book className="text-green-500 w-12 h-12" /> :
                        <BarChart2 className="text-cyber-primary w-12 h-12" />}
                   </div>
               </div>

               <h3 className="text-lg font-bold text-white mb-2">Get Started with {product.name}</h3>
               <p className="text-sm text-gray-400 mb-6">
                 Empower your team with industry-leading tools. Request an official quote or demo license today.
               </p>
               
               <div className="space-y-3">
                 <Link to="/contact" state={{ productId: product.id, productName: product.name }} className="w-full py-4 bg-cyber-primary hover:bg-white text-black font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyber-primary/20 hover:shadow-cyber-primary/40">
                   Request Quote <Zap size={18} />
                 </Link>
                 <button className="w-full py-4 bg-transparent border border-white/20 hover:border-cyber-primary hover:text-cyber-primary text-gray-300 font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2">
                   <Download size={18} />
                   Brochure
                 </button>
                 {product.oemUrl && (
                    <a 
                      href={product.oemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 text-gray-500 hover:text-white text-xs font-mono flex items-center justify-center gap-2 mt-4 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Visit OEM Website <ExternalLink size={14} />
                    </a>
                 )}
               </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        {product.sections && product.sections.map((section, idx) => (
            <div key={idx} className="mb-12 border-t border-white/5 pt-12 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <div className="w-2 h-8 bg-cyber-secondary rounded-full"></div>
                   {section.title}
                </h2>
                {section.content && <p className="text-gray-300 mb-8 leading-relaxed max-w-4xl text-lg">{section.content}</p>}
                {section.bullets && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start bg-white/5 p-4 rounded-lg">
                                <span className="w-2 h-2 bg-cyber-primary rounded-full mt-2 mr-4 flex-shrink-0 shadow-[0_0_10px_#00f0ff]"></span>
                                <span className="text-gray-300 font-medium">{bullet}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ))}

        {/* Screenshots Gallery Placeholder */}
        <div className="mt-16 pt-12 border-t border-white/5">
             <h3 className="text-white font-bold mb-8 flex items-center gap-2 text-xl">
                <Image className="text-cyber-primary" />
                Interface Gallery
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                   <div key={i} className="h-48 object-cover bg-cyber-panel border border-white/10 rounded-xl flex items-center justify-center group overflow-hidden relative">
                      <img src={product.galleryImages[i]} alt="" />
                   </div>
                ))}
             </div>
        </div>

        {/* System Requirements Placeholder */}
        <div className="bg-white/5 rounded-xl p-8 mt-16 border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <MonitorPlay className="text-cyber-secondary" />
                Technical Specifications
            </h3>
            <p className="text-gray-400 text-sm">
                Supported on Windows 10/11 (64-bit), macOS 12+, and Linux distributions. Minimum 8GB RAM (16GB recommended for simulations). 
                For specific version compatibility and license server requirements, please contact Cyber Sync support.
            </p>
        </div>

      </div>
    </div>
  );
};