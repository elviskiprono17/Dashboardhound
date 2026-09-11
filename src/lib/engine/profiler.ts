import { ColumnProfile, ColumnType, DatasetSchema, AnomalySummary } from '../types/dashboard';

export function profileDataset(data: Record<string, any>[]): DatasetSchema {
  if (!data || data.length === 0) {
    return { columns: [], rowCount: 0 };
  }

  const rowCount = data.length;
  const sampleRows = data.slice(0, Math.min(rowCount, 1000));
  
  // Gather all unique keys across rows
  const keysSet = new Set<string>();
  for (const row of sampleRows) {
    if (row && typeof row === 'object') {
      Object.keys(row).forEach((k) => keysSet.add(k));
    }
  }
  const keys = Array.from(keysSet);

  const columns: ColumnProfile[] = [];
  const anomalies: AnomalySummary[] = [];

  for (const key of keys) {
    let nullCount = 0;
    const values: any[] = [];
    const frequencyMap = new Map<string, number>();

    for (const row of data) {
      const val = row[key];
      if (val === null || val === undefined || val === '') {
        nullCount++;
      } else {
        values.push(val);
        const strVal = String(val).trim();
        frequencyMap.set(strVal, (frequencyMap.get(strVal) || 0) + 1);
      }
    }

    const nonNullCount = values.length;
    const uniqueCount = frequencyMap.size;
    const type = inferColumnType(key, values);

    let sum: number | undefined;
    let mean: number | undefined;
    let median: number | undefined;
    let stdDev: number | undefined;
    let min: number | string | undefined;
    let max: number | string | undefined;

    if (type === 'number' || type === 'currency' || type === 'percentage') {
      const numValues = values
        .map((v) => parseNumericValue(v))
        .filter((n): n is number => !isNaN(n));

      if (numValues.length > 0) {
        numValues.sort((a, b) => a - b);
        min = numValues[0];
        max = numValues[numValues.length - 1];
        sum = numValues.reduce((acc, curr) => acc + curr, 0);
        mean = sum / numValues.length;

        const mid = Math.floor(numValues.length / 2);
        median = numValues.length % 2 !== 0 ? numValues[mid] : (numValues[mid - 1] + numValues[mid]) / 2;

        const variance =
          numValues.reduce((acc, curr) => acc + Math.pow(curr - mean!, 2), 0) / numValues.length;
        stdDev = Math.sqrt(variance);

        // Anomaly Detection: Outliers (> 2.5 std deviations from mean)
        if (stdDev > 0 && numValues.length >= 10) {
          const upperThreshold = mean + 2.5 * stdDev;
          const lowerThreshold = mean - 2.5 * stdDev;
          const outliers = numValues.filter((v) => v > upperThreshold || v < lowerThreshold);
          if (outliers.length > 0) {
            anomalies.push({
              column: key,
              type: 'outlier',
              description: `${outliers.length} anomalous values detected beyond 2.5 standard deviations (Range: ${Math.round(min)}, Avg: ${Math.round(mean)}).`,
              severity: outliers.length > numValues.length * 0.05 ? 'high' : 'medium',
              affectedCount: outliers.length,
            });
          }
        }

        // Anomaly: Unexpected negative numbers in revenue/cost/volume
        const lowerKey = key.toLowerCase();
        if (
          (lowerKey.includes('revenue') || lowerKey.includes('sales') || lowerKey.includes('volume') || lowerKey.includes('count')) &&
          (min as number) < 0
        ) {
          const negatives = numValues.filter((v) => v < 0);
          anomalies.push({
            column: key,
            type: 'negative',
            description: `${negatives.length} negative values found in typically non-negative metric "${key}".`,
            severity: 'high',
            affectedCount: negatives.length,
          });
        }
      }
    } else if (type === 'date') {
      const dates = values
        .map((v) => new Date(v).getTime())
        .filter((t) => !isNaN(t))
        .sort((a, b) => a - b);
      if (dates.length > 0) {
        min = new Date(dates[0]).toISOString().split('T')[0];
        max = new Date(dates[dates.length - 1]).toISOString().split('T')[0];
      }
    }

    // Top categories / distribution
    let topCategories: { label: string; count: number; percentage: number }[] | undefined;
    if (uniqueCount > 1 && uniqueCount <= 50) {
      const sorted = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);
      topCategories = sorted.slice(0, 10).map(([label, count]) => ({
        label,
        count,
        percentage: Number(((count / (nonNullCount || 1)) * 100).toFixed(1)),
      }));
    }

    // Missing rate anomaly
    if (nullCount > 0 && nullCount / rowCount > 0.25) {
      anomalies.push({
        column: key,
        type: 'missing',
        description: `High missing data rate: ${Math.round((nullCount / rowCount) * 100)}% of rows in "${key}" are empty.`,
        severity: 'medium',
        affectedCount: nullCount,
      });
    }

    columns.push({
      name: key,
      type,
      count: nonNullCount,
      nullCount,
      uniqueCount,
      min,
      max,
      sum,
      mean,
      median,
      stdDev,
      sampleValues: values.slice(0, 5),
      topCategories,
    });
  }

  // Detect optimal dimensions & metrics
  const detectedDateColumn = columns.find((c) => c.type === 'date')?.name;
  
  const numericColumns = columns.filter((c) => c.type === 'number' || c.type === 'currency' || c.type === 'percentage');
  const detectedPrimaryMetric = findBestMetricColumn(numericColumns);
  const detectedSecondaryMetric = numericColumns.find((c) => c.name !== detectedPrimaryMetric)?.name;

  const categoricalColumns = columns.filter((c) => c.type === 'string' && c.uniqueCount > 1 && c.uniqueCount <= 25);
  const detectedCategoryColumn = categoricalColumns.length > 0 ? categoricalColumns[0].name : undefined;

  return {
    columns,
    rowCount,
    detectedDateColumn,
    detectedPrimaryMetric,
    detectedSecondaryMetric,
    detectedCategoryColumn,
    anomalies,
  };
}

