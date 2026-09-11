'use client';

import React from 'react';
import { Dropzone } from './Dropzone';
import { SAMPLE_DATASETS, SampleDataset } from '../../lib/engine/sampleData';
import { ShieldCheck, Zap, Sparkles, ArrowRight, TrendingUp, ShoppingCart, Target, PieChart, Lock } from 'lucide-react';

interface HeroProps {
  onDatasetSelected: (data: Record<string, any>[], fileName: string, fileSize: number) => void;
}

export function Hero({ onDatasetSelected }: HeroProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'shopping-cart': return <ShoppingCart className="w-4 h-4 text-sky-500" />;
      case 'target': return <Target className="w-4 h-4 text-sky-500" />;
      case 'pie-chart': return <PieChart className="w-4 h-4 text-indigo-500" />;
      default: return <Sparkles className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/60 via-sky-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Absolute Security: Files processed 100% locally in your browser</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Turn Any File Into an <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#153e54] via-[#1f5880] to-sky-600 bg-clip-text text-transparent">
              Interactive Dashboard
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Drop your Excel, CSV, or TSV file. Zero server uploads. Zero data leakage. Instant executive charts, deterministic metrics, and AI insights with zero calculation hallucination.
          </p>
        </div>

        {/* Dropzone Card */}
        <div className="max-w-3xl mx-auto">
          <Dropzone onDataLoaded={onDatasetSelected} />
        </div>

        {/* 1-Click Sample Datasets Bar */}
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Or test drive instantly with real-world sample data:
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_DATASETS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onDatasetSelected(sample.data, sample.fileName, 24500)}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#153e54] hover:shadow-md hover:-translate-y-0.5 transition-all text-left group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-[#153e54]/10 transition-colors">
                      {getIcon(sample.icon)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#153e54] group-hover:text-white transition-colors">
                      {sample.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#153e54]">
                    {sample.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {sample.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-600 group-hover:text-[#153e54]">
                  <span>1-Click Launch</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">In-Browser Local Processing</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">5 Themes</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Executive, Financial, Story & More</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">0% Hallucination</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Deterministic Gemini Flash Hybrid</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">Vanity Links</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">abloh.dashboardhound.com/...</div>
          </div>
        </div>
      </div>
    </section>
  );
}
