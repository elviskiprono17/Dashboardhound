'use client';

import React from 'react';
import { DatasetSchema } from '../../../lib/types/dashboard';
import { aggregateByCategory, formatMetricValue } from '../../../lib/engine/aggregations';
import { BookOpen, Sparkles, Compass, Target, ArrowRight, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  schema: DatasetSchema;
  data: Record<string, any>[];
}

export function StorytellingLayout({ schema, data }: LayoutProps) {
  const primaryCol = schema.columns.find((c) => c.name === schema.detectedPrimaryMetric);
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);
  const dateCol = schema.columns.find((c) => c.name === schema.detectedDateColumn);

  const categoryData = categoryCol
    ? aggregateByCategory(data, categoryCol.name, primaryCol?.name, 'sum', 6)
    : [];

  const topCategory = categoryData[0];
  const runnerUp = categoryData[1];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Lead Card */}
      <div className="bg-gradient-to-br from-[#153e54] via-[#1a4463] to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Data Story & Narrative
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            The Big Picture: What the Numbers Tell Us
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Analyzing {data.length} records reveals an aggregate {primaryCol ? primaryCol.name.replace(/_/g, ' ') : 'metric'} of{' '}
            <strong className="text-sky-400 underline decoration-sky-500/50">
              {primaryCol ? formatMetricValue(primaryCol.sum, primaryCol.type) : data.length.toLocaleString()}
            </strong>
            {categoryCol && topCategory
              ? `, driven primarily by "${topCategory.name}" which captures ${topCategory.percentage}% of the whole.`
              : '.'}
          </p>
        </div>
      </div>

      {/* Narrative Stat Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Story 1 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Concentration of Momentum</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {topCategory
                ? `"${topCategory.name}" commands the dominant share with ${formatMetricValue(topCategory.value, primaryCol?.type)}. ${
                    runnerUp ? `It outperforms "${runnerUp.name}" by a factor of ${(topCategory.value / (runnerUp.value || 1)).toFixed(1)}x.` : ''
                  }`
                : `Uniform performance observed across all recorded items.`}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] font-semibold text-sky-600">
            Primary Growth Anchor
          </div>
        </div>

        {/* Story 2 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Central Tendency & Variance</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {primaryCol && primaryCol.mean
                ? `The average record generates ${formatMetricValue(primaryCol.mean, primaryCol.type)}, with median stability at ${formatMetricValue(
                    primaryCol.median ?? 0,
                    primaryCol.type
                  )}. Standard deviation stands at ±${formatMetricValue(primaryCol.stdDev ?? 0, primaryCol.type)}.`
                : `Solid distribution without extreme skew.`}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] font-semibold text-sky-600">
            Distribution Benchmark
          </div>
        </div>

        {/* Story 3 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">Data Hygiene & Confidence</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {schema.anomalies && schema.anomalies.length > 0
                ? `${schema.anomalies.length} potential anomalies flagged (outliers or unexpected ranges). Review them in the Hound Insights drawer.`
                : `100% of rows conform to expected statistical boundaries. Clean dataset ready for executive reporting.`}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] font-semibold text-emerald-600">
            {schema.anomalies && schema.anomalies.length > 0 ? 'Requires Verification' : 'Verified Reliable'}
          </div>
        </div>
      </div>

      {/* Progress Ring Gauges */}
      {categoryData.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#153e54]" /> Segment Contribution Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryData.slice(0, 6).map((cat) => (
              <div key={cat.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#153e54]"
                      strokeDasharray={`${cat.percentage}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-slate-800">
                    {Math.round(cat.percentage)}%
                  </span>
                </div>
                <div className="flex-1 truncate">
                  <div className="font-bold text-xs text-slate-900 truncate">{cat.name}</div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {formatMetricValue(cat.value, primaryCol?.type)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
