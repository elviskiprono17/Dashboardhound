'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DatasetSchema } from '../../../lib/types/dashboard';
import { aggregateByCategory, formatMetricValue } from '../../../lib/engine/aggregations';
import { DollarSign, Percent, BarChart3, Activity } from 'lucide-react';

interface LayoutProps {
  schema: DatasetSchema;
  data: Record<string, any>[];
}

export function FinancialDarkLayout({ schema, data }: LayoutProps) {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const secondaryCol = schema.columns.find((c) => c.name === schema.detectedSecondaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);

  const categoryData = categoryCol
    ? aggregateByCategory(data, categoryCol.name, primaryCol?.name, 'sum', 7)
    : [];

  return (
    <div className="bg-slate-950 text-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-sky-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-400 ml-2 font-mono uppercase tracking-wider">
            FINANCIAL_TERMINAL // {data.length} RECORDS PROCESSED
          </span>
        </div>
        <div className="text-xs text-emerald-400 font-mono">STATUS: 100% VERIFIED LOCAL</div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase">Gross Aggregation</div>
          <div className="text-2xl font-bold text-sky-400 mt-1">
            {primaryCol ? formatMetricValue(primaryCol.sum, primaryCol.type) : data.length.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-sans">
            Col: {primaryCol ? primaryCol.name : 'Count'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase">Arithmetic Mean</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {primaryCol ? formatMetricValue(primaryCol.mean, primaryCol.type) : '-'}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-sans">
            StdDev: ±{primaryCol?.stdDev ? formatMetricValue(primaryCol.stdDev, primaryCol.type) : '0'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase">Extrema Delta (Max - Min)</div>
          <div className="text-2xl font-bold text-sky-400 mt-1">
            {primaryCol && typeof primaryCol.max === 'number' && typeof primaryCol.min === 'number'
              ? formatMetricValue(primaryCol.max - primaryCol.min, primaryCol.type)
              : '-'}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-sans">
            Range: {primaryCol ? `${formatMetricValue(Number(primaryCol.min), primaryCol.type)} → ${formatMetricValue(Number(primaryCol.max), primaryCol.type)}` : '-'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase">Anomalous Outliers</div>
          <div className="text-2xl font-bold text-rose-400 mt-1">
            {schema.anomalies?.length || 0}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-sans">
            Statistical deviation threshold: 2.5σ
          </div>
        </div>
      </div>

      {/* Variance Bar Chart */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-300 font-bold uppercase tracking-wider">
            {categoryCol ? `Segment Distribution: ${categoryCol.name}` : 'Metric Variance Ledger'}
          </div>
          <div className="text-[10px] text-slate-500">SORTED DESCENDING BY VOLUME</div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={{ stroke: '#334155' }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tickFormatter={(val) => formatMetricValue(val, primaryCol?.type)}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
                formatter={(val: any) => [formatMetricValue(Number(val), primaryCol?.type), 'Amount']}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : '#38bdf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Precision Ledger Table */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 text-xs font-bold text-slate-400 flex items-center justify-between">
          <span>PRECISION_DATA_LEDGER</span>
          <span className="text-[10px] text-slate-500">SAMPLE 10 ENTRIES</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="px-4 py-2.5">#</th>
                {schema.columns.slice(0, 6).map((c) => (
                  <th key={c.name} className="px-4 py-2.5">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.slice(0, 8).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-2 text-slate-600 font-mono">{idx + 1}</td>
                  {schema.columns.slice(0, 6).map((c) => (
                    <td key={c.name} className="px-4 py-2 text-slate-200">
                      {String(row[c.name] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
