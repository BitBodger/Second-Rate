import { createRating } from '../models/Rating.js';

export const submitRating = async (req, res) => {
  const { userId, filmId, rating } = req.body;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newRating = await createRating(userId, filmId, rating);
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting rating', error });
  }
};


