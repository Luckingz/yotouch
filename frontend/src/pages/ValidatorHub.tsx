import { useQuery } from "@tanstack/react-query";
import { fetchValidatorQueue } from "../lib/api";
import type { ValidatorTask } from "../types/identity";

const urgencyTone: Record<ValidatorTask["urgency"], string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
};

function ValidatorHub() {
  const { data, isPending } = useQuery({
    queryKey: ["validator-queue"],
    queryFn: fetchValidatorQueue,
  });

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brand-600">
            Validator workload
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Queue orchestration
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          {isPending ? "Loading" : `${data?.length ?? 0} assignments`}
        </div>
      </header>

      <div className="mt-6 divide-y divide-slate-100">
        {isPending && (
          <p className="py-6 text-sm text-slate-500">Fetching live queue...</p>
        )}
        {!isPending && data?.length === 0 && (
          <p className="py-6 text-sm text-slate-500">
            No pending assignments 🎉
          </p>
        )}
        {data?.map((task) => (
          <article
            key={task.taskId}
            className="flex flex-wrap items-center gap-4 py-5"
          >
            <div className="flex flex-1 flex-col">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Applicant
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {task.applicantName}
              </p>
              <p className="text-sm text-slate-500">{task.location}</p>
            </div>
            <div className="text-sm text-slate-600">
              <p className="font-semibold text-slate-800">
                Stage: {task.stage}
              </p>
              <p>
                Submitted{" "}
                {new Date(task.submittedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold ${
                urgencyTone[task.urgency]
              }`}
            >
              {task.urgency} priority
            </span>
            <button className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-100">
              Review dossier
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ValidatorHub;
