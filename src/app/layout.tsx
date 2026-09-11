import type { Metadata } from 'next';
import './globals.css';
import { SubscriptionProvider } from '@/lib/context/SubscriptionContext';
import { PaywallModal } from '@/components/common/PaywallModal';
import { HoundBot } from '@/components/chatbot/HoundBot';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Dashboardhound — Turn Any File Into an Interactive Dashboard (100% In-Browser Privacy)',
  description:
    'Transform Excel, CSV, TSV, and JSON files into beautiful interactive dashboards in seconds. 100% in-browser processing, zero server uploads, deterministic statistics, and zero-hallucination Gemini Flash AI.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Dashboardhound — 100% In-Browser Privacy File to Dashboard',
    description: 'Zero server uploads. Turn Excel, CSV, TSV into interactive dashboards with vanity share links.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
        <SubscriptionProvider>
          {children}
          <PaywallModal />
          <HoundBot />
        </SubscriptionProvider>
      </body>
    </html>
  );
}
