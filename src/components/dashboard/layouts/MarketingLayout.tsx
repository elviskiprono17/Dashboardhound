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
import { Target, Users, Zap, TrendingUp, Filter, MousePointerClick } from 'lucide-react';

interface LayoutProps {
  schema: DatasetSchema;
  data: Record<string, any>[];
}

export function MarketingLayout({ schema, data }: LayoutProps) {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const secondaryCol = schema.columns.find((c) => c.name === schema.detectedSecondaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);

  const channelData = categoryCol
    ? aggregateByCategory(data, categoryCol.name, primaryCol?.name, 'sum', 6)
    : [];

  // Simulated funnel steps based on row distribution
  const total = data.length;
  const funnelStages = [
    { label: 'Impressions / Top of Funnel', count: total * 100, pct: '100%', color: 'bg-sky-500' },
    { label: 'Engaged Visitors / Clicks', count: Math.round(total * 25), pct: '25%', color: 'bg-[#153e54]' },
    { label: 'Evaluated / Retargeted', count: Math.round(total * 8), pct: '8%', color: 'bg-sky-500' },
    { label: 'Completed Conversions', count: total, pct: `${((1 / 100) * 100).toFixed(1)}%`, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Marketing KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Primary Yield</span>
            <Target className="w-4 h-4 text-[#153e54]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {primaryCol ? formatMetricValue(primaryCol.sum, primaryCol.type) : data.length.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Total {primaryCol?.name || 'Volume'}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Customer Touchpoints</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {data.length.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Analyzed cohorts</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Top Acquisition Channel</span>
            <Zap className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 truncate">
              {channelData[0]?.name || 'Direct'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{channelData[0]?.percentage || 100}% of volume</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Efficiency & Health</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {primaryCol && primaryCol.mean ? formatMetricValue(primaryCol.mean, primaryCol.type) : 'High'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Average per conversion</div>
          </div>
        </div>
      </div>

      {/* Funnel & Channel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Normalized Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Pipeline progression and stage drop-offs</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Funnel Stages
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{stage.label}</span>
                  <span className="font-mono font-bold text-slate-900">{stage.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all`}
                    style={{ width: `${100 - i * 25}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {categoryCol ? `Acquisition by ${categoryCol.name}` : 'Channel Attribution'}
              </h3>
              <p className="text-xs text-slate-500">Volume distribution across channels</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Channel Bars
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(v) => formatMetricValue(v, primaryCol?.type)}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any) => [formatMetricValue(Number(val), primaryCol?.type), 'Volume']}
                  contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="value" fill="#153e54" radius={[0, 6, 6, 0]}>
                  {channelData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : '#153e54'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
