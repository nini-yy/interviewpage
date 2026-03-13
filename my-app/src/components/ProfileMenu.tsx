import { useEffect, useRef, useState } from 'react'

interface MyTeam {
  id: number
  name: string
  role: string
}

interface PendingInvite {
  id: number
  team: string
  invitedBy: string
  expires: string
}

const myTeams: MyTeam[] = [
  { id: 1, name: 'Engineering', role: 'Owner' },
  { id: 2, name: 'Operations', role: 'Admin' },
]

const pendingInvites: PendingInvite[] = [
  { id: 1, team: 'Design', invitedBy: 'Jordan Park', expires: 'Mar 20, 2026' },
]

const allTeams = ['Engineering', 'Operations', 'Design', 'Marketing', 'Security']

interface ProfileMenuProps {
  onOpenAdmin: () => void
}

export default function ProfileMenu({ onOpenAdmin }: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<'overview' | 'request'>('overview')
  const [requestTeam, setRequestTeam] = useState('')
  const [requestNote, setRequestNote] = useState('')
  const [sentRequests, setSentRequests] = useState<string[]>([])
  const [invites, setInvites] = useState(pendingInvites)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSection('overview')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function sendRequest() {
    if (!requestTeam) return
    setSentRequests((r) => [...r, requestTeam])
    setRequestTeam('')
    setRequestNote('')
    setSection('overview')
  }

  function acceptInvite(id: number) {
    setInvites((inv) => inv.filter((i) => i.id !== id))
  }

  function declineInvite(id: number) {
    setInvites((inv) => inv.filter((i) => i.id !== id))
  }

  const availableTeams = allTeams.filter(
    (t) => !myTeams.some((m) => m.name === t) && !sentRequests.includes(t)
  )

  return (
    <div className="profile-menu-container" ref={ref}>
      <button
        className="dashboard-avatar"
        onClick={() => setOpen((o) => !o)}
        title="Profile"
        aria-label="Profile menu"
      >
        SY
      </button>

      {open && (
        <div className="profile-menu">
          {/* Profile header */}
          <div className="profile-menu-header">
            <div className="profile-menu-avatar">SY</div>
            <div>
              <div className="profile-menu-name">Stephanie Yang</div>
              <div className="profile-menu-email">sy@example.com</div>
            </div>
            <span className="admin-badge" style={{ marginLeft: 'auto' }}>Admin</span>
          </div>

          <div className="profile-menu-divider" />

          {section === 'overview' && (
            <>
              {/* Pending invites */}
              {invites.length > 0 && (
                <div className="profile-menu-section">
                  <div className="profile-section-label">
                    Pending Invites
                    <span className="tab-badge" style={{ marginLeft: 6 }}>{invites.length}</span>
                  </div>
                  {invites.map((inv) => (
                    <div key={inv.id} className="profile-invite-row">
                      <div className="profile-invite-info">
                        <span className="profile-invite-team">{inv.team}</span>
                        <span className="muted" style={{ fontSize: 11 }}>from {inv.invitedBy} · expires {inv.expires}</span>
                      </div>
                      <div className="action-buttons">
                        <button className="action-btn btn-success" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => acceptInvite(inv.id)}>Accept</button>
                        <button className="action-btn btn-danger" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => declineInvite(inv.id)}>Decline</button>
                      </div>
                    </div>
                  ))}
                  <div className="profile-menu-divider" />
                </div>
              )}

              {/* My teams */}
              <div className="profile-menu-section">
                <div className="profile-section-label">My Teams</div>
                {myTeams.map((t) => (
                  <div key={t.id} className="profile-team-row">
                    <span className="profile-team-initial">{t.name[0]}</span>
                    <span className="profile-team-name">{t.name}</span>
                    <span className={`badge ${t.role === 'Owner' ? 'badge-red' : t.role === 'Admin' ? 'badge-yellow' : 'badge-green'}`} style={{ fontSize: 11 }}>
                      {t.role}
                    </span>
                  </div>
                ))}
                {sentRequests.length > 0 && sentRequests.map((t) => (
                  <div key={t} className="profile-team-row" style={{ opacity: 0.6 }}>
                    <span className="profile-team-initial">{t[0]}</span>
                    <span className="profile-team-name">{t}</span>
                    <span className="badge badge-yellow" style={{ fontSize: 11 }}>Requested</span>
                  </div>
                ))}
              </div>

              <div className="profile-menu-divider" />

              {/* Actions */}
              <div className="profile-menu-actions">
                <button
                  className="profile-action-btn"
                  onClick={() => setSection('request')}
                  disabled={availableTeams.length === 0}
                >
                  <span>🙋</span> Request to Join a Team
                </button>
                <button
                  className="profile-action-btn"
                  onClick={() => { onOpenAdmin(); setOpen(false) }}
                >
                  <span>⚙️</span> Admin Panel
                </button>
              </div>
            </>
          )}

          {section === 'request' && (
            <div className="profile-menu-section">
              <button className="back-btn" style={{ marginBottom: 12 }} onClick={() => setSection('overview')}>
                ← Back
              </button>
              <div className="profile-section-label">Request to Join Team</div>

              <div className="request-form">
                <select
                  className="role-select"
                  style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}
                  value={requestTeam}
                  onChange={(e) => setRequestTeam(e.target.value)}
                >
                  <option value="">Select a team…</option>
                  {availableTeams.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <textarea
                  className="request-note"
                  placeholder="Add a note (optional)"
                  rows={3}
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                />

                <button
                  className="action-btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={sendRequest}
                  disabled={!requestTeam}
                >
                  Send Request
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
