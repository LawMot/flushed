import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

function NavBar({ logo, onCreateReview }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setRecentSearches((prev) => (prev ? `${prev},${q}` : q))
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          {logo && <img className="navbar-logo" src={logo} alt="flushed logo" />}
          <span className="navbar-title">flushed</span>
        </div>
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <svg
            className="navbar-search-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search Restrooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="navbar-links">
          <Link className="navbar-link" to="/home">Home</Link>
          <Link className="navbar-link" to="/reviews">Reviews</Link>
          <Link className="navbar-link" to="/profile">Profile</Link>
        </div>
        <button
          type="button"
          className="navbar-create"
          onClick={onCreateReview}
        >
          Create Review
        </button>
      </div>
    </nav>
  )
}

export default NavBar