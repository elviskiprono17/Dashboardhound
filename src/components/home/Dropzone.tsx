'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileSpreadsheet, AlertCircle, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { parseFileInBrowser } from '../../lib/engine/parser';
import { useSubscription } from '../../lib/context/SubscriptionContext';

interface DropzoneProps {
  onDataLoaded: (data: Record<string, any>[], fileName: string, fileSize: number) => void;
  className?: string;
}

export function Dropzone({ onDataLoaded, className = '' }: DropzoneProps) {
  const { config, openPaywall } = useSubscription();
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxBytes = config.fileLimitMB * 1024 * 1024;

  const handleProcessFile = async (file: File) => {
    setErrorMessage(null);

    // Validate size against subscription limit
    if (file.size > maxBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      openPaywall(
        `This file is ${fileSizeMB}MB, which exceeds your current ${config.name} limit (${config.fileLimitMB}MB). Upgrade to process larger datasets.`,
        file.size > 50 * 1024 * 1024 ? 'pro' : 'starter'
      );
      return;
    }

    try {
      setIsParsing(true);
      setProgress(10);

      const result = await parseFileInBrowser(file, (pct) => setProgress(pct));
      
      if (!result.data || result.data.length === 0) {
        throw new Error('No valid records found in the uploaded file.');
      }

      onDataLoaded(result.data, result.fileName, result.fileSize);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to read file. Please verify format.');
    } finally {
      setIsParsing(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isParsing && fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all group overflow-hidden ${
          isDragging
            ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-[#14364f] bg-white/80 hover:bg-slate-50/70 shadow-xl shadow-slate-200/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv,.tsv,.json"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isParsing}
        />

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {isParsing ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-[#14364f] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#14364f]">
                {progress}%
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">Processing file in browser memory...</h4>
              <p className="text-xs text-slate-500 mt-1">
                Zero server uploads. Generating deterministic metrics and charts.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Upload Icon Circle */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#14364f] to-[#1e5276] text-amber-400 flex items-center justify-center shadow-lg shadow-[#14364f]/20 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="max-w-md">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Drag & drop your file here, or <span className="text-[#14364f] underline decoration-amber-400 decoration-2 underline-offset-4">browse</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Supports Excel (<code className="font-semibold text-slate-700">.xlsx, .xls</code>), Comma-separated (<code className="font-semibold text-slate-700">.csv</code>), Tab-separated (<code className="font-semibold text-slate-700">.tsv</code>), and <code className="font-semibold text-slate-700">.json</code>
              </p>
            </div>

            {/* Badge Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-600">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% In-Browser & Private</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                <span>Upload Cap: {config.fileLimitMB}MB ({config.name.split(' ')[0]})</span>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
