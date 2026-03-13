import PageShell from '../components/PageShell'

const packages = [
  { id: 1, name: 'robot-sdk', version: '2.4.1', platforms: ['win', 'mac', 'linux'], downloads: 1840, rating: 4.8, reviews: 23 },
  { id: 2, name: 'fleet-monitor', version: '1.1.0', platforms: ['win', 'linux'], downloads: 512, rating: 4.2, reviews: 9 },
  { id: 3, name: 'cert-manager', version: '3.0.0', platforms: ['mac', 'linux'], downloads: 278, rating: 4.5, reviews: 6 },
  { id: 4, name: 'api-gateway', version: '0.9.2', platforms: ['win', 'mac', 'linux'], downloads: 94, rating: 3.9, reviews: 4 },
]

const platformIcon: Record<string, string> = { win: '🪟', mac: '', linux: '🐧' }

function Stars({ rating }: { rating: number }) {
  return (
    <span className="star-rating">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
      <span className="star-value"> {rating}</span>
    </span>
  )
}

export default function SoftwareHub() {
  return (
    <PageShell
      title="Software Hub"
      subtitle="Package registry with multi-platform support"
      icon="📦"
      actions={
        <button className="action-btn btn-primary" disabled>+ Publish Package</button>
      }
    >
      {/* Filters */}
      <section className="skeleton-section">
        <div className="hub-filters">
          <input className="hub-search" placeholder="Search packages…" disabled />
          <div className="action-buttons">
            {['All', 'Windows', 'macOS', 'Linux'].map((p) => (
              <button key={p} className={`action-btn btn-outline ${p === 'All' ? 'btn-filter-active' : ''}`} disabled>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Package list */}
      <section className="skeleton-section">
        <div className="skeleton-section-header">
          <h3 className="skeleton-section-title">Packages</h3>
          <span className="skeleton-badge">{packages.length} packages</span>
        </div>
        <div className="hub-package-list">
          {packages.map((pkg) => (
            <div key={pkg.id} className="hub-package-card">
              <div className="hub-pkg-header">
                <div>
                  <span className="hub-pkg-name">{pkg.name}</span>
                  <span className="muted mono" style={{ fontSize: 12, marginLeft: 8 }}>v{pkg.version}</span>
                </div>
                <div className="action-buttons">
                  <button className="action-btn btn-primary" disabled style={{ fontSize: 12 }}>Download</button>
                </div>
              </div>

              <div className="hub-pkg-meta">
                <div className="hub-platforms">
                  {pkg.platforms.map((p) => (
                    <span key={p} className="platform-tag">{platformIcon[p]} {p}</span>
                  ))}
                </div>
                <div className="hub-pkg-stats">
                  <Stars rating={pkg.rating} />
                  <span className="muted" style={{ fontSize: 12 }}>({pkg.reviews} reviews)</span>
                  <span className="muted" style={{ fontSize: 12 }}>· {pkg.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              {/* Reviews placeholder */}
              <div className="skeleton-placeholder" style={{ height: 48, marginTop: 12 }}>
                <span className="skeleton-placeholder-label">User reviews will appear here</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
