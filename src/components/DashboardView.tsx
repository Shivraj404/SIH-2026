import React from 'react';
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  ArrowUpRight,
  TrendingUp,
  Activity,
  PlusCircle,
  Eye,
  Calendar,
  ChevronRight,
  Printer,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { ScreeningResult } from '../types';

interface DashboardViewProps {
  screenings: ScreeningResult[];
  onStartNewScreening: () => void;
  onViewResult: (result: ScreeningResult) => void;
  onOpenReferralSlip: (result: ScreeningResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  screenings,
  onStartNewScreening,
  onViewResult,
  onOpenReferralSlip,
}) => {
  // Aggregate Metrics
  const totalScreened = screenings.length;
  const noDrCount = screenings.filter((s) => s.stageNumber === 0).length;
  const mildCount = screenings.filter((s) => s.stageNumber === 1).length;
  const moderateCount = screenings.filter((s) => s.stageNumber === 2).length;
  const severeCount = screenings.filter((s) => s.stageNumber === 3).length;
  const proliferativeCount = screenings.filter((s) => s.stageNumber === 4).length;

  const urgentReferrals = screenings.filter(
    (s) => s.riskLevel === 'High Risk' || s.riskLevel === 'Critical Risk'
  ).length;

  // Chart Data: Severity Stage Distribution (Clean Minimalism)
  const stageChartData = [
    { name: 'Grade 0: None', count: noDrCount, fill: '#10b981', aptosBenchmark: '49%' },
    { name: 'Grade 1: Mild', count: mildCount, fill: '#3b82f6', aptosBenchmark: '10%' },
    { name: 'Grade 2: Moderate', count: moderateCount, fill: '#f59e0b', aptosBenchmark: '27%' },
    { name: 'Grade 3: Severe', count: severeCount, fill: '#f97316', aptosBenchmark: '5%' },
    { name: 'Grade 4: Prolif.', count: proliferativeCount, fill: '#ef4444', aptosBenchmark: '8%' },
  ];

  // Urgency Breakdown
  const urgencyBreakdown = [
    { label: 'Routine Annual Review', count: noDrCount, color: 'bg-emerald-500', share: totalScreened > 0 ? Math.round((noDrCount / totalScreened) * 100) : 0 },
    { label: 'Follow-up in 6-9 Mos', count: mildCount, color: 'bg-blue-500', share: totalScreened > 0 ? Math.round((mildCount / totalScreened) * 100) : 0 },
    { label: 'Ophthalmologist (2-4 Wks)', count: moderateCount, color: 'bg-amber-500', share: totalScreened > 0 ? Math.round((moderateCount / totalScreened) * 100) : 0 },
    { label: 'Urgent Referral (48-72h)', count: severeCount + proliferativeCount, color: 'bg-rose-500', share: totalScreened > 0 ? Math.round(((severeCount + proliferativeCount) / totalScreened) * 100) : 0 },
  ];

  const recentScreenings = screenings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner (Clean Minimalism Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-200">
              <Activity className="w-3.5 h-3.5" />
              <span>Smart India Hackathon Triage Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Primary Care Retinal Screening Overview
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Assisting community healthcare workers to identify diabetic retinopathy early, preventing avoidable vision loss through structured clinical triage.
            </p>
          </div>

          <div className="shrink-0">
            <button
              id="dashboard-start-screening-btn"
              onClick={onStartNewScreening}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-200 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start New Screening</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Screened */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Patients Screened</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 font-mono">
            {totalScreened}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <span className="text-blue-600 font-medium">100% evaluated</span>
            <span>in local session</span>
          </div>
        </div>

        {/* Normal / Low Risk */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Low Risk (Grade 0–1)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-800 mt-2 font-mono">
            {noDrCount + mildCount}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <span>
              {totalScreened > 0
                ? `${Math.round(((noDrCount + mildCount) / totalScreened) * 100)}% of screened cohort`
                : 'No data yet'}
            </span>
          </div>
        </div>

        {/* Moderate Risk */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Moderate Risk (Grade 2)</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-800 mt-2 font-mono">
            {moderateCount}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <span className="text-amber-700 font-medium">Needs ophthalmologist review</span>
          </div>
        </div>

        {/* High / Critical Risk */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Urgent Priority (Grade 3–4)</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-rose-700 mt-2 font-mono">
            {urgentReferrals}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-medium">
            <span>Fast-track district referral</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Risk Distribution & Triage Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Stage Severity Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Diabetic Retinopathy Severity Distribution
              </h2>
              <p className="text-xs text-slate-500">
                Classified according to APTOS 2019 / ICDR 5-stage medical standard.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 w-fit">
              APTOS Benchmark Aligned
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Patients`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stageChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-5 gap-2 text-center text-[10px] text-slate-500">
            <div>Grade 0: <strong>{noDrCount}</strong></div>
            <div>Grade 1: <strong>{mildCount}</strong></div>
            <div>Grade 2: <strong>{moderateCount}</strong></div>
            <div>Grade 3: <strong>{severeCount}</strong></div>
            <div>Grade 4: <strong>{proliferativeCount}</strong></div>
          </div>
        </div>

        {/* Triage Urgency & Referral Protocol */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Community Triage Protocols
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Action guidelines for ASHA and primary health workers.
            </p>

            <div className="space-y-3.5">
              {urgencyBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className="font-mono text-slate-900 font-semibold">
                      {item.count} pts ({item.share}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Referral Protocol Notice:</p>
            <p className="leading-relaxed">
              Patients flagged as Moderate or higher receive a generated referral slip with their unique screening ID to present at the taluk or district ophthalmic department.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Retinal Analyses
            </h2>
            <p className="text-xs text-slate-500">
              Latest screening outcomes recorded during the current screening session.
            </p>
          </div>
          <button
            onClick={onStartNewScreening}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Screen new patient</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentScreenings.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No retinal images analyzed yet. Click "Start New Screening" to begin.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 mt-2">
            {recentScreenings.map((rec) => {
              const badgeBg =
                rec.riskLevel === 'Low Risk'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : rec.riskLevel === 'Moderate Risk'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : rec.riskLevel === 'High Risk'
                  ? 'bg-orange-50 text-orange-900 border-orange-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200';

              return (
                <div
                  key={rec.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shrink-0">
                      <img
                        src={rec.imageUrl}
                        alt="Retina thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">
                          {rec.patientName}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                          {rec.patientId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>{rec.eyeSide}</span>
                        <span>•</span>
                        <span>{rec.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 ml-15 sm:ml-0">
                    <div className="text-right hidden md:block">
                      <p className="text-xs font-semibold text-slate-800">
                        {rec.categoryName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Confidence: {rec.confidenceScore}%
                      </p>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${badgeBg}`}
                    >
                      {rec.riskLevel}
                    </span>

                    <button
                      onClick={() => onViewResult(rec)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Analysis Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenReferralSlip(rec)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Generate Referral Slip"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
