import { DashboardItem } from '../types/dashboard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function exportToCsv(data: Record<string, any>[], fileName: string) {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',')
  );

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName.replace(/\.[^/.]+$/, '')}_exported.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportStandaloneHtml(item: DashboardItem) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${item.title} - Dashboardhound Offline Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 p-6 sm:p-10">
  <div class="max-w-5xl mx-auto space-y-8">
    <!-- Header -->
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">${item.title}</h1>
        <p class="text-xs text-slate-500 mt-1">Source: ${item.fileName} • Records: ${item.data.length} • Processed 100% In-Browser</p>
      </div>
      <div class="text-xs font-bold text-slate-400 font-mono">DASHBOARDHOUND OFFLINE</div>
    </div>

    <!-- Schema Summary -->
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <h3 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Metrics & Key Observations</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div class="p-3 bg-slate-50 rounded-xl">
          <div class="text-slate-400 font-semibold">Total Rows</div>
          <div class="text-xl font-bold text-slate-900 mt-1">${item.data.length}</div>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <div class="text-slate-400 font-semibold">Columns</div>
          <div class="text-xl font-bold text-slate-900 mt-1">${item.schema.columns.length}</div>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <div class="text-slate-400 font-semibold">Primary Metric</div>
          <div class="text-xl font-bold text-slate-900 mt-1">${item.schema.detectedPrimaryMetric || 'Count'}</div>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <div class="text-slate-400 font-semibold">Privacy Status</div>
          <div class="text-xl font-bold text-emerald-600 mt-1">100% Local</div>
        </div>
      </div>
    </div>

    <!-- Data Table Snapshot -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-4 border-b border-slate-200 font-bold text-xs text-slate-700">Snapshot (First 25 Records)</div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
            <tr>
              ${item.schema.columns.map((c) => `<th class="px-4 py-2.5">${c.name}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${item.data.slice(0, 25).map((row) => `
              <tr class="hover:bg-slate-50">
                ${item.schema.columns.map((c) => `<td class="px-4 py-2">${row[c.name] ?? '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}_offline.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportToPdf(elementId: string, title: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${title.replace(/\s+/g, '_').toLowerCase()}_report.pdf`);
  } catch (err) {
    console.error('PDF export error:', err);
    window.print();
  }
}
