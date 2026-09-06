export type DRStageNumber = 0 | 1 | 2 | 3 | 4;

export type DRStageName =
  | 'No Diabetic Retinopathy'
  | 'Mild Diabetic Retinopathy'
  | 'Moderate Diabetic Retinopathy'
  | 'Severe Diabetic Retinopathy'
  | 'Proliferative Diabetic Retinopathy';

export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';

export type ImageQualityStatus = 'Good' | 'Poor — please upload a clearer retinal image';

export interface PatientDetails {
  id: string;
  name: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  diabetesDurationYears?: number;
  eyeSide: 'Right Eye (OD)' | 'Left Eye (OS)' | 'Both Eyes';
  clinicLocation?: string;
}

export interface ScreeningResult {
  id: string;
  patientId: string;
  patientName: string;
  age?: number;
  eyeSide: string;
  timestamp: string;
  imageUrl: string;
  stageNumber: DRStageNumber;
  categoryName: DRStageName;
  confidenceScore: number; // 0 - 100
  riskLevel: RiskLevel;
  recommendation: string;
  basicExplanation: string;
  imageQuality: ImageQualityStatus;
  hallmarks: string[];
  isDemoResult: boolean;
  modelSource: 'gemini-3.8-flash' | 'sushrut-prototype-engine';
}

export interface SampleImage {
  id: string;
  title: string;
  stageNumber: DRStageNumber;
  stageName: DRStageName;
  description: string;
  aptosId: string;
  svgDataUri: string;
  isPoorQuality?: boolean;
}

export interface RiskMetricsSummary {
  totalScreened: number;
  noDrCount: number;
  mildCount: number;
  moderateCount: number;
  severeCount: number;
  proliferativeCount: number;
  urgentReferralCount: number;
  averageConfidence: number;
}
