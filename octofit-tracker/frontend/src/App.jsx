import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <span className="connection-status"><span /> API connected</span>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          <nav className="nav-list">
            <NavLink end to="/">Overview</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
          <div className="sidebar-note">
            <span className="note-kicker">Today</span>
            <strong>Move with intention.</strong>
            <span>Small efforts add up.</span>
          </div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Monday, September 7, 2026</p>
          <h1>Good morning, team.</h1>
          <p className="lede">A clear view of your fitness community, all in one place.</p>
        </div>
        <NavLink className="primary-action" to="/activities">Log activity <span>+</span></NavLink>
      </div>
      <section className="stat-grid" aria-label="Tracker summary">
        <article className="stat-card stat-card-dark"><span>Weekly movement</span><strong>2,840 <small>min</small></strong><p>+12.8% from last week</p></article>
        <article className="stat-card"><span>Active members</span><strong>128</strong><p>Across 14 teams</p></article>
        <article className="stat-card"><span>Team streak</span><strong>18 <small>days</small></strong><p>Personal best this month</p></article>
      </section>
      <section className="welcome-panel">
        <div><p className="eyebrow">Your command center</p><h2>Keep the momentum visible.</h2><p>Browse live activity, celebrate your leaderboard, and find the next workout that fits your day.</p></div>
        <div className="panel-orbit"><span>FIT</span></div>
      </section>
    </>
  )
}

export default App
