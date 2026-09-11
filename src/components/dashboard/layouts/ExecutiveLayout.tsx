'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { DatasetSchema } from '../../../lib/types/dashboard';
import {
  aggregateByDate,
  aggregateByCategory,
  formatMetricValue,
} from '../../../lib/engine/aggregations';
import { TrendingUp, Award, AlertCircle, Layers, ArrowUpRight } from 'lucide-react';

interface LayoutProps {
  schema: DatasetSchema;
  data: Record<string, any>[];
}

const COLORS = ['#14364f', '#f59e0b', '#0284c7', '#10b981', '#8b5cf6', '#f43f5e', '#64748b'];

export function ExecutiveLayout({ schema, data }: LayoutProps) {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const secondaryCol = schema.columns.find((c) => c.name === schema.detectedSecondaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);
  const dateCol = schema.columns.find((c) => c.name === schema.detectedDateColumn);

  // Time-series trend
  const timeSeriesData =
    dateCol && primaryCol
      ? aggregateByDate(data, dateCol.name, primaryCol.name)
      : [];

  // Category distribution
  const categoryData = categoryCol
    ? aggregateByCategory(data, categoryCol.name, primaryCol?.name)
    : [];

  // Top performers
  const topPerformers = categoryData.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total {primaryCol ? primaryCol.name.replace(/_/g, ' ') : 'Volume'}
            </span>
            <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {primaryCol ? formatMetricValue(primaryCol.sum, primaryCol.type) : data.length.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> Exact
              </span>
              <span>deterministic sum across {data.length} records</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Mean Average
            </span>
            <div className="p-1.5 bg-sky-50 rounded-lg text-sky-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {primaryCol ? formatMetricValue(primaryCol.mean, primaryCol.type) : '-'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Median: {primaryCol ? formatMetricValue(primaryCol.median, primaryCol.type) : '-'}
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Top Performer
            </span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 truncate">
              {categoryData.length > 0 ? categoryData[0].name : 'N/A'}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              {categoryData.length > 0 ? `${categoryData[0].percentage}% of total share` : 'Homogeneous distribution'}
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Integrity & Health
            </span>
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {schema.anomalies && schema.anomalies.length > 0 ? `${schema.anomalies.length} Flags` : '100%'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              {schema.anomalies && schema.anomalies.length > 0
                ? schema.anomalies[0].description
                : 'Zero statistical anomalies detected'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {dateCol ? `Velocity & Trend Across ${dateCol.name}` : `Performance Trajectory`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Metric: {primaryCol ? primaryCol.name : 'Count'}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Time Series Area
            </span>
          </div>

          <div className="h-72 w-full">
            {timeSeriesData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14364f" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#14364f" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => formatMetricValue(val, primaryCol?.type)}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(val: any) => [formatMetricValue(Number(val), primaryCol?.type), primaryCol?.name || 'Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#14364f"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMetric)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                No chronological date dimension found in this dataset. Showing categorical breakdown below.
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                {categoryCol ? `${categoryCol.name} Share` : 'Category Breakdown'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Donut Distribution
              </span>
            </div>

            <div className="h-48 w-full flex items-center justify-center">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                      formatter={(val: any) => [formatMetricValue(Number(val), primaryCol?.type), 'Share']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-400">No categorical segments found</div>
              )}
            </div>
          </div>

          {/* Legend list */}
          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
            {categoryData.slice(0, 4).map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate max-w-[140px]">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-slate-700 truncate font-medium">{item.name}</span>
                </div>
                <div className="font-mono text-slate-900 font-semibold">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Leading Volume Contributors</h3>
            <p className="text-xs text-slate-500">Highest contribution by {categoryCol ? categoryCol.name : 'segment'}</p>
          </div>
        </div>

        <div className="space-y-3">
          {topPerformers.map((item, i) => (
            <div key={item.name} className="flex items-center gap-4 text-xs">
              <span className="font-mono text-slate-400 font-bold w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatMetricValue(item.value, primaryCol?.type)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14364f] rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
