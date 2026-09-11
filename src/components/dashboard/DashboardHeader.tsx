'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Moon,
  Table,
  BookOpen,
  PieChart,
  Sparkles,
  Share2,
  Bookmark,
  Download,
  UploadCloud,
  ChevronDown,
  Check,
  Lock,
  FileCode,
  FileText,
  Presentation,
} from 'lucide-react';
import { LayoutType } from '../../lib/types/dashboard';
import { useSubscription } from '../../lib/context/SubscriptionContext';

interface DashboardHeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  fileName: string;
  fileSize: number;
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  onOpenInsights: () => void;
  onOpenShare: () => void;
  onSave: () => void;
  onExport: (format: 'html' | 'pdf' | 'pptx' | 'csv') => void;
  onNewUpload: () => void;
}

export function DashboardHeader({
  title,
  onTitleChange,
  fileName,
  fileSize,
  currentLayout,
  onLayoutChange,
  onOpenInsights,
  onOpenShare,
  onSave,
  onExport,
  onNewUpload,
}: DashboardHeaderProps) {
  const { canSave, canShare, canExport, openPaywall } = useSubscription();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const layouts: { id: LayoutType; label: string; icon: any }[] = [
    { id: 'executive', label: 'Executive KPI', icon: LayoutDashboard },
    { id: 'financial', label: 'Financial Dark', icon: Moon },
    { id: 'explorer', label: 'Data Explorer', icon: Table },
    { id: 'storytelling', label: 'Infographic Story', icon: BookOpen },
    { id: 'marketing', label: 'Funnel & Channels', icon: PieChart },
  ];

  const handleSaveClick = () => {
    if (!canSave) {
      openPaywall('Saving dashboards to your personal library is available on Starter ($19/mo) and Pro plans.', 'starter');
      return;
    }
    onSave();
  };

  const handleShareClick = () => {
    if (!canShare) {
      openPaywall('Generating encrypted, shareable vanity links requires a Starter ($19/mo) or Pro plan.', 'starter');
      return;
    }
    onOpenShare();
  };

  const handleExportClick = (format: 'html' | 'pdf' | 'pptx' | 'csv') => {
    setIsExportOpen(false);
    if (format !== 'csv' && !canExport) {
      openPaywall(`Exporting to Standalone Interactive HTML, PDF, and PowerPoint is unlocked on the Pro plan ($79/mo).`, 'pro');
      return;
    }
    onExport(format);
  };

  const sizeFormatted = (fileSize / 1024).toFixed(1) + ' KB';

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Brand + File details & Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0">
            <img src="/logo.png" alt="Dashboardhound" className="h-8 w-auto object-contain" />
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div>
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                className="text-base font-bold text-slate-900 border-b-2 border-[#14364f] focus:outline-none bg-transparent"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="group flex items-center gap-2 cursor-pointer"
                title="Click to rename"
              >
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-[#14364f]">
                  {title}
                </h1>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-600 font-mono">✎</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
              <span className="font-mono text-slate-600 truncate max-w-[180px]">{fileName}</span>
              <span>•</span>
              <span>{sizeFormatted}</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">100% In-Browser</span>
            </div>
          </div>
        </div>

        {/* Center: Layout Picker Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 overflow-x-auto no-scrollbar">
          {layouts.map((l) => {
            const Icon = l.icon;
            const isActive = currentLayout === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onLayoutChange(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#14364f] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#14364f]' : 'text-slate-500'}`} />
                <span>{l.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* AI Hound Insights Trigger */}
          <button
            onClick={onOpenInsights}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#14364f] to-[#1e4e70] hover:from-[#0d2638] hover:to-[#14364f] text-white font-bold text-xs shadow-sm hover:shadow transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Hound Insights</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
          >
            {!canShare ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Share2 className="w-3.5 h-3.5 text-[#14364f]" />}
            <span>Share</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
          >
            {!canSave ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Bookmark className="w-3.5 h-3.5 text-[#14364f]" />}
            <span>Save</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#14364f]" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-40 text-xs animate-in fade-in">
                <button
                  onClick={() => handleExportClick('html')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-600" />
                    <span>Standalone Interactive HTML</span>
                  </div>
                  {!canExport && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => handleExportClick('pdf')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <span>Executive PDF Report</span>
                  </div>
                  {!canExport && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => handleExportClick('pptx')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-rose-600" />
                    <span>PowerPoint (PPTX) Deck</span>
                  </div>
                  {!canExport && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => handleExportClick('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <Table className="w-4 h-4 text-emerald-600" />
                  <span>Filtered CSV Dataset</span>
                </button>
              </div>
            )}
          </div>

          {/* New Upload */}
          <button
            onClick={onNewUpload}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            title="Upload another file"
          >
            <UploadCloud className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
