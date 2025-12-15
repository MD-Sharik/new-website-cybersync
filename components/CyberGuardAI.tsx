import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Terminal } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { generateSecurityAdvice } from '../services/geminiService';

export const CyberGuardAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Identity Verified. I am CyberGuard. How can I assist with your security posture today?", timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateSecurityAdvice(input);
    
    const aiMsg: ChatMessage = { role: ChatRole.MODEL, text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <section id="ai-guard" className="py-24 bg-cyber-dark relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 mb-2 text-cyber-primary font-mono text-sm">
             <Terminal size={16} />
             <span>AI_INTERFACE_ACTIVE</span>
           </div>
          <h2 className="text-3xl font-bold text-white font-mono">ASK CYBERGUARD</h2>
          <p className="text-gray-400 mt-2">Powered by Gemini 2.5 Flash. Get instant security advice.</p>
        </div>

        <div className="bg-black border border-cyber-primary/30 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.1)] overflow-hidden flex flex-col h-[500px]">
          {/* Chat Header */}
          <div className="bg-cyber-primary/10 p-4 border-b border-cyber-primary/20 flex justify-between items-center">
            <span className="text-cyber-primary font-mono text-sm">secure_connection_v4.enc</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyber-primary/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                {msg.role === ChatRole.MODEL && (
                  <div className="w-8 h-8 rounded bg-cyber-secondary/20 flex items-center justify-center flex-shrink-0 border border-cyber-secondary/50">
                    <Bot size={16} className="text-cyber-secondary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] p-3 rounded border ${
                  msg.role === ChatRole.USER 
                    ? 'bg-cyber-primary/10 border-cyber-primary/30 text-cyber-text' 
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.role === ChatRole.USER && (
                  <div className="w-8 h-8 rounded bg-cyber-primary/20 flex items-center justify-center flex-shrink-0 border border-cyber-primary/50">
                    <User size={16} className="text-cyber-primary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                 <div className="w-8 h-8 rounded bg-cyber-secondary/20 flex items-center justify-center flex-shrink-0 border border-cyber-secondary/50">
                    <Bot size={16} className="text-cyber-secondary" />
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-bounce delay-200"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter command or query..."
                className="flex-1 bg-black/50 border border-white/20 rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-cyber-primary transition-colors placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50 px-4 py-2 rounded hover:bg-cyber-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};