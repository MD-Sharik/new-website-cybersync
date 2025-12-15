import React from 'react';
import { CheckCircle2, Globe, Users, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
            About <span className="text-cyber-primary">Cyber Sync</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyber-primary to-cyber-secondary mx-auto rounded-full"></div>
        </div>

        {/* Main Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-white mb-4">Redefining Technology Implementation</h2>
            <p>
              Cyber Sync stands at the forefront of India's digital transformation landscape. As a next-generation solutions partner, we do more than just distribute software; we architect the digital backbone of modern enterprises. We deliver customized simulation, advanced analytics, and Enterprise AI solutions that empower industries to scale with confidence.
            </p>
            <p>
              Founded on the principle of "Intelligent Design," we bridge the critical gap between legacy infrastructure and futuristic innovation. Whether you are an academic institution needing robust STEM tools or a multinational corporation requiring complex SAP migration, Cyber Sync integrates the world's most powerful technologies tailored to your specific operational DNA.
            </p>
          </div>
          
          <div className="bg-cyber-panel p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyber-primary/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 rounded-full blur-3xl group-hover:bg-cyber-primary/20 transition-all"></div>
            
            <h3 className="text-2xl font-bold text-cyber-primary mb-6 font-mono">Our Core Philosophy</h3>
            <p className="text-2xl text-white font-medium italic mb-8 leading-relaxed border-l-4 border-cyber-secondary pl-6">
              "Technology should accelerate potential, not complicate process."
            </p>
            <p className="text-gray-400">
              We bring over 15 years of collective expertise, a consultative mindset, and an elite ecosystem of global software partnerships (Maplesoft, IBM, Stata) to ensure your organization remains efficient, scalable, and future-ready.
            </p>
          </div>
        </div>

        {/* Differentiators */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">The Cyber Sync Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-cyber-panel rounded-xl border border-white/5 hover:border-cyber-maple hover:-translate-y-2 transition-all duration-300">
              <Globe className="w-10 h-10 text-cyber-maple mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Authorized Global Alliances</h3>
              <p className="text-gray-400 leading-relaxed">
                We are the official authorized partner for Maplesoft in India and work closely with global tech giants like IBM and SmartPLS. This ensures you receive genuine licenses, direct support, and the latest updates.
              </p>
            </div>

            <div className="p-8 bg-cyber-panel rounded-xl border border-white/5 hover:border-cyber-primary hover:-translate-y-2 transition-all duration-300">
              <Zap className="w-10 h-10 text-cyber-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Bespoke Implementation</h3>
              <p className="text-gray-400 leading-relaxed">
                Generic tools yield generic results. We pride ourselves on a "Custom-First" approach, tailoring every ERP, CRM, or Simulation model to match your specific workflow, data architecture, and customer journey.
              </p>
            </div>

            <div className="p-8 bg-cyber-panel rounded-xl border border-white/5 hover:border-cyber-secondary hover:-translate-y-2 transition-all duration-300">
              <Users className="w-10 h-10 text-cyber-secondary mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Cross-Domain Mastery</h3>
              <p className="text-gray-400 leading-relaxed">
                From Digital Twins in manufacturing to Econometric Forecasting in finance, our expertise spans verticals. We have successfully delivered projects for Manufacturing, Pharma, BFSI, Logistics, and Government sectors.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-cyber-primary/10 to-transparent p-12 rounded-2xl border border-cyber-primary/20">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono text-center">OUR VISION</h2>
            <p className="text-gray-300 text-center text-lg">
              To be India's most trusted catalyst for technological advancement, driving value through intelligent software distribution, simulation modeling, and custom enterprise applications.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyber-secondary/10 to-transparent p-12 rounded-2xl border border-cyber-secondary/20">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono text-center">OUR MISSION</h2>
            <p className="text-gray-300 text-center text-lg">
              To empower businesses and academic institutions by constructing intelligent, scalable, and adaptive digital ecosystems that solve complex, real-world problems.
            </p>
          </div>
        </div>

        {/* Partnerships List */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase">Our Technology Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-cyber-panel p-6 rounded border border-white/5">
              <h4 className="text-cyber-maple font-bold mb-4 uppercase">Engineering & Math</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Maplesoft (Maple, MapleSim)</li>
                <li>Lindo Systems (Optimization)</li>
                <li>Maple Flow (Design Calcs)</li>
                <li>Digital Twin Modeling</li>
              </ul>
            </div>
            <div className="bg-cyber-panel p-6 rounded border border-white/5">
              <h4 className="text-cyber-primary font-bold mb-4 uppercase">Statistical Analytics</h4>
              <ul className="space-y-2 text-gray-400">
                <li>IBM SPSS Statistics</li>
                <li>SmartPLS (SEM)</li>
                <li>EViews (Econometrics)</li>
                <li>Tableau / Power BI</li>
              </ul>
            </div>
            <div className="bg-cyber-panel p-6 rounded border border-white/5">
              <h4 className="text-cyber-secondary font-bold mb-4 uppercase">Qualitative Research</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ATLAS.ti</li>
                <li>MAXQDA</li>
                <li>NVivo</li>
                <li>EPPI Reviewer</li>
              </ul>
            </div>
             <div className="bg-cyber-panel p-6 rounded border border-white/5">
              <h4 className="text-white font-bold mb-4 uppercase">Enterprise Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Oracle / SAP Services</li>
                <li>Proprietary LMS / CRM</li>
                <li>Automation Bots (RPA)</li>
                <li>Custom App Development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};