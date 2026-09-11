import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ParseResult {
  data: Record<string, any>[];
  fileName: string;
  fileSize: number;
  fileType: string;
}

export async function parseFileInBrowser(
  file: File,
  onProgress?: (percent: number) => void
): Promise<ParseResult> {
  const fileName = file.name;
  const fileSize = file.size;
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  if (onProgress) onProgress(15);

  if (extension === 'csv' || extension === 'tsv' || extension === 'txt') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: 'greedy',
        delimiter: extension === 'tsv' ? '\t' : undefined,
        complete: (results) => {
          if (onProgress) onProgress(100);
          if (results.errors.length > 0 && results.data.length === 0) {
            reject(new Error(results.errors[0]?.message || 'Failed to parse delimited file'));
            return;
          }
          const cleanData = (results.data as Record<string, any>[]).filter((row) =>
            row && Object.values(row).some((v) => v !== null && v !== undefined && v !== '')
          );
          resolve({
            data: cleanData,
            fileName,
            fileSize,
            fileType: extension.toUpperCase(),
          });
        },
        error: (err) => {
          reject(new Error(err.message || 'Error reading delimited file'));
        },
      });
    });
  }

  if (extension === 'xlsx' || extension === 'xls') {
    if (onProgress) onProgress(35);
    const arrayBuffer = await file.arrayBuffer();
    if (onProgress) onProgress(65);
    const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      throw new Error('Excel workbook has no sheets');
    }
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: null,
      raw: false,
    });
    if (onProgress) onProgress(100);
    return {
      data: jsonData,
      fileName,
      fileSize,
      fileType: 'EXCEL',
    };
  }

  if (extension === 'json') {
    if (onProgress) onProgress(50);
    const text = await file.text();
    const parsed = JSON.parse(text);
    const arrayData = Array.isArray(parsed) ? parsed : [parsed];
    if (onProgress) onProgress(100);
    return {
      data: arrayData,
      fileName,
      fileSize,
      fileType: 'JSON',
    };
  }

  throw new Error(`Unsupported file type: .${extension}. Please upload an Excel (.xlsx, .xls), CSV, TSV, or JSON file.`);
}
