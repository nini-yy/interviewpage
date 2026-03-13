import { useState } from 'react'
import UserManagement from '../components/admin/UserManagement'
import AuditLog from '../components/admin/AuditLog'
import ModerationQueue from '../components/admin/ModerationQueue'
import SystemSettings from '../components/admin/SystemSettings'
import Teams from '../components/admin/Teams'

type Tab = 'users' | 'teams' | 'audit' | 'moderation' | 'settings'

const tabs: { id: Tab; label: string; badge?: number }[] = [
  { id: 'users', label: 'User Management' },
  { id: 'teams', label: 'Teams' },
  { id: 'audit', label: 'Audit Log' },
  { id: 'moderation', label: 'Moderation Queue', badge: 4 },
  { id: 'settings', label: 'System Settings' },
]

interface AdminPanelProps {
  onBack: () => void
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('users')

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="admin-header-left">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <div>
            <h1 className="dashboard-title">Admin Panel</h1>
            <p className="dashboard-date">System administration</p>
          </div>
        </div>
        <span className="admin-badge">Admin</span>
      </header>

      <nav className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.badge != null && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'teams' && <Teams />}
        {activeTab === 'audit' && <AuditLog />}
        {activeTab === 'moderation' && <ModerationQueue />}
        {activeTab === 'settings' && <SystemSettings />}
      </main>
    </div>
  )
}