function parseNumericValue(val: any): number {
  if (typeof val === 'number') return val;
  if (!val) return NaN;
  const str = String(val).replace(/[$,€,£,¥,%\s]/g, '').trim();
  return parseFloat(str);
}

function inferColumnType(key: string, values: any[]): ColumnType {
  const lowerKey = key.toLowerCase();
  
  if (lowerKey.includes('date') || lowerKey.includes('time') || lowerKey.includes('day') || lowerKey.includes('month') || lowerKey.includes('year')) {
    const isDate = values.slice(0, 20).every((v) => {
      if (!v) return true;
      const parsed = Date.parse(String(v));
      return !isNaN(parsed);
    });
    if (isDate) return 'date';
  }

  if (lowerKey.includes('price') || lowerKey.includes('cost') || lowerKey.includes('revenue') || lowerKey.includes('salary') || lowerKey.includes('amount') || lowerKey.includes('sales') || lowerKey.includes('profit')) {
    return 'currency';
  }

  if (lowerKey.includes('pct') || lowerKey.includes('percent') || lowerKey.includes('rate') || lowerKey.includes('margin') || lowerKey.includes('ratio')) {
    return 'percentage';
  }

  let numericCount = 0;
  let booleanCount = 0;
  let dateCount = 0;
  const sample = values.slice(0, 30);

  for (const v of sample) {
    if (typeof v === 'number') {
      numericCount++;
    } else if (typeof v === 'boolean' || ['true', 'false', 'yes', 'no'].includes(String(v).toLowerCase())) {
      booleanCount++;
    } else if (typeof v === 'string') {
      const clean = v.replace(/[$,€,£,%]/g, '').trim();
      if (clean !== '' && !isNaN(Number(clean))) {
        numericCount++;
      } else if (!isNaN(Date.parse(v)) && (v.includes('-') || v.includes('/'))) {
        dateCount++;
      }
    }
  }

  if (numericCount >= sample.length * 0.8) return 'number';
  if (dateCount >= sample.length * 0.8) return 'date';
  if (booleanCount >= sample.length * 0.8) return 'boolean';

  return 'string';
}

function findBestMetricColumn(numericCols: ColumnProfile[]): string | undefined {
  if (numericCols.length === 0) return undefined;
  
  const keywords = ['revenue', 'sales', 'profit', 'total', 'amount', 'mrr', 'arr', 'gmv', 'volume', 'count', 'score', 'users'];
  for (const kw of keywords) {
    const found = numericCols.find((c) => c.name.toLowerCase().includes(kw));
    if (found) return found.name;
  }

  return numericCols[0].name;
}
