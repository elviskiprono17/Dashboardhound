'use client';

import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, X, HelpCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onKeySaved }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('dh_gemini_key') || '';
      setApiKey(existing);
      if (existing) setIsSaved(true);
    } catch (e) {}
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      localStorage.setItem('dh_gemini_key', apiKey.trim());
      setIsSaved(true);
      if (onKeySaved) onKeySaved(apiKey.trim());
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUseMock = () => {
    setUseLocalFallback(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-[#14364f] to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 rounded-lg text-amber-400 border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gemini Flash AI Setup</h3>
              <p className="text-xs text-slate-300">Quick 60-Second Walkthrough for Hound Insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Privacy Callout */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-900 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Privacy First: </span>
              Dashboardhound computes all calculations (sums, averages, medians) deterministically in your browser. Raw rows are <strong>never</strong> transmitted. Gemini Flash only synthesizes verified figures into executive commentary.
            </div>
          </div>

          {/* 3 Step Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              How to get your free Gemini API Key (3 simple steps):
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#14364f] text-white text-xs font-bold shrink-0">
                  1
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Open Google AI Studio</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Visit Google AI Studio and sign in with any Google account (it provides free API tier).
                  </p>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-semibold mt-1 hover:underline"
                  >
                    Open Google AI Studio Key Page <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#14364f] text-white text-xs font-bold shrink-0">
                  2
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Generate Key</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Click the blue <strong>"Create API key"</strong> button, select or create a project, and copy your key.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#14364f] text-white text-xs font-bold shrink-0">
                  3
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">Paste Below or Put in .env.local</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Paste it here for instant browser usage, or add <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">GEMINI_API_KEY=your_key</code> in your project <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">.env.local</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Your Gemini API Key:</span>
              {isSaved && <span className="text-emerald-600 text-[11px] font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Key active</span>}
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                }}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14364f] focus:border-transparent font-mono"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleUseMock}
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
            >
              Skip key & use Built-in Deterministic AI Engine
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="px-5 py-2 text-xs font-semibold bg-[#14364f] hover:bg-[#0f293d] text-white rounded-xl shadow-md disabled:opacity-50 transition-colors flex items-center gap-1.5"
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
                {isSaved ? 'Saved!' : 'Save & Enable Gemini'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
