import React from 'react';
import { X, Printer, ShieldAlert, Eye, CheckCircle } from 'lucide-react';
import { ScreeningResult } from '../types';

interface ReferralSlipModalProps {
  result: ScreeningResult | null;
  onClose: () => void;
}

export const ReferralSlipModal: React.FC<ReferralSlipModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="referral-slip-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="referral-slip-dialog"
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-sm sm:text-base">
              Patient Ophthalmology Referral Slip
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div id="printable-referral-slip" className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
          {/* Slip Header */}
          <div className="border-b-2 border-blue-600 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 text-white rounded flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Sushrut-AI Primary Care Triage
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Community Health Retinal Screening Referral Slip
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-600">
              <p className="font-mono font-bold text-blue-700">REF: {result.id.slice(0, 16)}</p>
              <p>Date: {result.timestamp}</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Patient Name:</span>
              <span className="font-semibold text-slate-900 text-sm">
                {result.patientName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Patient ID:</span>
              <span className="font-mono font-semibold text-slate-800">
                {result.patientId}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Age:</span>
              <span className="font-semibold text-slate-800">
                {result.age ? `${result.age} yrs` : 'Not recorded'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Eye Examined:</span>
              <span className="font-semibold text-slate-800">
                {result.eyeSide}
              </span>
            </div>
          </div>

          {/* Screening Findings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Screening Assessment
            </h3>
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs text-slate-500">Predicted Category:</span>
                  <p className="text-lg font-bold text-slate-900 tracking-tight">
                    {result.categoryName}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500">Triage Risk:</span>
                  <p className="text-sm font-bold text-blue-700">
                    {result.riskLevel} (Confidence: {result.confidenceScore}%)
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div>
                <span className="text-xs text-slate-500 font-medium">Recommended Clinical Action:</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {result.recommendation}
                </p>
              </div>

              {/* Hallmarks */}
              {result.hallmarks && result.hallmarks.length > 0 && (
                <div>
                  <span className="text-xs text-slate-500 font-medium">Observed Retinal Features:</span>
                  <ul className="text-xs text-slate-700 list-disc list-inside mt-1 space-y-0.5">
                    {result.hallmarks.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Instructions for Patient & Medical Officer */}
          <div className="text-xs text-slate-600 bg-blue-50/70 p-3.5 rounded-xl border border-blue-200/80 space-y-1">
            <p className="font-semibold text-blue-950">To the Receiving Ophthalmologist / Eye Department:</p>
            <p className="leading-relaxed text-blue-900">
              This patient underwent primary diabetic retinopathy screening using Sushrut-AI at the Community Health Centre. Please perform a dilated slit-lamp biomicroscopy / indirect ophthalmoscopic evaluation.
            </p>
          </div>

          {/* Signatures & Safety Notice */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-500">
            <div>
              <div className="h-10 border-b border-slate-300 mb-1" />
              <span>Community Health Worker / ASHA Signature</span>
            </div>
            <div>
              <div className="h-10 border-b border-slate-300 mb-1" />
              <span>PHC Medical Officer Stamp & Date</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-100 rounded-lg text-[10px] text-slate-500 text-center leading-tight">
            <strong>Medical Notice:</strong> Sushrut-AI is an experimental screening prototype developed for the Smart India Hackathon. It does not provide a definitive medical diagnosis.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
