import type { ReactNode } from 'react'

interface PageShellProps {
  title: string
  subtitle: string
  icon: string
  actions?: ReactNode
  children: ReactNode
}

export default function PageShell({ title, subtitle, icon, actions, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <div className="page-shell-header">
        <div className="page-shell-title-group">
          <span className="page-shell-icon">{icon}</span>
          <div>
            <h2 className="page-shell-title">{title}</h2>
            <p className="page-shell-subtitle">{subtitle}</p>
          </div>
        </div>
        {actions && <div className="page-shell-actions">{actions}</div>}
      </div>
      <div className="page-shell-body">{children}</div>
    </div>
  )
}
