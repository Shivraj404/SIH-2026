import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { ScreeningView } from './components/ScreeningView';
import { HistoryView } from './components/HistoryView';
import { AboutView } from './components/AboutView';
import { ReferralSlipModal } from './components/ReferralSlipModal';
import { ResultsCard } from './components/ResultsCard';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ScreeningResult } from './types';
import { INITIAL_SCREENING_HISTORY } from './data/samples';
import { HeartPulse, ShieldAlert, Award, Eye, X } from 'lucide-react';

const STORAGE_KEY = 'sushrut_ai_screening_history_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [screenings, setScreenings] = useState<ScreeningResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load local screenings from storage', e);
    }
    return INITIAL_SCREENING_HISTORY;
  });

  const [activeReferralSlip, setActiveReferralSlip] = useState<ScreeningResult | null>(null);
  const [viewingDetailResult, setViewingDetailResult] = useState<ScreeningResult | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(screenings));
    } catch (e) {
      console.warn('Failed to save screenings to storage', e);
    }
  }, [screenings]);

  const handleSaveScreening = (newResult: ScreeningResult) => {
    setScreenings((prev) => {
      const exists = prev.some((s) => s.id === newResult.id);
      if (exists) return prev;
      return [newResult, ...prev];
    });
  };

  const handleClearHistory = () => {
    setScreenings([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const handleViewResultFromHistory = (result: ScreeningResult) => {
    setViewingDetailResult(result);
  };

  const handleOpenReferralSlip = (result: ScreeningResult) => {
    setActiveReferralSlip(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* App Header */}
      <Header activeTab={activeTab} onNavigate={(tab) => {
        setViewingDetailResult(null);
        setActiveTab(tab);
      }} />

      {/* Main Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setViewingDetailResult(null);
          setActiveTab(tab);
        }}
        screeningCount={screenings.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {/* Render Tab Content */}
        {activeTab === 'dashboard' && (
          <DashboardView
            screenings={screenings}
            onStartNewScreening={() => setActiveTab('screening')}
            onViewResult={handleViewResultFromHistory}
            onOpenReferralSlip={handleOpenReferralSlip}
          />
        )}

        {activeTab === 'screening' && (
          <ScreeningView
            onSaveToHistory={handleSaveScreening}
            onOpenReferralSlip={handleOpenReferralSlip}
            savedScreeningIds={screenings.map((s) => s.id)}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            screenings={screenings}
            onViewResult={handleViewResultFromHistory}
            onOpenReferralSlip={handleOpenReferralSlip}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Detail Result Modal (When clicked from Dashboard / History table) */}
      {viewingDetailResult && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setViewingDetailResult(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden relative my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-sm sm:text-base">
                  Retinal Screening Result Details
                </span>
              </div>
              <button
                onClick={() => setViewingDetailResult(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <ResultsCard
                result={viewingDetailResult}
                onAnalyzeAnother={() => {
                  setViewingDetailResult(null);
                  setActiveTab('screening');
                }}
                onOpenReferralSlip={handleOpenReferralSlip}
                isSaved={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Patient Referral Slip Modal */}
      <ReferralSlipModal
        result={activeReferralSlip}
        onClose={() => setActiveReferralSlip(null)}
      />

      {/* Healthcare App Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <span className="font-semibold text-slate-700">Sushrut-AI</span>
              <span>• Smart India Hackathon Diabetic Retinopathy Screening MVP</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-blue-600 underline underline-offset-2"
              >
                APTOS 2019 Scale
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-blue-600 underline underline-offset-2"
              >
                Medical Safety Protocol
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
            Sushrut-AI is an experimental AI screening prototype designed for research and triage assistance. It does not provide a definitive medical diagnosis and does not replace a qualified ophthalmologist.
          </div>
        </div>
      </footer>
    </div>
  );
}
