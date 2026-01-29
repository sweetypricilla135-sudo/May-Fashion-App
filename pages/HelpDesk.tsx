
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatWithHelpDesk } from '../services/geminiService';
import { ChatMessage } from '../types';

const HelpDesk: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to May Fashion Support. I am your AI concierge. How can I assist you with your fashion-tech experience today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await chatWithHelpDesk(userMsg, messages);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-white/10 flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-3 glass-morphism rounded-2xl">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-syne font-bold text-xl uppercase tracking-tighter">Support Core</h1>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">AI Concierge Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                msg.role === 'model' ? 'bg-indigo-600' : 'bg-gray-800'
              }`}>
                {msg.role === 'model' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`p-4 rounded-[24px] text-sm leading-relaxed ${
                msg.role === 'model' 
                  ? 'glass-morphism rounded-tl-none text-gray-200' 
                  : 'bg-indigo-600 rounded-tr-none text-white font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div className="p-4 glass-morphism rounded-[24px] rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 pb-28">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about fabrics, sizing, or tracking..."
            className="w-full bg-gray-900 border border-white/10 rounded-[28px] py-5 px-6 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 disabled:bg-gray-800 text-white rounded-full transition-all active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
