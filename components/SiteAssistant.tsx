import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { generateSecurityAdvice } from '../services/geminiService';

const INITIAL_MESSAGE: ChatMessage = { 
  role: ChatRole.MODEL, 
  text: "Welcome to Cyber Sync! I'm your digital product expert. Ask me about Maple, SPSS, or our Enterprise Solutions.", 
  timestamp: Date.now() 
};

export const SiteAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
      const errorMsg: ChatMessage = { role: ChatRole.MODEL, text: "I'm having trouble connecting right now. Please try again.", timestamp: Date.now() };
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
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-cyber-black border border-cyber-primary rotate-90' : 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black'
        }`}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="fill-current" />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-8 z-50 w-full max-w-[350px] sm:max-w-[400px] h-[500px] bg-cyber-black/95 backdrop-blur-xl border border-cyber-primary/30 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyber-primary flex items-center justify-center shadow-lg shadow-cyber-primary/20">
              <Sparkles size={16} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Cyber Sync Genius</h3>
              <p className="text-[10px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Start New Conversation"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-primary/20 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
              {msg.role === ChatRole.MODEL && (
                <div className="w-6 h-6 rounded-full bg-cyber-secondary/20 flex items-center justify-center flex-shrink-0 border border-cyber-secondary/50 mt-1">
                  <Bot size={12} className="text-cyber-secondary" />
                </div>
              )}
              
              <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.role === ChatRole.USER 
                  ? 'bg-cyber-primary text-black font-medium rounded-tr-none' 
                  : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-3 animate-fade-in">
               <div className="w-6 h-6 rounded-full bg-cyber-secondary/20 flex items-center justify-center flex-shrink-0 border border-cyber-secondary/50 mt-1">
                  <Bot size={12} className="text-cyber-secondary" />
                </div>
                <div className="p-3 bg-white/10 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isLoading ? "Thinking..." : "Ask about products..."}
              disabled={isLoading}
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:border-cyber-primary outline-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1.5 p-1.5 bg-cyber-primary text-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyber-primary"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};