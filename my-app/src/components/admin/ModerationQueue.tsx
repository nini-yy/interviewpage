import { useState } from 'react'

type ItemStatus = 'pending' | 'approved' | 'removed'

interface QueueItem {
  id: number
  type: 'Post' | 'Comment' | 'Profile'
  author: string
  preview: string
  reporter: string
  reason: string
  reported: string
  status: ItemStatus
}

const initialQueue: QueueItem[] = [
  { id: 4821, type: 'Post', author: 'anon_user99', preview: 'This is a misleading claim about the platforms data...', reporter: 'Alice Nguyen', reason: 'Misinformation', reported: '2h ago', status: 'pending' },
  { id: 4818, type: 'Comment', author: 'troll_acc', preview: 'You are all [offensive language removed by system]...', reporter: 'Priya Sharma', reason: 'Hate speech', reported: '5h ago', status: 'pending' },
  { id: 4810, type: 'Profile', author: 'fake_brand_xyz', preview: 'Profile name impersonates a registered company trademark.', reporter: 'System (auto-detect)', reason: 'Impersonation', reported: '1d ago', status: 'pending' },
  { id: 4802, type: 'Post', author: 'spam_bot_44', preview: 'Win $1000 gift cards by clicking this link now!!!', reporter: 'Jordan Park', reason: 'Spam', reported: '2d ago', status: 'pending' },
]

const reasonColors: Record<string, string> = {
  Misinformation: 'badge-yellow',
  'Hate speech': 'badge-red',
  Impersonation: 'badge-red',
  Spam: 'badge-yellow',
}

const typeIcon: Record<string, string> = {
  Post: '📄',
  Comment: '💬',
  Profile: '👤',
}

export default function ModerationQueue() {
  const [items, setItems] = useState<QueueItem[]>(initialQueue)

  function updateStatus(id: number, status: ItemStatus) {
    setItems((q) => q.map((item) => item.id === id ? { ...item, status } : item))
  }

  const pending = items.filter((i) => i.status === 'pending')
  const resolved = items.filter((i) => i.status !== 'pending')

  return (
    <div className="admin-tab-content">
      <div className="admin-table-header">
        <span>
          <span className="badge badge-red">{pending.length} pending</span>
          {' '}
          <span className="muted">{resolved.length} resolved</span>
        </span>
      </div>

      <div className="mod-list">
        {items.map((item) => (
          <div key={item.id} className={`mod-item ${item.status !== 'pending' ? 'mod-item-resolved' : ''}`}>
            <div className="mod-meta">
              <span className="mod-type">{typeIcon[item.type]} {item.type} #{item.id}</span>
              <span className="muted">{item.reported}</span>
            </div>
            <div className="mod-author">by <strong>{item.author}</strong></div>
            <p className="mod-preview">{item.preview}</p>
            <div className="mod-footer">
              <div className="mod-report-info">
                Reported by <strong>{item.reporter}</strong>
                {' · '}
                <span className={`badge ${reasonColors[item.reason] ?? 'badge-yellow'}`}>{item.reason}</span>
              </div>
              {item.status === 'pending' ? (
                <div className="action-buttons">
                  <button className="action-btn btn-success" onClick={() => updateStatus(item.id, 'approved')}>
                    Approve
                  </button>
                  <button className="action-btn btn-danger" onClick={() => updateStatus(item.id, 'removed')}>
                    Remove
                  </button>
                </div>
              ) : (
                <span className={`badge ${item.status === 'approved' ? 'badge-green' : 'badge-red'}`}>
                  {item.status === 'approved' ? 'Approved' : 'Removed'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
