import { 
  getFollowedUsersAverageRatingForFilm,
  getRatingsByFollowedUsers, 
  getGlobalAverageRatingAndCount
} from '../models/Rating.js';

export const searchFilms = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.results.length === 0) {
      return res.status(404).json({ message: 'No films found' });
    }

    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching film data', error });
  }
};

// Fetch film details along with ratings (reusing logic)
export const getFilmDetailsWithRatings = async (req, res) => {
  const { filmId } = req.params;
  const userId = req.user.id; // Assuming you're using JWT to get the authenticated user's ID

  try {
    // Fetch film details from TMDb API
    const filmResponse = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.TMDB_API_KEY}`);
    const filmData = await filmResponse.json();

    if (!filmResponse.ok) {
      return res.status(500).json({ message: 'Error fetching film details' });
    }

    // Get global average rating and count
    const { global_average: globalAverageRating, global_rating_count: globalTotalRatings } = await getGlobalAverageRatingAndCount(filmId);

    // Get followed users' ratings and their average
    const followedRatings = await getRatingsByFollowedUsers(userId, filmId);
    const { followed_average: followedAverageRating, followed_rating_count: followedTotalRatings } = await getFollowedUsersAverageRatingForFilm(userId, filmId);

    res.json({
      ...filmData,
      poster_url: `https://image.tmdb.org/t/p/w500${filmData.poster_path}`, // Add full poster URL
      globalAverageRating: globalAverageRating ? globalAverageRating.toFixed(1) : 'N/A',
      globalTotalRatings: globalTotalRatings || 0,
      followedAverageRating: followedAverageRating ? followedAverageRating.toFixed(1) : 'N/A',
      followedTotalRatings: followedTotalRatings || 0,
      followedRatings // List of ratings from followed users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching film details', error });
  }
};
