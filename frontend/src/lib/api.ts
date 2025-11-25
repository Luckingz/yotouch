import axios from "axios";
import type {
  OnboardingPayload,
  OnboardingResponse,
  ScoreRecord,
  ValidatorTask,
} from "../types/identity";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  timeout: 15000,
});

const mockDelay = async <T>(data: T, delay = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const submitOnboarding = async (
  payload: OnboardingPayload
): Promise<OnboardingResponse> => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS !== "false") {
    return mockDelay({
      userId: crypto.randomUUID(),
      estimatedCompletion: new Date(
        Date.now() + 1000 * 60 * 60 * 12
      ).toISOString(),
    });
  }

  const { data } = await api.post<OnboardingResponse>("/identities", payload);
  return data;
};

export const fetchScoreboard = async (): Promise<ScoreRecord[]> => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS !== "false") {
    return mockDelay([
      {
        userId: "user-1",
        applicantName: "Muna Ibrahim",
        score: 82,
        stageBreakdown: {
          biometrics: 38,
          documents: 9,
          socialProof: 28,
          reputation: 7,
        },
        status: "verified",
        proofTxHash: "02b61f...93aa",
        lastUpdated: new Date().toISOString(),
      },
      {
        userId: "user-2",
        applicantName: "Chibuzo Effiong",
        score: 64,
        stageBreakdown: {
          biometrics: 30,
          documents: 8,
          socialProof: 20,
          reputation: 6,
        },
        status: "in-review",
        proofTxHash: undefined,
        lastUpdated: new Date().toISOString(),
      },
    ]);
  }

  const { data } = await api.get<ScoreRecord[]>("/scores");
  return data;
};

export const fetchValidatorQueue = async (): Promise<ValidatorTask[]> => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS !== "false") {
    return mockDelay([
      {
        taskId: "task-19",
        applicantName: "Adaeze Nwachukwu",
        stage: "social-proof",
        urgency: "high",
        submittedAt: new Date(Date.now() - 1000 * 60 * 33).toISOString(),
        location: "Enugu, NG",
      },
      {
        taskId: "task-17",
        applicantName: "Gbenga Ajayi",
        stage: "biometrics",
        urgency: "medium",
        submittedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
        location: "Lagos, NG",
      },
    ]);
  }

  const { data } = await api.get<ValidatorTask[]>("/validator-queue");
  return data;
};

export const apiClient = {
  submitOnboarding,
  fetchScoreboard,
  fetchValidatorQueue,
};
