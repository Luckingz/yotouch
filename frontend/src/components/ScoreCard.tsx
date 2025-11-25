import type { ScoreRecord } from "../types/identity";

interface ScoreCardProps {
  record: ScoreRecord;
}

const statusTone: Record<ScoreRecord["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  "in-review": "bg-sky-100 text-sky-800",
  verified: "bg-emerald-100 text-emerald-800",
};

export function ScoreCard({ record }: ScoreCardProps) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Applicant</p>
          <h3 className="text-lg font-semibold text-slate-900">
            {record.applicantName}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Trust Score</p>
          <p className="text-3xl font-bold text-brand-700">{record.score}</p>
        </div>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Biometrics
          </dt>
          <dd className="text-base font-semibold text-slate-800">
            {record.stageBreakdown.biometrics}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Documents
          </dt>
          <dd className="text-base font-semibold text-slate-800">
            {record.stageBreakdown.documents}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Social
          </dt>
          <dd className="text-base font-semibold text-slate-800">
            {record.stageBreakdown.socialProof}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Reputation
          </dt>
          <dd className="text-base font-semibold text-slate-800">
            {record.stageBreakdown.reputation}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 font-medium ${
            statusTone[record.status]
          }`}
        >
          {record.status.replace("-", " ")}
        </span>
        {record.proofTxHash ? (
          <p className="text-slate-500">
            Proof hash:
            <span className="ml-2 font-mono text-xs text-slate-900">
              {record.proofTxHash}
            </span>
          </p>
        ) : (
          <p className="text-slate-500">Awaiting Cardano settlement</p>
        )}
      </div>
    </article>
  );
}
