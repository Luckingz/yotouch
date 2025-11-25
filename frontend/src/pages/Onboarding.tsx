import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitOnboarding } from "../lib/api";
import { useAppStore } from "../store/appStore";
import type { OnboardingPayload } from "../types/identity";

const emptyForm: OnboardingPayload = {
  fullName: "",
  nin: "",
  bvn: "",
  residentialAddress: "",
  email: "",
  phone: "",
};

function Onboarding() {
  const [form, setForm] = useState<OnboardingPayload>(emptyForm);
  const setActiveUserId = useAppStore((state) => state.setActiveUserId);

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: submitOnboarding,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await mutateAsync(form);
    setActiveUserId(response.userId);
    setForm(emptyForm);
  };

  const updateField = (field: keyof OnboardingPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card"
      >
        <header className="mb-6">
          <p className="text-sm font-medium text-brand-600">Applicant Intake</p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Capture biometrics + social anchors
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Data is encrypted client-side before transit and routed to
            validators based on geography + trust tier.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-600">
            Full name
            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-brand-400 focus:bg-white"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            Email
            <input
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-brand-400 focus:bg-white"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            Phone
            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-brand-400 focus:bg-white"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            NIN
            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 uppercase outline-none focus:border-brand-400 focus:bg-white"
              value={form.nin}
              onChange={(event) => updateField("nin", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600">
            BVN
            <input
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 uppercase outline-none focus:border-brand-400 focus:bg-white"
              value={form.bvn}
              onChange={(event) => updateField("bvn", event.target.value)}
            />
          </label>
          <label className="text-sm font-medium text-slate-600 md:col-span-2">
            Residential address
            <textarea
              required
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-brand-400 focus:bg-white"
              value={form.residentialAddress}
              onChange={(event) =>
                updateField("residentialAddress", event.target.value)
              }
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-2xl bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white shadow-card transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          {isPending
            ? "Encrypting & dispatching..."
            : "Submit for verification"}
        </button>
      </form>

      <aside className="rounded-2xl border border-dashed border-brand-200 bg-white/60 p-6 text-sm text-slate-600">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
          Live status
        </p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          Workflow updates
        </h3>
        {data ? (
          <ul className="mt-4 space-y-3">
            <li>
              ✅ Received payload for{" "}
              <span className="font-medium">{data.userId}</span>
            </li>
            <li>🔐 AES-256 envelope created client-side</li>
            <li>📡 Validators notified via queue orchestration</li>
            <li>
              ⏱ Estimated completion{" "}
              {new Date(data.estimatedCompletion).toLocaleString()}
            </li>
          </ul>
        ) : (
          <p className="mt-4 text-slate-500">
            Submit an applicant to trigger the biometrics + social-proof
            pipeline.
          </p>
        )}
      </aside>
    </section>
  );
}

export default Onboarding;
