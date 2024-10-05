import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FilmSearch = () => {
  const [query, setQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Resets the error state

    try {
      // Fetch data from backend
      const response = await fetch(`/api/films/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error searching for films');
      } else {
        setFilms(data); // Sets the return films in state
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Search for a film</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter film title..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}

      <ul>
        {films.map( (film) => (
          <li key={film.id}>
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