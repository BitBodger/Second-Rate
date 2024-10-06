import pool from '../db.js';

// Function to insert a new rating into the database
export const createRating = async (userId, filmId, rating) => {
  const res = await pool.query(
    'INSERT INTO ratings (user_id, film_id, rating) VALUES ($1, $2, $3) RETURNING *',
    [userId, filmId, rating]
  );
  return res.rows[0];
};

// Function to get ratings by followed users for a specific film
export const getRatingsByFollowedUsers = async (userId, filmId) => {
  try {
    const res = await pool.query(
      `
      SELECT r.*, u.username
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      JOIN follows f ON r.user_id = f.followed_id
      WHERE f.follower_id = $1 AND r.film_id = $2
      `,
      [userId, filmId]
    );
    return res.rows;  // Return ratings from followed users
  } catch (error) {
    console.error('Error fetching followed users ratings:', error);
    throw error;
  }
};

// Function to get all user ratings for a specific film (list of all users and their ratings)
export const getGlobalRatingsForFilm = async (filmId) => {
  try {
    const res = await pool.query(
      `
      SELECT r.*, u.username
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.film_id = $1
      `,
      [filmId]
    );
    return res.rows;  // Return all users' ratings for the film
  } catch (error) {
    console.error('Error fetching all ratings for film:', error);
    throw error;
  }
};

// Function to get global average rating and count for a specific film
export const getGlobalAverageRatingAndCount = async (filmId) => {
  try {
    const res = await pool.query(
      `
      SELECT AVG(r.rating) AS global_average, COUNT(r.rating) AS global_rating_count
      FROM ratings r
      WHERE r.film_id = $1
      `,
      [filmId]
    );
    return res.rows[0];  // Return global average and count
  } catch (error) {
    console.error('Error fetching global average rating and count:', error);
    throw error;
  }
};

// Function to get the average rating from followed users for a specific film
export const getFollowedUsersAverageRatingForFilm = async (userId, filmId) => {
  try {
    const res = await pool.query(
      `
      SELECT AVG(r.rating) AS followed_average, COUNT(r.rating) AS followed_rating_count
      FROM ratings r
      JOIN follows f ON r.user_id = f.followed_id
      WHERE f.follower_id = $1 AND r.film_id = $2
      `,
      [userId, filmId]
    );
    return res.rows[0]?.followed_average || 0;  // Return the followed average rating or 0 if no ratings exist
  } catch (error) {
    console.error('Error fetching followed users average rating:', error);
    throw error;
  }
};
