'use client';

import React, { useState } from 'react';
import { SAMPLE_DATASETS, SampleDataset } from '@/lib/engine/sampleData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TemplatesSectionProps {
  onSelectTemplate: (template: SampleDataset) => void;
}

export function TemplatesSection({ onSelectTemplate }: TemplatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pastel', 'Cool', 'Warm', 'Dark'];

  const filteredTemplates =
    selectedCategory === 'All'
      ? SAMPLE_DATASETS
      : SAMPLE_DATASETS.filter((t) => t.category === selectedCategory);

  // Renders distinct, authentic visualization forms inspired by modern chart generation tools
  const renderVisualizationGraphic = (template: SampleDataset) => {
    switch (template.id) {
      case 'lavender':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-purple-50/90 to-fuchsia-50/70 border border-purple-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-purple-900 tracking-wide uppercase">Area Spline &amp; Rings</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                <span className="w-2 h-2 rounded-full bg-violet-300" />
              </div>
            </div>

            {/* Visual Graphic: Smooth Spline + Concentric Rings */}
            <div className="relative flex-1 flex items-center justify-between gap-2 py-1">
              <svg className="w-[62%] h-24 overflow-visible" viewBox="0 0 160 80">
                <defs>
                  <linearGradient id="lavender-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 65 Q 25 35, 55 50 T 110 20 T 160 35 L 160 80 L 0 80 Z" fill="url(#lavender-area)" />
                <path d="M 0 65 Q 25 35, 55 50 T 110 20 T 160 35" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="110" cy="20" r="3.5" fill="#7e22ce" stroke="#fff" strokeWidth="1.5" />
              </svg>

              {/* Concentric Progress Rings */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" stroke="#e9d5ff" strokeWidth="4.5" fill="none" />
                  <circle cx="32" cy="32" r="26" stroke="#a855f7" strokeWidth="4.5" fill="none" strokeDasharray="163" strokeDashoffset="42" strokeLinecap="round" />
                  <circle cx="32" cy="32" r="18" stroke="#f3e8ff" strokeWidth="4" fill="none" />
                  <circle cx="32" cy="32" r="18" stroke="#c084fc" strokeWidth="4" fill="none" strokeDasharray="113" strokeDashoffset="28" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-black text-purple-900">82%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-purple-800 font-semibold z-10 pt-1 border-t border-purple-200/60">
              <span>Trajectory: +45.6%</span>
              <span className="font-mono">99.7 CSAT</span>
            </div>
          </div>
        );

      case 'ocean-teal':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-sky-50 to-teal-50/80 border border-teal-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-teal-900 tracking-wide uppercase">Wave &amp; Segment Donut</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="w-2 h-2 rounded-full bg-cyan-300" />
              </div>
            </div>

            {/* Visual Graphic: Flowing Ocean Wave + Donut Segment */}
            <div className="relative flex-1 flex items-center justify-between gap-3 py-1">
              <svg className="w-[58%] h-24 overflow-visible" viewBox="0 0 140 80">
                <defs>
                  <linearGradient id="ocean-wave-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="ocean-wave-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 55 Q 30 70, 70 40 T 140 45 L 140 80 L 0 80 Z" fill="url(#ocean-wave-1)" />
                <path d="M 0 65 Q 40 30, 80 50 T 140 30 L 140 80 L 0 80 Z" fill="url(#ocean-wave-2)" />
                <path d="M 0 65 Q 40 30, 80 50 T 140 30" fill="none" stroke="#0d9488" strokeWidth="2" />
                <path d="M 0 55 Q 30 70, 70 40 T 140 45" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Multi-segment Donut */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="22" stroke="#e0f2fe" strokeWidth="7" fill="none" />
                  <circle cx="32" cy="32" r="22" stroke="#0284c7" strokeWidth="7" fill="none" strokeDasharray="138" strokeDashoffset="55" />
                  <circle cx="32" cy="32" r="22" stroke="#14b8a6" strokeWidth="7" fill="none" strokeDasharray="138" strokeDashoffset="95" />
                </svg>
                <span className="absolute text-[9px] font-black text-teal-950">112K</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-teal-800 font-semibold z-10 pt-1 border-t border-teal-200/60">
              <span>92.5% Retention</span>
              <span>Efficiency 97.8</span>
            </div>
          </div>
        );

      case 'sunset-coral':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-orange-50/90 to-rose-50/80 border border-orange-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-orange-950 tracking-wide uppercase">Dual Intertwined Splines</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="w-2 h-2 rounded-full bg-rose-400" />
              </div>
            </div>

            {/* Visual Graphic: Dual Smooth Trajectories */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80">
                <defs>
                  <linearGradient id="coral-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 70 C 40 60, 80 20, 120 40 S 170 15, 200 25 L 200 80 L 0 80 Z" fill="url(#coral-grad)" />
                <path d="M 0 70 C 40 60, 80 20, 120 40 S 170 15, 200 25" fill="none" stroke="#ea580c" strokeWidth="2.5" />
                <path d="M 0 45 C 50 55, 90 40, 130 55 S 180 35, 200 50" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 3" />
                <circle cx="120" cy="40" r="4" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
                <circle cx="200" cy="25" r="4" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-orange-900 font-semibold z-10 pt-1 border-t border-orange-200/60">
              <span>Upper: 89.4K</span>
              <span>Delta: 1.46x</span>
            </div>
          </div>
        );

      case 'midnight-obsidian':
        return (
          <div className="w-full h-full p-3.5 bg-[#0b101b] border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Financial Candlesticks</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">+8.21%</span>
            </div>

            {/* Visual Graphic: Candlestick High/Low Wicks */}
            <div className="relative flex-1 flex items-center justify-around px-2 py-1">
              {[
                { open: 45, close: 25, high: 15, low: 55, bull: true },
                { open: 35, close: 50, high: 28, low: 62, bull: false },
                { open: 55, close: 30, high: 20, low: 65, bull: true },
                { open: 30, close: 15, high: 10, low: 40, bull: true },
                { open: 20, close: 40, high: 15, low: 52, bull: false },
                { open: 48, close: 18, high: 12, low: 58, bull: true },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center h-20 justify-center relative w-4">
                  {/* High-Low Wick */}
                  <div className="w-px bg-slate-500 absolute" style={{ top: `${c.high}%`, bottom: `${100 - c.low}%` }} />
                  {/* Candlestick Body */}
                  <div
                    className={`w-3.5 rounded-xs z-10 ${c.bull ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    style={{
                      height: `${Math.abs(c.close - c.open)}%`,
                      marginTop: `${Math.min(c.open, c.close) * 0.3}px`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 z-10 pt-1 border-t border-slate-800">
              <span>VOL: 48.2M</span>
              <span className="text-emerald-400 font-bold">$154.20 CLOSE</span>
            </div>
          </div>
        );

      case 'emerald-mint':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-emerald-50/90 to-teal-50/80 border border-emerald-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-emerald-950 tracking-wide uppercase">Radial Arc Gauge</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-200/80 text-emerald-900 font-bold">Optimal</span>
            </div>

            {/* Visual Graphic: Speedometer / Radial Arc */}
            <div className="relative flex-1 flex flex-col items-center justify-center py-1">
              <svg className="w-32 h-20 overflow-visible" viewBox="0 0 120 70">
                <path d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="#d1fae5" strokeWidth="9" strokeLinecap="round" />
                <path d="M 15 65 A 45 45 0 0 1 95 32" fill="none" stroke="#059669" strokeWidth="9" strokeLinecap="round" />
                {/* Needle */}
                <circle cx="60" cy="65" r="5" fill="#065f46" />
                <line x1="60" y1="65" x2="88" y2="35" stroke="#065f46" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="text-center -mt-2">
                <span className="text-lg font-black text-emerald-950">94.8%</span>
                <span className="text-[9px] text-emerald-700 block font-medium">Throughput Index</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-emerald-900 font-semibold z-10 pt-1 border-t border-emerald-200/60">
              <span>99.9% Uptime</span>
              <span>Hit Rate: 98.4%</span>
            </div>
          </div>
        );

      case 'sakura-rose':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-pink-50/90 to-rose-50/70 border border-pink-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-pink-950 tracking-wide uppercase">Bubble Scatter Plot</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span className="w-2 h-2 rounded-full bg-rose-400" />
              </div>
            </div>

            {/* Visual Graphic: Bubble Scatter Matrix */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 180 80">
                {/* Gridlines */}
                <line x1="20" y1="10" x2="20" y2="70" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="60" y1="10" x2="60" y2="70" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="100" y1="10" x2="100" y2="70" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="140" y1="10" x2="140" y2="70" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="10" y1="40" x2="170" y2="40" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="2 2" />
                {/* Scatter Bubbles */}
                <circle cx="35" cy="50" r="9" fill="#f472b6" fillOpacity="0.6" stroke="#db2777" strokeWidth="1.5" />
                <circle cx="70" cy="25" r="14" fill="#fb7185" fillOpacity="0.65" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="105" cy="55" r="7" fill="#f472b6" fillOpacity="0.5" stroke="#db2777" strokeWidth="1.5" />
                <circle cx="130" cy="20" r="16" fill="#e11d48" fillOpacity="0.7" stroke="#be123c" strokeWidth="1.5" />
                <circle cx="155" cy="45" r="10" fill="#f472b6" fillOpacity="0.6" stroke="#db2777" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-pink-900 font-semibold z-10 pt-1 border-t border-pink-200/60">
              <span>5 Node Clusters</span>
              <span>Density: 96.8%</span>
            </div>
          </div>
        );

      case 'arctic-frost':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-sky-50 to-blue-50/80 border border-sky-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-sky-950 tracking-wide uppercase">Spider Radar Web</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-200/70 text-sky-900 font-mono font-bold">5-Axis</span>
            </div>

            {/* Visual Graphic: Radar / Spider Polygonal Web */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-24 h-24 overflow-visible" viewBox="0 0 100 100">
                {/* Pentagon concentric webs */}
                <polygon points="50,15 85,38 72,80 28,80 15,38" fill="none" stroke="#bae6fd" strokeWidth="1" />
                <polygon points="50,28 73,43 65,70 35,70 27,43" fill="none" stroke="#bae6fd" strokeWidth="1" strokeDasharray="2 2" />
                {/* Web Axes */}
                <line x1="50" y1="50" x2="50" y2="15" stroke="#93c5fd" strokeWidth="1" />
                <line x1="50" y1="50" x2="85" y2="38" stroke="#93c5fd" strokeWidth="1" />
                <line x1="50" y1="50" x2="72" y2="80" stroke="#93c5fd" strokeWidth="1" />
                <line x1="50" y1="50" x2="28" y2="80" stroke="#93c5fd" strokeWidth="1" />
                <line x1="50" y1="50" x2="15" y2="38" stroke="#93c5fd" strokeWidth="1" />
                {/* Filled Data Polygon */}
                <polygon points="50,18 80,41 68,75 32,77 20,40" fill="#38bdf8" fillOpacity="0.45" stroke="#0284c7" strokeWidth="2" />
                <circle cx="50" cy="18" r="2.5" fill="#0284c7" />
                <circle cx="80" cy="41" r="2.5" fill="#0284c7" />
                <circle cx="68" cy="75" r="2.5" fill="#0284c7" />
                <circle cx="32" cy="77" r="2.5" fill="#0284c7" />
                <circle cx="20" cy="40" r="2.5" fill="#0284c7" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-sky-900 font-semibold z-10 pt-1 border-t border-sky-200/60">
              <span>Security 100/100</span>
              <span>Speed: 94</span>
            </div>
          </div>
        );

      case 'amber-glow':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-amber-50/90 to-yellow-50/70 border border-amber-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-amber-950 tracking-wide uppercase">Waterfall Step Trajectory</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 font-bold">100% Target</span>
            </div>

            {/* Visual Graphic: Step-Line Waterfall Stairs */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 180 80">
                <defs>
                  <linearGradient id="amber-step-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Staircase Step Line */}
                <path d="M 10 70 H 45 V 55 H 80 V 40 H 115 V 25 H 150 V 15 H 175 L 175 80 L 10 80 Z" fill="url(#amber-step-fill)" />
                <path d="M 10 70 H 45 V 55 H 80 V 40 H 115 V 25 H 150 V 15 H 175" fill="none" stroke="#d97706" strokeWidth="2.5" />
                {/* Milestone Node Dots */}
                <circle cx="45" cy="55" r="3.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
                <circle cx="80" cy="40" r="3.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
                <circle cx="115" cy="25" r="3.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
                <circle cx="150" cy="15" r="3.5" fill="#b45309" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-amber-900 font-semibold z-10 pt-1 border-t border-amber-200/60">
              <span>Scale: $920K</span>
              <span>Efficiency 98%</span>
            </div>
          </div>
        );

      case 'cyber-neon':
        return (
          <div className="w-full h-full p-3.5 bg-[#030712] border border-cyan-900/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Matrix Density Heatmap</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Visual Graphic: Heatmap Matrix Density Grid */}
            <div className="relative flex-1 grid grid-cols-5 gap-1.5 p-2 items-center justify-center my-auto">
              {[
                0.3, 0.6, 0.9, 0.4, 0.8,
                0.5, 0.85, 0.35, 0.95, 0.65,
                0.75, 0.4, 0.8, 0.5, 0.9,
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="h-4.5 rounded-md transition-all hover:scale-110 flex items-center justify-center"
                  style={{
                    backgroundColor: val > 0.7 ? '#06b6d4' : val > 0.45 ? '#8b5cf6' : '#d946ef',
                    opacity: val,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 z-10 pt-1 border-t border-slate-800">
              <span>INTENSITY: 99.8%</span>
              <span className="text-purple-400">48.0 Gbps</span>
            </div>
          </div>
        );

      case 'terracotta-sand':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-amber-50 to-orange-50/80 border border-orange-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-orange-950 tracking-wide uppercase">Stacked Area Ribbons</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
              </div>
            </div>

            {/* Visual Graphic: 3-Layer Stacked Ribbon Area */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 180 80">
                {/* Bottom Layer */}
                <path d="M 0 75 Q 45 60, 90 70 T 180 50 L 180 80 L 0 80 Z" fill="#b45309" fillOpacity="0.75" />
                {/* Middle Layer */}
                <path d="M 0 55 Q 45 40, 90 50 T 180 30 L 180 80 L 0 80 Z" fill="#ea580c" fillOpacity="0.6" />
                {/* Top Layer */}
                <path d="M 0 35 Q 45 20, 90 30 T 180 15 L 180 80 L 0 80 Z" fill="#f59e0b" fillOpacity="0.45" />
                <path d="M 0 35 Q 45 20, 90 30 T 180 15" fill="none" stroke="#d97706" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-orange-950 font-semibold z-10 pt-1 border-t border-orange-200/60">
              <span>Volume: $204K</span>
              <span>Growth: +68%</span>
            </div>
          </div>
        );

      case 'citrus-lime':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-lime-50 to-emerald-50/70 border border-lime-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-lime-950 tracking-wide uppercase">Speedometer Dial</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-lime-200/80 text-lime-950 font-bold">Surge</span>
            </div>

            {/* Visual Graphic: Circular Progress Dial Meter */}
            <div className="relative flex-1 flex flex-col items-center justify-center py-1">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="25" stroke="#ecfccb" strokeWidth="5.5" fill="none" />
                  <circle cx="32" cy="32" r="25" stroke="#84cc16" strokeWidth="5.5" fill="none" strokeDasharray="157" strokeDashoffset="24" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-base font-black text-lime-950 block">98.2</span>
                  <span className="text-[8px] font-bold text-lime-800 uppercase -mt-0.5 block">Velocity</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-lime-900 font-semibold z-10 pt-1 border-t border-lime-200/60">
              <span>Delta: +16.8</span>
              <span>Viral Growth</span>
            </div>
          </div>
        );

      case 'cosmic-indigo':
        return (
          <div className="w-full h-full p-3.5 bg-gradient-to-br from-indigo-50/90 to-blue-50/80 border border-indigo-200/70 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-indigo-950 tracking-wide uppercase">Multi-Spline Curves</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* Visual Graphic: Multi-Series Waveform */}
            <div className="relative flex-1 flex items-center justify-center py-1">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 180 80">
                <defs>
                  <linearGradient id="cosmic-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 65 C 40 40, 80 55, 120 20 S 160 30, 180 15 L 180 80 L 0 80 Z" fill="url(#cosmic-fill)" />
                <path d="M 0 65 C 40 40, 80 55, 120 20 S 160 30, 180 15" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
                <path d="M 0 50 C 40 65, 80 40, 120 50 S 160 35, 180 45" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                {/* Crosshair point */}
                <line x1="120" y1="0" x2="120" y2="80" stroke="#c7d2fe" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="120" cy="20" r="3.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-indigo-900 font-semibold z-10 pt-1 border-t border-indigo-200/60">
              <span>Primary: 9,120</span>
              <span>100% Health</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - "Production Dashboard Templates" phrase removed */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visualization Templates
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Pick an aesthetic style for your charts and dashboards, or drop your own dataset to auto-apply.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#153e54] text-white shadow-md shadow-[#153e54]/20 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? `All Styles (${SAMPLE_DATASETS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Square Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group relative aspect-square rounded-[28px] bg-slate-50 border border-slate-200/90 p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-400 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Top: Mockup Graphic Area (Occupies top ~72% of square) */}
              <div className="w-full flex-1 relative rounded-2xl overflow-hidden mb-3">
                {renderVisualizationGraphic(template)}

                {/* Hover overlay with 'Try Template' button */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#153e54]" />
                  </div>
                </div>
              </div>

              {/* Bottom: Template Name & Swatches */}
              <div className="shrink-0 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#153e54] transition-colors">
                      {template.name}
                    </h3>
                    {/* Palette Swatch Preview */}
                    <div className="flex items-center gap-1 shrink-0">
                      {template.palette?.slice(0, 3).map((color, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {template.description}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                  {template.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Vanity Links & White-label Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#153e54] via-[#1a4a66] to-[#0c2334] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant White-Label Publishing
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Publish Any Template to Your Own Vanity URL
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
              Every visualization style can be published under your branded subdomain <code className="text-sky-300 font-mono text-xs">www.abloh.dashboardhound.com/id</code> or your custom domain with client-side encryption.
            </p>
          </div>
          <a
            href="#pricing"
            className="shrink-0 px-6 py-3 rounded-2xl bg-white text-[#153e54] hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            Explore Vanity URLs →
          </a>
        </div>
      </div>
    </section>
  );
}
