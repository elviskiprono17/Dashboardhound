'use client';

import React from 'react';
import { useSubscription, TIERS } from '../../lib/context/SubscriptionContext';
import { Check, Sparkles, Shield, ArrowRight, Zap, Globe, FileSpreadsheet, Lock } from 'lucide-react';
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

  const starterPrice = billingCycle === 'annually' ? TIERS.starter.priceAnnually : TIERS.starter.priceMonthly;
  const proPrice = billingCycle === 'annually' ? TIERS.pro.priceAnnually : TIERS.pro.priceMonthly;

  return (
    <section id="pricing" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            Transparent, Value-Driven Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            From Zero-Friction Exploration to Enterprise Scale
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Start free with zero friction. Upgrade whenever you need to save dashboards, share vanity links, or export standalone presentations.
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
                billingCycle === 'annually' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] uppercase tracking-wider bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Free Tier */}
          <div className="rounded-3xl p-7 bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between">
            <div>
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                The Growth Engine
              </div>
              <h3 className="text-xl font-extrabold text-white">Free</h3>
              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">
                Instant time-to-aha moment. See how gorgeous your data looks in seconds.
              </p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400"> / forever</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>5MB</strong> upload (Excel, CSV, TSV)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>All 5 Dashboard UI Layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Global filtering & custom charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>3 AI Dashboard Summaries total</span>
                </li>
                <li className="flex items-start gap-2 text-slate-500 line-through">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Save to library or share URL</span>
                </li>
                <li className="flex items-start gap-2 text-slate-500 line-through">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>HTML, PDF & PPTX exports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('free')}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all ${
                tier === 'free'
                  ? 'bg-slate-700 text-slate-300 cursor-default'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {tier === 'free' ? 'Current Plan' : 'Select Free'}
            </button>
          </div>

          {/* 2. Starter Plan */}
          <div className="rounded-3xl p-7 bg-slate-800/80 border border-sky-500/60 hover:border-sky-400 transition-all flex flex-col justify-between relative shadow-lg shadow-sky-950/40">
            <div>
              <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                Solo Operators & Freelancers
              </div>
              <h3 className="text-xl font-extrabold text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">
                Save dashboards to personal history & generate client-ready share links.
              </p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">${starterPrice}</span>
                <span className="text-xs text-slate-400"> / month</span>
                {billingCycle === 'annually' && (
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">$228 billed annually</div>
                )}
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>50MB</strong> file upload limit (10x Free)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Save to Personal Dashboard Library</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click Encrypted Share Links</strong> (<code className="text-[10px] bg-slate-900 px-1 py-0.5 rounded text-sky-300">abloh.dashboardhound.com/...</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>100 AI Tokens / month</strong> (Hound Insights summaries & Q&A)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Full CSV dataset export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('starter')}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all shadow-md ${
                tier === 'starter'
                  ? 'bg-sky-500 text-slate-950 font-extrabold cursor-default'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold'
              }`}
            >
              {tier === 'starter' ? 'Current Plan' : 'Upgrade to Starter'}
            </button>
          </div>

          {/* 3. Pro / Business Plan */}
          <div className="rounded-3xl p-7 bg-gradient-to-b from-slate-800 to-slate-850 border-2 border-amber-400 hover:border-amber-300 transition-all flex flex-col justify-between relative shadow-2xl shadow-amber-950/50">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> The Sweet Spot for Teams
            </div>

            <div>
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                Small Agencies & Departments
              </div>
              <h3 className="text-xl font-extrabold text-white">Pro / Business</h3>
              <p className="text-xs text-slate-300 mt-2 min-h-[36px]">
                Standalone offline HTML, PDF & PPTX exports, multi-user seats, and template preservation.
              </p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">${proPrice}</span>
                <span className="text-xs text-slate-400"> / month</span>
                {billingCycle === 'annually' && (
                  <div className="text-[11px] text-amber-300 font-semibold mt-1">$948 billed annually</div>
                )}
              </div>

              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>200MB</strong> file upload limit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Standalone HTML, PDF & PPTX</strong> exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Template Preservation</strong> (effortless weekly re-upload)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Multi-user seat access</strong> (up to 3 team members)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Unlimited Summaries + 500 Chatbot Queries / mo</strong></span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('pro')}
              className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all shadow-lg ${
                tier === 'pro'
                  ? 'bg-amber-400 text-slate-950 cursor-default'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
              }`}
            >
              {tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* 4. Enterprise Tier */}
          <div className="rounded-3xl p-7 bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between">
            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                Heavy Data Consumers & Agencies
              </div>
              <h3 className="text-xl font-extrabold text-white">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">
                White-labeling, custom agency branding, 1GB capacity, and API embedding.
              </p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">$249+</span>
                <span className="text-xs text-slate-400"> / month</span>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">Custom agency contracts</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1GB</strong> dedicated file upload cap</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>White-Labeling</strong> (remove Dashboardhound logos, use own domain & logo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>API access</strong> to embed dashboards in client portals</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Unlimited AI usage</strong> across all dashboards & chatbots</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated priority account manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('enterprise')}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all ${
                tier === 'enterprise'
                  ? 'bg-slate-700 text-slate-300 cursor-default'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tier === 'enterprise' ? 'Current Plan' : 'Contact Enterprise'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
