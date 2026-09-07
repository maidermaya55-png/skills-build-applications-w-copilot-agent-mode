import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const getItems = (payload) => Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || []

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(`${API_BASE_URL}/api/leaderboard/`).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setLeaders(getItems(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">A little visibility makes every effort count.</p></div><div className="count-badge"><strong>{leaders.length}</strong><span>athletes</span></div></div><section className="resource-panel leaderboard-panel">{status === 'loading' && <p className="state-message">Loading live data...</p>}{status === 'error' && <p className="state-message state-error">The leaderboard is not available right now.</p>}{status === 'ready' && leaders.length === 0 && <p className="state-message">No leaderboard entries yet.</p>}{status === 'ready' && leaders.length > 0 && leaders.map((leader, index) => <div className="leader-row" key={leader.id || leader._id || index}><span className={`rank rank-${index + 1}`}>{index + 1}</span><span className="avatar">{(leader.name || leader.username || 'A').charAt(0).toUpperCase()}</span><strong>{leader.name || leader.username || 'Athlete'}</strong><span className="leader-team">{leader.team || 'OctoFit team'}</span><strong className="leader-score">{leader.score || leader.points || 0}<small> pts</small></strong></div>)}</section></>
}
export default Leaderboard
