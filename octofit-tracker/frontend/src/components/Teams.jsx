import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const TEAMS_ENDPOINT = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams/` : `${API_BASE_URL}/api/teams/`
const getItems = (payload) => Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || []

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(TEAMS_ENDPOINT).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setTeams(getItems(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1><p className="lede">Shared goals are easier to reach together.</p></div><div className="count-badge"><strong>{teams.length}</strong><span>teams</span></div></div><section className="tile-grid">{status === 'loading' && <p className="state-message">Loading live data...</p>}{status === 'error' && <p className="state-message state-error">Teams could not be loaded.</p>}{status === 'ready' && teams.length === 0 && <p className="state-message">No teams have been created yet.</p>}{status === 'ready' && teams.map((team, index) => <article className="team-tile" key={team.id || team._id || index}><span className="tile-number">0{index + 1}</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A new space to build consistency together.'}</p><span className="tile-meta">{team.members?.length || team.memberCount || 0} members <b>→</b></span></article>)}</section></>
}
export default Teams
