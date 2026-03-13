import { useState } from 'react'

interface Setting {
  id: string
  label: string
  description: string
  value: boolean
  group: string
}

const initialSettings: Setting[] = [
  { id: 'maintenance', label: 'Maintenance Mode', description: 'Show a maintenance page to all non-admin visitors.', value: false, group: 'System' },
  { id: 'registration', label: 'Open Registration', description: 'Allow new users to sign up without an invite.', value: true, group: 'System' },
  { id: 'email_notifs', label: 'Email Notifications', description: 'Send transactional emails (sign-up, password reset, etc.).', value: true, group: 'Communications' },
  { id: 'digest', label: 'Weekly Digest', description: 'Send users a weekly summary of platform activity.', value: false, group: 'Communications' },
  { id: 'auto_mod', label: 'Auto-Moderation', description: 'Automatically flag content matching abuse patterns.', value: true, group: 'Content' },
  { id: 'ai_review', label: 'AI Content Review', description: 'Use AI to pre-screen posts before they go live.', value: false, group: 'Content' },
  { id: 'rate_limit', label: 'API Rate Limiting', description: 'Enforce per-user API rate limits (1000 req/hr).', value: true, group: 'Security' },
  { id: 'two_factor', label: 'Require 2FA for Admins', description: 'Force two-factor authentication for all admin accounts.', value: true, group: 'Security' },
]

const groups = ['System', 'Communications', 'Content', 'Security']

export default function SystemSettings() {
  const [settings, setSettings] = useState<Setting[]>(initialSettings)
  const [saved, setSaved] = useState(false)

  function toggle(id: string) {
    setSettings((s) => s.map((item) => item.id === id ? { ...item, value: !item.value } : item))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="admin-tab-content">
      {groups.map((group) => (
        <div key={group} className="settings-group">
          <h3 className="settings-group-title">{group}</h3>
          <div className="settings-list">
            {settings.filter((s) => s.group === group).map((setting) => (
              <div key={setting.id} className="setting-row">
                <div className="setting-info">
                  <span className="setting-label">{setting.label}</span>
                  <span className="setting-desc">{setting.description}</span>
                </div>
                <button
                  className={`toggle-btn ${setting.value ? 'toggle-on' : 'toggle-off'}`}
                  onClick={() => toggle(setting.id)}
                  role="switch"
                  aria-checked={setting.value}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="settings-footer">
        <button className="action-btn btn-primary" onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
