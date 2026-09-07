import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const USERS_ENDPOINT = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/users/` : `${API_BASE_URL}/api/users/`
const getItems = (payload) => Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || []

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(USERS_ENDPOINT).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setUsers(getItems(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Community directory</p><h1>Members</h1><p className="lede">Know who is moving with you.</p></div><div className="count-badge"><strong>{users.length}</strong><span>members</span></div></div><section className="resource-panel">{status === 'loading' && <p className="state-message">Loading live data...</p>}{status === 'error' && <p className="state-message state-error">Members could not be loaded.</p>}{status === 'ready' && users.length === 0 && <p className="state-message">No members have joined yet.</p>}{status === 'ready' && users.length > 0 && <div className="resource-list">{users.map((user, index) => <div className="resource-row" key={user.id || user._id || index}><span className="avatar">{(user.name || user.username || 'U').charAt(0).toUpperCase()}</span><strong>{user.name || user.username || 'Member'}</strong><span>{user.email || 'OctoFit member'}</span><span className="row-value">{user.team || 'Unassigned'}</span></div>)}</div>}</section></>
}
export default Users
