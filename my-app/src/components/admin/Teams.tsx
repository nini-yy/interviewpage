import { useState } from 'react'

type TeamRole = 'Owner' | 'Admin' | 'Member'
type RequestStatus = 'pending' | 'approved' | 'declined'

interface TeamMember {
  id: number
  name: string
  email: string
  role: TeamRole
  joinedAt: string
}

interface InviteToken {
  id: string
  token: string
  createdBy: string
  expiresAt: string
  uses: number
  maxUses: number | null
  expired: boolean
}

interface JoinRequest {
  id: number
  user: string
  email: string
  requestedAt: string
  status: RequestStatus
}

interface Team {
  id: number
  name: string
  description: string
  members: TeamMember[]
  tokens: InviteToken[]
  requests: JoinRequest[]
}

const initialTeams: Team[] = [
  {
    id: 1,
    name: 'Engineering',
    description: 'Core engineering team with full platform access',
    members: [
      { id: 1, name: 'Stephanie Yang', email: 'sy@example.com', role: 'Owner', joinedAt: 'Jan 2, 2024' },
      { id: 2, name: 'Alice Nguyen', email: 'alice@example.com', role: 'Admin', joinedAt: 'Feb 14, 2024' },
      { id: 5, name: 'Priya Sharma', email: 'priya@example.com', role: 'Member', joinedAt: 'Nov 20, 2023' },
    ],
    tokens: [
      { id: 't1', token: 'inv-eng-a3f9', createdBy: 'Stephanie Yang', expiresAt: 'Mar 20, 2026', uses: 2, maxUses: 5, expired: false },
      { id: 't2', token: 'inv-eng-b7c1', createdBy: 'Alice Nguyen', expiresAt: 'Jan 1, 2025', uses: 5, maxUses: 5, expired: true },
    ],
    requests: [
      { id: 10, user: 'marcus_dev', email: 'marcus@example.com', requestedAt: 'Today, 9:05 AM', status: 'pending' },
    ],
  },
  {
    id: 2,
    name: 'Operations',
    description: 'Manages robot fleet and deployment pipelines',
    members: [
      { id: 1, name: 'Stephanie Yang', email: 'sy@example.com', role: 'Admin', joinedAt: 'Jan 2, 2024' },
      { id: 3, name: 'Jordan Park', email: 'jordan@example.com', role: 'Member', joinedAt: 'Mar 3, 2024' },
    ],
    tokens: [
      { id: 't3', token: 'inv-ops-d2e8', createdBy: 'Stephanie Yang', expiresAt: 'Apr 1, 2026', uses: 0, maxUses: null, expired: false },
    ],
    requests: [],
  },
]

const roleColors: Record<TeamRole, string> = {
  Owner: 'badge-red',
  Admin: 'badge-yellow',
  Member: 'badge-green',
}

