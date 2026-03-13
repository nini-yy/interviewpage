const stats = [
  { label: 'Tasks Completed', value: '24', delta: '+3 today' },
  { label: 'Current Streak', value: '7 days', delta: 'Personal best!' },
  { label: 'Points Earned', value: '1,240', delta: '+85 this week' },
  { label: 'Global Rank', value: '#12', delta: 'Up 4 spots' },
]

export default function PersonalStats() {
  return (
    <section className="dashboard-section">
      <h2 className="section-title">Personal Stats</h2>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-delta">{stat.delta}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
