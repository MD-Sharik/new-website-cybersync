import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', threats: 120, blocked: 118 },
  { time: '04:00', threats: 232, blocked: 230 },
  { time: '08:00', threats: 154, blocked: 154 },
  { time: '12:00', threats: 432, blocked: 432 },
  { time: '16:00', threats: 321, blocked: 320 },
  { time: '20:00', threats: 211, blocked: 211 },
  { time: '24:00', threats: 180, blocked: 180 },
];

export const Analytics: React.FC = () => {
  return (
    <section id="analytics" className="py-24 bg-cyber-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white">
              LIVE THREAT<br />
              <span className="text-cyber-accent">ANALYTICS</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our neural networks process millions of signals per second. Watch our global defense grid neutralize threats in real-time.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <div className="text-2xl font-mono text-cyber-primary font-bold">99.9%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Uptime</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <div className="text-2xl font-mono text-cyber-secondary font-bold">0ms</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Latency</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 h-[400px] bg-cyber-dark/50 p-6 border border-white/5 rounded-lg relative overflow-hidden">
             {/* Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent h-2 w-full animate-scan pointer-events-none z-10"></div>
            
            <h3 className="text-xs font-mono text-cyber-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse"></span>
              LIVE_TRAFFIC_MONITOR_V2.0
            </h3>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7000ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7000ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12, fontFamily: 'monospace'}} />
                <YAxis stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12, fontFamily: 'monospace'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#05050a', border: '1px solid #333', color: '#fff' }}
                  itemStyle={{ fontFamily: 'monospace' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#7000ff" 
                  fillOpacity={1} 
                  fill="url(#colorThreats)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="blocked" 
                  stroke="#00f0ff" 
                  fillOpacity={1} 
                  fill="url(#colorBlocked)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};