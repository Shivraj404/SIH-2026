import React, { useState } from 'react';
import { UploadCard } from './UploadCard';
import { ResultsCard } from './ResultsCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import { PatientDetails, ScreeningResult } from '../types';
import { performRetinalScreening, QualityCheckResult } from '../services/analyzer';
import { SAMPLE_FUNDUS_IMAGES } from '../data/samples';

interface ScreeningViewProps {
  onSaveToHistory: (result: ScreeningResult) => void;
  onOpenReferralSlip: (result: ScreeningResult) => void;
  savedScreeningIds: string[];
}

export const ScreeningView: React.FC<ScreeningViewProps> = ({
  onSaveToHistory,
  onOpenReferralSlip,
  savedScreeningIds,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    // Start with preset Sample 2 (Moderate DR) as initial demonstration preview
    SAMPLE_FUNDUS_IMAGES[2].svgDataUri
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<ScreeningResult | null>(null);

  const handleAnalyze = async (
    imageUri: string,
    patient: Partial<PatientDetails>,
    quality: QualityCheckResult
  ) => {
    setIsAnalyzing(true);
    try {
      const result = await performRetinalScreening(imageUri, patient, quality.status);
      setCurrentResult(result);
      // Automatically save to local history so dashboard and history update seamlessly
      onSaveToHistory(result);
    } catch (error) {
      console.error('Screening failed:', error);
      alert('Screening encountered an error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setCurrentResult(null);
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            New Retinal Screening
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload a patient fundus photo or select a test case from the APTOS 2019 reference collection.
          </p>
        </div>
        <div className="text-[11px] font-mono font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 w-fit">
          Protocol: APTOS 2019 / ICDR Scale
        </div>
      </div>

      {/* Main Workflow: Either Upload & Controls OR Results Screen */}
      {!currentResult ? (
        <UploadCard
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />
      ) : (
        <ResultsCard
          result={currentResult}
          onAnalyzeAnother={handleAnalyzeAnother}
          onOpenReferralSlip={onOpenReferralSlip}
          isSaved={savedScreeningIds.includes(currentResult.id)}
          onSaveToHistory={onSaveToHistory}
        />
      )}

      {/* Persistent Medical Safety Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
