export default function TrendsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-text-primary">User Trends</h1>
      <p className="text-text-muted text-sm">Platform-wide travel trends and analytics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Trips Generated", value: "2,847", change: "+18%", trend: "up" },
          { label: "Avg Budget", value: "₹14,200", change: "+5%", trend: "up" },
          { label: "Most Popular Interest", value: "Nature", change: "42% of users", trend: "neutral" },
          { label: "Fork Rate", value: "23%", change: "+12%", trend: "up" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-surface p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-text-primary">{stat.value}</span>
              <span className={`text-xs font-bold ${
                stat.trend === "up" ? "text-success" : "text-text-muted"
              }`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-8">
        <h2 className="text-lg font-bold text-text-primary mb-4">Top Destinations by Month</h2>
        <div className="space-y-4">
          {[
            { dest: "Udaipur", trips: 423, growth: 22 },
            { dest: "Meghalaya", trips: 389, growth: 35 },
            { dest: "Coorg", trips: 312, growth: 15 },
            { dest: "Spiti Valley", trips: 267, growth: 42 },
            { dest: "Jaipur", trips: 245, growth: -5 },
          ].map((item) => (
            <div key={item.dest} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-text-primary">{item.dest}</span>
              <div className="flex-1 h-6 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/30"
                  style={{ width: `${(item.trips / 423) * 100}%` }}
                />
              </div>
              <span className="w-16 text-right font-mono text-sm text-text-secondary">{item.trips}</span>
              <span className={`w-12 text-right text-xs font-bold ${item.growth > 0 ? "text-success" : "text-coral"}`}>
                {item.growth > 0 ? "+" : ""}{item.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
