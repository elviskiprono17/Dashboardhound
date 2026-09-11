'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Sparkles, Key, Zap, ChevronDown, User } from 'lucide-react';
import { useSubscription } from '../../lib/context/SubscriptionContext';
import { ApiKeyModal } from './ApiKeyModal';

export function Navbar() {
  const { tier, config, openPaywall } = useSubscription();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-auto">
              <img
                src="/logo.png"
                alt="Dashboardhound Logo"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span className="sr-only">Dashboardhound</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-[#153e54] transition-colors">
              Features
            </a>
            <a href="#privacy" className="hover:text-[#153e54] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-Browser Privacy
            </a>
            <a href="#templates" className="hover:text-[#153e54] transition-colors">
              Presets & Templates
            </a>
            <a href="#pricing" className="hover:text-[#153e54] transition-colors">
              Pricing
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Gemini AI Key Walkthrough Trigger */}
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all text-xs font-medium"
              title="Configure Gemini Flash AI"
            >
              <Key className="w-3.5 h-3.5 text-sky-500" />
              <span>Gemini Flash AI</span>
            </button>

            {/* Current Tier Badge */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <span className={`w-2 h-2 rounded-full ${tier === 'free' ? 'bg-slate-400' : 'bg-emerald-500'}`} />
              <span className="capitalize">{tier}</span>
            </div>

            {/* Upgrade / Account CTA */}
            {tier === 'free' ? (
              <button
                onClick={() => openPaywall('Upgrade to remove limits, save to library, and generate encrypted share links.', 'starter')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                <span>Upgrade</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                <User className="w-3.5 h-3.5 text-[#153e54]" />
                <span className="font-semibold">abloh</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </>
  );
}
