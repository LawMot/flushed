import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logoToilet.svg'
import magnifying from '../assets/searchIcon.svg'
import './navbar.css'

function NavBar({ onCreateReview }) {
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
    <nav id="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-link" id='navbar-brand'>
          <span className="navbar-title">f</span>
          <img className="navbar-logo" src={logo} alt="flushed toilet logo" />
          <span className="navbar-title">ushed</span>
        </Link>
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <img src={magnifying} alt='search bar magnifying glass'/>
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