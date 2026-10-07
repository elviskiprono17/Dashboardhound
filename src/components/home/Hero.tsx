'use client';

import React from 'react';
import { Dropzone } from './Dropzone';
import { ShieldCheck } from 'lucide-react';

interface HeroProps {
  onDatasetSelected: (data: Record<string, any>[], fileName: string, fileSize: number) => void;
  onStartLoading?: () => void;
}

export function Hero({ onDatasetSelected, onStartLoading }: HeroProps) {
  return (
    <section className="relative pt-3 pb-10 sm:pt-5 sm:pb-14 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/60 via-sky-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Pill */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% In-Browser Privacy: Files processed locally in your browser</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Turn Any File Into an <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#153e54] via-[#1f5880] to-sky-600 bg-clip-text text-transparent">
              Interactive Dashboard
            </span>
          </h1>
        </div>

        {/* Dropzone Card */}
        <div className="max-w-3xl mx-auto">
          <Dropzone onDataLoaded={onDatasetSelected} onStartLoading={onStartLoading} />
        </div>

        {/* Privacy & Feature Guarantee Subtext */}
        <div className="mt-5 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Drop your Excel, CSV, or JSON file — processed 100% in your browser. Zero uploads, zero leakage, instant AI-powered charts.
          </p>
        </div>
      </div>
    </section>
  );
}
