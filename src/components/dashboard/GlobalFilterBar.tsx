'use client';

import React from 'react';
import { Filter, Search, Calendar, X, RotateCcw } from 'lucide-react';
import { FilterState, DatasetSchema } from '../../lib/types/dashboard';

interface GlobalFilterBarProps {
  schema: DatasetSchema;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  filteredCount: number;
  totalCount: number;
}

export function GlobalFilterBar({
  schema,
  filters,
  onFilterChange,
  filteredCount,
  totalCount,
}: GlobalFilterBarProps) {
  const categoryCol = schema.columns.find((c) => c.name === schema.detectedCategoryColumn);
  const dateCol = schema.columns.find((c) => c.name === schema.detectedDateColumn);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleToggleCategory = (categoryVal: string) => {
    if (!categoryCol) return;
    const currentSelected = filters.categoryFilters[categoryCol.name] || [];
    let updated: string[];

    if (currentSelected.includes(categoryVal)) {
      updated = currentSelected.filter((v) => v !== categoryVal);
    } else {
      updated = [...currentSelected, categoryVal];
    }

    onFilterChange({
      ...filters,
      categoryFilters: {
        ...filters.categoryFilters,
        [categoryCol.name]: updated,
      },
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      search: '',
      dateRange: {},
      categoryFilters: {},
      numericFilters: {},
    });
  };

  const isFiltered =
    filters.search !== '' ||
    Object.keys(filters.categoryFilters).some((k) => filters.categoryFilters[k].length > 0) ||
    Boolean(filters.dateRange.start || filters.dateRange.end);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records or filter across all columns..."
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14364f] focus:bg-white transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Record count & Reset */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} rows
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      {categoryCol && categoryCol.topCategories && categoryCol.topCategories.length > 0 && (
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            {categoryCol.name}:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categoryCol.topCategories.map((cat) => {
              const isSelected = (filters.categoryFilters[categoryCol.name] || []).includes(cat.label);
              return (
                <button
                  key={cat.label}
                  onClick={() => handleToggleCategory(cat.label)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#14364f] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
