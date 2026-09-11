export interface SampleDataset {
  id: string;
  name: string;
  fileName: string;
  description: string;
  badge: string;
  icon: string;
  data: Record<string, any>[];
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    id: 'saas-metrics',
    name: 'SaaS Growth & Retention 2026',
    fileName: 'saas_growth_metrics_2026.csv',
    description: 'B2B subscription metrics including MRR, churn rate, expansion, and customer counts by tier.',
    badge: 'Popular',
    icon: 'trending-up',
    data: [
      { Month: '2026-01-01', Plan: 'Enterprise', MRR: 142500, New_MRR: 18200, Churn_Rate: 1.2, Expansion: 12400, Customers: 142, Region: 'North America', ARPU: 1003.5 },
      { Month: '2026-01-01', Plan: 'Pro', MRR: 89400, New_MRR: 14200, Churn_Rate: 2.1, Expansion: 6200, Customers: 894, Region: 'Europe', ARPU: 100.0 },
      { Month: '2026-01-01', Plan: 'Starter', MRR: 34100, New_MRR: 7800, Churn_Rate: 4.5, Expansion: 2100, Customers: 1364, Region: 'Asia-Pacific', ARPU: 25.0 },
      { Month: '2026-02-01', Plan: 'Enterprise', MRR: 156300, New_MRR: 21000, Churn_Rate: 0.9, Expansion: 14800, Customers: 154, Region: 'North America', ARPU: 1014.9 },
      { Month: '2026-02-01', Plan: 'Pro', MRR: 98200, New_MRR: 16500, Churn_Rate: 1.8, Expansion: 7800, Customers: 980, Region: 'Europe', ARPU: 100.2 },
      { Month: '2026-02-01', Plan: 'Starter', MRR: 37400, New_MRR: 8400, Churn_Rate: 4.1, Expansion: 2300, Customers: 1496, Region: 'Latin America', ARPU: 25.0 },
      { Month: '2026-03-01', Plan: 'Enterprise', MRR: 172800, New_MRR: 24500, Churn_Rate: 0.8, Expansion: 16900, Customers: 168, Region: 'North America', ARPU: 1028.5 },
      { Month: '2026-03-01', Plan: 'Pro', MRR: 108400, New_MRR: 18900, Churn_Rate: 1.6, Expansion: 8900, Customers: 1072, Region: 'Europe', ARPU: 101.1 },
      { Month: '2026-03-01', Plan: 'Starter', MRR: 41200, New_MRR: 9600, Churn_Rate: 3.8, Expansion: 2800, Customers: 1648, Region: 'Asia-Pacific', ARPU: 25.0 },
      { Month: '2026-04-01', Plan: 'Enterprise', MRR: 191400, New_MRR: 27800, Churn_Rate: 0.7, Expansion: 19200, Customers: 184, Region: 'North America', ARPU: 1040.2 },
      { Month: '2026-04-01', Plan: 'Pro', MRR: 119800, New_MRR: 21200, Churn_Rate: 1.5, Expansion: 9900, Customers: 1180, Region: 'Europe', ARPU: 101.5 },
      { Month: '2026-04-01', Plan: 'Starter', MRR: 45600, New_MRR: 10800, Churn_Rate: 3.5, Expansion: 3200, Customers: 1824, Region: 'Latin America', ARPU: 25.0 },
      { Month: '2026-05-01', Plan: 'Enterprise', MRR: 212000, New_MRR: 31000, Churn_Rate: 0.6, Expansion: 22000, Customers: 202, Region: 'North America', ARPU: 1049.5 },
      { Month: '2026-05-01', Plan: 'Pro', MRR: 132400, New_MRR: 23600, Churn_Rate: 1.4, Expansion: 11200, Customers: 1300, Region: 'Europe', ARPU: 101.8 },
      { Month: '2026-05-01', Plan: 'Starter', MRR: 50400, New_MRR: 12100, Churn_Rate: 3.2, Expansion: 3700, Customers: 2016, Region: 'Asia-Pacific', ARPU: 25.0 },
      { Month: '2026-06-01', Plan: 'Enterprise', MRR: 235500, New_MRR: 35200, Churn_Rate: 0.5, Expansion: 25100, Customers: 222, Region: 'North America', ARPU: 1060.8 },
      { Month: '2026-06-01', Plan: 'Pro', MRR: 146500, New_MRR: 26400, Churn_Rate: 1.2, Expansion: 12800, Customers: 1435, Region: 'Europe', ARPU: 102.0 },
      { Month: '2026-06-01', Plan: 'Starter', MRR: 55800, New_MRR: 13500, Churn_Rate: 3.0, Expansion: 4100, Customers: 2232, Region: 'Latin America', ARPU: 25.0 },
    ],
  },
  {
    id: 'ecommerce-sales',
    name: 'Global E-Commerce Sales',
    fileName: 'global_ecommerce_performance.xlsx',
    description: 'Cross-border multi-channel retail orders, revenue, product margins, and fulfillment channels.',
    badge: 'Retail',
    icon: 'shopping-cart',
    data: [
      { Date: '2026-01-15', Category: 'Electronics', Product: 'Pro Wireless ANC Headset', Channel: 'Shopify Direct', Revenue: 89400, Profit: 31200, Margin_Pct: 34.9, Units: 450, Country: 'United States' },
      { Date: '2026-01-18', Category: 'Smart Home', Product: 'Ultra HD Vision Cam 4K', Channel: 'Amazon FBA', Revenue: 62500, Profit: 19800, Margin_Pct: 31.6, Units: 625, Country: 'Germany' },
      { Date: '2026-01-22', Category: 'Accessories', Product: 'Braided MagFast Cable Pack', Channel: 'TikTok Shop', Revenue: 34200, Profit: 18400, Margin_Pct: 53.8, Units: 1420, Country: 'United Kingdom' },
      { Date: '2026-02-05', Category: 'Electronics', Product: 'Titanium Ergonomic Keyboard', Channel: 'Shopify Direct', Revenue: 112000, Profit: 44800, Margin_Pct: 40.0, Units: 560, Country: 'United States' },
      { Date: '2026-02-12', Category: 'Smart Home', Product: 'Ambient Smart Glow Bar', Channel: 'Amazon FBA', Revenue: 78900, Profit: 26400, Margin_Pct: 33.4, Units: 890, Country: 'Canada' },
      { Date: '2026-02-20', Category: 'Audio', Product: 'Studio Monitor Speakers MKII', Channel: 'Shopify Direct', Revenue: 145000, Profit: 58000, Margin_Pct: 40.0, Units: 290, Country: 'Germany' },
      { Date: '2026-03-02', Category: 'Electronics', Product: 'Pro Wireless ANC Headset', Channel: 'Amazon FBA', Revenue: 124000, Profit: 42100, Margin_Pct: 33.9, Units: 620, Country: 'United States' },
      { Date: '2026-03-15', Category: 'Accessories', Product: 'Leather Tech Organizer', Channel: 'TikTok Shop', Revenue: 51200, Profit: 28900, Margin_Pct: 56.4, Units: 1100, Country: 'France' },
      { Date: '2026-03-28', Category: 'Audio', Product: 'Pocket Hi-Fi DAC Amp', Channel: 'Shopify Direct', Revenue: 69800, Profit: 29800, Margin_Pct: 42.6, Units: 480, Country: 'Japan' },
      { Date: '2026-04-10', Category: 'Smart Home', Product: 'Matter Air Quality Sensor', Channel: 'Amazon FBA', Revenue: 95400, Profit: 35200, Margin_Pct: 36.8, Units: 950, Country: 'United States' },
      { Date: '2026-04-24', Category: 'Electronics', Product: 'Titanium Ergonomic Keyboard', Channel: 'TikTok Shop', Revenue: 87600, Profit: 36200, Margin_Pct: 41.3, Units: 438, Country: 'United Kingdom' },
      { Date: '2026-05-08', Category: 'Audio', Product: 'Studio Monitor Speakers MKII', Channel: 'Shopify Direct', Revenue: 178000, Profit: 72400, Margin_Pct: 40.6, Units: 356, Country: 'United States' },
    ],
  },
  {
    id: 'marketing-roi',
    name: 'Multi-Channel Marketing ROI',
    fileName: 'q3_marketing_performance.tsv',
    description: 'Ad campaign spends, click-through rates, customer acquisition costs, and return on ad spend.',
    badge: 'Marketing',
    icon: 'target',
    data: [
      { Campaign: 'Global Brand Awareness Q3', Platform: 'YouTube Video', Spend: 48500, Impressions: 3450000, Clicks: 52400, Conversions: 1420, CPA: 34.15, ROAS: 3.42, Status: 'Active' },
      { Campaign: 'Search High-Intent B2B', Platform: 'Google Ads', Spend: 62400, Impressions: 820000, Clicks: 94200, Conversions: 3840, CPA: 16.25, ROAS: 5.86, Status: 'Active' },
      { Campaign: 'Retargeting Cart Abandoners', Platform: 'Meta Ads', Spend: 28900, Impressions: 640000, Clicks: 41200, Conversions: 2180, CPA: 13.25, ROAS: 6.12, Status: 'Active' },
      { Campaign: 'Founder Thought Leadership', Platform: 'LinkedIn Ads', Spend: 38200, Impressions: 410000, Clicks: 19800, Conversions: 890, CPA: 42.92, ROAS: 2.85, Status: 'Optimizing' },
      { Campaign: 'Creator UGC Product Drop', Platform: 'TikTok Ads', Spend: 44100, Impressions: 4200000, Clicks: 118400, Conversions: 2940, CPA: 15.00, ROAS: 4.78, Status: 'Active' },
      { Campaign: 'Newsletter Sponsorships', Platform: 'Direct Partner', Spend: 19500, Impressions: 350000, Clicks: 24100, Conversions: 1120, CPA: 17.41, ROAS: 4.15, Status: 'Completed' },
      { Campaign: 'Podcast Host Reads', Platform: 'Audio Network', Spend: 32000, Impressions: 890000, Clicks: 18200, Conversions: 740, CPA: 43.24, ROAS: 2.65, Status: 'Completed' },
    ],
  },
  {
    id: 'executive-pl',
    name: 'Executive P&L & Cash Flow',
    fileName: 'executive_financial_statement.xlsx',
    description: 'Corporate executive statement tracking Revenue, Gross Margin, Operating Expenses, and Runway.',
    badge: 'Finance',
    icon: 'pie-chart',
    data: [
      { Quarter: '2025-Q1', Revenue: 1850000, COGS: 420000, Gross_Profit: 1430000, OpEx: 1180000, EBITDA: 250000, Net_Margin_Pct: 13.5, Cash_Balance: 4850000, Runway_Months: 24.5 },
      { Quarter: '2025-Q2', Revenue: 2240000, COGS: 510000, Gross_Profit: 1730000, OpEx: 1320000, EBITDA: 410000, Net_Margin_Pct: 18.3, Cash_Balance: 5120000, Runway_Months: 28.0 },
      { Quarter: '2025-Q3', Revenue: 2680000, COGS: 580000, Gross_Profit: 2100000, OpEx: 1490000, EBITDA: 610000, Net_Margin_Pct: 22.7, Cash_Balance: 5640000, Runway_Months: 32.2 },
      { Quarter: '2025-Q4', Revenue: 3210000, COGS: 670000, Gross_Profit: 2540000, OpEx: 1680000, EBITDA: 860000, Net_Margin_Pct: 26.7, Cash_Balance: 6380000, Runway_Months: 38.0 },
      { Quarter: '2026-Q1', Revenue: 3890000, COGS: 780000, Gross_Profit: 3110000, OpEx: 1940000, EBITDA: 1170000, Net_Margin_Pct: 30.0, Cash_Balance: 7420000, Runway_Months: 44.5 },
      { Quarter: '2026-Q2', Revenue: 4620000, COGS: 910000, Gross_Profit: 3710000, OpEx: 2210000, EBITDA: 1500000, Net_Margin_Pct: 32.4, Cash_Balance: 8750000, Runway_Months: 52.0 },
    ],
  },
];
