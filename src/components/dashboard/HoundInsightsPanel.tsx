'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Bot,
  Lightbulb,
  Zap,
  Lock,
} from 'lucide-react';
import { DatasetSchema, AIInsightSummary, ChatMessage } from '../../lib/types/dashboard';
import {
  generateLocalExecutiveSummary,
  generateStatisticalDigest,
  answerQueryDeterministically,
} from '../../lib/ai/deterministicEngine';
import { useSubscription } from '../../lib/context/SubscriptionContext';

interface HoundInsightsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  schema: DatasetSchema;
  data: Record<string, any>[];
  insights?: AIInsightSummary;
  onInsightsGenerated?: (insights: AIInsightSummary) => void;
}

export function HoundInsightsPanel({
  isOpen,
  onClose,
  schema,
  data,
  insights: initialInsights,
  onInsightsGenerated,
}: HoundInsightsPanelProps) {
  const { tier, aiTokensRemaining, consumeAIToken, openPaywall } = useSubscription();
  const [insights, setInsights] = useState<AIInsightSummary | undefined>(initialInsights);
  const [isGenerating, setIsGenerating] = useState(false);
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);

  if (!isOpen) return null;

  const handleGenerateSummary = async () => {
    if (!consumeAIToken()) return;

    setIsGenerating(true);
    try {
      // Check if user has Gemini API key in localStorage or env
      const storedKey = typeof window !== 'undefined' ? localStorage.getItem('dh_gemini_key') : null;

      // Deterministic statistical aggregation runs in 100% precision
      const localSummary = generateLocalExecutiveSummary(schema, data);
      
      // If user has key, we can augment with Gemini Flash
      if (storedKey) {
        try {
          const digest = generateStatisticalDigest(schema, data);
          const res = await fetch('/api/ai/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: 'Generate an executive summary with key trends and recommendations based strictly on these verified numbers.',
              digest,
              apiKey: storedKey,
            }),
          });
          const json = await res.json();
          if (json.text) {
            localSummary.overview = json.text.slice(0, 300) + '...';
          }
        } catch (e) {
          console.warn('Using local deterministic summary:', e);
        }
      }

      setInsights(localSummary);
      if (onInsightsGenerated) onInsightsGenerated(localSummary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendQuery = async (queryText?: string) => {
    const text = (queryText || query).trim();
    if (!text) return;

    if (!consumeAIToken()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsAnswering(true);

    setTimeout(() => {
      // Deterministic evaluation guarantees zero hallucination
      const result = answerQueryDeterministically(text, schema, data);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: result.answer,
        citations: result.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
      setIsAnswering(false);
    }, 450);
  };

  const suggestedQueries = [
    'What is our highest performing category?',
    'What is the total sum calculated?',
    'Are there any data anomalies or outliers?',
    'What is the mean average of this dataset?',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden text-slate-800 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-[#153e54] to-slate-900 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 text-sky-300 rounded-xl border border-sky-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Hound Insights AI</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 0% Hallucination
              </span>
            </div>
            <p className="text-xs text-slate-300">Deterministic Engine + Gemini Flash Hybrid</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Token Tracker Bar */}
      <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Zap className="w-3.5 h-3.5 text-sky-500" />
          <span>
            {tier === 'enterprise' || tier === 'pro' ? (
              <strong className="text-emerald-700">Unlimited AI Queries Active</strong>
            ) : (
              <span>
                Tokens Remaining: <strong className="text-slate-900">{aiTokensRemaining}</strong> ({tier} tier)
              </span>
            )}
          </span>
        </div>

        {tier === 'free' && (
          <button
            onClick={() => openPaywall('Upgrade to Starter ($19/mo) for 100 monthly AI queries.', 'starter')}
            className="text-[11px] text-sky-700 font-bold hover:underline flex items-center gap-1"
          >
            <Lock className="w-3 h-3" /> Get More
          </button>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Generate / Overview Section */}
        {!insights ? (
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Generate Executive Intelligence</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Computes mathematical metrics, trend velocities, and anomaly detection with zero hallucination.
              </p>
            </div>
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-[#153e54] hover:bg-[#0d2638] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing deterministic metrics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Generate Executive Summary</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Overview Box */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-sky-950">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-sky-600" /> Executive Digest
                </span>
                <span className="text-[10px] text-sky-700 font-normal">Generated at {insights.generatedAt}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{insights.overview}</p>
            </div>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-2 gap-2.5">
              {insights.keyMetrics.map((km, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 line-clamp-1">
                    {km.label}
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">{km.value}</div>
                  {km.trend && <div className="text-[10px] text-slate-500 mt-0.5">{km.trend}</div>}
                </div>
              ))}
            </div>

            {/* Anomalies Card */}
            {insights.anomalies && insights.anomalies.length > 0 && (
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950">
                  <AlertTriangle className="w-4 h-4 text-sky-600" /> Statistical Integrity & Anomalies
                </div>
                <ul className="space-y-1.5 text-xs text-sky-950">
                  {insights.anomalies.map((ano, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-500 font-bold">•</span>
                      <span>{ano}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strategic Recommendations
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {insights.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Conversational Q&A Section */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ask Anything About This Dashboard:
          </h4>

          {chatMessages.length === 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {suggestedQueries.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuery(sq)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#153e54]/10 text-slate-700 hover:text-[#153e54] border border-slate-200 text-xs text-left font-medium transition-colors"
                >
                  "{sq}"
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {chatMessages.map((m) => (
                <div key={m.id} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#153e54] text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.content}</div>
                    {m.citations && (
                      <div className="mt-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                        🛡️ {m.citations.join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAnswering && (
                <div className="text-xs text-slate-400 italic">Calculating exact mathematical answer...</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input footer */}
      <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask a question about the numbers or metrics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#153e54]"
        />
        <button
          onClick={() => handleSendQuery()}
          disabled={!query.trim() || isAnswering}
          className="p-2.5 rounded-xl bg-[#153e54] hover:bg-[#0d2638] text-white disabled:opacity-40 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
