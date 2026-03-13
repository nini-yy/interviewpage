import { useEffect, useRef, useState } from 'react'

export type AppView =
  | 'dashboard'
  | 'onboarding'
  | 'wiki'
  | 'forum'
  | 'robots'
  | 'software'
  | 'admin'

const navItems: { view: AppView; label: string; icon: string; description: string }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: '⊞', description: 'Activity, stats & summaries' },
  { view: 'onboarding', label: 'Onboarding', icon: '🚀', description: 'Phased tasks with progress tracking' },
  { view: 'wiki', label: 'Wiki', icon: '📖', description: 'Hierarchical pages & version history' },
  { view: 'forum', label: 'Forum', icon: '💬', description: 'Categories, topics & nested replies' },
  { view: 'robots', label: 'Robot Management', icon: '🤖', description: 'Connect, control & manage robots' },
  { view: 'software', label: 'Software Hub', icon: '📦', description: 'Package registry & downloads' },
]

interface NavDropdownProps {
  current: AppView
  onChange: (view: AppView) => void
}

export default function NavDropdown({ current, onChange }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentItem = navItems.find((n) => n.view === current) ?? navItems[0]

  function select(view: AppView) {
    onChange(view)
    setOpen(false)
  }

  return (
    <div className="nav-dropdown" ref={ref}>
      <button className="nav-trigger" onClick={() => setOpen((o) => !o)}>
        <span className="nav-trigger-icon">{currentItem.icon}</span>
        <span className="nav-trigger-label">{currentItem.label}</span>
        <span className={`nav-chevron ${open ? 'open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.view}
              className={`nav-menu-item ${current === item.view ? 'active' : ''}`}
              onClick={() => select(item.view)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <div className="nav-item-text">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-desc">{item.description}</span>
              </div>
              {current === item.view && <span className="nav-item-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
