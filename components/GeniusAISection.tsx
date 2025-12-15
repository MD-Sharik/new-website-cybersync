import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { generateSecurityAdvice } from '../services/geminiService';

const INITIAL_MESSAGE: ChatMessage = {
  role: ChatRole.MODEL,
  text: "Hello. I am the Cyber Sync Genius. I can help you find the right software solution for your engineering or analytics needs. Ask me about Maple, SPSS, or custom development.",
  timestamp: Date.now()
};

export const GeniusAISection: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateSecurityAdvice(input);
      const aiMsg: ChatMessage = { role: ChatRole.MODEL, text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = { role: ChatRole.MODEL, text: "System connectivity issue. Please try again shortly.", timestamp: Date.now() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  return (
    <section id="ai-expert" className="py-24 bg-black relative">
      {/* <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent"></div> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 text-cyber-primary font-mono text-sm uppercase tracking-widest px-4 py-1 bg-cyber-primary/10 rounded-full border border-cyber-primary/30">
            <Terminal size={14} />
            <span>Product Expert AI</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Chat with the Genius</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powered by Gemini 2.5. Get instant answers about specifications, compatibility, and use-cases for all our products.
          </p>
        </div>

        <div className="bg-black border border-cyber-primary/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden flex flex-col h-[600px] relative">
          {/* Chat Header */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-cyber-primary font-mono text-xs uppercase tracking-wider">System_Online</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleClearChat}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white uppercase font-bold tracking-wider hover:bg-white/10 px-3 py-1.5 rounded transition-all"
              >
                <RefreshCw size={12} /> Reset Chat
              </button>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50"></div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                {msg.role === ChatRole.MODEL && (
                  <div className="w-10 h-10 rounded-xl bg-cyber-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyber-primary/20">
                    <Bot size={20} className="text-black" />
                  </div>
                )}

                <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed shadow-lg transition-all ${msg.role === ChatRole.USER
                  ? 'bg-white/10 border border-white/10 text-white rounded-tr-none'
                  : 'bg-cyber-panel border border-cyber-primary/20 text-gray-300 rounded-tl-none'
                  }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.role === ChatRole.USER && (
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <User size={20} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-cyber-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyber-primary/20">
                  <Bot size={20} className="text-black" />
                </div>
                <div className="p-5 bg-cyber-panel border border-cyber-primary/20 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="text-xs text-cyber-primary font-mono uppercase mr-2">Thinking</span>
                  <span className="w-1.5 h-1.5 bg-cyber-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-cyber-primary rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-cyber-primary rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-cyber-panel border-t border-white/10">
            <div className="flex gap-3 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLoading ? "Processing request..." : "Ask about Maple, SPSS, or our services..."}
                disabled={isLoading}
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white font-medium focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-cyber-primary text-black px-6 py-4 rounded-xl font-bold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <span>Send</span>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};