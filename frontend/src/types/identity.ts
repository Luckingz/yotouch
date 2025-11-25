export type VerificationStage =
  | "biometrics"
  | "documents"
  | "social-proof"
  | "blockchain";

export interface ScoreBreakdown {
  biometrics: number;
  documents: number;
  socialProof: number;
  reputation: number;
}

export interface ScoreRecord {
  userId: string;
  applicantName: string;
  score: number;
  stageBreakdown: ScoreBreakdown;
  status: "pending" | "in-review" | "verified";
  proofTxHash?: string;
  lastUpdated: string;
}

export interface ValidatorTask {
  taskId: string;
  applicantName: string;
  stage: VerificationStage;
  urgency: "low" | "medium" | "high";
  submittedAt: string;
  location: string;
}

export interface OnboardingPayload {
  fullName: string;
  nin: string;
  bvn: string;
  residentialAddress: string;
  email: string;
  phone: string;
}

export interface OnboardingResponse {
  userId: string;
  estimatedCompletion: string;
}
