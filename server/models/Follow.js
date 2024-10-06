import pool from '../db.js';

// Function to follow a user
export const followUser = async (followerId, followedId) => {
  const res = await pool.query(
    'INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING *',
    [followerId, followedId]
  );
  return res.rows[0]; // Return the new follow relationship
};

// Function to unfollow a user
export const unfollowUser = async (followerId, followedId) => {
  const res = await pool.query(
    'DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2 RETURNING *',
    [followerId, followedId]
  );
  return res.rows[0]; // Return the deleted follow relationship
};

// Function to get all followers of a user
export const getFollowers = async (userId) => {
  const res = await pool.query(
    'SELECT u.* FROM users u JOIN follows f ON u.id = f.follower_id WHERE f.followed_id = $1',
    [userId]
  );
  return res.rows; // Return the list of followers
};

// Function to get all users a user is following
export const getFollowing = async (userId) => {
  const res = await pool.query(
    'SELECT u.* FROM users u JOIN follows f ON u.id = f.followed_id WHERE f.follower_id = $1',
    [userId]
  );
  return res.rows; // Return the list of users being followed
};
