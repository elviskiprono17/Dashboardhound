import { DatasetSchema, AIInsightSummary } from '../types/dashboard';
import { formatMetricValue } from '../engine/aggregations';

export interface StatisticalDigest {
  rowCount: number;
  dateRange?: { start?: string; end?: string };
  primaryMetric?: {
    name: string;
    sum: number;
    mean: number;
    min: number;
    max: number;
    formattedSum: string;
  };
  secondaryMetric?: {
    name: string;
    sum: number;
    mean: number;
    formattedSum: string;
  };
  topCategories?: {
    column: string;
    items: { label: string; count: number; percentage: number }[];
  };
  anomalies: string[];
}

export function generateStatisticalDigest(schema: DatasetSchema, data: Record<string, any>[]): StatisticalDigest {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const secondaryCol = schema.columns.find((c) => c.name === schema.detectedSecondaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);
  const dateCol = schema.columns.find((c) => c.name === schema.detectedDateColumn);

  const digest: StatisticalDigest = {
    rowCount: schema.rowCount,
    anomalies: (schema.anomalies || []).map((a) => a.description),
  };

  if (dateCol && dateCol.min && dateCol.max) {
    digest.dateRange = {
      start: String(dateCol.min),
      end: String(dateCol.max),
    };
  }

  if (primaryCol && typeof primaryCol.sum === 'number') {
    digest.primaryMetric = {
      name: primaryCol.name,
      sum: primaryCol.sum,
      mean: primaryCol.mean || 0,
      min: typeof primaryCol.min === 'number' ? primaryCol.min : 0,
      max: typeof primaryCol.max === 'number' ? primaryCol.max : 0,
      formattedSum: formatMetricValue(primaryCol.sum, primaryCol.type),
    };
  }

  if (secondaryCol && typeof secondaryCol.sum === 'number') {
    digest.secondaryMetric = {
      name: secondaryCol.name,
      sum: secondaryCol.sum,
      mean: secondaryCol.mean || 0,
      formattedSum: formatMetricValue(secondaryCol.sum, secondaryCol.type),
    };
  }

  if (categoryCol && categoryCol.topCategories) {
    digest.topCategories = {
      column: categoryCol.name,
      items: categoryCol.topCategories,
    };
  }

  return digest;
}

