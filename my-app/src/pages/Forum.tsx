import PageShell from '../components/PageShell'

const categories = [
  { id: 1, name: 'Announcements', topics: 12, icon: '📢' },
  { id: 2, name: 'General Discussion', topics: 84, icon: '💬' },
  { id: 3, name: 'Robot Help & Support', topics: 37, icon: '🤖' },
  { id: 4, name: 'Software Hub', topics: 21, icon: '📦' },
  { id: 5, name: 'Feature Requests', topics: 56, icon: '💡' },
]

const recentTopics = [
  { id: 1, title: 'How do I rotate API keys without downtime?', author: 'Jordan Park', replies: 4, tags: ['api', 'robots'], solved: true },
  { id: 2, title: 'Wiki page permissions not working correctly', author: 'Priya Sharma', replies: 2, tags: ['wiki', 'bug'], solved: false },
  { id: 3, title: 'Feature request: bulk robot certificate renewal', author: 'Alice Nguyen', replies: 7, tags: ['robots', 'certs'], solved: false },
]

export default function Forum() {
  return (
    <PageShell
      title="Forum"
      subtitle="Community discussions and support"
      icon="💬"
      actions={
        <button className="action-btn btn-primary" disabled>+ New Topic</button>
      }
    >
      <div className="forum-layout">
        {/* Categories */}
        <section className="skeleton-section">
          <h3 className="skeleton-section-title">Categories</h3>
          <div className="forum-categories">
            {categories.map((cat) => (
              <div key={cat.id} className="forum-category-card">
                <span className="forum-cat-icon">{cat.icon}</span>
                <div className="forum-cat-info">
                  <span className="forum-cat-name">{cat.name}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{cat.topics} topics</span>
                </div>
                <span className="nav-chevron" style={{ fontSize: 12, color: 'var(--text)' }}>›</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent topics */}
        <section className="skeleton-section">
          <div className="skeleton-section-header">
            <h3 className="skeleton-section-title">Recent Topics</h3>
            <div className="action-buttons">
              <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Filter</button>
              <button className="action-btn btn-outline" disabled style={{ fontSize: 12 }}>Sort</button>
            </div>
          </div>
          <div className="forum-topic-list">
            {recentTopics.map((topic) => (
              <div key={topic.id} className="forum-topic-row">
                <div className="forum-topic-main">
                  {topic.solved && <span className="solved-badge">✓ Solved</span>}
                  <span className="forum-topic-title">{topic.title}</span>
                  <div className="forum-topic-meta">
                    <span className="muted" style={{ fontSize: 12 }}>by {topic.author}</span>
                    <div className="forum-tags">
                      {topic.tags.map((t) => (
                        <span key={t} className="forum-tag">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="forum-reply-count">{topic.replies} replies</span>
              </div>
            ))}
          </div>
        </section>

        {/* Thread / reply placeholder */}
        <section className="skeleton-section">
          <h3 className="skeleton-section-title">Thread View</h3>
          <div className="skeleton-placeholder" style={{ height: 120 }}>
            <span className="skeleton-placeholder-label">Selected topic with nested replies, emoji reactions & bookmarks</span>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
