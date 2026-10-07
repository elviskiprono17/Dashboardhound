'use client';

import React from 'react';
import { useSubscription, TIERS } from '../../lib/context/SubscriptionContext';
import { Check, Sparkles, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier } from '../../lib/types/dashboard';

export function PricingSection() {
  const { tier, billingCycle, setBillingCycle, upgradeToTier } = useSubscription();

  const handleSelectPlan = (selectedTier: SubscriptionTier) => {
    if (selectedTier !== 'free') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}
    }
    upgradeToTier(selectedTier);
  };

  const soloPrice = billingCycle === 'annually' ? TIERS.solo.priceAnnually : TIERS.solo.priceMonthly;

  return (
    <section id="pricing" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Choose the Perfect Plan for Your Analytics
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Start free with zero friction. Upgrade to Solo anytime to save dashboards permanently, share custom branded links, or export standalone presentation-ready reports.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                billingCycle === 'annually' ? 'bg-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] uppercase tracking-wider bg-slate-950 text-emerald-300 px-2 py-0.5 rounded-full font-extrabold">
                Save 58%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid - Exactly 2 Plans: Free & Solo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* 1. Free Tier */}
          <div className="rounded-2xl p-6 bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between">
            <div>
              <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                Zero Friction Exploration
              </div>
              <h3 className="text-xl font-extrabold text-white">Free</h3>
              <p className="text-xs text-slate-400 mt-1.5 min-h-[32px]">
                Instant time-to-aha moment. See how gorgeous your data looks in seconds.
              </p>

              <div className="my-5">
                <span className="text-3xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400"> / forever</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>5MB</strong> upload limit (Excel, CSV, TSV, JSON)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>All 5 Dashboard UI Layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Global filtering &amp; custom charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>3 AI Dashboard Summaries total</span>
                </li>
                <li className="flex items-start gap-2 text-slate-500 line-through">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Save to library or share vanity link</span>
                </li>
                <li className="flex items-start gap-2 text-slate-500 line-through">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Standalone HTML, PDF &amp; PPTX exports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('free')}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                tier === 'free'
                  ? 'bg-slate-700 text-slate-300 cursor-default'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {tier === 'free' ? 'Current Plan' : 'Select Free'}
            </button>
          </div>

          {/* 2. Solo Plan ($12/mo or $5/mo billed annually) - Upgraded with 200MB & Business features */}
          <div className="rounded-2xl p-6 bg-gradient-to-b from-slate-800 via-slate-800 to-emerald-950/30 border-2 border-emerald-400 hover:border-emerald-300 transition-all flex flex-col justify-between relative shadow-xl shadow-emerald-950/60">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-slate-950" /> Most Popular • Full Power Solo
            </div>

            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 mt-0.5">
                Founders, Freelancers &amp; Solo Analysts
              </div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                Solo
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 min-h-[32px]">
                Full business-grade power: 200MB uploads, vanity links, and standalone presentation exports.
              </p>

              <div className="my-5">
                <span className="text-3xl font-black text-white">${soloPrice}</span>
                <span className="text-xs text-slate-400"> / month</span>
                <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                  {billingCycle === 'annually' ? '$60 billed annually (Save 58%)' : 'or $5/mo billed annually'}
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>200MB</strong> file upload limit (Excel, CSV, TSV, JSON)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Save Unlimited Dashboards</strong> to Library</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click Encrypted Vanity Links</strong> (<code className="text-[10px] bg-slate-900 px-1 py-0.5 rounded text-emerald-300">abloh.dashboardhound.com/...</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Standalone HTML, PDF &amp; PPTX</strong> Exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Template Preservation</strong> (recurring updates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Unlimited Summaries + 500 AI Queries / mo</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Custom Branded Share Links</strong> &amp; White-Label</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('solo')}
              className={`w-full py-3 rounded-xl text-xs font-black transition-all shadow-lg ${
                tier === 'solo'
                  ? 'bg-emerald-400 text-slate-950 cursor-default'
                  : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {tier === 'solo' ? 'Current Plan' : 'Upgrade to Solo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
