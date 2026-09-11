'use client';

import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DatasetSchema } from '../../../lib/types/dashboard';
import { formatMetricValue } from '../../../lib/engine/aggregations';
import { Table, ChevronLeft, ChevronRight, ArrowUpDown, Filter, BarChart2 } from 'lucide-react';

interface LayoutProps {
  schema: DatasetSchema;
  data: Record<string, any>[];
}

export function ExplorerLayout({ schema, data }: LayoutProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const numericCols = schema.columns.filter(
    (c) => c.type === 'number' || c.type === 'currency' || c.type === 'percentage'
  );
  const colX = numericCols[0];
  const colY = numericCols.length > 1 ? numericCols[1] : numericCols[0];

  // Correlation scatter data
  const scatterData =
    colX && colY
      ? data.slice(0, 150).map((row, i) => ({
          x: Number(row[colX.name]) || 0,
          y: Number(row[colY.name]) || 0,
          label: `Row ${i + 1}`,
        }))
      : [];

  // Sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn];
    const valB = b[sortColumn];
    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pageRows = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (colName: string) => {
    if (sortColumn === colName) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(colName);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Column Schema Stats Cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[#14364f]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Column Profiling Schema ({schema.columns.length} Dimensions)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {data.length.toLocaleString()} total rows loaded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {schema.columns.map((c) => (
            <div key={c.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-900 truncate" title={c.name}>
                {c.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                <span className="uppercase font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                  {c.type}
                </span>
                <span>{c.uniqueCount} distinct</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Scatter Matrix (If >= 2 numeric columns) */}
      {colX && colY && colX.name !== colY.name && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#14364f]" /> Bivariate Correlation Matrix
              </h3>
              <p className="text-xs text-slate-500">
                X-Axis: <strong>{colX.name}</strong> vs Y-Axis: <strong>{colY.name}</strong>
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Scatter Plot
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name={colX.name}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(v) => formatMetricValue(v, colX.type)}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={colY.name}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(v) => formatMetricValue(v, colY.type)}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(val: any, name?: any) => [val, name ?? '']}
                  contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                />
                <Scatter name="Records" data={scatterData} fill="#14364f" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Interactive Data Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Interactive Data Grid</h3>
            <p className="text-xs text-slate-500">Click column headers to sort ascending / descending</p>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 w-12 text-slate-400">#</th>
                {schema.columns.map((col) => (
                  <th
                    key={col.name}
                    onClick={() => handleSort(col.name)}
                    className="px-4 py-3 cursor-pointer hover:bg-slate-200/60 transition-colors whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.name}</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 text-slate-400 font-mono">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  {schema.columns.map((col) => {
                    const val = row[col.name];
                    const isNum = col.type === 'number' || col.type === 'currency' || col.type === 'percentage';
                    return (
                      <td
                        key={col.name}
                        className={`px-4 py-2.5 text-slate-800 ${isNum ? 'font-mono' : ''}`}
                      >
                        {val !== null && val !== undefined ? String(val) : <span className="text-slate-300 italic">null</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
