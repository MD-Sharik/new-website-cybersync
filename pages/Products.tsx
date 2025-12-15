import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calculator, BarChart2, BookOpen, GraduationCap, ArrowRight, Activity, Box, Cpu, PieChart, Search, X } from 'lucide-react';
import { Product } from '../types';

const PRODUCTS: Product[] = [
  // Mathematical Computing
  {
    id: 'maple',
    name: 'Maple 2025',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/Maple_logo.jpg',
    shortDescription: 'The essential tool for mathematics, modeling, and simulation.',
    fullDescription: '',
    features: ['Symbolic Math', 'Visualization', 'Programming'],
  },
  {
    id: 'maplesim',
    name: 'MapleSim',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/maplesim5.png',
    shortDescription: 'Advanced system-level modeling and simulation tool.',
    fullDescription: '',
    features: ['Digital Twins', 'Multibody Dynamics', 'Modelica'],
  },
  {
    id: 'mapleflow',
    name: 'Maple Flow',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/mapleflow.jpg',
    shortDescription: 'A freeform calculation tool for engineers.',
    fullDescription: '',
    features: ['Calculation Management', 'Reporting', 'Live Math'],
  },
  {
    id: 'maplelearn',
    name: 'Maple Learn',
    category: 'Mathematical Computing',
    partner: 'Maplesoft',
    logoUrl: './product/MapleLearn.jpg',
    shortDescription: 'Dynamic online environment for math education.',
    fullDescription: '',
    features: ['Online Math', 'Interactive Graphs', 'Step-by-step'],
  },

  // Statistical Software
  {
    id: 'spss',
    name: 'IBM SPSS Statistics',
    category: 'Statistical Software',
    partner: 'IBM',
    logoUrl: './product/IBMStatistic.png',
    shortDescription: 'The world standard for social science data analysis.',
    fullDescription: '',
    features: ['Predictive Analytics', 'Hypothesis Testing', 'Data Prep'],
  },
  {
    id: 'amos',
    name: 'IBM SPSS Amos',
    category: 'Statistical Software',
    partner: 'IBM',
    logoUrl: './product/SPSSAmos.png',
    shortDescription: 'Structural equation modeling (SEM) software.',
    fullDescription: '',
    features: ['SEM', 'Path Analysis', 'Confirmatory Factor Analysis'],
  },
  {
    id: 'modeler',
    name: 'IBM SPSS Modeler',
    category: 'Statistical Software',
    partner: 'IBM',
    logoUrl: './product/IBMStatistic.png',
    shortDescription: 'Data mining and text analytics workbench.',
    fullDescription: '',
    features: ['Data Mining', 'Machine Learning', 'Text Analytics'],
  },
  {
    id: 'smartpls',
    name: 'SmartPLS',
    category: 'Statistical Software',
    partner: 'SmartPLS',
    logoUrl: './product/smart pls.jpg',
    shortDescription: 'Structural Equation Modeling (PLS-SEM) made easy.',
    fullDescription: '',
    features: ['PLS-SEM', 'Bootstrap', 'Model Validation'],
  },
  {
    id: 'stata',
    name: 'Stata',
    category: 'Statistical Software',
    partner: 'StataCorp',
    logoUrl: './product/Stata.png',
    shortDescription: 'Complete integrated statistical software package.',
    fullDescription: '',
    features: ['Data Science', 'Econometrics', 'Visualizations'],
  },
  {
    id: 'eviews',
    name: 'EViews',
    category: 'Statistical Software',
    partner: 'IHS Markit',
    logoUrl: './product/Eviews.jpg',
    shortDescription: 'Forecasting and econometric analysis.',
    fullDescription: '',
    features: ['Time-series', 'Forecasting', 'Modeling'],
  },

  // Qualitative Research
  {
    id: 'atlas-ti',
    name: 'ATLAS.ti',
    category: 'Qualitative Research',
    partner: 'ATLAS.ti',
    logoUrl: './product/atlasti.jpg',
    shortDescription: 'Unlock insights from qualitative data.',
    fullDescription: '',
    features: ['AI Coding', 'Text Analysis', 'Multimedia'],
  },
  {
    id: 'maxqda',
    name: 'MAXQDA',
    category: 'Qualitative Research',
    partner: 'VERBI Software',
    logoUrl: './product/maxqda.jpeg',
    shortDescription: 'All-in-one qualitative & mixed methods tool.',
    fullDescription: '',
    features: ['Mixed Methods', 'Teamwork', 'Visualization'],
  },

  // Education
  {
    id: 'student-success',
    name: 'Student Success Platform',
    category: 'Education',
    partner: 'Maplesoft',
    logoUrl: './product/stem.jpg',
    shortDescription: 'Improving outcomes in STEM education.',
    fullDescription: '',
    features: ['Placement Testing', 'STEM Courseware', 'Automated Grading'],
  },
  {
    id: 'workato',
    name: 'Workato Automation',
    category: 'Enterprise Automation' as any,
    partner: 'Workato',
    logoUrl: './product/Workato.png',
    shortDescription: 'Enterprise automation platform for API integrations.',
    fullDescription: '',
    features: ['Workflow Automation', 'API Integrations', 'No-code Recipes'],
  }
];

