import { useQuery } from "@tanstack/react-query";
import { fetchScoreboard } from "../lib/api";
import { ScoreCard } from "../components/ScoreCard";

function Scoreboard() {
  const { data, isPending } = useQuery({
    queryKey: ["scoreboard"],
    queryFn: fetchScoreboard,
  });

  return (
    <section>
      <header className="mb-6">
        <p className="text-sm font-medium text-brand-600">Network overview</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Identity proof ledger
        </h2>
      </header>
      {isPending && (
        <p className="rounded-2xl bg-white p-6 text-sm text-slate-500">
          Loading trust fabric...
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {data?.map((record) => (
          <ScoreCard key={record.userId} record={record} />
        ))}
      </div>
    </section>
  );
}

export default Scoreboard;
