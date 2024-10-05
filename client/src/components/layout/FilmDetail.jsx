import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FilmDetail = () => {
  const { filmId } = useParams();  // Get the film ID from the URL
  const [film, setFilm] = useState(null);  // State to hold film details
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  // Fetch film details from the TMDb API
  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await fetch(`/api/films/${filmId}`);
        const data = await response.json();

        console.log('Response data:', data);

        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error(data.message || 'Error fetching films');
        }

        setFilm(data);  // Set the film data
        setLoading(false);  // Set loading to false once data is loaded
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Stop loading even if there was an error
      }
    };

    fetchFilmDetails();
  }, [filmId]);  // Dependency on filmId

  if (loading) return <p>Loading...</p>;  // Show loading message
  if (error) return <p>Error: {error}</p>;  // Show error message if there’s an error

  return (
    <div>
      {film ? (
        <>
          <h2>{film.title}</h2>
          <img src={film.poster_url} alt={film.title} />
          <p>{film.overview}</p>
          <p>Release Date: {film.release_date}</p>
          {/* You can add more details about the film here */}
        </>
      ) : (
        <p>No film found</p>
      )}
    </div>
  );
};

export default FilmDetail;