const CATEGORIES = [
  { id: 'All', icon: null, label: 'View All' },
  { id: 'Mathematical Computing', icon: Calculator, label: 'Math Computing' },
  { id: 'Statistical Software', icon: BarChart2, label: 'Statistical Software' },
  { id: 'Qualitative Research', icon: BookOpen, label: 'Qualitative Research' },
  { id: 'Education', icon: GraduationCap, label: 'Education' },
  { id: 'Enterprise Automation', icon: Activity, label: 'Automation' },
];

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'All';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
    const matchesSearch = 
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Our <span className="text-cyber-primary">Products</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Authorized partners for the world's leading research, engineering, and enterprise software.
          </p>
        </div>

        

        {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 perspective-1000">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <Link 
        to={`/products/${product.id}`}
        key={product.id} 
        className="group relative bg-cyber-panel border border-white/5 rounded-xl overflow-hidden hover:border-cyber-primary/50 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transform hover:-translate-y-2 hover:rotate-x-12"
      >
        {/* Category Color Line */}
        <div className={`h-1 w-full ${
          product.category === 'Mathematical Computing' ? 'bg-cyber-maple' : 
          product.category === 'Statistical Software' ? 'bg-cyber-primary' :
          product.category === 'Education' ? 'bg-green-500' : 'bg-cyber-secondary'
        }`}></div>

        <div className="p-8 flex-1">
          <div className="flex items-center justify-between mb-6">
            {/* Icon / Logo Wrapper */}
            <div 
              className={`h-14   rounded-xl flex items-center justify-center border border-white/10 transition-colors group-hover:scale-110 duration-300 overflow-hidden`}
            >
              {/* Logo with icon fallback */}
              <img 
                src={product.logoUrl} 
                alt={product.name}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />

              <div className="hidden">
                {product.id.includes('maple') ? <Cpu className="text-cyber-maple" /> :
                 product.id.includes('spss') ? <PieChart className="text-cyber-primary" /> :
                 product.id.includes('smartpls') ? <Activity className="text-cyber-primary" /> :
                 product.id.includes('stata') ? <BarChart2 className="text-cyber-primary" /> :
                 product.id.includes('atlas') || product.id.includes('maxqda') ? <BookOpen className="text-cyber-secondary" /> :
                 <Box className="text-white" />}
              </div>
            </div>

            {/* Partner */}
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-black/30">
              {product.partner}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {product.shortDescription}
          </p>

          {/* Features as bullet list (matching solution layout spacing) */}
          <div className="space-y-2">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-center text-xs text-gray-500 font-mono">
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 mt-auto flex items-center justify-between text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">
          <span>Explore Product</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform text-cyber-primary" />
        </div>
      </Link>
    ))
  ) : (
    <div className="col-span-1 md:col-span-3 text-center py-20">
      <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl text-white font-bold mb-2">No products found</h3>
      <p className="text-gray-400">Try adjusting your search or category filter.</p>
      <button 
        onClick={() => { setSearchQuery(''); setSearchParams({}); }}
        className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-cyber-primary border border-cyber-primary/30 rounded transition-colors text-sm font-bold uppercase"
      >
        Clear Filters
      </button>
    </div>
  )}
</div>

      </div>
    </div>
  );
};