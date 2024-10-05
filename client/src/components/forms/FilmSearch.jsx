import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FilmSearch = () => {
  const [query, setQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Resets the error state
    setLoading(true); // Start loading

    try {
      // Fetch data from backend
      const response = await fetch(`/api/films/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      setLoading(false); // Stop loading

      if (!response.ok) {
        setError(data.message || 'Error searching for films');
      } else {
        setFilms(data); // Sets the return films in state
      }
    } catch (error) {
      setLoading(false); // Stop loading even if there's an error
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="film-search">
      <h2>Search for a film</h2>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter film title..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}  {/* Display loading state */}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}

      <ul className="film-list">
        {films.map( (film) => (
          <li key={film.id} className="film-item">
            <Link to={`/films/${film.id}`}>
              <strong>{film.title}</strong> ({film.release_date})
            </Link>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmSearch;
