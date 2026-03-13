const summaries = [
  { label: 'Total Users', value: '12,450', icon: '👥', trend: 'up' },
  { label: 'Active Now', value: '342', icon: '🟢', trend: 'up' },
  { label: 'Posts Today', value: '1,892', icon: '📝', trend: 'down' },
  { label: 'Uptime', value: '99.9%', icon: '⚡', trend: 'neutral' },
]

export default function PlatformSummary() {
  return (
    <section className="dashboard-section">
      <h2 className="section-title">Platform Summary</h2>
      <div className="summary-grid">
        {summaries.map((item) => (
          <div key={item.label} className={`summary-card trend-${item.trend}`}>
            <span className="summary-icon">{item.icon}</span>
            <div className="summary-info">
              <span className="summary-value">{item.value}</span>
              <span className="summary-label">{item.label}</span>
            </div>
            <span className="trend-indicator">
              {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '—'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