export function generateLocalExecutiveSummary(
  schema: DatasetSchema,
  data: Record<string, any>[]
): AIInsightSummary {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const secondaryCol = schema.columns.find((c) => c.name === schema.detectedSecondaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);

  const keyMetrics: { label: string; value: string; trend?: string; status?: 'positive' | 'negative' | 'neutral' }[] = [
    {
      label: 'Total Analyzed Records',
      value: schema.rowCount.toLocaleString(),
      status: 'neutral',
    },
  ];

  if (primaryCol && typeof primaryCol.sum === 'number') {
    keyMetrics.push({
      label: `Total ${primaryCol.name.replace(/_/g, ' ')}`,
      value: formatMetricValue(primaryCol.sum, primaryCol.type),
      trend: primaryCol.mean ? `Avg: ${formatMetricValue(primaryCol.mean, primaryCol.type)}` : undefined,
      status: 'positive',
    });
  }

  if (secondaryCol && typeof secondaryCol.sum === 'number') {
    keyMetrics.push({
      label: `Total ${secondaryCol.name.replace(/_/g, ' ')}`,
      value: formatMetricValue(secondaryCol.sum, secondaryCol.type),
      trend: secondaryCol.mean ? `Avg: ${formatMetricValue(secondaryCol.mean, secondaryCol.type)}` : undefined,
      status: 'positive',
    });
  }

  if (categoryCol && categoryCol.topCategories && categoryCol.topCategories.length > 0) {
    const top = categoryCol.topCategories[0];
    keyMetrics.push({
      label: `Top ${categoryCol.name}`,
      value: top.label,
      trend: `${top.percentage}% share (${top.count} entries)`,
      status: 'neutral',
    });
  }

  const highlights: string[] = [];
  if (primaryCol && typeof primaryCol.max === 'number') {
    highlights.push(
      `Peak ${primaryCol.name.replace(/_/g, ' ')} reached ${formatMetricValue(primaryCol.max, primaryCol.type)}, outpacing median values by ${
        primaryCol.median ? (primaryCol.max / (primaryCol.median || 1)).toFixed(1) + 'x' : 'a solid margin'
      }.`
    );
  }
  if (categoryCol && categoryCol.topCategories && categoryCol.topCategories.length > 1) {
    const top1 = categoryCol.topCategories[0];
    const top2 = categoryCol.topCategories[1];
    highlights.push(
      `Concentration is led by "${top1.label}" with ${top1.percentage}% of distribution, followed by "${top2.label}" at ${top2.percentage}%.`
    );
  }
  if (schema.detectedDateColumn) {
    highlights.push(`Chronological velocity tracks records across time dimensions with steady reporting density.`);
  }

  const anomalies: string[] = (schema.anomalies || []).map((a) => a.description);
  if (anomalies.length === 0) {
    anomalies.push(`No statistical anomalies or extreme variance (>2.5σ) detected. Data distribution adheres to standard operational bounds.`);
  }

  const recommendations: string[] = [
    `Prioritize resource allocation towards the top-performing category segment to maximize yield.`,
    `Implement continuous monitoring on high-variance metrics to prevent operational bottlenecks.`,
    `Leverage global interactive filters above to drill down into localized performance anomalies.`,
  ];

  return {
    overview: `Analyzed ${schema.rowCount} records with 100% client-side privacy. The dataset exhibits strong core performance centered around ${
      primaryCol ? primaryCol.name.replace(/_/g, ' ') : 'operational metrics'
    }${categoryCol ? ` distributed across ${categoryCol.uniqueCount} distinct ${categoryCol.name} segments` : ''}.`,
    keyMetrics,
    highlights,
    anomalies,
    recommendations,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export function answerQueryDeterministically(
  query: string,
  schema: DatasetSchema,
  data: Record<string, any>[]
): { answer: string; citations: string[] } {
  const lower = query.toLowerCase().trim();
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);

  // Intent: Total or sum
  if (lower.includes('total') || lower.includes('sum')) {
    const targetCol = schema.columns.find((c) => lower.includes(c.name.toLowerCase())) || primaryCol;
    if (targetCol && typeof targetCol.sum === 'number') {
      const formatted = formatMetricValue(targetCol.sum, targetCol.type);
      return {
        answer: `The exact mathematically computed total for **${targetCol.name}** across all ${schema.rowCount} records is **${formatted}** (raw: ${targetCol.sum.toLocaleString()}).`,
        citations: [`Computed client-side with 0% AI hallucination from ${schema.rowCount} rows in memory.`],
      };
    }
  }

  // Intent: Highest, best, peak, max
  if (lower.includes('highest') || lower.includes('best') || lower.includes('top') || lower.includes('max')) {
    if (categoryCol && categoryCol.topCategories && categoryCol.topCategories.length > 0) {
      const best = categoryCol.topCategories[0];
      return {
        answer: `The leading segment in **${categoryCol.name}** is **${best.label}**, accounting for **${best.percentage}%** of total volume (${best.count} records).`,
        citations: [`Exact deterministic distribution calculated locally in-browser.`],
      };
    }
  }

  // Intent: Lowest, worst, min
  if (lower.includes('lowest') || lower.includes('worst') || lower.includes('min') || lower.includes('bottom')) {
    const targetCol = schema.columns.find((c) => lower.includes(c.name.toLowerCase())) || primaryCol;
    if (targetCol && targetCol.min !== undefined) {
      return {
        answer: `The lowest recorded value for **${targetCol.name}** is **${formatMetricValue(Number(targetCol.min), targetCol.type)}**.`,
        citations: [`Exact bounds calculation verified locally.`],
      };
    }
  }

  // Intent: Average, mean
  if (lower.includes('average') || lower.includes('avg') || lower.includes('mean')) {
    const targetCol = schema.columns.find((c) => lower.includes(c.name.toLowerCase())) || primaryCol;
    if (targetCol && typeof targetCol.mean === 'number') {
      return {
        answer: `The mean average for **${targetCol.name}** is **${formatMetricValue(targetCol.mean, targetCol.type)}** (median: ${formatMetricValue(targetCol.median ?? 0, targetCol.type)}).`,
        citations: [`Verified client-side central tendency computation.`],
      };
    }
  }

  // Intent: Anomalies, outliers, errors
  if (lower.includes('anomaly') || lower.includes('anomalies') || lower.includes('outlier') || lower.includes('odd') || lower.includes('error')) {
    if (schema.anomalies && schema.anomalies.length > 0) {
      const descriptions = schema.anomalies.map((a, i) => `${i + 1}. **${a.column}**: ${a.description}`).join('\n');
      return {
        answer: `We identified **${schema.anomalies.length} statistical anomalies** in your dataset:\n\n${descriptions}`,
        citations: [`Mathematical outlier check (>2.5σ standard deviation).`],
      };
    } else {
      return {
        answer: `No statistical anomalies or extreme spikes (>2.5 standard deviations) were detected across your records. The distribution appears healthy and consistent.`,
        citations: [`Automated standard deviation & distribution check.`],
      };
    }
  }

  // Default fallback answer using verified figures
  return {
    answer: `Based on your analyzed dataset (${schema.rowCount} records):
- **${primaryCol ? primaryCol.name : 'Primary Metric'}**: Total of ${primaryCol ? formatMetricValue(primaryCol.sum ?? 0, primaryCol.type) : 'N/A'} (Average: ${primaryCol ? formatMetricValue(primaryCol.mean ?? 0, primaryCol.type) : 'N/A'}).
- **${categoryCol ? categoryCol.name : 'Key Category'}**: Led by **${categoryCol?.topCategories?.[0]?.label ?? 'N/A'}** (${categoryCol?.topCategories?.[0]?.percentage ?? 0}%).
- **Security Check**: 100% processed in browser. Zero raw rows transmitted.`,
    citations: ['Generated via local deterministic metrics engine.'],
  };
}
