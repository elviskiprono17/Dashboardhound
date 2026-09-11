'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getDashboardFromSupabase } from '@/lib/supabase/service';
import { DashboardItem, LayoutType, FilterState } from '@/lib/types/dashboard';
import { applyFilters } from '@/lib/engine/aggregations';
import { ExecutiveLayout } from '@/components/dashboard/layouts/ExecutiveLayout';
import { FinancialDarkLayout } from '@/components/dashboard/layouts/FinancialDarkLayout';
import { ExplorerLayout } from '@/components/dashboard/layouts/ExplorerLayout';
import { StorytellingLayout } from '@/components/dashboard/layouts/StorytellingLayout';
import { MarketingLayout } from '@/components/dashboard/layouts/MarketingLayout';
import { GlobalFilterBar } from '@/components/dashboard/GlobalFilterBar';
import { ShieldCheck, ArrowLeft, Download, Sparkles, User, LayoutDashboard, Moon, Table, BookOpen, PieChart, Loader2 } from 'lucide-react';
import { exportStandaloneHtml, exportToCsv } from '@/lib/engine/exporter';

interface SharedPageProps {
  params: Promise<{ username: string; id: string }>;
}

export default function SharedDashboardPage({ params }: SharedPageProps) {
  const resolvedParams = use(params);
  const { username, id } = resolvedParams;

  const [dashboard, setDashboard] = useState<DashboardItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<LayoutType>('executive');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: {},
    categoryFilters: {},
    numericFilters: {},
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getDashboardFromSupabase(id);
      if (data) {
        setDashboard(data);
        setLayout(data.layout || 'executive');
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
        <Loader2 className="w-10 h-10 animate-spin text-[#14364f] mb-3" />
        <p className="text-xs font-semibold">Decrypting in-browser shared dashboard...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-4 text-2xl">
          🔍
        </div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard Not Found or Expired</h1>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
          The link <code className="font-mono text-slate-700">/{username}/{id}</code> may be private or was created on a free browser session.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#14364f] text-white text-xs font-bold shadow-md hover:bg-slate-900 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Create Your Own Dashboard
        </Link>
      </div>
    );
  }

  const filteredData = applyFilters(dashboard.data, filters);

  const layouts: { id: LayoutType; label: string; icon: any }[] = [
    { id: 'executive', label: 'Executive', icon: LayoutDashboard },
    { id: 'financial', label: 'Financial', icon: Moon },
    { id: 'explorer', label: 'Explorer', icon: Table },
    { id: 'storytelling', label: 'Story', icon: BookOpen },
    { id: 'marketing', label: 'Marketing', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#14364f] text-white px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Published by <strong>@{dashboard.username || username}</strong></span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline text-slate-300">
              {dashboard.data.length} records • 100% In-Browser Privacy
            </span>
          </div>

          <Link
            href="/"
            className="text-[11px] font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-full hover:bg-amber-300 transition-colors flex items-center gap-1 shrink-0"
          >
            <Sparkles className="w-3 h-3" /> Create Yours Free
          </Link>
        </div>
      </div>

      {/* Shared Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <img src="/logo.png" alt="Dashboardhound" className="h-8 w-auto object-contain" />
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {dashboard.title}
              </h1>
              <div className="text-[11px] text-slate-500 font-mono">
                Source: {dashboard.fileName}
              </div>
            </div>
          </div>

          {/* Layout Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 overflow-x-auto no-scrollbar">
            {layouts.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive ? 'bg-white text-[#14364f] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#14364f]' : 'text-slate-500'}`} />
                  <span>{l.label}</span>
                </button>
              );
            })}
          </div>

          {/* Export Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCsv(filteredData, dashboard.fileName)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#14364f]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => exportStandaloneHtml(dashboard)}
              className="px-3.5 py-1.5 rounded-xl bg-[#14364f] hover:bg-slate-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Download HTML</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <GlobalFilterBar
          schema={dashboard.schema}
          filters={filters}
          onFilterChange={setFilters}
          filteredCount={filteredData.length}
          totalCount={dashboard.data.length}
        />

        <div id="shared-dashboard-container">
          {layout === 'executive' && <ExecutiveLayout schema={dashboard.schema} data={filteredData} />}
          {layout === 'financial' && <FinancialDarkLayout schema={dashboard.schema} data={filteredData} />}
          {layout === 'explorer' && <ExplorerLayout schema={dashboard.schema} data={filteredData} />}
          {layout === 'storytelling' && <StorytellingLayout schema={dashboard.schema} data={filteredData} />}
          {layout === 'marketing' && <MarketingLayout schema={dashboard.schema} data={filteredData} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Shared securely via Dashboardhound. Files processed 100% locally.</span>
          </div>
          <Link href="/" className="font-bold text-[#14364f] hover:underline">
            Powered by Dashboardhound.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
