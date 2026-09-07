import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.results || payload?.data || payload?.items || []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/activities/`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load activities')
        return response.json()
      })
      .then((payload) => {
        setActivities(getItems(payload))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <ResourcePage eyebrow="Movement log" title="Activities" description="See how your community is showing up this week." count={activities.length}>
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorState />}
      {status === 'ready' && activities.length === 0 && <EmptyState label="activities" />}
      {status === 'ready' && activities.length > 0 && <div className="resource-list">{activities.map((activity, index) => <div className="resource-row" key={activity.id || activity._id || index}><span className="row-index">{String(index + 1).padStart(2, '0')}</span><strong>{activity.name || activity.type || 'Training session'}</strong><span>{activity.duration ? `${activity.duration} min` : activity.date || 'Recently logged'}</span><span className="row-value">{activity.calories ? `${activity.calories} kcal` : 'Active'}</span></div>)}</div>}
    </ResourcePage>
  )
}

function ResourcePage({ eyebrow, title, description, count, children }) {
  return <><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div><div className="count-badge"><strong>{count}</strong><span>records</span></div></div><section className="resource-panel">{children}</section></>
}
function Loading() { return <p className="state-message">Loading live data...</p> }
function ErrorState() { return <p className="state-message state-error">The API could not be reached. Check your backend connection.</p> }
function EmptyState({ label }) { return <p className="state-message">No {label} have been recorded yet.</p> }

export default Activities
