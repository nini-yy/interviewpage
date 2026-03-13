const activities = [
  { id: 1, type: 'comment', user: 'Alice', message: 'commented on your post', time: '2m ago', avatar: 'A' },
  { id: 2, type: 'signup', user: 'System', message: 'New user marcus_dev signed up', time: '5m ago', avatar: 'S' },
  { id: 3, type: 'deploy', user: 'CI/CD', message: 'Deployment to production completed successfully', time: '15m ago', avatar: 'C' },
  { id: 4, type: 'like', user: 'Jordan', message: 'liked your dashboard update', time: '32m ago', avatar: 'J' },
  { id: 5, type: 'alert', user: 'Monitor', message: 'CPU usage spike resolved (was 94%)', time: '1h ago', avatar: 'M' },
  { id: 6, type: 'comment', user: 'Priya', message: 'replied to your comment in #general', time: '2h ago', avatar: 'P' },
  { id: 7, type: 'deploy', user: 'CI/CD', message: 'Staging deploy triggered by push to main', time: '3h ago', avatar: 'C' },
]

const typeColors: Record<string, string> = {
  comment: '#aa3bff',
  signup: '#22c55e',
  deploy: '#3b82f6',
  like: '#f59e0b',
  alert: '#ef4444',
}

export default function ActivityFeed() {
  return (
    <section className="dashboard-section">
      <h2 className="section-title">Activity Feed</h2>
      <ul className="activity-list">
        {activities.map((item) => (
          <li key={item.id} className="activity-item">
            <span
              className="activity-avatar"
              style={{ background: typeColors[item.type] ?? '#6b7280' }}
            >
              {item.avatar}
            </span>
            <div className="activity-body">
              <span className="activity-user">{item.user}</span>
              <span className="activity-message"> {item.message}</span>
            </div>
            <span className="activity-time">{item.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
