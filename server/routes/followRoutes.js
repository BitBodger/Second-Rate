import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../models/Follow.js';

const router = express.Router();

// Route to follow a user
router.post('/follow', async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const follow = await followUser(followerId, followedId);
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ message: 'Error following user', error });
  }
});

// Route to unfollow a user
router.post('/unfollow', async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const unfollow = await unfollowUser(followerId, followedId);
    res.status(200).json(unfollow);
  } catch (error) {
    res.status(500).json({ message: 'Error unfollowing user', error });
  }
});

// Route to get followers of a user
router.get('/followers/:userId', async (req, res) => {
  try {
    const followers = await getFollowers(req.params.userId);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers', error });
  }
});

// Route to get users a user is following
router.get('/following/:userId', async (req, res) => {
  try {
    const following = await getFollowing(req.params.userId);
    res.json(following);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following', error });
  }
});

export default router;
