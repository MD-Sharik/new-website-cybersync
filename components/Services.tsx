import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Globe, BarChart2, Briefcase, ShoppingCart, GraduationCap, ArrowRight } from 'lucide-react';
const EXPERTISE = [
  {
    id: 'engineering',
    title: 'Engineering Simulation',
    desc: 'High-fidelity digital twins, physics-driven modeling, multiphysics simulation, and validation workflows that accelerate engineering innovation.',
    icon: Cpu,
    color: 'text-cyber-maple',
    bgcolor: 'bg-cyber-maple',
    colSpan: 'lg:col-span-2',
    bg: 'bg-[#1c1c1e]',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    desc: 'Predictive insights powered by statistical modeling, automated reporting, dashboards, and end-to-end decision intelligence pipelines.',
    icon: BarChart2,
    color: 'text-cyber-primary',
    bgcolor: 'bg-cyber-primary',
    colSpan: 'lg:col-span-1',
    bg: 'bg-[#151516]',
  },
  {
    id: 'ai',
    title: 'Web & AI',
    desc: 'Next-gen platforms blending AI agents, modern web frameworks, automation, and cloud-native architectures for scalable digital experiences.',
    icon: Globe,
    color: 'text-cyber-secondary',
    bgcolor: 'bg-cyber-secondary',
    colSpan: 'lg:col-span-1',
    bg: 'bg-[#151516]',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Systems',
    desc: 'Integrated CRM, HRMS, ERP, and workflow automation ecosystems engineered for operational excellence and enterprise-grade reliability.',
    icon: Briefcase,
    color: 'text-blue-500 ',
    bgcolor: 'bg-white',
    colSpan: 'lg:col-span-2',
    bg: 'bg-blue-500/20 ',
  },
  {
    id: 'pos',
    title: 'Supply Chain',
    desc: 'POS, inventory control, logistics optimization, and fulfillment systems designed for real-time visibility and resilient supply networks.',
    icon: ShoppingCart,
    color: 'text-cyber-accent',
    bgcolor: 'bg-cyber-accent',
    colSpan: 'lg:col-span-2',
    bg: 'bg-[#151516]',
  },
  {
    id: 'education',
    title: 'Education',
    desc: 'STEM learning platforms, simulation-based curriculum design, and intelligent academic tools built to elevate student engagement and mastery.',
    icon: GraduationCap,
    color: 'text-green-400',
    bgcolor: 'bg-green-400',
    colSpan: 'lg:col-span-1',
    bg: 'bg-[#151516]',
  },
];


export const Services: React.FC = () => {
  return (
    <section className="py-32 bg-black relative">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Section Header */}
    <div className="mb-20">
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        Our Expertise.
      </h2>
      <p className="text-2xl text-gray-500 max-w-2xl font-light">
        Deep domain knowledge across six critical pillars of digital transformation.
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {EXPERTISE.map((item, idx) => (
        <Link 
  to={`/solutions/${item.id}`}
  key={idx}
  className={`group relative ${item.colSpan} ${item.bg} rounded-3xl p-10 overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-white/5`}
>

  {/* Background Image (B/W + silhouette) */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-[0.08] grayscale contrast-75 pointer-events-none"
  ></div>

  {/* Glow Background */}
  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] ${item.bgcolor}/20 rounded-full blur-[140px] opacity-60 pointer-events-none`}></div>

  {/* Foreground Content */}
  <div className="relative z-10 flex flex-col h-full justify-between">
    <div>
      <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 ${item.color}`}>
        <item.icon size={24} />
      </div>
      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
        {item.title}
      </h3>
      <p className="text-gray-400 text-lg font-medium">
        {item.desc}
      </p>
    </div>

    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
      <span className="flex items-center gap-2 text-sm font-bold text-white">
        Learn more <ArrowRight size={14} />
      </span>
    </div>
  </div>

  {/* Gentle hover wash */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
</Link>

      ))}
    </div>

  </div>
</section>

  );
};