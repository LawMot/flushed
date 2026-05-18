import { useState } from 'react'
import './NavBar.css'

function NavBar({ logo, onNavigate, onCreateReview }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setRecentSearches((prev) => (prev ? `${prev},${q}` : q))
  }

  const handleNav = (page) => {
    if (onNavigate) onNavigate(page)
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
          <button
            type="button"
            className="navbar-link"
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            type="button"
            className="navbar-link"
            onClick={() => handleNav('reviews')}
          >
            Reviews
          </button>
          <button
            type="button"
            className="navbar-link"
            onClick={() => handleNav('profile')}
          >
            Profile
          </button>
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
