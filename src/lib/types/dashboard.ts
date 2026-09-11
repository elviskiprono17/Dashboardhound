export type ColumnType = 'number' | 'string' | 'date' | 'boolean' | 'currency' | 'percentage';

export interface CategoryDistribution {
  label: string;
  count: number;
  percentage: number;
}

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  count: number;
  nullCount: number;
  uniqueCount: number;
  min?: number | string;
  max?: number | string;
  sum?: number;
  mean?: number;
  median?: number;
  stdDev?: number;
  sampleValues: (string | number | boolean)[];
  topCategories?: CategoryDistribution[];
}

export interface DatasetSchema {
  columns: ColumnProfile[];
  rowCount: number;
  detectedDateColumn?: string;
  detectedPrimaryMetric?: string;
  detectedCategoryColumn?: string;
  detectedSecondaryMetric?: string;
  anomalies?: AnomalySummary[];
}

export interface AnomalySummary {
  column: string;
  type: 'outlier' | 'negative' | 'spike' | 'missing';
  description: string;
  severity: 'low' | 'medium' | 'high';
  affectedCount: number;
}

export type LayoutType = 'executive' | 'financial' | 'explorer' | 'storytelling' | 'marketing';

export interface FilterState {
  search: string;
  dateRange: {
    column?: string;
    start?: string;
    end?: string;
  };
  categoryFilters: Record<string, string[]>;
  numericFilters: Record<string, [number, number]>;
}

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

export interface SubscriptionConfig {
  tier: SubscriptionTier;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  fileLimitMB: number;
  aiTokens: number | 'unlimited';
  canSave: boolean;
  canShare: boolean;
  canExport: boolean;
  exportFormats: string[];
  whiteLabel: boolean;
  customDomain: boolean;
  teamSeats: number;
}

export interface DashboardItem {
  id: string;
  userId?: string;
  username: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  layout: LayoutType;
  themeColor: string;
  schema: DatasetSchema;
  data: Record<string, any>[];
  filters?: FilterState;
  insights?: AIInsightSummary;
  isPublic: boolean;
  isEncrypted: boolean;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
}

export interface AIInsightSummary {
  overview: string;
  keyMetrics: { label: string; value: string; trend?: string; status?: 'positive' | 'negative' | 'neutral' }[];
  highlights: string[];
  anomalies: string[];
  recommendations: string[];
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  chartAction?: {
    type: 'filter' | 'highlight' | 'view';
    targetColumn?: string;
    value?: string;
  };
}
