'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier, SubscriptionConfig } from '../types/dashboard';

export const TIERS: Record<SubscriptionTier, SubscriptionConfig> = {
  free: {
    tier: 'free',
    name: 'Free (Growth Engine)',
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
  starter: {
    tier: 'starter',
    name: 'Starter / Solo Operator',
    priceMonthly: 25,
    priceAnnually: 19,
    fileLimitMB: 50,
    aiTokens: 100,
    canSave: true,
    canShare: true,
    canExport: false,
    exportFormats: ['CSV'],
    whiteLabel: false,
    customDomain: false,
    teamSeats: 1,
  },
  pro: {
    tier: 'pro',
    name: 'Pro / Business',
    priceMonthly: 99,
    priceAnnually: 79,
    fileLimitMB: 200,
    aiTokens: 500,
    canSave: true,
    canShare: true,
    canExport: true,
    exportFormats: ['HTML', 'PDF', 'PPTX', 'CSV'],
    whiteLabel: false,
    customDomain: false,
    teamSeats: 3,
  },
  enterprise: {
    tier: 'enterprise',
    name: 'Enterprise / Agency',
    priceMonthly: 249,
    priceAnnually: 249,
    fileLimitMB: 1024,
    aiTokens: 'unlimited',
    canSave: true,
    canShare: true,
    canExport: true,
    exportFormats: ['HTML', 'PDF', 'PPTX', 'CSV', 'API'],
    whiteLabel: true,
    customDomain: true,
    teamSeats: 10,
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
  const [recommendedTier, setRecommendedTier] = useState<SubscriptionTier>('starter');

  useEffect(() => {
    // Load persisted state if exists
    try {
      const savedTier = localStorage.getItem('dh_tier') as SubscriptionTier;
      if (savedTier && TIERS[savedTier]) {
        setTier(savedTier);
        if (savedTier === 'free') {
          const tokens = localStorage.getItem('dh_free_tokens');
          setAiTokensRemaining(tokens !== null ? parseInt(tokens, 10) : 3);
        } else if (savedTier === 'starter') {
          setAiTokensRemaining(100);
        } else {
          setAiTokensRemaining(9999);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const openPaywall = (reason: string, recommended: SubscriptionTier = 'starter') => {
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

    if (newTier === 'starter') {
      setAiTokensRemaining(100);
    } else if (newTier === 'pro' || newTier === 'enterprise') {
      setAiTokensRemaining(9999);
    }
    setIsPaywallOpen(false);
  };

  const consumeAIToken = (): boolean => {
    if (tier === 'enterprise' || tier === 'pro') return true;
    if (aiTokensRemaining <= 0) {
      openPaywall('You have reached your monthly AI query limit. Upgrade to continue generating automated insights.', 'starter');
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
