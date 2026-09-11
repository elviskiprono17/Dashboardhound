'use client';

import React from 'react';
import { ShieldCheck, Cpu, Lock, CheckCircle2, FileKey, Sparkles } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="privacy" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How We Protect Your Confidential Data
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Conventional dashboard tools force you to upload your sensitive financial, sales, or customer data to their remote cloud servers. Dashboardhound works differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Zero Server Uploads */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Zero Raw Server Uploads
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you drop an Excel (.xlsx), CSV, or TSV file, your browser parses it entirely inside local RAM using SheetJS and Web Workers. Your raw confidential rows never leave your computer.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No cloud storage of raw customer records</span>
            </div>
          </div>

          {/* Card 2: Deterministic Analytics */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              100% Accurate Deterministic Math
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We compute totals, averages, medians, standard deviations, distributions, and outliers using rigorous client-side mathematical algorithms. Zero guesswork, zero rounding errors.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Precise statistical profiling</span>
            </div>
          </div>

          {/* Card 3: Zero AI Hallucination */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Zero-Hallucination AI Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instead of feeding raw text into an LLM, Gemini Flash is provided only pre-calculated mathematical summaries. The AI never attempts mental arithmetic, ensuring 100% accuracy.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Guaranteed math integrity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
