import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'
const WORKOUTS_ENDPOINT = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts/` : `${API_BASE_URL}/api/workouts/`
const getItems = (payload) => Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || []

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(WORKOUTS_ENDPOINT).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setWorkouts(getItems(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <><div className="page-heading"><div><p className="eyebrow">Personal suggestions</p><h1>Workouts</h1><p className="lede">Choose a session that meets your energy where it is.</p></div><div className="count-badge"><strong>{workouts.length}</strong><span>suggestions</span></div></div><section className="tile-grid workout-grid">{status === 'loading' && <p className="state-message">Loading live data...</p>}{status === 'error' && <p className="state-message state-error">Workouts could not be loaded.</p>}{status === 'ready' && workouts.length === 0 && <p className="state-message">No workouts have been suggested yet.</p>}{status === 'ready' && workouts.map((workout, index) => <article className="workout-tile" key={workout.id || workout._id || index}><span className="workout-type">{workout.type || 'Training'}</span><h2>{workout.name || workout.title || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for a stronger day.'}</p><footer><span>{workout.duration || 30} min</span><span>{workout.difficulty || 'All levels'}</span></footer></article>)}</section></>
}
export default Workouts
