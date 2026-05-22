import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import logoToilet from '../assets/logoToilet.svg';
import CreateReview from '../pages/CreateReview';
import magnifying from "../assets/searchIcon.svg";

function NavBar({ logo, onCreateReview }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [, setRecentSearches] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()

  const handleCreateReview = () => {
    setShowCreate(true)
    onCreateReview?.()
  }

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
          <img className="navbar-logo" src={logoToilet} alt="flushed toilet logo" />
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
          onClick={handleCreateReview}
        >
          Create Review
        </button>
      </div>

      <CreateReview
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={(data) => console.log('Review data from navbar:', data)}
      />
    </nav>
  )
}

export default NavBar