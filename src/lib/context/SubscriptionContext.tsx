'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier, SubscriptionConfig } from '../types/dashboard';

export const TIERS: Record<SubscriptionTier, SubscriptionConfig> = {
  free: {
    tier: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceAnnually: 0,
    fileLimitMB: 5,
    aiTokens: 3,
    canSave: false,
    canShare: false,
    canExport: false,
    exportFormats: [],
    whiteLabel: false,
    customDomain: false,
    teamSeats: 1,
  },
  solo: {
    tier: 'solo',
    name: 'Solo',
    priceMonthly: 12,
    priceAnnually: 5,
    fileLimitMB: 200,
    aiTokens: 500,
    canSave: true,
    canShare: true,
    canExport: true,
    exportFormats: ['HTML', 'PDF', 'PPTX', 'CSV'],
    whiteLabel: true,
    customDomain: true,
    teamSeats: 1,
  },
};

interface SubscriptionContextType {
  tier: SubscriptionTier;
  config: SubscriptionConfig;
  billingCycle: 'monthly' | 'annually';
  setBillingCycle: (cycle: 'monthly' | 'annually') => void;
  aiTokensRemaining: number;
  isPaywallOpen: boolean;
  paywallReason: string;
  recommendedTier: SubscriptionTier;
  openPaywall: (reason: string, recommended?: SubscriptionTier) => void;
  closePaywall: () => void;
  upgradeToTier: (newTier: SubscriptionTier) => void;
  consumeAIToken: () => boolean;
  canSave: boolean;
  canShare: boolean;
  canExport: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const [aiTokensRemaining, setAiTokensRemaining] = useState<number>(3);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [recommendedTier, setRecommendedTier] = useState<SubscriptionTier>('solo');

  useEffect(() => {
    // Load persisted state if exists
    try {
      const savedTier = localStorage.getItem('dh_tier') as string;
      if (savedTier === 'solo' || savedTier === 'starter' || savedTier === 'pro') {
        setTier('solo');
        setAiTokensRemaining(500);
      } else {
        setTier('free');
        const tokens = localStorage.getItem('dh_free_tokens');
        setAiTokensRemaining(tokens !== null ? parseInt(tokens, 10) : 3);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const openPaywall = (reason: string, recommended: SubscriptionTier = 'solo') => {
    setPaywallReason(reason);
    setRecommendedTier(recommended);
    setIsPaywallOpen(true);
  };

  const closePaywall = () => {
    setIsPaywallOpen(false);
  };

  const upgradeToTier = (newTier: SubscriptionTier) => {
    setTier(newTier);
    try {
      localStorage.setItem('dh_tier', newTier);
    } catch (e) {}

    if (newTier === 'solo') {
      setAiTokensRemaining(500);
    }
    setIsPaywallOpen(false);
  };

  const consumeAIToken = (): boolean => {
    if (tier === 'solo') return true;
    if (aiTokensRemaining <= 0) {
      openPaywall('You have reached your monthly AI query limit. Upgrade to continue generating automated insights.', 'solo');
      return false;
    }
    const updated = aiTokensRemaining - 1;
    setAiTokensRemaining(updated);
    try {
      if (tier === 'free') {
        localStorage.setItem('dh_free_tokens', String(updated));
      }
    } catch (e) {}
    return true;
  };

  const config = TIERS[tier];

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        config,
        billingCycle,
        setBillingCycle,
        aiTokensRemaining,
        isPaywallOpen,
        paywallReason,
        recommendedTier,
        openPaywall,
        closePaywall,
        upgradeToTier,
        consumeAIToken,
        canSave: config.canSave,
        canShare: config.canShare,
        canExport: config.canExport,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return ctx;
}
