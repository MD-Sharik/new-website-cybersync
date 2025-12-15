import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Activity, Box, Network, Database, Share2, Server, CheckCircle, Cpu, Zap, Globe, Shield } from 'lucide-react';

// Data Dictionary for the 6 Tech Core Items
const TECH_CORE_DATA: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    color: string;
    features: string[];
    capabilities: { title: string; desc: string }[];
    relatedProductLink: string;
    relatedProductText: string;
}> = {
    'physics': {
        title: 'Physics Simulation',
        subtitle: 'Multi-domain System Modeling & Thermodynamics',
        description: 'Our physics simulation core is built on the Maplesoft engine, allowing for acausal modeling of complex physical systems. Unlike traditional signal-flow blocks, we model the physical equations directly (Modelica), enabling high-fidelity simulation of mechanics, hydraulics, and thermal domains in a single unified environment.',
        icon: Activity,
        color: 'text-cyber-maple',
        features: ['Acausal Modeling (Modelica)', 'Symbolic simplification for real-time speed', 'Thermal-fluid dynamics', 'Inverse kinematics'],
        capabilities: [
            { title: 'Fluid Dynamics', desc: 'Simulate flow rates, pressure drops, and heat transfer in complex piping networks.' },
            { title: 'Thermodynamics', desc: 'Model heat generation in EV batteries and cooling system performance.' },
            { title: 'Multidomain Integration', desc: 'Connect mechanical arms to hydraulic actuators and electrical control circuits seamlessly.' }
        ],
        relatedProductLink: '/products/maplesim',
        relatedProductText: 'View MapleSim'
    },
    'structural': {
        title: 'Structural Integrity',
        subtitle: 'FEA & Multibody Dynamics',
        description: 'Ensuring your designs survive the real world. Our structural integrity stack combines Finite Element Analysis (FEA) concepts with rigid/flexible body dynamics. We help engineers analyze stress, vibration, and motion to predict failure points before a physical prototype is ever built.',
        icon: Box,
        color: 'text-cyber-primary',
        features: ['Finite Element Analysis (FEA)', 'Vibration & Resonance Analysis', 'Fatigue Life Prediction', 'Flexible Body Dynamics'],
        capabilities: [
            { title: 'Stress Analysis', desc: 'Visualize Von Mises stress hotspots in mechanical components under load.' },
            { title: 'Vibration Analysis', desc: 'Identify natural frequencies to prevent resonance disasters in rotating machinery.' },
            { title: 'Motion Analysis', desc: 'Simulate the kinematic motion of complex mechanisms like landing gear or robotic arms.' }
        ],
        relatedProductLink: '/solutions/engineering',
        relatedProductText: 'Engineering Solutions'
    },
    'neural': {
        title: 'Neural Networks',
        subtitle: 'Deep Learning & Predictive AI',
        description: 'The brain of the modern enterprise. Our neural network capabilities leverage advanced deep learning architectures to process unstructured data. From computer vision systems that inspect manufacturing quality to predictive maintenance models that listen to machine vibrations, we deploy AI that works.',
        icon: Network,
        color: 'text-cyber-secondary',
        features: ['Convolutional Neural Networks (CNN)', 'Recurrent Neural Networks (RNN)', 'Transformer Models', 'Edge AI Deployment'],
        capabilities: [
            { title: 'Computer Vision', desc: 'Automated defect detection using image recognition on assembly lines.' },
            { title: 'Predictive Maintenance', desc: 'Analyze sensor time-series data to predict equipment failure days in advance.' },
            { title: 'NLP Models', desc: 'Process vast amounts of technical documentation using semantic understanding.' }
        ],
        relatedProductLink: '/solutions/ai',
        relatedProductText: 'AI Solutions'
    },
    'big-data': {
        title: 'Big Data Analytics',
        subtitle: 'Statistical Analysis & Data Mining',
        description: 'Turning noise into signal. We utilize industry-standard statistical engines like IBM SPSS and Stata to perform rigorous data analysis. Whether it represents customer behavior, clinical trial results, or econometric forecasts, we ensure your decisions are backed by statistical significance.',
        icon: Database,
        color: 'text-green-500',
        features: ['Hypothesis Testing', 'Regression Analysis', 'Structural Equation Modeling', 'Cluster Analysis'],
        capabilities: [
            { title: 'Predictive Modeling', desc: 'Forecast future trends based on historical data patterns.' },
            { title: 'Segmentation', desc: 'Cluster customers or products into distinct groups for targeted strategy.' },
            { title: 'Econometrics', desc: 'Advanced time-series modeling for financial and economic forecasting.' }
        ],
        relatedProductLink: '/products/spss',
        relatedProductText: 'View IBM SPSS'
    },
    'enterprise': {
        title: 'Enterprise Ecosystems',
        subtitle: 'Interconnected Business Logic (SAP/ERP)',
        description: 'The digital nervous system of your organization. We specialize in the architecture of complex enterprise environments, particularly SAP ecosystems. From migration to S/4HANA to custom ABAP development, we ensure your business processes flow smoothly across finance, logistics, and HR.',
        icon: Share2,
        color: 'text-blue-500',
        features: ['SAP S/4HANA Migration', 'Custom ERP Architecture', 'Business Process Intelligence', 'Legacy Modernization'],
        capabilities: [
            { title: 'System Integration', desc: 'Connect disparate silos (CRM, Warehouse, Finance) into a single source of truth.' },
            { title: 'Process Optimization', desc: 'Streamline workflows using intelligent automation and custom ERP modules.' },
            { title: 'Data Migration', desc: 'Securely move terabytes of sensitive business data to modern cloud platforms.' }
        ],
        relatedProductLink: '/solutions/sap',
        relatedProductText: 'SAP Consulting'
    },
    'cloud': {
        title: 'Cloud Infrastructure',
        subtitle: 'Scalable Backend & EDLI',
        description: 'The bedrock of modern deployment. Our cloud engineering focuses on building resilient, scalable architectures on AWS/Azure. We also specialize in EDLI (Electronic Data Interchange), ensuring secure, standardized communication between your business and your global partners.',
        icon: Server,
        color: 'text-yellow-500',
        features: ['Microservices Architecture', 'EDLI / B2B Integration', 'Serverless Computing', 'DevSecOps Pipelines'],
        capabilities: [
            { title: 'EDLI Solutions', desc: 'Automate B2B transactions (PO, Invoices) with standardized electronic data interchange.' },
            { title: 'Cloud Native Apps', desc: 'Build applications that auto-scale to meet global demand without downtime.' },
            { title: 'Secure API Gateways', desc: 'Manage and secure the data flow between your internal systems and the outside world.' }
        ],
        relatedProductLink: '/solutions/enterprise',
        relatedProductText: 'Enterprise Systems'
    }
};

