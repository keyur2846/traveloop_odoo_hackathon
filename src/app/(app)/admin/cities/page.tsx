import { topDestinations } from "@/lib/mock/destinations";

export default function CitiesPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-text-primary">Popular Cities</h1>
      <p className="text-text-muted text-sm">City-level analytics: AI match scores, crowd levels, trip counts.</p>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">City</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Country</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">AI Match</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Est. Cost</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Crowd</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Season</th>
            </tr>
          </thead>
          <tbody>
            {topDestinations.map((dest) => (
              <tr key={dest.id} className="border-b border-border last:border-0 hover:bg-background/50">
                <td className="px-6 py-4 font-medium text-text-primary">{dest.name}</td>
                <td className="px-6 py-4 text-text-secondary">{dest.country}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {dest.aiMatchScore}%
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-text-secondary">₹{dest.estimatedCost.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    dest.crowdLevel === "low" ? "bg-success/10 text-success"
                    : dest.crowdLevel === "medium" ? "bg-saffron/10 text-saffron"
                    : "bg-coral/10 text-coral"
                  }`}>
                    {dest.crowdLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-muted">{dest.bestSeason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
