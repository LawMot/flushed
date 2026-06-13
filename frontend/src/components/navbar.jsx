import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import logoToilet from '../assets/logoToilet.svg';
import CreateReview from '../pages/CreateReview';
import magnifying from "../assets/searchIcon.svg";

function NavBar({ logo, onCreateReview }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setRecentSearches] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/signUp' || location.pathname === '/admin';

  const availableBuildings = [
    "The Hub",
    "Student Success Center",
    "Winston Chung Hall"
  ];

  const handleCreateReview = () => {
    setShowCreate(true);
    onCreateReview?.();
  };

  const processSearch = (value) => {
    const q = value.trim();
    if (!q) return;

    const exactMatch = availableBuildings.find(
      (b) => b.toLowerCase() === q.toLowerCase()
    );

    const finalQuery = exactMatch ? exactMatch : q;

    setRecentSearches((prev) => (prev ? `${prev},${finalQuery}` : finalQuery));
    navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    processSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (availableBuildings.includes(value)) {
      processSearch(value);
    }
  };

  return (
    <nav id="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-link" id='navbar-brand'>
          <span className="navbar-title">f</span>
          <img className="navbar-logo" src={logoToilet} alt="flushed toilet logo" />
          <span className="navbar-title">ushed</span>
        </Link>
        
        {!isAuthPage && (
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <img src={magnifying} alt='search bar magnifying glass'/>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Type building name..."
              value={searchQuery}
              onChange={handleInputChange}
              list="building-options"
              autoComplete="off" 
            />
            
            <datalist id="building-options">
              {availableBuildings.map((building, idx) => (
                <option key={idx} value={building} />
              ))}
            </datalist>
          </form>
        )}

        {!isAuthPage && (
          <div className="navbar-links">
            <Link className="navbar-link" to="/home">Home</Link>
            <Link className="navbar-link" to="/reviews">Reviews</Link>
            <Link className="navbar-link" to="/profile">Profile</Link>
          </div>
        )}

        {!isAuthPage && (
          <button
            type="button"
            className="navbar-create"
            onClick={handleCreateReview}
          >
            Create Review
          </button>
        )}
      </div>

      <CreateReview
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={(data) => console.log('Review data from navbar:', data)}
      />
    </nav>
  );
}

export default NavBar;