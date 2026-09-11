import { FilterState, DatasetSchema } from '../types/dashboard';

export function applyFilters(data: Record<string, any>[], filters: FilterState): Record<string, any>[] {
  if (!data || data.length === 0) return [];

  return data.filter((row) => {
    // 1. Text Search across all fields
    if (filters.search && filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase().trim();
      const match = Object.values(row).some((val) =>
        String(val ?? '').toLowerCase().includes(searchLower)
      );
      if (!match) return false;
    }

    // 2. Category multiselect filters
    for (const [col, selectedValues] of Object.entries(filters.categoryFilters)) {
      if (selectedValues && selectedValues.length > 0) {
        const rowVal = String(row[col] ?? '').trim();
        if (!selectedValues.includes(rowVal)) {
          return false;
        }
      }
    }

    // 3. Numeric range filters
    for (const [col, range] of Object.entries(filters.numericFilters)) {
      if (range) {
        const [minVal, maxVal] = range;
        const val = Number(row[col]);
        if (!isNaN(val)) {
          if (val < minVal || val > maxVal) return false;
        }
      }
    }

    // 4. Date range filter
    if (filters.dateRange.column && (filters.dateRange.start || filters.dateRange.end)) {
      const rawDate = row[filters.dateRange.column];
      if (rawDate) {
        const timestamp = new Date(rawDate).getTime();
        if (!isNaN(timestamp)) {
          if (filters.dateRange.start) {
            const startTs = new Date(filters.dateRange.start).getTime();
            if (timestamp < startTs) return false;
          }
          if (filters.dateRange.end) {
            const endTs = new Date(filters.dateRange.end).getTime();
            if (timestamp > endTs) return false;
          }
        }
      }
    }

    return true;
  });
}

export function aggregateByDate(
  data: Record<string, any>[],
  dateCol: string,
  metricCol: string,
  aggregation: 'sum' | 'avg' | 'count' = 'sum'
): { date: string; value: number; count: number }[] {
  const map = new Map<string, { sum: number; count: number }>();

  for (const row of data) {
    const rawDate = row[dateCol];
    if (!rawDate) continue;
    
    // Normalize date to YYYY-MM or YYYY-MM-DD
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) continue;
    
    const dateKey = d.toISOString().split('T')[0];
    const rawVal = row[metricCol];
    const val = typeof rawVal === 'number' ? rawVal : parseFloat(String(rawVal).replace(/[\$,€,%]/g, '')) || 0;

    const current = map.get(dateKey) || { sum: 0, count: 0 };
    current.sum += val;
    current.count += 1;
    map.set(dateKey, current);
  }

  const sorted = Array.from(map.entries()).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  return sorted.map(([date, stat]) => ({
    date,
    value: aggregation === 'avg' ? Number((stat.sum / (stat.count || 1)).toFixed(2)) : Number(stat.sum.toFixed(2)),
    count: stat.count,
  }));
}

export function aggregateByCategory(
  data: Record<string, any>[],
  categoryCol: string,
  metricCol?: string,
  aggregation: 'sum' | 'avg' | 'count' = 'sum',
  topN: number = 8
): { name: string; value: number; percentage: number }[] {
  const map = new Map<string, { sum: number; count: number }>();
  let totalOverall = 0;

  for (const row of data) {
    const rawCat = row[categoryCol];
    const cat = rawCat !== null && rawCat !== undefined && String(rawCat).trim() !== '' ? String(rawCat).trim() : 'Other';

    const rawVal = metricCol ? row[metricCol] : 1;
    const val = typeof rawVal === 'number' ? rawVal : parseFloat(String(rawVal).replace(/[\$,€,%]/g, '')) || 0;

    const current = map.get(cat) || { sum: 0, count: 0 };
    current.sum += val;
    current.count += 1;
    totalOverall += val;
    map.set(cat, current);
  }

  const sorted = Array.from(map.entries()).sort((a, b) => {
    const valA = aggregation === 'count' ? a[1].count : a[1].sum;
    const valB = aggregation === 'count' ? b[1].count : b[1].sum;
    return valB - valA;
  });

  const topItems = sorted.slice(0, topN);
  const remaining = sorted.slice(topN);

  const result = topItems.map(([name, stat]) => {
    const val = aggregation === 'count' ? stat.count : (aggregation === 'avg' ? stat.sum / (stat.count || 1) : stat.sum);
    return {
      name,
      value: Number(val.toFixed(2)),
      percentage: totalOverall > 0 ? Number(((val / totalOverall) * 100).toFixed(1)) : 0,
    };
  });

  if (remaining.length > 0) {
    const otherSum = remaining.reduce((acc, curr) => acc + (aggregation === 'count' ? curr[1].count : curr[1].sum), 0);
    result.push({
      name: 'Other',
      value: Number(otherSum.toFixed(2)),
      percentage: totalOverall > 0 ? Number(((otherSum / totalOverall) * 100).toFixed(1)) : 0,
    });
  }

  return result;
}

export function formatMetricValue(value: number | undefined | null, type?: string): string {
  if (value === undefined || value === null || isNaN(value)) return '0';

  if (type === 'currency' || Math.abs(value) >= 1000) {
    if (Math.abs(value) >= 1_000_000_000) {
      return (type === 'currency' ? '$' : '') + (value / 1_000_000_000).toFixed(2) + 'B';
    }
    if (Math.abs(value) >= 1_000_000) {
      return (type === 'currency' ? '$' : '') + (value / 1_000_000).toFixed(2) + 'M';
    }
    if (Math.abs(value) >= 1_000) {
      return (type === 'currency' ? '$' : '') + (value / 1_000).toFixed(1) + 'k';
    }
  }

  if (type === 'percentage') {
    return value.toFixed(1) + '%';
  }

  return Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2);
}
