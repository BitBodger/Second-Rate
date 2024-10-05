export const searchFilms = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.results.length === 0) {
      return res.status(404).json({ message: 'No films found'});
    }

    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching film data', error });
  }
};

export const getFilmDetails = async (req, res) => {
  const { filmId } = req.params;  // Extract film ID from the request parameters

  try {
    // Fetch film details from TMDb API using the filmId
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.TMDB_API_KEY}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: 'Error fetching film details' });
    }

    // Construct the full image URL for the poster
    const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    
    // Include the poster URL in the response
    res.json({
      ...data,
      poster_url: posterUrl  // Add the full image URL to the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching film details', error });
  }
};
