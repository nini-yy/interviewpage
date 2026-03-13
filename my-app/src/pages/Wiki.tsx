import PageShell from '../components/PageShell'

const pageTree = [
  { id: 1, title: 'Getting Started', level: 0, status: 'published' },
  { id: 2, title: 'Installation', level: 1, status: 'published' },
  { id: 3, title: 'Configuration', level: 1, status: 'draft' },
  { id: 4, title: 'Robot Management', level: 0, status: 'published' },
  { id: 5, title: 'Connecting a Robot', level: 1, status: 'published' },
  { id: 6, title: 'API Reference', level: 1, status: 'draft' },
  { id: 7, title: 'Permissions', level: 2, status: 'draft' },
]

export default function Wiki() {
  return (
    <PageShell
      title="Wiki"
      subtitle="Collaborative knowledge base"
      icon="📖"
      actions={
        <button className="action-btn btn-primary" disabled>+ New Page</button>
      }
    >
      <div className="wiki-layout">
        {/* Sidebar — page tree */}
        <aside className="wiki-sidebar">
          <div className="skeleton-section-header" style={{ padding: '0 0 12px' }}>
            <span className="skeleton-section-title">Pages</span>
            <span className="skeleton-badge">{pageTree.length}</span>
          </div>
          <nav className="wiki-tree">
            {pageTree.map((page) => (
              <div
                key={page.id}
                className="wiki-tree-item"
                style={{ paddingLeft: `${12 + page.level * 16}px` }}
              >
                <span className="wiki-tree-label">{page.title}</span>
                <span className={`wiki-status wiki-status-${page.status}`}>{page.status}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="wiki-main">
          {/* Toolbar */}
          <div className="wiki-toolbar">
            <div className="wiki-toolbar-left">
              <span className="skeleton-badge skeleton-badge-muted">Draft</span>
              <span className="wiki-breadcrumb">Getting Started → Installation</span>
            </div>
            <div className="action-buttons">
              <button className="action-btn btn-outline" disabled>History</button>
              <button className="action-btn btn-outline" disabled>Publish</button>
              <button className="action-btn btn-primary" disabled>Edit</button>
            </div>
          </div>

          {/* Editor placeholder */}
          <div className="skeleton-placeholder tall">
            <span className="skeleton-placeholder-label">Rich-text editor will render here</span>
          </div>

          {/* Version history placeholder */}
          <section className="skeleton-section" style={{ marginTop: 24 }}>
            <h3 className="skeleton-section-title">Version History</h3>
            <div className="version-list">
              {['v3 — Added API section', 'v2 — Updated examples', 'v1 — Initial draft'].map((v) => (
                <div key={v} className="version-row">
                  <span className="muted mono">{v}</span>
                  <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Restore</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