const expiryOptions = ['24 hours', '7 days', '30 days', 'Never']

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const [activeSection, setActiveSection] = useState<Record<number, 'members' | 'tokens' | 'requests'>>({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamDesc, setNewTeamDesc] = useState('')
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  function getSection(teamId: number) {
    return activeSection[teamId] ?? 'members'
  }

  function setSection(teamId: number, section: 'members' | 'tokens' | 'requests') {
    setActiveSection((s) => ({ ...s, [teamId]: section }))
  }

  function handleRequest(teamId: number, reqId: number, status: RequestStatus) {
    setTeams((ts) =>
      ts.map((t) =>
        t.id === teamId
          ? { ...t, requests: t.requests.map((r) => r.id === reqId ? { ...r, status } : r) }
          : t
      )
    )
  }

  function generateToken(teamId: number) {
    const rand = Math.random().toString(36).slice(2, 10)
    const newToken: InviteToken = {
      id: `t-${rand}`,
      token: `inv-${rand}`,
      createdBy: 'Stephanie Yang',
      expiresAt: 'Mar 20, 2026',
      uses: 0,
      maxUses: 10,
      expired: false,
    }
    setTeams((ts) =>
      ts.map((t) => t.id === teamId ? { ...t, tokens: [newToken, ...t.tokens] } : t)
    )
  }

  function revokeToken(teamId: number, tokenId: string) {
    setTeams((ts) =>
      ts.map((t) =>
        t.id === teamId
          ? { ...t, tokens: t.tokens.map((tok) => tok.id === tokenId ? { ...tok, expired: true } : tok) }
          : t
      )
    )
  }

  function copyToken(token: string) {
    navigator.clipboard.writeText(token).catch(() => {})
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 1500)
  }

  function createTeam() {
    if (!newTeamName.trim()) return
    const newTeam: Team = {
      id: Date.now(),
      name: newTeamName.trim(),
      description: newTeamDesc.trim(),
      members: [{ id: 1, name: 'Stephanie Yang', email: 'sy@example.com', role: 'Owner', joinedAt: 'Today' }],
      tokens: [],
      requests: [],
    }
    setTeams((ts) => [...ts, newTeam])
    setExpandedId(newTeam.id)
    setNewTeamName('')
    setNewTeamDesc('')
    setShowCreateForm(false)
  }

  return (
    <div className="admin-tab-content">
      <div className="admin-table-header">
        <span>{teams.length} teams</span>
        <button className="action-btn btn-primary" onClick={() => setShowCreateForm((v) => !v)}>
          {showCreateForm ? 'Cancel' : '+ New Team'}
        </button>
      </div>

      {showCreateForm && (
        <div className="team-create-form">
          <h4 className="team-create-title">Create Team</h4>
          <div className="team-form-row">
            <input
              className="team-input"
              placeholder="Team name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createTeam()}
            />
            <input
              className="team-input"
              placeholder="Description (optional)"
              value={newTeamDesc}
              onChange={(e) => setNewTeamDesc(e.target.value)}
            />
            <button className="action-btn btn-primary" onClick={createTeam} disabled={!newTeamName.trim()}>
              Create
            </button>
          </div>
        </div>
      )}

      <div className="team-list">
        {teams.map((team) => {
          const expanded = expandedId === team.id
          const section = getSection(team.id)
          const pendingCount = team.requests.filter((r) => r.status === 'pending').length

          return (
            <div key={team.id} className={`team-card ${expanded ? 'team-card-expanded' : ''}`}>
              {/* Team header */}
              <button className="team-card-header" onClick={() => setExpandedId(expanded ? null : team.id)}>
                <div className="team-card-info">
                  <span className="team-name">{team.name}</span>
                  <span className="team-desc muted">{team.description}</span>
                </div>
                <div className="team-card-meta">
                  <span className="skeleton-badge skeleton-badge-muted">{team.members.length} members</span>
                  {pendingCount > 0 && <span className="tab-badge">{pendingCount}</span>}
                  <span className={`team-chevron ${expanded ? 'open' : ''}`}>▾</span>
                </div>
              </button>

              {expanded && (
                <div className="team-card-body">
                  {/* Sub-tabs */}
                  <div className="team-subtabs">
                    {(['members', 'tokens', 'requests'] as const).map((s) => (
                      <button
                        key={s}
                        className={`team-subtab ${section === s ? 'active' : ''}`}
                        onClick={() => setSection(team.id, s)}
                      >
                        {s === 'members' && `Members (${team.members.length})`}
                        {s === 'tokens' && `Invite Tokens (${team.tokens.filter(t => !t.expired).length} active)`}
                        {s === 'requests' && (
                          <>Requests{pendingCount > 0 && <span className="tab-badge" style={{ marginLeft: 6 }}>{pendingCount}</span>}</>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Members */}
                  {section === 'members' && (
                    <table className="admin-table">
                      <thead>
                        <tr><th>Member</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {team.members.map((m) => (
                          <tr key={m.id}>
                            <td>
                              <div className="user-cell">
                                <span className="user-initials">
                                  {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </span>
                                <div>
                                  <div className="user-name">{m.name}</div>
                                  <div className="user-email">{m.email}</div>
                                </div>
                              </div>
                            </td>
                            <td><span className={`badge ${roleColors[m.role]}`}>{m.role}</span></td>
                            <td className="muted">{m.joinedAt}</td>
                            <td>
                              <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Change Role</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Invite tokens */}
                  {section === 'tokens' && (
                    <div className="tokens-section">
                      <div className="tokens-toolbar">
                        <span className="muted" style={{ fontSize: 13 }}>Expiry:</span>
                        {expiryOptions.map((opt) => (
                          <button key={opt} className="action-btn btn-outline" style={{ fontSize: 12 }} disabled>{opt}</button>
                        ))}
                        <button className="action-btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => generateToken(team.id)}>
                          Generate Token
                        </button>
                      </div>
                      <table className="admin-table">
                        <thead>
                          <tr><th>Token</th><th>Created By</th><th>Expires</th><th>Uses</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                          {team.tokens.map((tok) => (
                            <tr key={tok.id} style={{ opacity: tok.expired ? 0.45 : 1 }}>
                              <td className="mono">
                                {tok.token}
                                {tok.expired && <span className="badge badge-red" style={{ marginLeft: 8 }}>Expired</span>}
                              </td>
                              <td className="muted">{tok.createdBy}</td>
                              <td className="muted">{tok.expiresAt}</td>
                              <td className="muted">{tok.uses}{tok.maxUses != null ? ` / ${tok.maxUses}` : ''}</td>
                              <td>
                                <div className="action-buttons">
                                  {!tok.expired && (
                                    <>
                                      <button
                                        className="action-btn btn-outline"
                                        style={{ fontSize: 12 }}
                                        onClick={() => copyToken(tok.token)}
                                      >
                                        {copiedToken === tok.token ? 'Copied!' : 'Copy'}
                                      </button>
                                      <button
                                        className="action-btn btn-danger"
                                        style={{ fontSize: 12 }}
                                        onClick={() => revokeToken(team.id, tok.id)}
                                      >
                                        Revoke
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                          {team.tokens.length === 0 && (
                            <tr><td colSpan={5} className="muted" style={{ textAlign: 'center', padding: 20 }}>No tokens yet</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Join requests */}
                  {section === 'requests' && (
                    <table className="admin-table">
                      <thead>
                        <tr><th>User</th><th>Requested</th><th>Status</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {team.requests.length === 0 ? (
                          <tr><td colSpan={4} className="muted" style={{ textAlign: 'center', padding: 20 }}>No join requests</td></tr>
                        ) : team.requests.map((req) => (
                          <tr key={req.id}>
                            <td>
                              <div className="user-cell">
                                <span className="user-initials">{req.user[0].toUpperCase()}</span>
                                <div>
                                  <div className="user-name">{req.user}</div>
                                  <div className="user-email">{req.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="muted">{req.requestedAt}</td>
                            <td>
                              <span className={`badge ${req.status === 'pending' ? 'badge-yellow' : req.status === 'approved' ? 'badge-green' : 'badge-red'}`}>
                                {req.status}
                              </span>
                            </td>
                            <td>
                              {req.status === 'pending' && (
                                <div className="action-buttons">
                                  <button className="action-btn btn-success" onClick={() => handleRequest(team.id, req.id, 'approved')}>Approve</button>
                                  <button className="action-btn btn-danger" onClick={() => handleRequest(team.id, req.id, 'declined')}>Decline</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
