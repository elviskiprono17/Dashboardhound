'use client';

import React from 'react';
import { Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface DashboardSkeletonLoaderProps {
  statusText?: string;
}

export function DashboardSkeletonLoader({
  statusText = 'Profiling dataset & rendering dashboard template...',
}: DashboardSkeletonLoaderProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden select-none">
      {/* Top Navbar Skeleton */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo skeleton */}
            <div className="h-7 w-32 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            {/* Title & file pill skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-44 sm:w-60 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-5 w-20 bg-slate-100 rounded-full animate-pulse hidden sm:block" />
            </div>
          </div>

          {/* Layout buttons skeleton */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <div className="h-7 w-24 bg-white rounded-lg shadow-xs animate-pulse" />
            <div className="h-7 w-24 bg-slate-200/60 rounded-lg animate-pulse" />
            <div className="h-7 w-24 bg-slate-200/60 rounded-lg animate-pulse" />
            <div className="h-7 w-24 bg-slate-200/60 rounded-lg animate-pulse" />
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-8 w-20 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-8 w-24 bg-[#153e54]/20 rounded-xl animate-pulse" />
          </div>
        </div>
      </header>

      {/* Floating Status Notification Badge */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/60 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-sky-400 animate-spin shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>{statusText}</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-400 inline" />
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>100% In-Browser Memory • Zero Server Uploads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Skeleton Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Global Filter Bar Skeleton */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-9 w-64 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-9 w-32 bg-slate-100 rounded-xl animate-pulse hidden md:block" />
            <div className="h-9 w-36 bg-slate-100 rounded-xl animate-pulse hidden lg:block" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-28 bg-slate-100 rounded-full animate-pulse" />
          </div>
        </div>

        {/* 4 Shimmering KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
              </div>
              <div className="h-8 w-36 bg-slate-200 rounded-lg animate-pulse" />
              <div className="flex items-center gap-2 pt-1">
                <div className="h-4 w-14 bg-emerald-100 rounded-full animate-pulse" />
                <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
              </div>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          ))}
        </div>

        {/* Shimmering Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area / Bar Chart Skeleton (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-56 bg-slate-100 rounded mt-1.5 animate-pulse" />
              </div>
              <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse" />
            </div>
            {/* Chart Area Bars */}
            <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-100">
              {[45, 68, 52, 85, 60, 92, 74, 88, 64, 79, 95, 70].map((h, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-sky-100 rounded-t-md animate-pulse"
                    style={{ height: `${h}%` }}
                  />
                  <div className="h-2.5 w-6 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Breakdown / Donut Chart Skeleton (1 col) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-44 bg-slate-100 rounded mt-1.5 animate-pulse" />
            </div>

            {/* Circular Ring Mockup */}
            <div className="py-6 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-8 border-sky-100 border-t-sky-400 border-r-teal-300 animate-spin flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
                  <div className="h-3 w-10 bg-slate-200 rounded" />
                </div>
              </div>
            </div>

            {/* Legend placeholders */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-3 w-8 bg-slate-200 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </div>
                <div className="h-3 w-8 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Shimmering Data Table Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
            <div className="h-7 w-20 bg-slate-100 rounded-lg animate-pulse" />
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse" />
                <div className="h-3.5 w-24 bg-slate-100 rounded animate-pulse" />
                <div className="h-3.5 w-20 bg-slate-100 rounded animate-pulse hidden sm:block" />
                <div className="h-3.5 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
