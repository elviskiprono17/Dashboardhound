'use client';

import React from 'react';
import { useSubscription, TIERS } from '../../lib/context/SubscriptionContext';
import { Check, Sparkles, X, Shield, Zap, Lock, Globe, FileSpreadsheet, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier } from '../../lib/types/dashboard';

export function PaywallModal() {
  const {
    isPaywallOpen,
    paywallReason,
    recommendedTier,
    closePaywall,
    upgradeToTier,
    billingCycle,
    setBillingCycle,
  } = useSubscription();

  if (!isPaywallOpen) return null;

  const handleUpgrade = (tier: SubscriptionTier) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    upgradeToTier(tier);
  };

  const starterConfig = TIERS.starter;
  const proConfig = TIERS.pro;
  const enterpriseConfig = TIERS.enterprise;

  const starterPrice = billingCycle === 'annually' ? starterConfig.priceAnnually : starterConfig.priceMonthly;
  const proPrice = billingCycle === 'annually' ? proConfig.priceAnnually : proConfig.priceMonthly;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0d2638] via-[#153e54] to-[#1c4768] text-white px-6 py-6 sm:px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wide uppercase mb-2">
                <Lock className="w-3.5 h-3.5" /> Feature Paywall
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Unlock Full Dashboardhound Power
              </h2>
              <p className="text-sm text-slate-300 mt-1.5 max-w-xl">
                {paywallReason || 'Upgrade to save dashboards, generate vanity share links, export offline HTML/PDFs, and unlock high-volume AI insights.'}
              </p>
            </div>

            <button
              onClick={closePaywall}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Billing Cycle Switch */}
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex p-1 bg-slate-900/60 rounded-xl border border-white/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly Billed
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annually' ? 'bg-sky-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Annually (Save ~20%)
              </button>
            </div>
            <span className="text-xs text-sky-300 font-medium">⚡ Instant activation • Cancel anytime</span>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
          {/* Starter Plan */}
          <div
            className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
              recommendedTier === 'starter'
                ? 'border-sky-400 bg-sky-50/40 shadow-lg ring-2 ring-sky-400/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg">Starter / Solo</h3>
                {recommendedTier === 'starter' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-4">
                For solo operators & freelancers wanting saved dashboards and client share links.
              </p>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-slate-900">${starterPrice}</span>
                <span className="text-xs text-slate-500"> / month</span>
                {billingCycle === 'annually' && <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Billed annually ($228/yr)</div>}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>50MB</strong> file upload limit (10x Free)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Save to Personal Library</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>1-Click Encrypted Share Links</strong> (<code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">abloh.dashboardhound.com/...</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100 AI Tokens / mo</strong> (Hound Insights summaries & Q&A)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('starter')}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow"
            >
              Upgrade to Starter
            </button>
          </div>

          {/* Pro / Business Plan */}
          <div
            className={`rounded-2xl p-6 border relative transition-all flex flex-col justify-between ${
              recommendedTier === 'pro' || recommendedTier === 'starter'
                ? 'border-sky-400 bg-sky-50/20 shadow-xl ring-2 ring-sky-500/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-500" /> Pro / Business
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                For growing teams & agencies requiring offline presentations and high volume.
              </p>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-slate-900">${proPrice}</span>
                <span className="text-xs text-slate-500"> / month</span>
                {billingCycle === 'annually' && <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Billed annually ($948/yr)</div>}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>200MB</strong> file upload limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Standalone HTML, PDF & PPTX</strong> exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Template Preservation</strong> (effortless weekly re-upload)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>3 Team Member Seats</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-600 shrink-0" />
                  <span><strong>Unlimited Summaries + 500 Chat Queries</strong></span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('pro')}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#153e54] hover:bg-[#0f293d] text-white transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl p-6 border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg">Enterprise</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                White-labeling, custom domains, and dedicated priority capacity for agencies.
              </p>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-slate-900">$249+</span>
                <span className="text-xs text-slate-500"> / month</span>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Custom agency setup</div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>1GB</strong> file upload limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100% White-Label</strong> (Remove Dashboardhound logos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Custom Domains</strong> on share links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Full API Access & Embeds</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100% Unlimited AI</strong> on all chatbots</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('enterprise')}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
            >
              Get Enterprise
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% In-Browser Privacy Guarantee • 14-Day Money-Back Guarantee</span>
          </div>
          <div>Need an invoice or PO? Contact sales@dashboardhound.com</div>
        </div>
      </div>
    </div>
  );
}
