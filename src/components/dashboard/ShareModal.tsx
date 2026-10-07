'use client';

import React, { useState } from 'react';
import { Globe, Copy, Check, Lock, ShieldCheck, QrCode, X, ExternalLink, Code } from 'lucide-react';
import { useSubscription } from '../../lib/context/SubscriptionContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  username?: string;
}

export function ShareModal({ isOpen, onClose, dashboardId, username = 'abloh' }: ShareModalProps) {
  const { canShare, openPaywall } = useSubscription();
  const [copied, setCopied] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'link' | 'embed'>('link');

  if (!isOpen) return null;

  const vanityUrl = `https://www.${username}.dashboardhound.com/${dashboardId}`;
  const directPathUrl = typeof window !== 'undefined' ? `${window.location.origin}/${username}/${dashboardId}` : vanityUrl;

  const handleCopy = () => {
    if (!canShare) {
      openPaywall('Generating shareable links is locked on the Free plan. Upgrade to Solo ($12/mo) to share with clients or colleagues.', 'solo');
      return;
    }
    navigator.clipboard.writeText(vanityUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d2638] to-[#153e54] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/20 text-sky-300 rounded-xl border border-sky-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Share Your Dashboard</h3>
              <p className="text-xs text-slate-300">Unique vanity URL with custom username</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {!canShare && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex items-start gap-3">
              <Lock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-sky-950">Free Tier Notice: </span>
                Dashboards exist strictly in your current browser session. Upgrade to <strong>Solo ($12/mo)</strong> to publish encrypted shareable links!
                <div className="mt-2">
                  <button
                    onClick={() => {
                      onClose();
                      openPaywall('Upgrade to Solo ($12/mo) to unlock one-click vanity share links.', 'solo');
                    }}
                    className="px-3 py-1.5 bg-[#153e54] text-white font-bold rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
                  >
                    Unlock Sharing Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vanity URL Preview */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Your Custom Branded Link:</span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
              </span>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 select-all truncate">
                {vanityUrl}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 bg-[#153e54] hover:bg-[#0d2638] text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Settings: Password protection */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">Password Protection</span>
              </div>
              <input
                type="checkbox"
                checked={passwordProtected}
                onChange={(e) => setPasswordProtected(e.target.checked)}
                className="w-4 h-4 accent-[#153e54] rounded"
              />
            </div>

            {passwordProtected && (
              <input
                type="password"
                placeholder="Set viewing passphrase..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#153e54]"
              />
            )}
          </div>

          {/* Action to open in new tab */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <a
              href={`/${username}/${dashboardId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#153e54] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Test Live Shared Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
