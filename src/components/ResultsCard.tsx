import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  Printer,
  BookmarkCheck,
  ShieldAlert,
  Sparkles,
  Info,
} from 'lucide-react';
import { ScreeningResult } from '../types';

interface ResultsCardProps {
  result: ScreeningResult;
  onAnalyzeAnother: () => void;
  onOpenReferralSlip: (result: ScreeningResult) => void;
  isSaved?: boolean;
  onSaveToHistory?: (result: ScreeningResult) => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  result,
  onAnalyzeAnother,
  onOpenReferralSlip,
  isSaved = false,
  onSaveToHistory,
}) => {
  // Visual Risk styling with Clean Minimalism colors
  const getRiskBadgeConfig = (level: string) => {
    switch (level) {
      case 'Low Risk':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-800',
          subhead: 'text-emerald-700',
          border: 'border-emerald-200',
          dot: 'bg-emerald-500',
          indicatorColor: 'bg-emerald-500',
        };
      case 'Moderate Risk':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-900',
          subhead: 'text-amber-700',
          border: 'border-amber-200',
          dot: 'bg-amber-500',
          indicatorColor: 'bg-amber-500',
        };
      case 'High Risk':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-900',
          subhead: 'text-orange-700',
          border: 'border-orange-200',
          dot: 'bg-orange-500',
          indicatorColor: 'bg-orange-500',
        };
      case 'Critical Risk':
      default:
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-900',
          subhead: 'text-rose-700',
          border: 'border-rose-200',
          dot: 'bg-rose-500',
          indicatorColor: 'bg-rose-500',
        };
    }
  };

  const riskStyle = getRiskBadgeConfig(result.riskLevel);

  return (
    <div
      id="screening-results-card"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Top Banner Status */}
      <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Analysis Complete
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            • {result.timestamp}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-700">
            {result.isDemoResult ? 'AI Screening Assessment' : 'AI Analysis'}
          </span>
          {result.patientId && (
            <span className="text-[11px] font-mono text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/80">
              ID: {result.patientId}
            </span>
          )}
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Retinal Photo thumbnail and metadata */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
              <img
                src={result.imageUrl}
                alt="Analyzed retina"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded text-center">
                {result.eyeSide} • Quality: {result.imageQuality.split('—')[0].trim()}
              </div>
            </div>

            {result.patientName && (
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-slate-800">{result.patientName}</p>
                {result.age && <p className="text-xs text-slate-500">Age: {result.age} yrs</p>}
              </div>
            )}
          </div>

          {/* Right Column: Prediction, Risk Level, Confidence, Recommendation, Explanation */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Category & Confidence Row (Clean Minimalism Pattern) */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Prediction
              </span>
              <h3
                id="result-prediction-category"
                className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
              >
                {result.categoryName}
              </h3>

              {/* Confidence Linear Bar & Metric */}
              <div className="flex items-center gap-4 mb-2">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex-1">
                  <div
                    className={`h-full rounded-full ${riskStyle.indicatorColor}`}
                    style={{ width: `${result.confidenceScore}%` }}
                  />
                </div>
                <div className="flex items-baseline gap-1 text-slate-900 shrink-0">
                  <span className="text-xs text-slate-400 font-medium">Confidence:</span>
                  <span
                    id="result-confidence-score"
                    className="text-lg font-bold font-mono text-blue-600"
                  >
                    {result.confidenceScore}%
                  </span>
                </div>
              </div>

              {/* Severity Stepper (APTOS Grade 0 through 4) */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-medium tracking-wider mb-1.5">
                  <span>Grade 0 (None)</span>
                  <span>Grade 1 (Mild)</span>
                  <span>Grade 2 (Moderate)</span>
                  <span>Grade 3 (Severe)</span>
                  <span>Grade 4 (Prolif.)</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((step) => {
                    const isPassed = step <= result.stageNumber;
                    const isExact = step === result.stageNumber;
                    return (
                      <div
                        key={step}
                        className={`h-2 rounded-full transition-all ${
                          isExact
                            ? riskStyle.indicatorColor
                            : isPassed
                            ? 'bg-slate-300'
                            : 'bg-slate-100'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2-Column Risk & Recommendation Grid (Directly matching Clean Minimalism) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Risk Assessment Box */}
              <div
                id="result-risk-level-badge"
                className={`p-4 rounded-xl border ${riskStyle.bg} ${riskStyle.border}`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${riskStyle.subhead}`}>
                  Risk
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${riskStyle.dot}`} />
                  <span className={`text-lg sm:text-xl font-bold ${riskStyle.text}`}>
                    {result.riskLevel}
                  </span>
                </div>
              </div>

              {/* Recommendation Box */}
              <div
                id="result-recommendation-box"
                className="p-4 rounded-xl bg-blue-50 border border-blue-100"
              >
                <span className="text-xs text-blue-700 font-bold uppercase tracking-wider block mb-1">
                  Recommendation
                </span>
                <p
                  id="result-recommendation-text"
                  className="text-sm font-semibold text-blue-900 leading-snug"
                >
                  {result.recommendation}
                </p>
              </div>
            </div>

            {/* AI Screening Insight & Explanation */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Explanation & Clinical Insight
              </span>
              <p
                id="result-explanation-text"
                className="text-sm text-slate-700 leading-relaxed"
              >
                {result.basicExplanation}
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-500 italic">
                "Automated detection evaluates microaneurysm density, hard exudates, and intraretinal microvascular abnormalities against APTOS 2019 reference distributions."
              </div>
            </div>

            {/* Observed Hallmarks */}
            {result.hallmarks && result.hallmarks.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-medium text-slate-500">
                  Key Retinal Observations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.hallmarks.map((h, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              id="print-referral-slip-btn"
              onClick={() => onOpenReferralSlip(result)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Patient Referral Slip</span>
            </button>

            {onSaveToHistory && (
              <button
                id="save-screening-btn"
                onClick={() => onSaveToHistory(result)}
                disabled={isSaved}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                  isSaved
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <BookmarkCheck className="w-4 h-4 text-blue-600" />
                <span>{isSaved ? 'Saved to History' : 'Save Record'}</span>
              </button>
            )}
          </div>

          <button
            id="analyze-another-btn"
            onClick={onAnalyzeAnother}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
