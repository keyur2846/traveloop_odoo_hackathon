const popularActivities = [
  { name: "Paragliding — Bir Billing", category: "Adventure", rating: 4.7, bookings: 423, avgCost: 2500 },
  { name: "Scuba Diving — Andaman", category: "Adventure", rating: 4.5, bookings: 389, avgCost: 3500 },
  { name: "City Palace Tour — Udaipur", category: "Culture", rating: 4.8, bookings: 567, avgCost: 300 },
  { name: "Double Decker Root Bridge — Meghalaya", category: "Adventure", rating: 4.9, bookings: 234, avgCost: 0 },
  { name: "Local Food Walk — Jaipur", category: "Food", rating: 4.6, bookings: 678, avgCost: 800 },
  { name: "Monastery Trail — Spiti", category: "Culture", rating: 4.9, bookings: 156, avgCost: 0 },
  { name: "Beach Trek — Gokarna", category: "Adventure", rating: 4.4, bookings: 312, avgCost: 0 },
  { name: "Coffee Plantation Tour — Coorg", category: "Nature", rating: 4.5, bookings: 289, avgCost: 500 },
];

export default function ActivitiesPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-text-primary">Popular Activities</h1>
      <p className="text-text-muted text-sm">Activity-level analytics: bookings, ratings, costs.</p>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Activity</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Category</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Rating</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Bookings</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Avg Cost</th>
            </tr>
          </thead>
          <tbody>
            {popularActivities.map((act) => (
              <tr key={act.name} className="border-b border-border last:border-0 hover:bg-background/50">
                <td className="px-6 py-4 font-medium text-text-primary">{act.name}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{act.category}</span>
                </td>
                <td className="px-6 py-4 font-mono text-text-secondary">★ {act.rating}</td>
                <td className="px-6 py-4 font-mono text-text-secondary">{act.bookings.toLocaleString()}</td>
                <td className="px-6 py-4 font-mono text-text-secondary">{act.avgCost === 0 ? "Free" : `₹${act.avgCost.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
