import { useEffect, useRef, useState } from 'react'
import type { AppView } from './NavDropdown'

interface SearchResult {
  id: string
  title: string
  subtitle: string
  module: string
  moduleIcon: string
  view: AppView
}

const allResults: SearchResult[] = [
  // Users
  { id: 'u1', title: 'Stephanie Yang', subtitle: 'Admin · sy@example.com', module: 'Users', moduleIcon: '👤', view: 'dashboard' },
  { id: 'u2', title: 'Alice Nguyen', subtitle: 'Editor · alice@example.com', module: 'Users', moduleIcon: '👤', view: 'dashboard' },
  { id: 'u3', title: 'Jordan Park', subtitle: 'Viewer · jordan@example.com', module: 'Users', moduleIcon: '👤', view: 'dashboard' },
  { id: 'u4', title: 'Priya Sharma', subtitle: 'Editor · priya@example.com', module: 'Users', moduleIcon: '👤', view: 'dashboard' },
  { id: 'u5', title: 'marcus_dev', subtitle: 'Viewer · marcus@example.com', module: 'Users', moduleIcon: '👤', view: 'dashboard' },
  // Wiki pages
  { id: 'w1', title: 'Getting Started', subtitle: 'Wiki · Published', module: 'Wiki', moduleIcon: '📖', view: 'wiki' },
  { id: 'w2', title: 'Installation', subtitle: 'Wiki · Getting Started', module: 'Wiki', moduleIcon: '📖', view: 'wiki' },
  { id: 'w3', title: 'Configuration', subtitle: 'Wiki · Draft', module: 'Wiki', moduleIcon: '📖', view: 'wiki' },
  { id: 'w4', title: 'Connecting a Robot', subtitle: 'Wiki · Robot Management', module: 'Wiki', moduleIcon: '📖', view: 'wiki' },
  { id: 'w5', title: 'API Reference', subtitle: 'Wiki · Draft', module: 'Wiki', moduleIcon: '📖', view: 'wiki' },
  // Forum posts
  { id: 'f1', title: 'How do I rotate API keys without downtime?', subtitle: 'Forum · Robot Help & Support · 4 replies', module: 'Forum', moduleIcon: '💬', view: 'forum' },
  { id: 'f2', title: 'Wiki page permissions not working correctly', subtitle: 'Forum · General Discussion · 2 replies', module: 'Forum', moduleIcon: '💬', view: 'forum' },
  { id: 'f3', title: 'Feature request: bulk robot certificate renewal', subtitle: 'Forum · Feature Requests · 7 replies', module: 'Forum', moduleIcon: '💬', view: 'forum' },
  // Packages
  { id: 'p1', title: 'robot-sdk', subtitle: 'Software Hub · v2.4.1 · Win / Mac / Linux', module: 'Packages', moduleIcon: '📦', view: 'software' },
  { id: 'p2', title: 'fleet-monitor', subtitle: 'Software Hub · v1.1.0 · Win / Linux', module: 'Packages', moduleIcon: '📦', view: 'software' },
  { id: 'p3', title: 'cert-manager', subtitle: 'Software Hub · v3.0.0 · Mac / Linux', module: 'Packages', moduleIcon: '📦', view: 'software' },
  { id: 'p4', title: 'api-gateway', subtitle: 'Software Hub · v0.9.2 · Win / Mac / Linux', module: 'Packages', moduleIcon: '📦', view: 'software' },
  // Robots
  { id: 'r1', title: 'Alpha Unit', subtitle: 'Robot · RBT-001 · Online', module: 'Robots', moduleIcon: '🤖', view: 'robots' },
  { id: 'r2', title: 'Beta Unit', subtitle: 'Robot · RBT-002 · Online', module: 'Robots', moduleIcon: '🤖', view: 'robots' },
  { id: 'r3', title: 'Gamma Unit', subtitle: 'Robot · RBT-003 · Offline', module: 'Robots', moduleIcon: '🤖', view: 'robots' },
]

const moduleOrder = ['Users', 'Wiki', 'Forum', 'Packages', 'Robots']

interface GlobalSearchProps {
  onNavigate: (view: AppView) => void
}

export default function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim().toLowerCase()
  const results = trimmed.length < 1
    ? []
    : allResults.filter(
        (r) =>
          r.title.toLowerCase().includes(trimmed) ||
          r.subtitle.toLowerCase().includes(trimmed) ||
          r.module.toLowerCase().includes(trimmed)
      )

  const grouped = moduleOrder.reduce<Record<string, SearchResult[]>>((acc, mod) => {
    const items = results.filter((r) => r.module === mod)
    if (items.length) acc[mod] = items
    return acc
  }, {})

  const flatResults = moduleOrder.flatMap((mod) => grouped[mod] ?? [])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      select(flatResults[activeIndex])
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  function select(result: SearchResult) {
    onNavigate(result.view)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  function getFlatIndex(result: SearchResult) {
    return flatResults.findIndex((r) => r.id === result.id)
  }

  return (
    <div className="gsearch-container" ref={containerRef}>
      <div className={`gsearch-bar ${open ? 'gsearch-bar-open' : ''}`}>
        <span className="gsearch-icon">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9.34 10.4a5 5 0 1 1 1.06-1.06l3.1 3.1a.75.75 0 1 1-1.06 1.06L9.34 10.4Z" fill="currentColor"/>
          </svg>
        </span>
        <input
          ref={inputRef}
          className="gsearch-input"
          placeholder="Search users, wiki, forum, packages…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Global search"
          autoComplete="off"
        />
        {query && (
          <button className="gsearch-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>✕</button>
        )}
        <kbd className="gsearch-kbd">⌘K</kbd>
      </div>

      {open && (
        <div className="gsearch-results">
          {trimmed.length < 1 ? (
            <div className="gsearch-empty">
              <span>Start typing to search across all modules</span>
            </div>
          ) : results.length === 0 ? (
            <div className="gsearch-empty">
              <span>No results for <strong>"{query}"</strong></span>
            </div>
          ) : (
            Object.entries(grouped).map(([module, items]) => (
              <div key={module} className="gsearch-group">
                <div className="gsearch-group-label">{items[0].moduleIcon} {module}</div>
                {items.map((result) => {
                  const flatIdx = getFlatIndex(result)
                  return (
                    <button
                      key={result.id}
                      className={`gsearch-result-item ${flatIdx === activeIndex ? 'gsearch-result-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(flatIdx)}
                      onClick={() => select(result)}
                    >
                      <div className="gsearch-result-text">
                        <span className="gsearch-result-title">{highlight(result.title, trimmed)}</span>
                        <span className="gsearch-result-sub">{result.subtitle}</span>
                      </div>
                      <span className="gsearch-result-arrow">→</span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
          {results.length > 0 && (
            <div className="gsearch-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function highlight(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="gsearch-mark">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}
