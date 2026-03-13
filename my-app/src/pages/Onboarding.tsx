import PageShell from '../components/PageShell'

const phases = [
  {
    number: 1,
    title: 'Getting Started',
    tasks: ['Introduction video', 'Account setup', 'Profile completion'],
    status: 'upcoming' as const,
  },
  {
    number: 2,
    title: 'Core Concepts',
    tasks: ['Interactive walkthrough', 'Knowledge check quiz', 'First project setup'],
    status: 'upcoming' as const,
  },
  {
    number: 3,
    title: 'Advanced Features',
    tasks: ['Robot connection guide', 'API key setup', 'Team collaboration'],
    status: 'upcoming' as const,
  },
]

export default function Onboarding() {
  return (
    <PageShell
      title="Onboarding"
      subtitle="Complete your setup with guided tasks"
      icon="🚀"
    >
      {/* Progress bar */}
      <section className="skeleton-section">
        <div className="skeleton-section-header">
          <h3 className="skeleton-section-title">Overall Progress</h3>
          <span className="skeleton-badge">0 / 9 tasks</span>
        </div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: '0%' }} />
        </div>
        <p className="skeleton-hint">Complete all phases to finish onboarding</p>
      </section>

      {/* Phases */}
      <section className="skeleton-section">
        <h3 className="skeleton-section-title">Phases</h3>
        <div className="onboarding-phases">
          {phases.map((phase) => (
            <div key={phase.number} className="phase-card">
              <div className="phase-header">
                <span className="phase-number">Phase {phase.number}</span>
                <span className="skeleton-badge skeleton-badge-muted">{phase.status}</span>
              </div>
              <h4 className="phase-title">{phase.title}</h4>
              <ul className="phase-tasks">
                {phase.tasks.map((task) => (
                  <li key={task} className="phase-task">
                    <span className="task-check-empty" />
                    <span>{task}</span>
                    <span className="task-type-icon">—</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Content viewer placeholder */}
      <section className="skeleton-section">
        <h3 className="skeleton-section-title">Content Viewer</h3>
        <div className="skeleton-placeholder tall">
          <span className="skeleton-placeholder-label">Slides / Video / Interactive content will render here</span>
        </div>
      </section>
    </PageShell>
  )
}
