import PageShell from '../components/PageShell'

const robots = [
  { id: 'RBT-001', name: 'Alpha Unit', status: 'online' as const, model: 'XR-9', lastSeen: 'Now' },
  { id: 'RBT-002', name: 'Beta Unit', status: 'online' as const, model: 'XR-9', lastSeen: 'Now' },
  { id: 'RBT-003', name: 'Gamma Unit', status: 'offline' as const, model: 'XR-7', lastSeen: '2h ago' },
  { id: 'RBT-004', name: 'Delta Unit', status: 'offline' as const, model: 'XR-7', lastSeen: '5d ago' },
]

const apiKeys = [
  { name: 'Production Key', prefix: 'sk-prod-****', created: 'Jan 5, 2024', expires: 'Jan 5, 2025' },
  { name: 'Staging Key', prefix: 'sk-stag-****', created: 'Feb 1, 2024', expires: 'Feb 1, 2025' },
]

const groups = [
  { name: 'Engineering Team', members: 5, robots: 3, access: 'Read / Write' },
  { name: 'Operations', members: 2, robots: 4, access: 'Read only' },
]

export default function RobotManagement() {
  return (
    <PageShell
      title="Robot Management"
      subtitle="Connect, manage and control your robot fleet"
      icon="🤖"
      actions={
        <button className="action-btn btn-primary" disabled>+ Connect Robot</button>
      }
    >
      {/* Robot list */}
      <section className="skeleton-section">
        <div className="skeleton-section-header">
          <h3 className="skeleton-section-title">Robots</h3>
          <span className="skeleton-badge">{robots.filter(r => r.status === 'online').length} online · {robots.filter(r => r.status === 'offline').length} offline</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Robot</th>
              <th>Model</th>
              <th>Status</th>
              <th>Last Seen</th>
              <th>Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {robots.map((robot) => (
              <tr key={robot.id}>
                <td>
                  <div className="user-cell">
                    <span className="user-initials" style={{ borderRadius: 6, fontSize: 10 }}>🤖</span>
                    <div>
                      <div className="user-name">{robot.name}</div>
                      <div className="user-email">{robot.id}</div>
                    </div>
                  </div>
                </td>
                <td className="muted">{robot.model}</td>
                <td>
                  <span className={`badge ${robot.status === 'online' ? 'badge-green' : 'badge-muted'}`}>
                    {robot.status === 'online' ? '● Online' : '○ Offline'}
                  </span>
                </td>
                <td className="muted">{robot.lastSeen}</td>
                <td>
                  <span className="badge badge-yellow">Expires Dec 2024</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Control</button>
                    <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Renew Cert</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* API Keys */}
      <section className="skeleton-section">
        <div className="skeleton-section-header">
          <h3 className="skeleton-section-title">API Keys</h3>
          <button className="action-btn btn-outline" disabled>+ Generate Key</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.name}>
                <td className="user-name">{key.name}</td>
                <td className="muted mono">{key.prefix}</td>
                <td className="muted">{key.created}</td>
                <td><span className="badge badge-yellow">{key.expires}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Rotate</button>
                    <button className="action-btn btn-danger" disabled style={{ fontSize: 12 }}>Revoke</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Permissions */}
      <section className="skeleton-section">
        <div className="skeleton-section-header">
          <h3 className="skeleton-section-title">User & Group Permissions</h3>
          <button className="action-btn btn-outline" disabled>+ Grant Access</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Members</th>
              <th>Robots</th>
              <th>Access Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.name}>
                <td className="user-name">{group.name}</td>
                <td className="muted">{group.members}</td>
                <td className="muted">{group.robots}</td>
                <td><span className="badge badge-green">{group.access}</span></td>
                <td>
                  <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  )
}
