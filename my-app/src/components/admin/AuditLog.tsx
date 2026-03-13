const logs = [
  { id: 1, user: 'Stephanie Yang', action: 'Suspended user', resource: 'tom@example.com', ip: '192.168.1.4', time: 'Today, 11:42 AM' },
  { id: 2, user: 'Stephanie Yang', action: 'Changed role', resource: 'alice@example.com → Editor', ip: '192.168.1.4', time: 'Today, 11:39 AM' },
  { id: 3, user: 'System', action: 'User registered', resource: 'marcus@example.com', ip: '203.0.113.22', time: 'Today, 9:05 AM' },
  { id: 4, user: 'Stephanie Yang', action: 'Removed post', resource: 'Post #4821 (flagged)', ip: '192.168.1.4', time: 'Yesterday, 4:18 PM' },
  { id: 5, user: 'Stephanie Yang', action: 'Updated system settings', resource: 'Email notifications → ON', ip: '192.168.1.4', time: 'Yesterday, 2:01 PM' },
  { id: 6, user: 'Alice Nguyen', action: 'Approved content', resource: 'Post #4819', ip: '10.0.0.12', time: 'Yesterday, 1:30 PM' },
  { id: 7, user: 'System', action: 'Deployment completed', resource: 'v2.4.1 → production', ip: '—', time: 'Mar 12, 10:00 AM' },
  { id: 8, user: 'Stephanie Yang', action: 'Enabled maintenance mode', resource: 'System', ip: '192.168.1.4', time: 'Mar 11, 8:45 PM' },
]

const actionColors: Record<string, string> = {
  Suspended: 'log-red',
  Changed: 'log-yellow',
  Removed: 'log-red',
  Updated: 'log-blue',
  Approved: 'log-green',
  Enabled: 'log-yellow',
  Deployment: 'log-green',
  User: 'log-blue',
}

function getColor(action: string) {
  const key = Object.keys(actionColors).find((k) => action.startsWith(k))
  return key ? actionColors[key] : 'log-default'
}

export default function AuditLog() {
  return (
    <div className="admin-tab-content">
      <div className="admin-table-header">
        <span>{logs.length} recent events</span>
        <button className="action-btn btn-outline">Export CSV</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Resource / Detail</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="muted mono">{log.time}</td>
              <td className="user-name">{log.user}</td>
              <td>
                <span className={`log-tag ${getColor(log.action)}`}>{log.action}</span>
              </td>
              <td className="muted">{log.resource}</td>
              <td className="muted mono">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
