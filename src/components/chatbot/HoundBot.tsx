'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ShieldCheck, ChevronDown, User } from 'lucide-react';
import { getQuickHoundBotReply } from '../../lib/ai/houndBotKnowledge';
import { FormattedAIMessage } from '../common/FormattedAIMessage';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export function HoundBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi there! 🐾 I am **HoundBot**, your Dashboardhound concierge. Ask me anything about our 100% in-browser privacy, pricing plans, vanity links, or how to turn your files into beautiful interactive dashboards!',
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = getQuickHoundBotReply(text);
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer || `Thanks for asking! Dashboardhound processes all files completely locally inside your browser memory for 100% data privacy. You can drag and drop any Excel (.xlsx), CSV, or TSV file above to see it in action instantly. Would you like to know more about our **Solo ($12/mo or $5/mo annual)** plan with 200MB uploads and standalone exports?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  const quickQuestions = [
    'How does 100% in-browser privacy work?',
    'What are the pricing plans?',
    'Can I export to PDF or HTML?',
    'How do vanity share links work?',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button: Circular Dog Logo Only */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 rounded-full bg-white shadow-2xl shadow-slate-900/25 hover:shadow-sky-500/30 border-2 border-slate-200/90 hover:border-sky-400 transition-all duration-300 hover:scale-110 flex items-center justify-center p-2.5 overflow-visible"
          title="HoundBot"
          aria-label="HoundBot"
        >
          <img
            src="/houndbot-avatar.png"
            alt="HoundBot"
            className="w-full h-full object-contain rounded-full select-none"
          />

          {/* Green Online Status Dot */}
          <span className="flex h-3.5 w-3.5 absolute -top-0.5 -right-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0d2638] to-[#153e54] text-white px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white p-1 overflow-hidden shadow-xs shrink-0 flex items-center justify-center">
                <img src="/houndbot-avatar.png" alt="HoundBot" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  HoundBot <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-300">Sales & Help Concierge • Online</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 p-0.5 shadow-xs shrink-0 mt-0.5 overflow-hidden flex items-center justify-center">
                    <img src="/houndbot-avatar.png" alt="HoundBot" className="w-full h-full object-contain rounded-full" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#153e54] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                  }`}
                >
                  <FormattedAIMessage content={m.text} isUser={m.sender === 'user'} />
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic py-1">
                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 p-0.5 shrink-0 overflow-hidden flex items-center justify-center animate-pulse">
                  <img src="/houndbot-avatar.png" alt="HoundBot" className="w-full h-full object-contain rounded-full" />
                </div>
                <span>HoundBot is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-100 hover:text-sky-950 text-slate-700 text-[10px] font-medium transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about Dashboardhound..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2 bg-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#153e54] text-slate-800 placeholder-slate-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-[#153e54] hover:bg-[#0d2638] text-white disabled:opacity-40 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
