'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function PrivacySection() {
  return (
    <div id="privacy" className="py-6 sm:py-8 flex justify-center items-center scroll-mt-20">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold border border-emerald-200/90 shadow-xs hover:bg-emerald-100/70 transition-colors">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% In-Browser Privacy</span>
      </div>
    </div>
  );
}