export const TechCoreDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const coreItem = id ? TECH_CORE_DATA[id] : null;

    if (!coreItem) {
        return (
            <div className="pt-32 pb-20 bg-cyber-black min-h-screen text-center px-4 flex flex-col items-center justify-center">
                <div className="text-6xl text-cyber-primary font-bold mb-4">404</div>
                <h2 className="text-3xl text-white mb-4">Module Not Found</h2>
                <Link to="/" className="px-6 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-all">Return Home</Link>
            </div>
        );
    }

    const Icon = coreItem.icon;

    return (
        <div className="pt-24 pb-20 bg-cyber-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-cyber-primary mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Tech Core
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 animate-fade-in">
                    <div className="lg:col-span-2 space-y-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider ${coreItem.color}`}>
                            <Icon size={14} />
                            Tech Core Module
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            {coreItem.title}
                        </h1>
                        <h2 className={`text-2xl ${coreItem.color} font-mono`}>
                            {coreItem.subtitle}
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-white/10 pl-6">
                            {coreItem.description}
                        </p>
                    </div>

                    {/* Quick Stats / Action */}
                    <div className="lg:col-span-1">
                        <div className="bg-cyber-panel p-8 rounded-xl border border-white/10 sticky top-28 shadow-2xl">
                             <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Key Features</h3>
                             <ul className="space-y-3 mb-8">
                                 {coreItem.features.map((feat, i) => (
                                     <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                         <CheckCircle size={16} className={`mt-0.5 ${coreItem.color}`} />
                                         {feat}
                                     </li>
                                 ))}
                             </ul>
                             <Link to={coreItem.relatedProductLink} className={`w-full py-4 ${coreItem.color.replace('text-', 'bg-')} text-black font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 hover:opacity-90`}>
                                 {coreItem.relatedProductText}
                             </Link>
                        </div>
                    </div>
                </div>

                {/* Capabilities Grid */}
                <div className="border-t border-white/10 pt-16">
                    <h2 className="text-3xl font-bold text-white mb-10">Technical Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                        {coreItem.capabilities.map((cap, idx) => (
                            <div key={idx} className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                                <div className={`w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center mb-6 border border-white/10 ${coreItem.color}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {cap.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};