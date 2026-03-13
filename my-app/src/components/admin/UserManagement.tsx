import { useState } from 'react'

type Role = 'Admin' | 'Editor' | 'Viewer'
type Status = 'Active' | 'Suspended' | 'Pending'

interface User {
  id: number
  name: string
  email: string
  role: Role
  status: Status
  joined: string
}

const initialUsers: User[] = [
  { id: 1, name: 'Stephanie Yang', email: 'sy@example.com', role: 'Admin', status: 'Active', joined: 'Jan 2, 2024' },
  { id: 2, name: 'Alice Nguyen', email: 'alice@example.com', role: 'Editor', status: 'Active', joined: 'Feb 14, 2024' },
  { id: 3, name: 'Jordan Park', email: 'jordan@example.com', role: 'Viewer', status: 'Active', joined: 'Mar 3, 2024' },
  { id: 4, name: 'marcus_dev', email: 'marcus@example.com', role: 'Viewer', status: 'Pending', joined: 'Mar 13, 2024' },
  { id: 5, name: 'Priya Sharma', email: 'priya@example.com', role: 'Editor', status: 'Active', joined: 'Nov 20, 2023' },
  { id: 6, name: 'Tom Reeves', email: 'tom@example.com', role: 'Viewer', status: 'Suspended', joined: 'Dec 5, 2023' },
]

const roles: Role[] = ['Admin', 'Editor', 'Viewer']
const statusColors: Record<Status, string> = {
  Active: 'badge-green',
  Suspended: 'badge-red',
  Pending: 'badge-yellow',
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editingId, setEditingId] = useState<number | null>(null)

  function updateRole(id: number, role: Role) {
    setUsers((u) => u.map((user) => user.id === id ? { ...user, role } : user))
  }

  function toggleStatus(id: number) {
    setUsers((u) =>
      u.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
          : user
      )
    )
  }

  return (
    <div className="admin-tab-content">
      <div className="admin-table-header">
        <span>{users.length} users</span>
        <div className="admin-filters">
          {(['Active', 'Pending', 'Suspended'] as Status[]).map((s) => (
            <span key={s} className={`badge ${statusColors[s]}`}>{s}</span>
          ))}
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <span className="user-initials">
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                {editingId === user.id ? (
                  <select
                    className="role-select"
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value as Role)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                  >
                    {roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                ) : (
                  <span className="role-badge" onClick={() => setEditingId(user.id)}>
                    {user.role} <span className="edit-hint">✎</span>
                  </span>
                )}
              </td>
              <td>
                <span className={`badge ${statusColors[user.status]}`}>{user.status}</span>
              </td>
              <td className="muted">{user.joined}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className={`action-btn ${user.status === 'Active' ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => toggleStatus(user.id)}
                    disabled={user.status === 'Pending'}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
