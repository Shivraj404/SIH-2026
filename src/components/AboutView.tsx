import React from 'react';
import {
  Eye,
  ShieldAlert,
  Award,
  BookOpen,
  Layers,
  Cpu,
  HeartPulse,
  Compass,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';

export const AboutView: React.FC = () => {
  const futureRoadmap = [
    {
      title: 'Automated Retinal Image Quality Assessment',
      status: 'MVP Prototype Active',
      desc: 'Instant clarity, illumination, and pupil centering checks to prevent ungradable image uploads in rural field settings.',
    },
    {
      title: 'Adaptive Contrast & Illumination Enhancement',
      status: 'Roadmap',
      desc: 'Preprocessing algorithms (CLAHE, green-channel extraction) to optimize under-illuminated portable camera photos.',
    },
    {
      title: 'Granular Lesion Detection & Localization',
      status: 'Roadmap',
      desc: 'Bounding box identification of microaneurysms, dot-and-blot hemorrhages, hard lipid exudates, and cotton-wool spots.',
    },
    {
      title: 'Blood-Vessel & Optic-Disc Semantic Segmentation',
      status: 'Roadmap',
      desc: 'Deep U-Net segmentation of retinal vascular branching, cup-to-disc ratio (CDR) estimation for concurrent glaucoma screening.',
    },
    {
      title: 'Explainable AI (Grad-CAM Saliency Maps)',
      status: 'Roadmap',
      desc: 'Heatmaps highlighting the exact pixel regions that guided the AI classification, increasing clinician trust.',
    },
    {
      title: 'Multimodal Clinical Health Context',
      status: 'Roadmap',
      desc: 'Fusing retinal image findings with patient clinical indicators: HbA1c levels, blood pressure, diabetes duration, and BMI.',
    },
    {
      title: 'Offline Edge-Device Deployment (ONNX / TFLite)',
      status: 'Roadmap',
      desc: 'Quantized neural network execution directly on low-power tablets or smartphones without requiring an active internet connection.',
    },
    {
      title: 'Ophthalmologist Tele-Consultation Workflow',
      status: 'Roadmap',
      desc: 'Asynchronous store-and-forward cloud bridge enabling district hospital ophthalmologists to confirm high-risk cases.',
    },
    {
      title: 'Rural Healthcare Worker (ASHA / PHC) Simulation',
      status: 'Roadmap',
      desc: 'Voice-assisted local language instructions (Hindi, Marathi, Kannada, Tamil, etc.) with pictorial counseling handouts.',
    },
  ];

  const aptosStages = [
    {
      grade: 0,
      name: 'No Diabetic Retinopathy',
      criteria: 'No microvascular abnormalities detected. Vascular arcades, disc, and macula intact.',
      action: 'Routine annual screening.',
    },
    {
      grade: 1,
      name: 'Mild Non-Proliferative DR',
      criteria: 'Microaneurysms only (isolated tiny punctate red dots in retinal vessels).',
      action: 'Rescreen in 6–9 months. Tighten glycemic control.',
    },
    {
      grade: 2,
      name: 'Moderate Non-Proliferative DR',
      criteria: 'More than microaneurysms: dot-and-blot hemorrhages, hard exudates, or cotton-wool spots, but less than severe.',
      action: 'Ophthalmologist review recommended within 2–4 weeks.',
    },
    {
      grade: 3,
      name: 'Severe Non-Proliferative DR',
      criteria: 'The 4-2-1 clinical rule: severe hemorrhages in 4 quadrants, venous beading in 2+ quadrants, or IRMA in 1+ quadrant.',
      action: 'Priority referral to district eye hospital within 1–2 weeks.',
    },
    {
      grade: 4,
      name: 'Proliferative Diabetic Retinopathy',
      criteria: 'Neovascularization (fragile abnormal vessels on disc or retina) and/or preretinal/vitreous hemorrhage.',
      action: 'Urgent referral within 48–72 hours for laser photocoagulation or anti-VEGF.',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Sushrut-AI
              </h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                SIH Hackathon Prototype
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Diabetic Retinopathy Screening for Rural & Primary Healthcare
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4">
          Named after <strong>Maharshi Sushruta</strong>—the revered ancient Indian surgeon who authored the <em>Sushruta Samhita</em> detailing ocular anatomy and early surgical techniques—<strong>Sushrut-AI</strong> is an assistive screening platform designed to address the severe shortage of ophthalmologists in rural Primary Health Centres (PHCs).
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
          By empowering frontline community healthcare workers (ASHA and ANM workers) with intuitive, rural-friendly AI triage, Sushrut-AI aims to bridge the screening gap, ensuring patients at high risk of diabetic blindness are flagged and referred to district specialists before permanent vision loss occurs.
        </p>
      </div>

      {/* Prominent Medical Safety Notice */}
      <DisclaimerBanner />

      {/* Clinical Dataset Reference & The 5-Stage Classification */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              APTOS 2019 Blindness Detection Standard
            </h2>
            <p className="text-xs text-slate-500">
              International Clinical Diabetic Retinopathy (ICDR) severity scale reference.
            </p>
          </div>
          <a
            href="https://www.kaggle.com/competitions/aptos2019-blindness-detection/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Kaggle APTOS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="mt-5 space-y-3">
          {aptosStages.map((stage) => (
            <div
              key={stage.grade}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-sm text-slate-900">
                  Grade {stage.grade}: {stage.name}
                </span>
                <span className="text-[11px] font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 w-fit">
                  {stage.action}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {stage.criteria}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Future-Ready Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Future-Ready Architecture Roadmap
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Architectural blueprint designed for phased scale beyond the hackathon prototype.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureRoadmap.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  {idx + 1}. {item.title}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    item.status.includes('Active')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
