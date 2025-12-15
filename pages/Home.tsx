import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { GeniusAISection } from '../components/GeniusAISection';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Network, Database, Server, Share2, Star, Box, MessageCircle, ChevronRight, CheckCircle2, Workflow, Globe, Shield } from 'lucide-react';

export const Home: React.FC = () => {
   const PARTNERS_ROW_1 = [
      { name: 'Maplesoft', desc: 'Mathematical Computing', icon: Activity, color: 'text-cyber-maple' },
      { name: 'IBM SPSS', desc: 'Statistical Analytics', icon: Database, color: 'text-blue-400' },
      { name: 'StataCorp', desc: 'Data Science', icon: Network, color: 'text-cyber-primary' },
      { name: 'SmartPLS', desc: 'Structural Equation Modeling', icon: Box, color: 'text-cyber-secondary' },
      { name: 'Workato', desc: 'Automation & iPaaS', icon: Workflow, color: 'text-orange-500' },
   ];

   const PARTNERS_ROW_2 = [
      { name: 'ATLAS.ti', desc: 'Qualitative Research', icon: Globe, color: 'text-purple-400' },
      { name: 'EViews', desc: 'Econometrics', icon: Activity, color: 'text-green-400' },
      { name: 'Oracle', desc: 'Enterprise Systems', icon: Server, color: 'text-red-500' },
      { name: 'Tableau', desc: 'Business Intelligence', icon: Database, color: 'text-yellow-500' },
      { name: 'Lindo', desc: 'Optimization', icon: Shield, color: 'text-white' },
   ];

   return (
    <div className="bg-black">
      <div 
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black perspective-1000 pt-20"
        >
          {/* --- PREMIUM 3D BACKGROUND --- */}
          
          {/* 1. Subtle Radial Glow (Apple-like spotlight) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] linear gradient bg-cyber-primary/10 blur-[120px] pointer-events-none opacity-40 mix-blend-screen "
          />
    
          {/* 2. Abstract Geometric Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none preserve-3d">
             {/* Central Gyroscope (The Core) */}
             
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/50 to-black">
                 {/* <div className="relative w-md h-full animate-[spin_60s_linear_infinite] preserve-3d">
                     <div className="absolute inset-0 border border-white/40 rounded-full [transform:rotateX(70deg)]"></div>
                     <div className="absolute inset-0 border border-white/40 rounded-full [transform:rotateY(70deg)]"></div>
                     <div className="absolute inset-20 border border-cyber-primary/20 rounded-full [transform:rotateX(70deg)]"></div>
                 </div> */}
             </div>
          </div>
    
          {/* --- CONTENT LAYER --- */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium tracking-wide mb-8 backdrop-blur-md  hover:bg-white/10 transition-colors cursor-default">
               
               Maplesoft Authorized Partner India
            </div>
    
            {/* Headline - Apple Style: Huge, Clean, Bold */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl animate-slide-up">
              Enterprise.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Intelligence.
              </span>
            </h1>
    
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up animation-delay-200 font-light">
              We architect enterprise solutions with advanced simulation, analytics, and custom AI solutions.
            </p>
    
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up animation-delay-400">
              <Link
                to="/products"
                className="group relative px-8 py-4 bg-white text-black font-semibold text-sm rounded-full transition-all hover:scale-105 flex items-center gap-2"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
              
              <Link
                to="/solutions"
                className="group px-8 py-4 text-white bg-white/10 rounded-full hover:scale-105 font-medium text-sm flex items-center gap-2 hover:text-cyber-primary transition-colors"
              >
                View Solutions
                <ChevronRight size={16} />
              </Link>
            </div>
    
          </div>
    
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
             <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full"></div>
          </div>
        </div>
      
         <section className="py-24 bg-black  relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted Technology Ecosystem</h2>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Powering Global Innovation</p>
         </div>

         <div className="relative flex flex-col gap-8">
            {/* ROW 1: Scrolling Left */}
            <div className="flex overflow-hidden group">
               <div className="flex gap-8 animate-scroll-left group-hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
                  {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((partner, idx) => (
                     <div key={idx} className="flex-shrink-0 w-64 p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl hover:border-white/20 transition-all cursor-default flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center ${partner.color}`}>
                           <partner.icon size={20} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold text-lg">{partner.name}</h4>
                           <p className="text-xs text-gray-500">{partner.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* ROW 2: Scrolling Right */}
            <div className="flex overflow-hidden group">
               <div className="flex gap-8 animate-scroll-right group-hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
                  {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((partner, idx) => (
                     <div key={idx} className="flex-shrink-0 w-64 p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl hover:border-white/20 transition-all cursor-default flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center ${partner.color}`}>
                           <partner.icon size={20} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold text-lg">{partner.name}</h4>
                           <p className="text-xs text-gray-500">{partner.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
      {/* --- SERVICES / EXPERTISE BENTO GRID --- */}
      <Services />

      {/* --- TECHNOLOGICAL CORE (BENTO GRID STYLE) --- */}
  <section className="py-32 bg-[#000] relative border-t border-white/5">
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="mb-20 text-center md:text-left">
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">The Core.</h2>
      <p className="text-2xl text-gray-500 max-w-3xl font-light">
        Beneath the software lies a foundation of pure logic, physics, and intelligence.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
      
      {/* Card 1: Physics */}
      <Link 
        to="/tech-core/physics"
        className="lg:col-span-2 group relative bg-[#1c1c1e] rounded-3xl p-10 overflow-hidden hover:scale-[1.01] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-cyber-maple/20 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Animated Waves */}
        {/* <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxMDBjNTAgMCA1MC01MCAxMDAtNTBzNTAgNTAgMTAwIDUwIiBzdHJva2U9IiNlMzE4MzciIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] animate-wave-motion bg-repeat-x w-[200%] h-full"></div>
        </div> */}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <Activity size={40} className="text-cyber-maple mb-6" />
            <h3 className="text-4xl font-bold text-white mb-2">Physics Simulation.</h3>
           <p className="text-xl text-gray-400 max-w-md">
  High-accuracy physical modeling including fluid flow, heat transfer, vibration,
  and dynamic system behavior — powered by Maplesoft’s symbolic and numeric solvers.
</p>
          </div>
        
        </div>
      </Link>

      {/* Card 2: Neural */}
      <Link 
        to="/tech-core/neural"
        className="group relative bg-[#151516] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-cyber-secondary/20 rounded-full blur-[130px] pointer-events-none"></div>

        {/* Pulse Nodes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-cyber-secondary/50 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <Network size={40} className="text-cyber-secondary mb-6" />
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Neural Networks.</h3>
          <p className="text-lg text-gray-400">
  Deep learning clusters designed for pattern recognition, forecasting, and
  adaptive intelligence — enabling neural architectures that learn, optimize, and scale.
</p>

          </div>
        </div>
      </Link>

      {/* Card 3: Structural */}
      <Link 
        to="/tech-core/structural"
        className="group relative bg-[#151516] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[360px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

       
        <Box size={40} className="text-cyber-primary mb-6 relative z-10" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-2">Structural Integrity.</h3>
          <p className="text-lg text-gray-400">
  Finite-element analysis, stress prediction, and multibody kinematics for building
  resilient structures and mechanical systems with engineering-grade precision.
</p>

        </div>
      </Link>

      {/* Card 4: Big Data */}
      <Link 
        to="/tech-core/big-data"
        className="lg:col-span-2 group relative bg-[#1c1c1e] rounded-3xl p-10 overflow-hidden hover:scale-[1.01] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[460px] h-[460px] bg-green-500/20 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Matrix Rain */}
        <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iNTA1IiB5PSI1MCUiIGZpbGw9IiMwMGZmMDAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiPjEwPC90ZXh0Pjwvc3ZnPg==')] animate-matrix-rain"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <Database size={40} className="text-green-500 mb-6" />
            <h3 className="text-4xl font-bold text-white mb-2">Big Data Analytics.</h3>
           <p className="text-xl text-gray-400 max-w-md">
  Enterprise-level data pipelines, statistical modeling, and real-time analytics
  that transform raw datasets into strategic intelligence across complex environments.
</p>

          </div>
          
        </div>
      </Link>

      {/* Card 5: Enterprise */}
      <Link 
        to="/tech-core/enterprise"
        className="group relative lg:col-span-2 bg-[#151516] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[130px] pointer-events-none"></div>

        <Share2 size={40} className="text-blue-500 mb-6" />
        <h3 className="text-3xl font-bold text-white mb-2">Enterprise Ecosystems.</h3>
      <p className="text-lg text-gray-400">
  Integrated ERP, CRM, and HRMS platforms engineered for secure workflows,
  operational alignment, and seamless cross-department collaboration.
</p>

      </Link>

      {/* Card 6: Automation */}
      <Link 
        to="/solutions/workato-solutions"
        className="group relative bg-[#151516] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-white/5 hover:border-white/10"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <Workflow size={40} className="text-orange-500 mb-6 relative z-10" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-2">Intelligent Automation.</h3>
          <p className="text-lg text-gray-400">
  Automated workflows, rule-based engines, and API-driven integration powered by
  Workato, enabling faster execution and frictionless enterprise orchestration.
</p>

        </div>
      </Link>

    </div>
  </div>
</section>


      {/* --- TRUSTED TECHNOLOGY ECOSYSTEM (Infinite Scroll Marquee) --- */}
   

      {/* --- ONE BILLION VISION (Premium Dark Card) --- */}
   

      {/* --- STUDENT SUCCESS (iPad Style Feature) --- */}
     <section className="py-32 bg-black relative">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-20">
      <span className="text-cyber-primary font-bold uppercase tracking-widest text-xs">
        Powered by Maplesoft
      </span>
      <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
        Student Success Platform.
      </h2>
      <p className="text-2xl text-gray-500 max-w-2xl mx-auto">
        Evaluate. Level Up. Learn.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="relative bg-[#151516] p-10 rounded-3xl border border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-4xl font-bold text-white mb-2">85%</div>
          <p className="text-gray-500">Improvement in student engagement</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative bg-[#151516] p-10 rounded-3xl border border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-4xl font-bold text-white mb-2">40%</div>
          <p className="text-gray-500">Reduction in course drop rates</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative bg-[#151516] p-10 rounded-3xl border border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-4xl font-bold text-white mb-2">92%</div>
          <p className="text-gray-500">Faculty satisfaction rate</p>
        </div>
      </div>

    </div>

    <div className="mt-16 text-center">
      <Link
        to="/products/student-success"
        className="inline-flex items-center gap-2 text-cyber-primary font-bold hover:text-white transition-colors text-lg"
      >
        Explore the Platform <ChevronRight />
      </Link>
    </div>

  </div>
</section>

   {/* Dedicated AI Chat Section */ }
   < GeniusAISection />

   {/* --- MAPLE AMBASSADOR (Dark Mode - Moved to End) --- */ }
   <section section className = "py-32 bg-black text-white overflow-hidden relative border-t border-white/5" >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="flex flex-col lg:flex-row items-center gap-16">

            <div className="lg:w-1/2">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
                  <Star size={12} className="text-cyber-primary fill-cyber-primary" /> Community Program
               </div>
               <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
                  Become a Maple Ambassador.
               </h2>
               <p className="text-2xl text-gray-400 leading-relaxed mb-10">
                  Inspire the next generation. Join an elite group of educators and enthusiasts shaping the future of mathematics.
               </p>
               <div className="flex gap-4">
                  <a href="mailto:clientoutreach@maplesoft.com" className="px-8 py-4 bg-cyber-primary/50 text-white font-bold rounded-full  flex items-center gap-2 ">
                     Apply Now <ChevronRight size={18} />
                  </a>
               </div>
            </div>

            <div className="lg:w-1/2 relative">
               {/* Card Stack Effect - Dark */}
               <div className="relative z-10 bg-[#1c1c1e] p-8 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/10 hover:border-cyber-primary/50 group">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                     <span className="w-8 h-8 bg-cyber-primary/50 text-white rounded-full flex items-center justify-center text-sm shadow-lg shadow-cyber-primary/20">1</span>
                     Direct Influence
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Meet regularly with Maplesoft developers to shape the product roadmap.</p>
               </div>
               <div className="absolute top-4 left-4 w-full h-full bg-white/5 rounded-3xl -z-10 -rotate-2 scale-95 border border-white/5"></div>
            </div>

         </div>
      </div>
      </section >
   <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="relative bg-[#1c1c1e] rounded-[40px] p-12 md:p-24 overflow-hidden text-center border border-white/5">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-primary/20 rounded-full blur-[150px] pointer-events-none"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                 <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">One Billion.</h2>
                 <p className="text-2xl md:text-3xl text-gray-400 mb-12 font-light leading-relaxed">
                   A vision to empower a network of one billion professionals, creators, and innovators. Join the Cyber Sync Network.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/dashboard" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                      Join the Network
                    </Link>
                    <Link to="/about" className="text-white font-medium hover:text-cyber-primary transition-colors flex items-center gap-2">
                      Learn about our mission <ChevronRight size={16} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div >
    
  );
};