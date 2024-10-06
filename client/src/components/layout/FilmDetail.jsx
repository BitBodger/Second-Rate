import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsciiStarRating from './AsciiStarRating';  // Import the star rating component

const FilmDetail = () => {
  const { filmId } = useParams();  // Get the film ID from the URL
  const [film, setFilm] = useState(null);  // State to hold film details
  const [ratings, setRatings] = useState([]);  // State to hold ratings from followed users
  const [globalAverage, setGlobalAverage] = useState(0);  // State for global average rating
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling
  const userId = localStorage.getItem('userId');  // Assuming you store userId in localStorage

  // Fetch film details and ratings from the backend
  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        // Fetch film details from TMDb
        const filmResponse = await fetch(`/api/films/${filmId}`);
        const filmData = await filmResponse.json();

        if (!filmResponse.ok) {
          throw new Error(filmData.message || 'Error fetching film details');
        }

        // Fetch ratings from followed users and the global average
        const ratingsResponse = await fetch(`/api/films/${filmId}/ratings/followed/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent
          },
        });
        const ratingsData = await ratingsResponse.json();

        if (!ratingsResponse.ok) {
          throw new Error(ratingsData.message || 'Error fetching ratings');
        }

        // Set the film, ratings, and global average
        setFilm(filmData);
        setRatings(ratingsData.followedRatings);
        setGlobalAverage(ratingsData.globalAverage);
        setLoading(false);  // Stop loading when data is loaded
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Stop loading even if there was an error
      }
    };

    fetchFilmDetails();
  }, [filmId, userId]);

  // Handle submitting the rating
  const handleRatingSubmit = async (ratingValue) => {
    try {
      const response = await fetch(`/api/ratings/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you send the user token
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'), // Assuming you store the user ID
          filmId,
          rating: ratingValue
        })
      });
      
      if (!response.ok) {
        throw new Error('Error submitting rating');
      }
      const data = await response.json();
      console.log('Rating submitted:', data);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;  // Show loading message
  if (error) return <p>Error: {error}</p>;  // Show error message if there's an error

  return (
    <div>
      {film ? (
        <>
          <h2>{film.title}</h2>
          <img src={film.poster_url} alt={film.title} />
          <p>{film.overview}</p>
          <p>Release Date: {film.release_date}</p>

          {/* Display Global Average Rating */}
          <p><strong>Global Average Rating:</strong> {globalAverage.toFixed(1)}</p>

          {/* Display Followed Users' Ratings */}
          <h3>Ratings from Users You Follow:</h3>
          {ratings.length > 0 ? (
            <ul>
              {ratings.map((rating) => (
                <li key={rating.id}>
                  <strong>{rating.username}</strong>: {rating.rating}/10
                </li>
              ))}
            </ul>
          ) : (
            <p>No ratings from followed users for this film.</p>
          )}

          {/* ASCII Star Rating Input */}
          <h3>Your Rating:</h3>
          <AsciiStarRating onRatingSubmit={handleRatingSubmit} />
        </>
      ) : (
        <p>No film found</p>
      )}
    </div>
  );
};

export default FilmDetail;
