'use client';

import React, { useState } from 'react';
import { SAMPLE_DATASETS, SampleDataset } from '@/lib/engine/sampleData';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface TemplatesSectionProps {
  onSelectTemplate: (template: SampleDataset) => void;
}

const INITIAL_VISIBLE = 12;

export function TemplatesSection({ onSelectTemplate }: TemplatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Dark', 'Cool', 'Warm', 'Pastel'];

  const filteredTemplates =
    selectedCategory === 'All'
      ? SAMPLE_DATASETS
      : SAMPLE_DATASETS.filter((t) => t.category === selectedCategory);

  const visibleTemplates = showAll
    ? filteredTemplates
    : filteredTemplates.slice(0, INITIAL_VISIBLE);

  const hasMore = filteredTemplates.length > INITIAL_VISIBLE;

  // Renders a complete, authentic miniature dashboard for each template
  const renderVisualizationGraphic = (template: SampleDataset) => {
    switch (template.id) {
      // ── 1. Midnight Obsidian: Financial Trading Terminal ────────────
      case 'midnight-obsidian':
        return (
          <div className="w-full h-full p-2.5 bg-[#0a0f1d] border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white font-mono">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="text-[8px] font-bold text-slate-300 ml-1">TERMINAL // TRADING VIEW</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">LIVE • 24H</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-slate-900/90 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">LAST PRICE</span>
                <span className="text-[10px] font-bold text-emerald-400">$154.20</span>
              </div>
              <div className="bg-slate-900/90 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">24H VOL</span>
                <span className="text-[10px] font-bold text-slate-200">48.2M</span>
              </div>
              <div className="bg-slate-900/90 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">CHANGE</span>
                <span className="text-[10px] font-bold text-emerald-400">+8.21%</span>
              </div>
            </div>

            {/* Candlesticks & Volume Histogram with Price Gridlines */}
            <div className="flex-1 flex flex-col justify-end py-1 relative">
              {/* Horizontal Price Gridlines */}
              <div className="absolute inset-x-0 top-1 flex justify-between items-center text-[5.5px] text-slate-600 border-b border-slate-800/80 pb-0.5">
                <span>$160.00</span>
                <span className="w-full mx-1 border-b border-dashed border-slate-800/80" />
                <span>RESIST</span>
              </div>
              <div className="absolute inset-x-0 top-7 flex justify-between items-center text-[5.5px] text-slate-600 border-b border-slate-800/80 pb-0.5">
                <span>$150.00</span>
                <span className="w-full mx-1 border-b border-dashed border-slate-800/80" />
                <span>SUPPORT</span>
              </div>

              {/* 10 Dense Candlesticks Spanning Edge-to-Edge */}
              <div className="flex items-end justify-between px-1 h-15 z-10">
                {[
                  { open: 34, close: 20, high: 12, low: 46, bull: true },
                  { open: 22, close: 36, high: 16, low: 45, bull: false },
                  { open: 36, close: 18, high: 10, low: 48, bull: true },
                  { open: 20, close: 28, high: 14, low: 36, bull: false },
                  { open: 28, close: 14, high: 8, low: 34, bull: true },
                  { open: 16, close: 32, high: 10, low: 40, bull: false },
                  { open: 32, close: 18, high: 12, low: 42, bull: true },
                  { open: 18, close: 26, high: 14, low: 34, bull: false },
                  { open: 26, close: 12, high: 6, low: 32, bull: true },
                  { open: 14, close: 8, high: 4, low: 22, bull: true },
                ].map((c, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-center relative">
                    <div className="w-px bg-slate-600 absolute" style={{ top: `${c.high}%`, bottom: `${100 - c.low}%` }} />
                    <div
                      className={`w-2.5 rounded-xs z-10 ${c.bull ? 'bg-emerald-400 shadow-sm shadow-emerald-500/30' : 'bg-rose-500'}`}
                      style={{ height: `${Math.max(Math.abs(c.close - c.open) * 1.25, 4)}px` }}
                    />
                  </div>
                ))}
              </div>

              {/* 10 Volume Histogram Bars */}
              <div className="flex items-end justify-between px-1 pt-1 border-t border-slate-800/80 h-4">
                {[38, 52, 75, 42, 68, 48, 82, 60, 92, 98].map((v, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <div
                      className={`w-2 rounded-t-xs ${i % 2 === 0 ? 'bg-emerald-500/70' : 'bg-slate-700/80'}`}
                      style={{ height: `${v * 0.14}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ledger Table Row */}
            <div className="flex items-center justify-between text-[7px] text-slate-400 pt-1 border-t border-slate-800">
              <span>ASSETS: 5</span>
              <span className="text-emerald-400 font-bold">$154.20 CLOSE • 100% CLEAR</span>
            </div>
          </div>
        );

      // ── 2. Ocean Teal: SaaS Subscription & Retention Dashboard ──────
      case 'ocean-teal':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-sky-50 to-teal-50/80 border border-teal-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-teal-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[8px] font-bold text-teal-950">SAAS GROWTH &amp; RETENTION</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-teal-200/80 text-teal-900 font-bold">Last 30 Days</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">MRR</span>
                <span className="text-[10px] font-black text-teal-950">$112K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">Retention</span>
                <span className="text-[10px] font-black text-teal-950">92.5%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">Velocity</span>
                <span className="text-[10px] font-black text-teal-950">5.4x</span>
              </div>
            </div>

            {/* Area Curve + Donut Breakdown */}
            <div className="flex-1 flex items-center justify-between gap-2 py-1">
              <svg className="w-[58%] h-20 overflow-visible" viewBox="0 0 120 70">
                <defs>
                  <linearGradient id="ocean-area-full" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path d="M 0 55 Q 30 30, 60 40 T 120 18 L 120 70 L 0 70 Z" fill="url(#ocean-area-full)" />
                <path d="M 0 55 Q 30 30, 60 40 T 120 18" fill="none" stroke="#0d9488" strokeWidth="2.5" />
                <circle cx="120" cy="18" r="3.5" fill="#0284c7" stroke="#fff" strokeWidth="1.5" />
              </svg>

              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="#e0f2fe" strokeWidth="6" fill="none" />
                  <circle cx="24" cy="24" r="18" stroke="#0284c7" strokeWidth="6" fill="none" strokeDasharray="113" strokeDashoffset="45" />
                  <circle cx="24" cy="24" r="18" stroke="#14b8a6" strokeWidth="6" fill="none" strokeDasharray="113" strokeDashoffset="78" />
                </svg>
                <span className="absolute text-[8px] font-black text-teal-950">42%</span>
              </div>
            </div>

            {/* Channel Breakdown Footer */}
            <div className="flex items-center justify-between text-[7px] text-teal-800 font-semibold pt-1 border-t border-teal-200/60">
              <span>Direct: 42% • Organic: 35%</span>
              <span className="text-teal-950 font-bold">Efficiency 97.8</span>
            </div>
          </div>
        );

      // ── 3. Sunset Coral: Clean Dual-Line Graph & Trendlines ─────────
      // ── 3. Sunset Coral: Dual-Line Graph with Margin Area Fill ────
      case 'sunset-coral':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-orange-50/90 to-rose-50/80 border border-orange-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-orange-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-[8px] font-bold text-orange-950">REVENUE &amp; PROFIT TRENDLINES</span>
              </div>
              <div className="flex items-center gap-2 text-[7px] font-bold">
                <span className="text-orange-600">— Revenue</span>
                <span className="text-rose-500">-- Expenses</span>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-orange-600 font-bold uppercase block">Revenue</span>
                <span className="text-[10px] font-black text-orange-950">$104.2K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-rose-500 font-bold uppercase block">Expenses</span>
                <span className="text-[10px] font-black text-rose-600">$61.8K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Net Margin</span>
                <span className="text-[10px] font-black text-emerald-700">+$42.4K</span>
              </div>
            </div>

            {/* Full-Span Line Graph with Filled Area and Edge-to-Edge Gridlines */}
            <div className="relative flex-1 flex flex-col justify-center py-1">
              <svg className="w-full h-22 overflow-visible" viewBox="0 0 160 72">
                <defs>
                  <linearGradient id="coral-fill-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Horizontal Gridlines */}
                <line x1="10" y1="12" x2="154" y2="12" stroke="#fed7aa" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="10" y1="32" x2="154" y2="32" stroke="#fed7aa" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="10" y1="52" x2="154" y2="52" stroke="#fed7aa" strokeWidth="0.8" />
                {/* Y-axis Labels */}
                <text x="2" y="15" fontSize="5.5" fill="#ea580c" fontWeight="bold">$100K</text>
                <text x="4" y="35" fontSize="5.5" fill="#ea580c" fontWeight="bold">$50K</text>
                <text x="6" y="55" fontSize="5.5" fill="#ea580c" fontWeight="bold">$0</text>
                {/* Area Gradient under Revenue */}
                <path d="M 16 48 L 42 42 L 68 34 L 96 24 L 124 16 L 150 10 L 150 52 L 16 52 Z" fill="url(#coral-fill-grad)" />
                {/* Revenue Solid Line */}
                <path d="M 16 48 L 42 42 L 68 34 L 96 24 L 124 16 L 150 10" fill="none" stroke="#ea580c" strokeWidth="2.2" />
                {/* Expense Dashed Line */}
                <path d="M 16 54 L 42 50 L 68 44 L 96 40 L 124 35 L 150 30" fill="none" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="3 2" />
                {/* Revenue Vertex Dots */}
                {[
                  { cx: 16, cy: 48 }, { cx: 42, cy: 42 }, { cx: 68, cy: 34 },
                  { cx: 96, cy: 24 }, { cx: 124, cy: 16 }, { cx: 150, cy: 10 },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="2.2" fill="#ea580c" stroke="#fff" strokeWidth="1" />
                ))}
                {/* Expense Vertex Dots */}
                {[
                  { cx: 16, cy: 54 }, { cx: 42, cy: 50 }, { cx: 68, cy: 44 },
                  { cx: 96, cy: 40 }, { cx: 124, cy: 35 }, { cx: 150, cy: 30 },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="1.8" fill="#e11d48" stroke="#fff" strokeWidth="0.8" />
                ))}
                {/* Exactly Aligned Month Labels */}
                {[
                  { m: 'Jan', x: 16 }, { m: 'Feb', x: 42 }, { m: 'Mar', x: 68 },
                  { m: 'Apr', x: 96 }, { m: 'May', x: 124 }, { m: 'Jun', x: 150 },
                ].map((col, i) => (
                  <text key={i} x={col.x} y="64" fontSize="6" fill="#9a3412" fontWeight="bold" textAnchor="middle">{col.m}</text>
                ))}
              </svg>
            </div>

            {/* Performance Footer */}
            <div className="flex items-center justify-between text-[7px] text-orange-950 font-semibold pt-1 border-t border-orange-200/60">
              <span>H1 Net Cashflow: +$42.4K</span>
              <span className="text-emerald-700 font-bold">▲ +40.7% Margin Growth</span>
            </div>
          </div>
        );

      // ── 4. Emerald Mint: Dual-Axis Sales & Margin Combo Chart ───────
      case 'emerald-mint':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-emerald-50/90 to-teal-50/80 border border-emerald-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[8px] font-bold text-emerald-950">SALES &amp; MARGIN COMBO CHART</span>
              </div>
              <div className="flex items-center gap-2 text-[7px] font-bold">
                <span className="text-emerald-700">■ Volume</span>
                <span className="text-amber-600">— Margin %</span>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-emerald-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Volume</span>
                <span className="text-[10px] font-black text-emerald-950">$148.9K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-emerald-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Margin</span>
                <span className="text-[10px] font-black text-amber-700">49.2%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-emerald-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Attainment</span>
                <span className="text-[10px] font-black text-emerald-950">110.3%</span>
              </div>
            </div>

            {/* Combo Chart: Monthly Vertical Columns + Overlaid Margin Spline */}
            <div className="relative flex-1 flex flex-col justify-end py-1">
              <div className="relative h-15 w-full flex items-end justify-between px-2">
                {/* SVG Margin % Overlaid Spline */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 160 55">
                  <path
                    d="M 16 38 L 42 34 L 68 28 L 96 22 L 124 16 L 150 12"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  {[
                    { cx: 16, cy: 38 }, { cx: 42, cy: 34 }, { cx: 68, cy: 28 },
                    { cx: 96, cy: 22 }, { cx: 124, cy: 16 }, { cx: 150, cy: 12 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.cx} cy={pt.cy} r="2.2" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                  ))}
                </svg>

                {/* 6 Monthly Volume Columns */}
                {[
                  { month: 'Jan', h: 32 },
                  { month: 'Feb', h: 38 },
                  { month: 'Mar', h: 44 },
                  { month: 'Apr', h: 50 },
                  { month: 'May', h: 56 },
                  { month: 'Jun', h: 64 },
                ].map((col, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full px-1">
                    <div
                      className="w-full max-w-[14px] rounded-t-sm bg-gradient-to-t from-[#059669] to-[#34d399] shadow-xs"
                      style={{ height: `${col.h * 0.72}px` }}
                    />
                    <span className="text-[6px] font-bold text-emerald-900 mt-1">{col.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[7px] text-emerald-900 font-semibold pt-1 border-t border-emerald-200/60">
              <span>H1 Revenue: $679.6K</span>
              <span className="text-emerald-700 font-bold">▲ Margin Peak: 49.2%</span>
            </div>
          </div>
        );

      // ── 5. Executive Slate: Grouped Bar Chart & Benchmark Report ───
      case 'executive-slate':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-blue-50/90 to-slate-50/80 border border-blue-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[8px] font-bold text-blue-950">BOARD REVENUE &amp; BENCHMARK</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Jan - Jun</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Revenue</span>
                <span className="text-[10px] font-black text-blue-950">$134.2K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Target</span>
                <span className="text-[10px] font-black text-blue-950">$120.0K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Margin</span>
                <span className="text-[10px] font-black text-emerald-700">41.2%</span>
              </div>
            </div>

            {/* Grouped Bar Chart with Target Benchmark Baseline */}
            <div className="flex-1 flex flex-col justify-end py-1">
              <div className="w-full border-b border-dashed border-blue-400 mb-1 flex justify-end">
                <span className="text-[6px] font-bold text-blue-700 bg-white/80 px-1 rounded -mb-1.5">Budget $120K</span>
              </div>
              <div className="flex items-end justify-between gap-1.5 px-1 h-14">
                {[
                  { actual: 52, target: 48, label: 'Jan' },
                  { actual: 58, target: 52, label: 'Feb' },
                  { actual: 68, target: 60, label: 'Mar' },
                  { actual: 62, target: 60, label: 'Apr' },
                  { actual: 78, target: 70, label: 'May' },
                  { actual: 92, target: 80, label: 'Jun' },
                ].map((col, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="flex items-end gap-0.5 w-full justify-center">
                      <div className="w-2.5 rounded-t-xs bg-[#1e40af]" style={{ height: `${col.actual * 0.55}px` }} />
                      <div className="w-1.5 rounded-t-xs bg-blue-300" style={{ height: `${col.target * 0.55}px` }} />
                    </div>
                    <span className="text-[6px] text-blue-700 font-bold">{col.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Performance Footer */}
            <div className="flex items-center justify-between text-[7px] text-blue-900 font-semibold pt-1 border-t border-blue-200/60">
              <span>North: $48K • West: $42K • East: $44K</span>
              <span className="text-emerald-700 font-bold">▲ 111.8% of Target</span>
            </div>
          </div>
        );

      // ── 6. Cosmic Indigo: 24-Hour Web Traffic Area Spline ───────────
      case 'cosmic-indigo':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-indigo-50/90 to-blue-50/80 border border-indigo-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-indigo-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[8px] font-bold text-indigo-950">24-HOUR TRAFFIC TELEMETRY</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-bold">9.1K Total</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-indigo-100 shadow-xs">
                <span className="text-[6px] text-indigo-600 font-bold uppercase block">Sessions</span>
                <span className="text-[10px] font-black text-indigo-950">9,120</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-indigo-100 shadow-xs">
                <span className="text-[6px] text-indigo-600 font-bold uppercase block">Duration</span>
                <span className="text-[10px] font-black text-indigo-950">3m 42s</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-indigo-100 shadow-xs">
                <span className="text-[6px] text-indigo-600 font-bold uppercase block">Bounce</span>
                <span className="text-[10px] font-black text-indigo-950">24.1%</span>
              </div>
            </div>

            {/* Full-Width Dual Area Spline with Peak Annotation */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <svg className="w-full h-20 overflow-visible" viewBox="0 0 160 70">
                <defs>
                  <linearGradient id="cosmic-area-wave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Horizontal Guidelines */}
                <line x1="0" y1="18" x2="160" y2="18" stroke="#e0e7ff" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="0" y1="40" x2="160" y2="40" stroke="#e0e7ff" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="0" y1="62" x2="160" y2="62" stroke="#c7d2fe" strokeWidth="0.8" />
                {/* Filled Gradient Wave */}
                <path d="M 0 54 C 30 50, 52 34, 80 42 S 118 14, 160 18 L 160 62 L 0 62 Z" fill="url(#cosmic-area-wave)" />
                {/* Today Solid Area Curve */}
                <path d="M 0 54 C 30 50, 52 34, 80 42 S 118 14, 160 18" fill="none" stroke="#4f46e5" strokeWidth="2.2" />
                {/* Yesterday Dashed Baseline */}
                <path d="M 0 46 C 30 40, 52 48, 80 34 S 118 28, 160 36" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Peak Indicator at 16:00 */}
                <line x1="120" y1="8" x2="120" y2="62" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="120" cy="14" r="3" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <text x="123" y="10" fontSize="5" fill="#312e81" fontWeight="bold">Peak 9,120 (16:00)</text>
              </svg>
            </div>

            {/* Time Breakdown Footer */}
            <div className="flex items-center justify-between text-[7px] text-indigo-900 font-semibold pt-1 border-t border-indigo-200/60">
              <div className="flex justify-between w-[70%]">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
              </div>
              <span className="font-bold text-indigo-950">+18.4% WoW</span>
            </div>
          </div>
        );

      // ── 7. Amber Glow: Financial Variance Bridge Waterfall ──────────
      case 'amber-glow':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-amber-50/90 to-yellow-50/70 border border-amber-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[8px] font-bold text-amber-950">FINANCIAL BRIDGE WATERFALL</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold">$920K Net</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Starting Base</span>
                <span className="text-[10px] font-black text-amber-950">$120K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Total Additions</span>
                <span className="text-[10px] font-black text-emerald-800">+$800K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Net Reserves</span>
                <span className="text-[10px] font-black text-amber-950">$920K</span>
              </div>
            </div>

            {/* Floating Waterfall Step Bars with Connected Bridge Walk */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <svg className="w-full h-22 overflow-visible" viewBox="0 0 160 70">
                {/* Horizontal Baseline */}
                <line x1="6" y1="56" x2="154" y2="56" stroke="#fcd34d" strokeWidth="1" />

                {/* Step 1: Starting Base */}
                <rect x="10" y="44" width="22" height="12" rx="1.5" fill="#b45309" />
                <text x="21" y="40" fontSize="5.5" fill="#78350f" fontWeight="bold" textAnchor="middle">+120K</text>
                <text x="21" y="65" fontSize="6" fill="#92400e" fontWeight="bold" textAnchor="middle">Base</text>

                {/* Connector 1 -> 2 */}
                <line x1="32" y1="44" x2="42" y2="44" stroke="#b45309" strokeWidth="1" strokeDasharray="2 1.5" />

                {/* Step 2: Phase Alpha */}
                <rect x="42" y="32" width="22" height="12" rx="1.5" fill="#d97706" />
                <text x="53" y="28" fontSize="5.5" fill="#78350f" fontWeight="bold" textAnchor="middle">+125K</text>
                <text x="53" y="65" fontSize="6" fill="#92400e" fontWeight="bold" textAnchor="middle">Alpha</text>

                {/* Connector 2 -> 3 */}
                <line x1="64" y1="32" x2="74" y2="32" stroke="#d97706" strokeWidth="1" strokeDasharray="2 1.5" />

                {/* Step 3: Public Launch */}
                <rect x="74" y="20" width="22" height="12" rx="1.5" fill="#f59e0b" />
                <text x="85" y="16" fontSize="5.5" fill="#78350f" fontWeight="bold" textAnchor="middle">+165K</text>
                <text x="85" y="65" fontSize="6" fill="#92400e" fontWeight="bold" textAnchor="middle">Launch</text>

                {/* Connector 3 -> 4 */}
                <line x1="96" y1="20" x2="106" y2="20" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 1.5" />

                {/* Step 4: Scale Expansion */}
                <rect x="106" y="8" width="22" height="12" rx="1.5" fill="#fbbf24" />
                <text x="117" y="5" fontSize="5.5" fill="#78350f" fontWeight="bold" textAnchor="middle">+230K</text>
                <text x="117" y="65" fontSize="6" fill="#92400e" fontWeight="bold" textAnchor="middle">Scale</text>

                {/* Connector 4 -> 5 */}
                <line x1="128" y1="8" x2="136" y2="8" stroke="#d97706" strokeWidth="1" strokeDasharray="2 1.5" />

                {/* Step 5: Net Total Column */}
                <rect x="136" y="8" width="18" height="48" rx="1.5" fill="#78350f" />
                <text x="145" y="5" fontSize="5.5" fill="#78350f" fontWeight="bold" textAnchor="middle">$920K</text>
                <text x="145" y="65" fontSize="6" fill="#78350f" fontWeight="bold" textAnchor="middle">Total</text>
              </svg>
            </div>

            {/* Bridge Walk Footer */}
            <div className="flex items-center justify-between text-[7px] text-amber-900 font-semibold pt-1 border-t border-amber-200/60">
              <span>+667% Growth Walk</span>
              <span className="text-amber-950 font-bold">Variance: +$40K</span>
            </div>
          </div>
        );

      // ── 8. Cyber Neon: Server Telemetry Activity Heatmap Matrix ─────
      case 'cyber-neon':
        return (
          <div className="w-full h-full p-2.5 bg-[#030712] border border-cyan-900/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white font-mono">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8px] font-bold text-cyan-300">SERVER ACTIVITY HEATMAP</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">48 Gbps</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-slate-950 rounded p-1 border border-cyan-950">
                <span className="text-[6px] text-cyan-500 block">INTENSITY</span>
                <span className="text-[10px] font-bold text-cyan-300">99.8%</span>
              </div>
              <div className="bg-slate-950 rounded p-1 border border-cyan-950">
                <span className="text-[6px] text-cyan-500 block">P99 LATENCY</span>
                <span className="text-[10px] font-bold text-purple-300">14ms</span>
              </div>
              <div className="bg-slate-950 rounded p-1 border border-cyan-950">
                <span className="text-[6px] text-cyan-500 block">CPU LOAD</span>
                <span className="text-[10px] font-bold text-emerald-400">74%</span>
              </div>
            </div>

            {/* 7-Day x 4-Timeblock Heatmap Matrix */}
            <div className="flex-1 flex flex-col justify-center gap-1 py-1">
              <div className="grid grid-cols-7 gap-1 text-[6px] text-cyan-500 text-center">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[
                  0.3, 0.6, 0.9, 0.4, 0.8, 0.2, 0.3,
                  0.5, 0.85, 0.95, 0.65, 0.75, 0.3, 0.15,
                  0.75, 0.4, 0.8, 0.9, 0.98, 0.4, 0.25,
                  0.4, 0.7, 0.85, 0.5, 0.9, 0.35, 0.2,
                ].map((val, idx) => (
                  <div
                    key={idx}
                    className="h-3.5 rounded-xs transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: val > 0.8 ? '#06b6d4' : val > 0.5 ? '#8b5cf6' : val > 0.3 ? '#4c1d95' : '#1e1b4b',
                      opacity: Math.max(val, 0.45),
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Matrix Footer */}
            <div className="flex items-center justify-between text-[7px] text-cyan-300 pt-1 border-t border-cyan-900/60">
              <span>PEAK: ZONE-B2 (FRI 16:00)</span>
              <span className="text-purple-400 font-bold">99.8% TELEMETRY</span>
            </div>
          </div>
        );

      // ── 9. Lavender: 10-Bin NPS Score Histogram with Distribution Curve ─
      case 'lavender':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-purple-50/90 to-fuchsia-50/70 border border-purple-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-purple-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[8px] font-bold text-purple-950">NPS SCORE DISTRIBUTION &amp; CSAT</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-purple-200/80 text-purple-900 font-bold">+72 NPS</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">NPS Score</span>
                <span className="text-[10px] font-black text-purple-950">+72</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">CSAT</span>
                <span className="text-[10px] font-black text-purple-950">99.7%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">Responses</span>
                <span className="text-[10px] font-black text-purple-950">1,420</span>
              </div>
            </div>

            {/* 10-Bin Score Distribution Histogram with Overlaid Trend Curve */}
            <div className="flex-1 flex flex-col justify-end py-1 relative">
              <div className="relative h-16 w-full flex items-end justify-between px-2 gap-1 border-b border-purple-200/80">
                {/* Overlaid Smooth Trend Curve */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 160 55" preserveAspectRatio="none">
                  <path
                    d="M 12 48 Q 45 46, 80 38 T 125 18 T 150 6"
                    fill="none"
                    stroke="#7e22ce"
                    strokeWidth="1.8"
                    strokeDasharray="3 1.5"
                  />
                </svg>

                {[
                  { score: 1, h: 10, color: '#fbcfe8', zone: 'det' },
                  { score: 2, h: 12, color: '#fbcfe8', zone: 'det' },
                  { score: 3, h: 10, color: '#fbcfe8', zone: 'det' },
                  { score: 4, h: 15, color: '#f472b6', zone: 'det' },
                  { score: 5, h: 22, color: '#f472b6', zone: 'det' },
                  { score: 6, h: 28, color: '#e879f9', zone: 'det' },
                  { score: 7, h: 54, color: '#c084fc', zone: 'pas' },
                  { score: 8, h: 68, color: '#a855f7', zone: 'pas' },
                  { score: 9, h: 92, color: '#9333ea', zone: 'pro' },
                  { score: 10, h: 100, color: '#7e22ce', zone: 'pro' },
                ].map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full rounded-t-xs"
                      style={{ height: `${b.h * 0.44}px`, backgroundColor: b.color }}
                    />
                    <span className="text-[5px] text-purple-900 font-bold mt-0.5">{b.score}</span>
                  </div>
                ))}
              </div>

              {/* Sentiment Zone Pills underneath */}
              <div className="flex items-center justify-between text-[6px] font-bold pt-1 px-1">
                <span className="text-rose-600 bg-rose-100/80 px-1 py-0.2 rounded">1-6 Detractors: 8%</span>
                <span className="text-purple-600 bg-purple-100/80 px-1 py-0.2 rounded">7-8 Passives: 24%</span>
                <span className="text-purple-900 bg-purple-200/80 px-1 py-0.2 rounded">9-10 Promoters: 68%</span>
              </div>
            </div>

            {/* Satisfaction Footer */}
            <div className="flex items-center justify-between text-[7px] text-purple-900 font-semibold pt-1 border-t border-purple-200/60">
              <span>99.7 CSAT Rating</span>
              <span className="text-purple-700 font-bold">+45.6% Trajectory</span>
            </div>
          </div>
        );

      // ── 10. Terracotta Sand: Multi-Category Stacked Area Share ──────
      case 'terracotta-sand':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-amber-50 to-orange-50/80 border border-orange-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-orange-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-600" />
                <span className="text-[8px] font-bold text-orange-950">CATEGORY STACKED AREA SHARE</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-orange-200/80 text-orange-950 font-bold">$204K Total</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-orange-600 font-bold uppercase block">Volume</span>
                <span className="text-[10px] font-black text-orange-950">$204K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-orange-600 font-bold uppercase block">Core Share</span>
                <span className="text-[10px] font-black text-orange-950">41%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-orange-100 shadow-xs">
                <span className="text-[6px] text-orange-600 font-bold uppercase block">Growth</span>
                <span className="text-[10px] font-black text-emerald-800">+68%</span>
              </div>
            </div>

            {/* Stacked Area Ribbons with Layer Labels & Guidelines */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <svg className="w-full h-22 overflow-visible" viewBox="0 0 160 70">
                {/* Guidelines */}
                <line x1="8" y1="14" x2="154" y2="14" stroke="#fed7aa" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="8" y1="34" x2="154" y2="34" stroke="#fed7aa" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="8" y1="54" x2="154" y2="54" stroke="#fed7aa" strokeWidth="0.8" />
                {/* Bottom Baseline Stack 1 (Core) */}
                <path d="M 0 54 Q 40 46, 80 50 T 160 42 L 160 54 L 0 54 Z" fill="#b45309" fillOpacity="0.85" />
                {/* Middle Stack 2 (Growth) */}
                <path d="M 0 34 Q 40 26, 80 32 T 160 22 L 160 42 Q 120 46, 80 50 T 0 54 Z" fill="#ea580c" fillOpacity="0.75" />
                {/* Top Stack 3 (Expansion) */}
                <path d="M 0 16 Q 40 10, 80 16 T 160 8 L 160 22 Q 120 28, 80 32 T 0 34 Z" fill="#f59e0b" fillOpacity="0.65" />
                <path d="M 0 16 Q 40 10, 80 16 T 160 8" fill="none" stroke="#d97706" strokeWidth="1.8" />

                {/* Direct Segment Labels inside ribbons */}
                <text x="80" y="49" fontSize="5" fill="#fff" fontWeight="bold" textAnchor="middle">Core 41%</text>
                <text x="80" y="30" fontSize="5" fill="#fff" fontWeight="bold" textAnchor="middle">Growth 35%</text>
                <text x="80" y="14" fontSize="5" fill="#78350f" fontWeight="bold" textAnchor="middle">Expansion 24%</text>

                {/* Quarter Markers on Baseline */}
                {['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].map((q, idx) => (
                  <text key={idx} x={12 + idx * 34} y="63" fontSize="5.5" fill="#9a3412" fontWeight="bold" textAnchor="middle">{q}</text>
                ))}
              </svg>
            </div>

            {/* Category Share Legend Footer */}
            <div className="flex items-center justify-between text-[7px] text-orange-950 font-semibold pt-1 border-t border-orange-200/60">
              <div className="flex gap-2">
                <span>Core: 41%</span><span>Growth: 35%</span><span>Expansion: 24%</span>
              </div>
              <span className="font-bold text-orange-900">+68% Volume</span>
            </div>
          </div>
        );

      // ── 11. Citrus Lime: Agile Burndown Line & Sprint Velocity ──────
      case 'citrus-lime':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-lime-50 to-emerald-50/70 border border-lime-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-lime-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-600" />
                <span className="text-[8px] font-bold text-lime-950">SPRINT BURNDOWN &amp; VELOCITY</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-lime-200/80 text-lime-950 font-bold">Sprint 14</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-lime-200 shadow-xs">
                <span className="text-[6px] text-lime-800 font-bold uppercase block">Velocity</span>
                <span className="text-[10px] font-black text-lime-950">98.2 pts</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-lime-200 shadow-xs">
                <span className="text-[6px] text-lime-800 font-bold uppercase block">Pacing</span>
                <span className="text-[10px] font-black text-emerald-800">+16.8%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-lime-200 shadow-xs">
                <span className="text-[6px] text-lime-800 font-bold uppercase block">Remaining</span>
                <span className="text-[10px] font-black text-lime-950">2 pts</span>
              </div>
            </div>

            {/* Burndown Chart with Ideal Slope vs Actual Remaining Points */}
            <div className="flex-1 flex flex-col justify-center py-1">
              <svg className="w-full h-22 overflow-visible" viewBox="0 0 160 70">
                <defs>
                  <linearGradient id="lime-burn-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#84cc16" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#84cc16" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Horizontal Gridlines */}
                <line x1="16" y1="14" x2="154" y2="14" stroke="#d9f99d" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="16" y1="35" x2="154" y2="35" stroke="#d9f99d" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="16" y1="56" x2="154" y2="56" stroke="#bef264" strokeWidth="1" />
                {/* Y-axis labels */}
                <text x="2" y="17" fontSize="5.5" fill="#4d7c0f" fontWeight="bold">50pt</text>
                <text x="2" y="38" fontSize="5.5" fill="#4d7c0f" fontWeight="bold">25pt</text>
                <text x="6" y="59" fontSize="5.5" fill="#4d7c0f" fontWeight="bold">0</text>
                {/* Ideal Burndown Slope Line (Dotted Gray) */}
                <line x1="24" y1="14" x2="148" y2="56" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Actual Area Gradient Fill */}
                <path d="M 24 14 L 54 22 L 84 38 L 116 48 L 148 54 L 148 56 L 24 56 Z" fill="url(#lime-burn-fill)" />
                {/* Actual Burndown Trajectory */}
                <path d="M 24 14 L 54 22 L 84 38 L 116 48 L 148 54" fill="none" stroke="#65a30d" strokeWidth="2.5" />
                {[
                  { cx: 24, cy: 14, val: '50' },
                  { cx: 54, cy: 22, val: '44' },
                  { cx: 84, cy: 38, val: '28' },
                  { cx: 116, cy: 48, val: '16' },
                  { cx: 148, cy: 54, val: '2' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="2.2" fill="#15803d" stroke="#fff" strokeWidth="1" />
                    <text x={pt.cx} y={pt.cy - 4} fontSize="5" fill="#365314" fontWeight="bold" textAnchor="middle">{pt.val}p</text>
                  </g>
                ))}
                {/* Sprint Day Axis Labels */}
                {[
                  { day: 'D1', x: 24 },
                  { day: 'D3', x: 54 },
                  { day: 'D5', x: 84 },
                  { day: 'D7', x: 116 },
                  { day: 'D10', x: 148 },
                ].map((d, i) => (
                  <text key={i} x={d.x} y="65" fontSize="5.5" fill="#4d7c0f" fontWeight="bold" textAnchor="middle">{d.day}</text>
                ))}
              </svg>
            </div>

            {/* Kanban Status Breakdown Footer */}
            <div className="flex items-center justify-between text-[7px] text-lime-900 font-semibold pt-1 border-t border-lime-200/60">
              <div className="flex gap-2">
                <span>To-Do: 2</span><span>In Progress: 4</span><span>Done: 44</span>
              </div>
              <span className="font-bold text-emerald-800">Sprint On-Track</span>
            </div>
          </div>
        );

      // ── 12. Arctic Frost: Regional Revenue Leaderboard ─────────────
      case 'arctic-frost':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-sky-50 to-blue-50/80 border border-sky-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-sky-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-[8px] font-bold text-sky-950">REGIONAL REVENUE LEADERBOARD</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-sky-200/70 text-sky-900 font-bold">5 Regions</span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-sky-100 shadow-xs">
                <span className="text-[6px] text-sky-600 font-bold uppercase block">Top Leader</span>
                <span className="text-[10px] font-black text-sky-950">N. America</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-sky-100 shadow-xs">
                <span className="text-[6px] text-sky-600 font-bold uppercase block">Total ARR</span>
                <span className="text-[10px] font-black text-sky-950">$446.6K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-sky-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Quota Avg</span>
                <span className="text-[10px] font-black text-emerald-700">114.2%</span>
              </div>
            </div>

            {/* Top 5 Ranked Regional Leaderboard with Medal Badges & Progress */}
            <div className="flex-1 flex flex-col justify-center gap-1 py-1">
              {[
                { rank: '1', name: 'North America', rev: '$148.2K', pct: 96, color: '#0284c7' },
                { rank: '2', name: 'Western Europe', rev: '$118.4K', pct: 82, color: '#0369a1' },
                { rank: '3', name: 'Asia-Pacific', rev: '$89.6K', pct: 68, color: '#0284c7' },
                { rank: '4', name: 'Latin America', rev: '$56.3K', pct: 44, color: '#38bdf8' },
                { rank: '5', name: 'Middle East', rev: '$34.1K', pct: 28, color: '#7dd3fc' },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[7px]">
                  <span className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center font-bold text-[6px] text-white shrink-0 ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-amber-700' : 'bg-slate-300 text-slate-700'}`}>
                    #{row.rank}
                  </span>
                  <span className="w-20 font-semibold text-sky-950 truncate">{row.name}</span>
                  <div className="flex-1 h-2 bg-sky-100 rounded-full overflow-hidden relative">
                    <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                  </div>
                  <span className="font-bold text-sky-950 w-10 text-right">{row.rev}</span>
                </div>
              ))}
            </div>

            {/* Leaderboard Comparison Footer */}
            <div className="flex items-center justify-between text-[7px] text-sky-900 font-semibold pt-1 border-t border-sky-200/60">
              <span>5 of 5 Regions Above Plan</span>
              <span className="text-sky-800 font-bold">Top Share: 42.1%</span>
            </div>
          </div>
        );

      // ── 13. Sakura Rose: Marketing Pipeline Funnel ──────────────────
      case 'sakura-rose':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-pink-50/90 to-rose-50/70 border border-pink-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-pink-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="text-[8px] font-bold text-pink-950">MARKETING PIPELINE FUNNEL</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-pink-200/70 text-pink-900 font-bold">Inbound Q3</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-pink-100 shadow-xs">
                <span className="text-[6px] text-pink-600 font-bold uppercase block">Inbound</span>
                <span className="text-[10px] font-black text-pink-950">142K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-pink-100 shadow-xs">
                <span className="text-[6px] text-rose-500 font-bold uppercase block">MQLs</span>
                <span className="text-[10px] font-black text-rose-600">48.6K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-pink-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Deals Won</span>
                <span className="text-[10px] font-black text-emerald-700">6.8K</span>
              </div>
            </div>

            {/* Full-Width Stepped Conversion Pipeline with Drop-Off Badges */}
            <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
              {[
                { stage: 'Inbound Traffic', count: '142K', pct: 100, drop: null, color: '#f43f5e' },
                { stage: 'Qualified Leads', count: '48.6K', pct: 68, drop: '-66%', color: '#fb7185' },
                { stage: 'Demos Booked', count: '18.2K', pct: 44, drop: '-62%', color: '#f472b6' },
                { stage: 'Closed Won', count: '6.8K', pct: 24, drop: '-63%', color: '#db2777' },
              ].map((stg, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[7px]">
                  <span className="w-18 font-semibold text-pink-950 truncate">{stg.stage}</span>
                  <div className="flex-1 h-2.5 bg-pink-100 rounded-xs overflow-hidden flex items-center">
                    <div className="h-full rounded-xs flex items-center px-1" style={{ width: `${stg.pct}%`, backgroundColor: stg.color }}>
                      <span className="text-[5.5px] font-black text-white">{stg.count}</span>
                    </div>
                  </div>
                  {stg.drop ? (
                    <span className="text-[6px] font-bold text-rose-600 bg-rose-100/80 px-1 py-0.2 rounded w-8 text-center">{stg.drop}</span>
                  ) : (
                    <span className="text-[6px] font-bold text-pink-700 w-8 text-center">Top</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[7px] text-pink-900 font-semibold pt-1 border-t border-pink-200/60">
              <span>Overall Funnel Velocity: 4.8%</span>
              <span className="font-bold text-pink-950">Blended CAC: $18.40</span>
            </div>
          </div>
        );

      // ── 14. Cobalt Wave: 100% Stacked Vertical Columns ─────────────
      case 'cobalt-wave':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[8px] font-bold text-blue-950">ENTERPRISE PRODUCT ARR MIX</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Q1 - Q4 Mix</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Net ARR</span>
                <span className="text-[10px] font-black text-blue-950">$242K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Expansion</span>
                <span className="text-[10px] font-black text-emerald-700">+24%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-blue-100 shadow-xs">
                <span className="text-[6px] text-blue-600 font-bold uppercase block">Churn</span>
                <span className="text-[10px] font-black text-blue-950">1.8%</span>
              </div>
            </div>

            {/* 100% Stacked Vertical Columns Across 4 Quarters */}
            <div className="flex-1 flex flex-col justify-end py-1">
              <div className="flex items-end justify-between px-3 h-16 gap-3">
                {[
                  { quarter: 'Q1', tiers: [{ h: 36, c: '#1e40af' }, { h: 28, c: '#2563eb' }, { h: 22, c: '#3b82f6' }, { h: 14, c: '#93c5fd' }] },
                  { quarter: 'Q2', tiers: [{ h: 38, c: '#1e40af' }, { h: 29, c: '#2563eb' }, { h: 20, c: '#3b82f6' }, { h: 13, c: '#93c5fd' }] },
                  { quarter: 'Q3', tiers: [{ h: 42, c: '#1e40af' }, { h: 30, c: '#2563eb' }, { h: 18, c: '#3b82f6' }, { h: 10, c: '#93c5fd' }] },
                  { quarter: 'Q4', tiers: [{ h: 46, c: '#1e40af' }, { h: 32, c: '#2563eb' }, { h: 14, c: '#3b82f6' }, { h: 8, c: '#93c5fd' }] },
                ].map((col, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                    <div className="w-full flex flex-col rounded-t overflow-hidden shadow-xs h-13">
                      {col.tiers.map((t, j) => (
                        <div key={j} style={{ height: `${t.h}%`, backgroundColor: t.c }} />
                      ))}
                    </div>
                    <span className="text-[6px] font-bold text-blue-900">{col.quarter}</span>
                  </div>
                ))}
              </div>

              {/* Stack Tier Legend */}
              <div className="flex items-center justify-between text-[6px] text-blue-900 font-semibold pt-1 px-1">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-xs bg-[#1e40af]" />Core 46%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-xs bg-[#2563eb]" />Cloud 32%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-xs bg-[#3b82f6]" />API 14%</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-xs bg-[#93c5fd]" />Partner 8%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] text-blue-800 font-semibold pt-1 border-t border-blue-200/60">
              <span>Enterprise Core Share: 46%</span>
              <span className="font-bold text-blue-950">Net Expansion: +24%</span>
            </div>
          </div>
        );

      // ── 15. Solar Flare: Department Budget Allocation Donut ─────────
      case 'solar-flare':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-amber-50/90 to-orange-50/70 border border-amber-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[8px] font-bold text-amber-950">DEPARTMENT BUDGET ALLOCATION</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold">100% Allocated</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Total Budget</span>
                <span className="text-[10px] font-black text-amber-950">$184.5K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-amber-600 font-bold uppercase block">Committed</span>
                <span className="text-[10px] font-black text-amber-950">84.2%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-amber-100 shadow-xs">
                <span className="text-[6px] text-emerald-600 font-bold uppercase block">Reserves</span>
                <span className="text-[10px] font-black text-emerald-700">+$29.4K</span>
              </div>
            </div>

            {/* Donut Ring Chart with Department Share Progress Rows */}
            <div className="flex-1 flex items-center justify-between gap-2 py-1">
              {/* Donut Ring */}
              <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" stroke="#fef3c7" strokeWidth="5.5" fill="none" />
                  <circle cx="24" cy="24" r="17" stroke="#f59e0b" strokeWidth="5.5" fill="none" strokeDasharray="44.86 106.81" strokeDashoffset="0" />
                  <circle cx="24" cy="24" r="17" stroke="#ea580c" strokeWidth="5.5" fill="none" strokeDasharray="29.91 106.81" strokeDashoffset="-44.86" />
                  <circle cx="24" cy="24" r="17" stroke="#b45309" strokeWidth="5.5" fill="none" strokeDasharray="19.23 106.81" strokeDashoffset="-74.77" />
                  <circle cx="24" cy="24" r="17" stroke="#fbbf24" strokeWidth="5.5" fill="none" strokeDasharray="12.82 106.81" strokeDashoffset="-94.0" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[8px] font-black text-amber-950 leading-none">$184K</span>
                  <span className="text-[4.5px] font-bold text-amber-800 uppercase tracking-tighter">Total</span>
                </div>
              </div>

              {/* Department Breakdown List */}
              <div className="flex-1 flex flex-col justify-center gap-1 text-[6.5px]">
                {[
                  { name: 'Engineering', pct: '42%', val: '$77.5K', bar: 88, color: '#f59e0b' },
                  { name: 'Marketing', pct: '28%', val: '$51.6K', bar: 62, color: '#ea580c' },
                  { name: 'Sales & CS', pct: '18%', val: '$33.2K', bar: 42, color: '#b45309' },
                  { name: 'Operations', pct: '12%', val: '$22.2K', bar: 26, color: '#fbbf24' },
                ].map((dept, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between text-amber-950 font-semibold">
                      <span className="truncate">{dept.name}</span>
                      <span className="font-bold">{dept.pct}</span>
                    </div>
                    <div className="w-full h-1 bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${dept.bar}%`, backgroundColor: dept.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] text-amber-900 font-semibold pt-1 border-t border-amber-200/60">
              <span>4 Depts • 52 Headcount</span>
              <span className="font-bold text-amber-950">Committed: 84.2%</span>
            </div>
          </div>
        );

      // ── 16. Graphite Minimal: Swiss High-Density Data Grid Ledger ───
      case 'graphite-minimal':
        return (
          <div className="w-full h-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white font-mono">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-[8px] font-bold text-slate-300">SWISS HIGH-DENSITY LEDGER</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">DENSE</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-slate-950 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">ITEMS</span>
                <span className="text-[10px] font-bold text-slate-200">2,340</span>
              </div>
              <div className="bg-slate-950 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">AVG MARGIN</span>
                <span className="text-[10px] font-bold text-emerald-400">46.5%</span>
              </div>
              <div className="bg-slate-950 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">ACTIVE</span>
                <span className="text-[10px] font-bold text-sky-400">98.2%</span>
              </div>
            </div>

            {/* Dense Data Table */}
            <div className="flex-1 flex flex-col justify-center gap-1 py-1 text-[7px]">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-0.5 font-bold">
                <span>SKU ID</span>
                <span>UNITS</span>
                <span>TREND</span>
                <span>MARGIN</span>
                <span>STATUS</span>
              </div>
              {[
                { id: 'AST-01', qty: '420', margin: '38.2%', status: 'Active', color: '#38bdf8' },
                { id: 'AST-02', qty: '890', margin: '44.5%', status: 'Active', color: '#38bdf8' },
                { id: 'AST-03', qty: '240', margin: '52.0%', status: 'Optimal', color: '#34d399' },
                { id: 'AST-05', qty: '180', margin: '61.4%', status: 'Prime', color: '#a78bfa' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 py-0.5 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-400">{row.id}</span>
                  <span>{row.qty}</span>
                  <span className="w-8 h-2 bg-slate-800 rounded flex items-center px-0.5">
                    <span className="w-full h-0.5 bg-sky-400 rounded" />
                  </span>
                  <span className="text-slate-200 font-bold">{row.margin}</span>
                  <span className="px-1 py-0.2 rounded text-[6px]" style={{ color: row.color, backgroundColor: `${row.color}15` }}>{row.status}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[7px] text-slate-400 pt-1 border-t border-slate-800">
              <span>SORT: MARGIN DESC</span>
              <span className="text-slate-200 font-bold">AVG MARGIN: 46.5%</span>
            </div>
          </div>
        );

      // ── 17. Alpine Pine: Gantt Milestone Roadmap & Project Timeline ──
      case 'alpine-pine':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-teal-50/90 to-emerald-50/70 border border-teal-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-teal-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span className="text-[8px] font-bold text-teal-950">PROJECT ROADMAP &amp; GANTT</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-bold">Sprint 24</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">Budget</span>
                <span className="text-[10px] font-black text-teal-950">$119K</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">Logged Hrs</span>
                <span className="text-[10px] font-black text-teal-950">630h</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-teal-100 shadow-xs">
                <span className="text-[6px] text-teal-600 font-bold uppercase block">Progress</span>
                <span className="text-[10px] font-black text-emerald-800">88.4%</span>
              </div>
            </div>

            {/* Gantt Milestone Roadmap with Month Columns & "Today" Marker */}
            <div className="flex-1 flex flex-col justify-center py-1 relative">
              {/* Month Header */}
              <div className="grid grid-cols-6 gap-1 text-[6px] text-teal-700 font-bold text-center border-b border-teal-200/60 pb-0.5">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>

              {/* Roadmap Phase Bars */}
              <div className="relative flex flex-col gap-1.5 pt-1.5 h-16 justify-center">
                {/* Vertical "Today" Line */}
                <div className="absolute left-[58%] top-0 bottom-0 w-px border-l border-dashed border-amber-500 z-10" />

                {/* Phase 1 */}
                <div className="relative w-full h-2.5 bg-teal-100/40 rounded flex items-center">
                  <div className="absolute left-[5%] w-[32%] h-full bg-[#0d9488] rounded flex items-center px-1 text-[5px] font-bold text-white shadow-xs">
                    Research ✓
                  </div>
                </div>

                {/* Phase 2 with Milestone */}
                <div className="relative w-full h-2.5 bg-teal-100/40 rounded flex items-center">
                  <div className="absolute left-[30%] w-[42%] h-full bg-[#0f766e] rounded flex items-center px-1 text-[5px] font-bold text-white shadow-xs">
                    Architecture
                  </div>
                  <span className="absolute left-[70%] text-[8px] text-amber-600 leading-none -mt-0.5 font-bold">◆</span>
                </div>

                {/* Phase 3 */}
                <div className="relative w-full h-2.5 bg-teal-100/40 rounded flex items-center">
                  <div className="absolute left-[52%] w-[34%] h-full bg-[#14b8a6] rounded flex items-center px-1 text-[5px] font-bold text-white shadow-xs">
                    Integration
                  </div>
                  <span className="absolute left-[84%] text-[8px] text-amber-600 leading-none -mt-0.5 font-bold">◆</span>
                </div>

                {/* Phase 4 */}
                <div className="relative w-full h-2.5 bg-teal-100/40 rounded flex items-center">
                  <div className="absolute left-[75%] w-[22%] h-full bg-[#2dd4bf] rounded flex items-center px-1 text-[5px] font-bold text-teal-950 shadow-xs">
                    Rollout
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] text-teal-900 font-semibold pt-1 border-t border-teal-200/60">
              <span>4 Active Phases • 2 Milestones Reached</span>
              <span className="font-bold text-teal-950">On Schedule</span>
            </div>
          </div>
        );

      // ── 18. Crimson Pulse: Step-Line Latency Waveform & SLA Monitor ──
      case 'crimson-pulse':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-red-50/90 to-rose-50/70 border border-red-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-red-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-bold text-red-950">STEP-LINE SLA LATENCY MONITOR</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold">99.88% SLA</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-red-100 shadow-xs">
                <span className="text-[6px] text-red-600 font-bold uppercase block">P99 Latency</span>
                <span className="text-[10px] font-black text-red-950">14ms</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-red-100 shadow-xs">
                <span className="text-[6px] text-red-600 font-bold uppercase block">Uptime</span>
                <span className="text-[10px] font-black text-red-950">99.88%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-red-100 shadow-xs">
                <span className="text-[6px] text-red-600 font-bold uppercase block">Incident Rate</span>
                <span className="text-[10px] font-black text-emerald-700">0 Open</span>
              </div>
            </div>

            {/* High-Frequency Step-Line Waveform with Spike & Threshold */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="relative h-14 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 52">
                  {/* Critical Threshold Line */}
                  <line x1="0" y1="18" x2="160" y2="18" stroke="#f87171" strokeWidth="0.8" strokeDasharray="3 2" />
                  <text x="112" y="15" fill="#dc2626" fontSize="5" fontWeight="bold">SLA LIMIT 50ms</text>

                  {/* Baseline Gridline */}
                  <line x1="0" y1="42" x2="160" y2="42" stroke="#fecaca" strokeWidth="0.8" />

                  {/* Edge-to-Edge Staircase Step-Line Waveform */}
                  <path
                    d="M 0 42 H 24 V 39 H 48 V 42 H 68 V 12 H 82 V 41 H 108 V 38 H 134 V 42 H 160"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2"
                  />

                  {/* Spike Ping Dot & Tag */}
                  <circle cx="75" cy="12" r="2.5" fill="#dc2626" stroke="#fff" strokeWidth="1" />
                  <text x="80" y="10" fill="#991b1b" fontSize="5" fontWeight="bold">SPIKE 85ms [Resolved]</text>

                  {/* Time Axis Labels along Baseline */}
                  {[
                    { t: '00:00', x: 2 },
                    { t: '06:00', x: 40 },
                    { t: '12:00', x: 80 },
                    { t: '18:00', x: 120 },
                    { t: '24:00', x: 156 },
                  ].map((tick, i) => (
                    <text key={i} x={tick.x} y="49" fontSize="4.5" fill="#b91c1c" fontWeight="bold" textAnchor={i === 4 ? 'end' : i === 0 ? 'start' : 'middle'}>{tick.t}</text>
                  ))}
                </svg>
              </div>

              {/* Live 24-Block Heartbeat Row */}
              <div className="flex items-center justify-between gap-0.5 pt-1 border-t border-red-100">
                {Array.from({ length: 24 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-xs ${idx === 10 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] text-red-900 font-semibold pt-1 border-t border-red-200/60">
              <span>99.88% Production SLA</span>
              <span className="font-bold text-emerald-700">All 4 Services Optimal</span>
            </div>
          </div>
        );

      // ── 19. Royal Amethyst: Cohort Retention Triangle Matrix ────────
      case 'royal-amethyst':
        return (
          <div className="w-full h-full p-2.5 bg-gradient-to-br from-purple-50/90 to-violet-50/70 border border-purple-200/80 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-purple-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-[8px] font-bold text-purple-950">COHORT RETENTION MATRIX</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold">M1: 84%</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">M1 Retention</span>
                <span className="text-[10px] font-black text-purple-950">84%</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">LTV / User</span>
                <span className="text-[10px] font-black text-purple-950">$680</span>
              </div>
              <div className="bg-white/90 rounded p-1 border border-purple-100 shadow-xs">
                <span className="text-[6px] text-purple-600 font-bold uppercase block">Health</span>
                <span className="text-[10px] font-black text-emerald-700">99 / 100</span>
              </div>
            </div>

            {/* Cohort Triangle Matrix */}
            <div className="flex-1 flex flex-col justify-center gap-1 py-1 font-mono text-[6px]">
              <div className="grid grid-cols-6 gap-1 text-purple-900 font-bold text-center">
                <span>COHORT</span><span>M0</span><span>M1</span><span>M2</span><span>M3</span><span>M4</span>
              </div>
              {[
                { cohort: 'Jan 24', cells: ['100%', '84%', '76%', '72%', '69%'] },
                { cohort: 'Feb 24', cells: ['100%', '86%', '78%', '75%', '-'] },
                { cohort: 'Mar 24', cells: ['100%', '88%', '81%', '-', '-'] },
                { cohort: 'Apr 24', cells: ['100%', '91%', '-', '-', '-'] },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-6 gap-1 items-center text-center">
                  <span className="text-left font-bold text-purple-950">{row.cohort}</span>
                  {row.cells.map((c, j) => (
                    <span
                      key={j}
                      className="py-0.5 rounded-xs"
                      style={{
                        backgroundColor: c === '-' ? 'transparent' : parseInt(c) > 80 ? '#c084fc' : '#e9d5ff',
                        color: c === '-' ? '#94a3b8' : '#3b0764',
                        fontWeight: c === '-' ? 'normal' : 'bold',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[7px] text-purple-900 font-semibold pt-1 border-t border-purple-200/60">
              <span>Net Dollar Retention: 118%</span>
              <span className="font-bold text-purple-950">Cohort Q3</span>
            </div>
          </div>
        );

      // ── 20. Titanium Steel: 2x2 Multi-Sparkline Fleet Grid ──────────
      case 'titanium-steel':
        return (
          <div className="w-full h-full p-2.5 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-inner text-white font-mono">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-[8px] font-bold text-slate-300">CLUSTER FLEET IOPS MONITOR</span>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 font-bold">4 Nodes</span>
            </div>

            <div className="grid grid-cols-3 gap-1 my-1">
              <div className="bg-slate-900 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">TOTAL IOPS</span>
                <span className="text-[10px] font-bold text-sky-400">173K</span>
              </div>
              <div className="bg-slate-900 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">AVG LOAD</span>
                <span className="text-[10px] font-bold text-slate-200">85%</span>
              </div>
              <div className="bg-slate-900 rounded p-1 border border-slate-800">
                <span className="text-[6px] text-slate-400 block">EFFICIENCY</span>
                <span className="text-[10px] font-bold text-emerald-400">96.4%</span>
              </div>
            </div>

            {/* 2x2 Node Sparkline Fleet Cards */}
            <div className="flex-1 grid grid-cols-2 gap-1.5 py-1">
              {[
                { name: 'Titan-A', iops: '48K', load: '88%', stroke: '#38bdf8', fill: '#0284c7', path: 'M 0 14 Q 15 2, 30 10 T 60 4' },
                { name: 'Titan-B', iops: '54K', load: '94%', stroke: '#38bdf8', fill: '#0284c7', path: 'M 0 12 Q 15 15, 30 6 T 60 2' },
                { name: 'Titan-C', iops: '32K', load: '76%', stroke: '#34d399', fill: '#059669', path: 'M 0 10 Q 15 14, 30 8 T 60 10' },
                { name: 'Titan-D', iops: '39K', load: '82%', stroke: '#a78bfa', fill: '#7c3aed', path: 'M 0 14 Q 15 6, 30 12 T 60 6' },
              ].map((n, i) => (
                <div key={i} className="bg-slate-900/95 border border-slate-800 rounded p-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[6px]">
                    <span className="flex items-center gap-1 font-bold text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {n.name}
                    </span>
                    <span className="text-[5.5px] px-1 rounded bg-slate-800 text-sky-300 font-bold">{n.load}</span>
                  </div>
                  <div className="my-0.5">
                    <svg className="w-full h-4 overflow-visible" viewBox="0 0 60 16">
                      <path d={`${n.path} L 60 16 L 0 16 Z`} fill={n.fill} fillOpacity="0.25" />
                      <path d={n.path} fill="none" stroke={n.stroke} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[6px] text-slate-400">
                    <span className="font-bold text-sky-300">{n.iops} IOPS</span>
                    <span className="text-[5.5px] text-emerald-400">ONLINE</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[7px] text-slate-400 pt-1 border-t border-slate-800">
              <span>173K TOTAL IOPS</span>
              <span className="text-sky-400 font-bold">96.4% CLUSTER EFF</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="templates" className="py-16 sm:py-20 bg-white border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#153e54] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-[#153e54]" /> Ready-to-Use Dashboard Templates
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Dashboard Themes &amp; Templates
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Drop in any CSV or Excel sheet and get a full dashboard layout instantly. Each theme combines executive KPI tiles, targeted charts, and live performance metrics tailored to your data.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#153e54] text-white shadow-md shadow-[#153e54]/20 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'All'
                ? `All Themes (${SAMPLE_DATASETS.length})`
                : `${cat} (${SAMPLE_DATASETS.filter((t) => t.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Template Cards Grid: Each card is a full miniature dashboard viewport */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group relative rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-400 hover:-translate-y-1.5 p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 overflow-hidden"
            >
              {/* Top: Miniature Dashboard Viewport (h-60 / 240px tall) */}
              <div className="w-full h-60 relative rounded-2xl overflow-hidden mb-3 bg-slate-50 border border-slate-200/60 shadow-xs">
                {renderVisualizationGraphic(template)}

                {/* Hover overlay with 'Apply Theme' button */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>Apply Theme</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#153e54]" />
                  </div>
                </div>
              </div>

              {/* Bottom: Template Name & Swatches */}
              <div className="shrink-0 flex items-start justify-between gap-2 pt-1 px-1">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900 truncate group-hover:text-[#153e54] transition-colors">
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
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {template.description}
                  </p>
                </div>
                <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                  {template.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Big circular toggle button with NO text */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              aria-label={showAll ? "Show less themes" : "Show more themes"}
              className="w-14 h-14 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
            >
              <ChevronDown className={`w-7 h-7 text-slate-700 group-hover:text-slate-900 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Vanity Links & White-label Banner */}
        <div id="vanity-urls" className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#153e54] via-[#1a4a66] to-[#0c2334] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg scroll-mt-24">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant White-Label Publishing
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Publish Any Theme to Your Own Vanity URL
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
