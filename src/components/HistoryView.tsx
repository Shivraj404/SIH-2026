import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Printer,
  Calendar,
  Trash2,
  Download,
  AlertCircle,
} from 'lucide-react';
import { ScreeningResult } from '../types';

interface HistoryViewProps {
  screenings: ScreeningResult[];
  onViewResult: (result: ScreeningResult) => void;
  onOpenReferralSlip: (result: ScreeningResult) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  screenings,
  onViewResult,
  onOpenReferralSlip,
  onClearHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredScreenings = screenings.filter((item) => {
    const matchesQuery =
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = filterRisk === 'ALL' || item.riskLevel === filterRisk;

    return matchesQuery && matchesRisk;
  });

  const handleExportCSV = () => {
    if (screenings.length === 0) return;

    const headers = ['Record ID', 'Patient ID', 'Patient Name', 'Age', 'Eye Side', 'Date', 'Stage', 'Prediction', 'Confidence (%)', 'Risk Level', 'Recommendation'];
    const rows = screenings.map((s) => [
      s.id,
      s.patientId,
      s.patientName,
      s.age || '',
      s.eyeSide,
      s.timestamp,
      s.stageNumber,
      `"${s.categoryName}"`,
      s.confidenceScore,
      s.riskLevel,
      `"${s.recommendation}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Sushrut_Screening_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Screening History & Referral Register
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Complete log of patient fundus analyses recorded by the primary healthcare worker.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={screenings.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Clear all local screening history?')) {
                  onClearHistory();
                }
              }}
              disabled={screenings.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 border border-slate-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, or stage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Risk Filter:
            </span>
            {['ALL', 'Low Risk', 'Moderate Risk', 'High Risk', 'Critical Risk'].map((level) => {
              const isActive = filterRisk === level;
              return (
                <button
                  key={level}
                  onClick={() => setFilterRisk(level)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium shrink-0 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {level === 'ALL' ? 'All Records' : level}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screenings Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredScreenings.length === 0 ? (
          <div className="text-center py-16 px-4">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No matching screening records found</p>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery || filterRisk !== 'ALL'
                ? 'Try adjusting your search criteria or risk filter.'
                : 'Upload an image on the "New Screening" tab to record your first patient.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Patient / ID</th>
                  <th className="py-3 px-4">Fundus View</th>
                  <th className="py-3 px-4">Prediction & Severity</th>
                  <th className="py-3 px-4">AI Confidence</th>
                  <th className="py-3 px-4">Risk Level</th>
                  <th className="py-3 px-4">Screening Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredScreenings.map((item) => {
                  const riskBadgeClass =
                    item.riskLevel === 'Low Risk'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : item.riskLevel === 'Moderate Risk'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : item.riskLevel === 'High Risk'
                      ? 'bg-orange-50 text-orange-900 border-orange-200'
                      : 'bg-rose-50 text-rose-900 border-rose-200';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{item.patientName}</div>
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          {item.patientId} {item.age ? `• ${item.age}y` : ''}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={item.imageUrl}
                            alt="Fundus"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{item.categoryName}</div>
                        <div className="text-[11px] text-slate-500">{item.eyeSide}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-semibold text-slate-800">
                          {item.confidenceScore}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md border text-xs font-semibold ${riskBadgeClass}`}>
                          {item.riskLevel}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 text-xs whitespace-nowrap">
                        {item.timestamp}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewResult(item)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Full Result Card"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenReferralSlip(item)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Generate Referral Slip"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
