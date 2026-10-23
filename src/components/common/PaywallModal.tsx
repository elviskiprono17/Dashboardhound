'use client';

import React from 'react';
import { useSubscription, TIERS } from '../../lib/context/SubscriptionContext';
import { Check, Sparkles, X, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier } from '../../lib/types/dashboard';

export function PaywallModal() {
  const {
    isPaywallOpen,
    paywallReason,
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

  const soloConfig = TIERS.solo;
  const soloPrice = billingCycle === 'annually' ? soloConfig.priceAnnually : soloConfig.priceMonthly;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0d2638] via-[#153e54] to-[#1c4768] text-white px-6 py-6 sm:px-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase mb-2">
                <Lock className="w-3.5 h-3.5" /> Feature Paywall
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Upgrade to Solo
              </h2>
              <p className="text-sm text-slate-300 mt-1.5 max-w-md">
                {paywallReason || 'Unlock 200MB file uploads, personal dashboard library, vanity share links, and standalone HTML/PDF exports.'}
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
                Monthly ($12/mo)
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annually' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Annually ($5/mo - Save 58%)
              </button>
            </div>
            <span className="text-xs text-amber-300 font-medium">⚡ Instant activation</span>
          </div>
        </div>

        {/* Solo Upgrade Card */}
        <div className="p-6 sm:p-8">
          <div className="rounded-2xl p-6 border-2 border-amber-500 bg-amber-50/50 shadow-lg ring-2 ring-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Full Power Analytics
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-950 text-[10px] font-black uppercase">
                  Solo Plan
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Everything Unlocked for Solo Professionals
              </h3>

              <div className="my-4">
                <span className="text-3xl font-black text-slate-900">${soloPrice}</span>
                <span className="text-xs text-slate-500"> / month</span>
                <span className="text-xs text-amber-800 font-bold ml-2">
                  {billingCycle === 'annually' ? '($60 billed annually)' : '(Cancel anytime)'}
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>200MB</strong> file upload limit (40x Free limit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Save Unlimited Dashboards</strong> to your library</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>1-Click Encrypted Vanity Links</strong> (<code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">abloh.dashboardhound.com/...</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Standalone HTML, PDF &amp; PPTX</strong> presentation exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>500 AI Queries / month</strong> + unlimited executive summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Template Preservation</strong> for recurring dataset uploads</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('solo')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Unlock Solo Now for ${soloPrice}/mo</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={closePaywall}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Continue with Free session (dashboards won't be saved)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
