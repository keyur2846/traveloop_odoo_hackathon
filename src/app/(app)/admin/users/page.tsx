const mockUsers = [
  { name: "Cynthia Wolf", email: "cynthia@email.com", trips: 12, joined: "2025-01-15", status: "active" },
  { name: "Rahul Sharma", email: "rahul@email.com", trips: 8, joined: "2025-02-22", status: "active" },
  { name: "Priya Patel", email: "priya@email.com", trips: 23, joined: "2024-11-03", status: "active" },
  { name: "Arjun Nair", email: "arjun@email.com", trips: 4, joined: "2025-04-10", status: "active" },
  { name: "Mei Lin", email: "mei@email.com", trips: 0, joined: "2025-05-01", status: "inactive" },
  { name: "David Kumar", email: "david@email.com", trips: 15, joined: "2024-09-18", status: "active" },
];

export default function UsersPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-text-primary">Manage Users</h1>
      <p className="text-text-muted text-sm">User management: activity status, trip counts, join dates.</p>

      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">User</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Email</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Trips</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Joined</th>
              <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.email} className="border-b border-border last:border-0 hover:bg-background/50">
                <td className="px-6 py-4 font-medium text-text-primary">{user.name}</td>
                <td className="px-6 py-4 text-text-secondary">{user.email}</td>
                <td className="px-6 py-4 font-mono text-text-secondary">{user.trips}</td>
                <td className="px-6 py-4 text-text-muted">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    user.status === "active" ? "bg-success/10 text-success" : "bg-text-muted/10 text-text-muted"
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
