'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/home/Hero';
import { PricingSection } from '@/components/home/PricingSection';
import { PrivacySection } from '@/components/home/PrivacySection';
import { TemplatesSection } from '@/components/home/TemplatesSection';
import { DashboardSkeletonLoader } from '@/components/dashboard/DashboardSkeletonLoader';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { GlobalFilterBar } from '@/components/dashboard/GlobalFilterBar';
import { HoundInsightsPanel } from '@/components/dashboard/HoundInsightsPanel';
import { ShareModal } from '@/components/dashboard/ShareModal';
import { ExecutiveLayout } from '@/components/dashboard/layouts/ExecutiveLayout';
import { FinancialDarkLayout } from '@/components/dashboard/layouts/FinancialDarkLayout';
import { ExplorerLayout } from '@/components/dashboard/layouts/ExplorerLayout';
import { StorytellingLayout } from '@/components/dashboard/layouts/StorytellingLayout';
import { MarketingLayout } from '@/components/dashboard/layouts/MarketingLayout';
import { profileDataset } from '@/lib/engine/profiler';
import { applyFilters } from '@/lib/engine/aggregations';
import { exportStandaloneHtml, exportToPdf, exportToCsv } from '@/lib/engine/exporter';
import { saveDashboardToSupabase } from '@/lib/supabase/service';
import { useSubscription } from '@/lib/context/SubscriptionContext';
import { DatasetSchema, DashboardItem, LayoutType, FilterState, AIInsightSummary } from '@/lib/types/dashboard';
import { SampleDataset } from '@/lib/engine/sampleData';
import confetti from 'canvas-confetti';
import { ShieldCheck, Heart, ArrowUp, Layers, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { tier, openPaywall } = useSubscription();

  // Active dataset state
  const [data, setData] = useState<Record<string, any>[] | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [title, setTitle] = useState<string>('Executive Performance Dashboard');
  const [schema, setSchema] = useState<DatasetSchema | null>(null);
  const [layout, setLayout] = useState<LayoutType>('executive');
  const [insights, setInsights] = useState<AIInsightSummary | undefined>(undefined);

  // Loading & Skeleton state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStatusText, setLoadingStatusText] = useState<string>('Profiling dataset & rendering dashboard template...');

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: {},
    categoryFilters: {},
    numericFilters: {},
  });

  // Modal states
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [dashboardId, setDashboardId] = useState<string>('dsh_' + Math.random().toString(36).substring(2, 9));
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const handleDatasetLoaded = (
    loadedData: Record<string, any>[],
    loadedFileName: string,
    loadedFileSize: number,
    chosenLayout?: LayoutType
  ) => {
    setIsLoading(true);
    setLoadingStatusText(`Profiling ${loadedFileName} & generating deterministic charts...`);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
        });
      } catch (e) {}

      const profiled = profileDataset(loadedData);
      setData(loadedData);
      setFileName(loadedFileName);
      setFileSize(loadedFileSize);
      setSchema(profiled);
      if (chosenLayout) {
        setLayout(chosenLayout);
      }
      setTitle(
        loadedFileName
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()) + ' Dashboard'
      );
      setDashboardId('dsh_' + Math.random().toString(36).substring(2, 9));
      setFilters({
        search: '',
        dateRange: {},
        categoryFilters: {},
        numericFilters: {},
      });
      setInsights(undefined);
      setIsLoading(false);
    }, 700);
  };

  const handleSelectTemplate = (template: SampleDataset) => {
    setIsLoading(true);
    setLoadingStatusText(`Loading ${template.name} template & sample metrics...`);
    setLayout(template.layout);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch (e) {}

      const profiled = profileDataset(template.data);
      setData(template.data);
      setFileName(template.fileName);
      setFileSize(JSON.stringify(template.data).length);
      setSchema(profiled);
      setTitle(template.name + ' Dashboard');
      setDashboardId('dsh_' + Math.random().toString(36).substring(2, 9));
      setFilters({
        search: '',
        dateRange: {},
        categoryFilters: {},
        numericFilters: {},
      });
      setInsights(undefined);
      setIsLoading(false);
    }, 700);
  };

  const handleSaveDashboard = async () => {
    if (!data || !schema) return;

    const item: DashboardItem = {
      id: dashboardId,
      username: 'abloh',
      title,
      fileName,
      fileSize,
      layout,
      themeColor: 'hound',
      schema,
      data,
      insights,
      isPublic: true,
      isEncrypted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
    };

    const res = await saveDashboardToSupabase(item);
    if (res.success) {
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 3000);
    }
  };

  const handleExport = (format: 'html' | 'pdf' | 'pptx' | 'csv') => {
    if (!data || !schema) return;
    const currentFiltered = applyFilters(data, filters);

    if (format === 'html') {
      const item: DashboardItem = {
        id: dashboardId,
        username: 'abloh',
        title,
        fileName,
        fileSize,
        layout,
        themeColor: 'hound',
        schema,
        data: currentFiltered,
        isPublic: true,
        isEncrypted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewsCount: 1,
      };
      exportStandaloneHtml(item);
    } else if (format === 'pdf') {
      exportToPdf('dashboard-view-container', title);
    } else if (format === 'csv') {
      exportToCsv(currentFiltered, fileName);
    } else if (format === 'pptx') {
      // Mock PPTX download via offline HTML deck preview
      const item: DashboardItem = {
        id: dashboardId,
        username: 'abloh',
        title: `${title} (Presentation Deck)`,
        fileName,
        fileSize,
        layout,
        themeColor: 'hound',
        schema,
        data: currentFiltered,
        isPublic: true,
        isEncrypted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewsCount: 1,
      };
      exportStandaloneHtml(item);
    }
  };

  const handleNewUpload = () => {
    setData(null);
    setSchema(null);
    setIsLoading(false);
  };

  // If loading dataset or template, show the full Dashboard Skeleton Loader Screen!
  if (isLoading) {
    return <DashboardSkeletonLoader statusText={loadingStatusText} />;
  }

  // If a file or sample dataset is loaded, show the full Interactive Dashboard View!
  if (data && schema) {
    const filteredData = applyFilters(data, filters);

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Dashboard Top Header */}
        <DashboardHeader
          title={title}
          onTitleChange={setTitle}
          fileName={fileName}
          fileSize={fileSize}
          currentLayout={layout}
          onLayoutChange={setLayout}
          onOpenInsights={() => setIsInsightsOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          onSave={handleSaveDashboard}
          onExport={handleExport}
          onNewUpload={handleNewUpload}
        />

        {/* Save confirmation toast */}
        {isSavedSuccess && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Dashboard saved successfully to your library!</span>
          </div>
        )}

        {/* Free Plan Session Banner */}
        {tier === 'free' && (
          <div className="bg-sky-50 border-b border-sky-200/80 px-4 py-2 text-xs text-sky-950">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>
                  <strong>Free Browser Session:</strong> This dashboard is stored in browser memory and disappears if tab is closed.
                </span>
              </div>
              <button
                onClick={() => openPaywall('Upgrade to Solo ($12/mo) to save dashboards permanently, generate shareable links, and export reports.', 'solo')}
                className="font-bold underline hover:text-sky-950 text-left sm:text-right"
              >
                Upgrade to Save & Share →
              </button>
            </div>
          </div>
        )}

        {/* Main Dashboard Space */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Global Filter Bar */}
          <GlobalFilterBar
            schema={schema}
            filters={filters}
            onFilterChange={setFilters}
            filteredCount={filteredData.length}
            totalCount={data.length}
          />

          {/* Active Layout Container */}
          <div id="dashboard-view-container">
            {layout === 'executive' && <ExecutiveLayout schema={schema} data={filteredData} />}
            {layout === 'financial' && <FinancialDarkLayout schema={schema} data={filteredData} />}
            {layout === 'explorer' && <ExplorerLayout schema={schema} data={filteredData} />}
            {layout === 'storytelling' && <StorytellingLayout schema={schema} data={filteredData} />}
            {layout === 'marketing' && <MarketingLayout schema={schema} data={filteredData} />}
          </div>
        </main>

        {/* AI Hound Insights Drawer */}
        <HoundInsightsPanel
          isOpen={isInsightsOpen}
          onClose={() => setIsInsightsOpen(false)}
          schema={schema}
          data={data}
          insights={insights}
          onInsightsGenerated={setInsights}
        />

        {/* Vanity Link Share Modal */}
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          dashboardId={dashboardId}
          username="abloh"
        />
      </div>
    );
  }

  // Otherwise, render the Homepage (Navbar, Hero, Dropzone, Privacy, Templates, Pricing)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        <Hero
          onDatasetSelected={handleDatasetLoaded}
          onStartLoading={() => {
            setIsLoading(true);
            setLoadingStatusText('Reading and parsing file in browser RAM...');
          }}
        />

        {/* 100% In-Browser Privacy Section (Between Ticker and Templates) */}
        <PrivacySection />

        {/* Visualization Templates Section */}
        <TemplatesSection onSelectTemplate={handleSelectTemplate} />

        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2.5 py-1 rounded-lg shadow-xs flex items-center">
              <img src="/logo.png" alt="Dashboardhound" className="h-[20px] w-auto object-contain" />
            </div>
            <span className="text-slate-500 font-medium">
              © {new Date().getFullYear()} Dashboardhound.com. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Guarantee
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Layouts
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing Plans
            </a>
            <span className="text-emerald-400 font-mono font-semibold">100% Client-Side Safe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
