import { useState } from 'react'
import './App.css'
import NavDropdown, { type AppView } from './components/NavDropdown'
import GlobalSearch from './components/GlobalSearch'
import ProfileMenu from './components/ProfileMenu'
import PersonalStats from './components/PersonalStats'
import PlatformSummary from './components/PlatformSummary'
import ActivityFeed from './components/ActivityFeed'
import AdminPanel from './pages/AdminPanel'
import Onboarding from './pages/Onboarding'
import Wiki from './pages/Wiki'
import Forum from './pages/Forum'
import RobotManagement from './pages/RobotManagement'
import SoftwareHub from './pages/SoftwareHub'

export default function App() {
  const [view, setView] = useState<AppView>('dashboard')
  const [adminOpen, setAdminOpen] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  if (adminOpen) {
    return <AdminPanel onBack={() => setAdminOpen(false)} />
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <NavDropdown current={view} onChange={setView} />
        <GlobalSearch onNavigate={setView} />
        <div className="dashboard-header-right">
          <p className="dashboard-date">{today}</p>
          <ProfileMenu onOpenAdmin={() => setAdminOpen(true)} />
        </div>
      </header>

      <main className="dashboard-main">
        {view === 'dashboard' && (
          <>
            <PersonalStats />
            <PlatformSummary />
            <ActivityFeed />
          </>
        )}
        {view === 'onboarding' && <Onboarding />}
        {view === 'wiki' && <Wiki />}
        {view === 'forum' && <Forum />}
        {view === 'robots' && <RobotManagement />}
        {view === 'software' && <SoftwareHub />}
      </main>
    </div>
  )
}
