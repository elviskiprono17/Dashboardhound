'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileSpreadsheet, AlertCircle, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { parseFileInBrowser } from '../../lib/engine/parser';
import { useSubscription } from '../../lib/context/SubscriptionContext';

interface DropzoneProps {
  onDataLoaded: (data: Record<string, any>[], fileName: string, fileSize: number) => void;
  onStartLoading?: () => void;
  className?: string;
}

export function Dropzone({ onDataLoaded, onStartLoading, className = '' }: DropzoneProps) {
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
        `This file is ${fileSizeMB}MB, which exceeds your current ${config.name} limit (${config.fileLimitMB}MB). Upgrade to Solo to process datasets up to 200MB.`,
        'solo'
      );
      return;
    }

    try {
      if (onStartLoading) onStartLoading();
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
    <div className={`w-full relative group ${className}`}>
      {/* Outer Multi-layered Radiant Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-[#153e54] rounded-[32px] opacity-65 blur-lg group-hover:opacity-95 group-hover:blur-xl transition duration-500 animate-pulse" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-sky-400 via-teal-300 to-sky-500 rounded-[28px] opacity-75 group-hover:opacity-100 transition duration-300" />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isParsing && fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-[26px] border-2 border-dashed p-8 sm:p-12 text-center transition-all bg-white/95 backdrop-blur-md overflow-hidden ${
          isDragging
            ? 'border-sky-500 bg-sky-50/95 scale-[1.01] shadow-2xl shadow-sky-400/40'
            : 'border-sky-300/80 hover:border-sky-500 hover:bg-white shadow-2xl shadow-sky-500/20 hover:shadow-sky-500/35'
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

        {/* Ambient Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-sky-500/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {isParsing ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-[#153e54] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#153e54]">
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#153e54] to-sky-600 text-sky-300 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-110 group-hover:shadow-sky-400/40 transition-all">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="max-w-md">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Drag & drop your file here, or <span className="text-[#153e54] underline decoration-sky-400 decoration-2 underline-offset-4">browse</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Supports Excel (<code className="font-semibold text-slate-700">.xlsx, .xls</code>), Comma-separated (<code className="font-semibold text-slate-700">.csv</code>), Tab-separated (<code className="font-semibold text-slate-700">.tsv</code>), and <code className="font-semibold text-slate-700">.json</code>
              </p>
            </div>

            {/* Badge Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-600">
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
