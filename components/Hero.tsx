import React  from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {

  return (
    <div 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050815]
 perspective-1000 pt-20"
    >
      {/* --- PREMIUM 3D BACKGROUND --- */}
      
      {/* 1. Subtle Radial Glow (Apple-like spotlight) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyber-primary/10 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen animate-pulse-slow"
      />

      {/* 2. Abstract Geometric Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none preserve-3d">
         {/* Central Gyroscope (The Core) */}
         <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 transition-transform duration-300 ease-out"
            
         >
             <div className="relative w-full h-full animate-[spin_60s_linear_infinite] preserve-3d">
                 <div className="absolute inset-0 border border-white/40 rounded-full [transform:rotateX(70deg)]"></div>
                 <div className="absolute inset-0 border border-white/40 rounded-full [transform:rotateY(70deg)]"></div>
                 <div className="absolute inset-20 border border-cyber-primary/20 rounded-full [transform:rotateX(70deg)]"></div>
             </div>
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
  );
};