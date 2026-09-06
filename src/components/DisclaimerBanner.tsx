import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        id="disclaimer-banner-compact"
        className="bg-amber-50 border-y sm:border sm:rounded-lg border-amber-200/80 px-3.5 py-2 flex items-center gap-2 text-xs text-amber-900"
      >
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="leading-snug">
          <strong>Medical Notice:</strong> AI screening prototype for Smart India Hackathon demonstration. Does not replace a qualified ophthalmologist.
        </span>
      </div>
    );
  }

  return (
    <aside
      id="disclaimer-banner"
      aria-label="Medical Safety Disclaimer"
      className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 sm:p-4.5 my-4 text-amber-950 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100/90 rounded-lg text-amber-700 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <p className="font-semibold text-amber-900 tracking-tight">
            Research & Demonstration Prototype Only
          </p>
          <p className="text-amber-800/95 leading-relaxed">
            Sushrut-AI does not provide a medical diagnosis. The output is an experimental AI screening triage assessment intended to support primary healthcare workers in identifying patients who may require ophthalmologist review. All clinical findings must be verified by a qualified eye-care professional.
          </p>
        </div>
      </div>
    </aside>
  );
};
