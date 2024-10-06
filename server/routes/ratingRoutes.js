import express from 'express';
import { submitRating, getGlobalFilmRatings } from '../controllers/ratingController.js';

const router = express.Router();

const ratingRoutes = () => {

  // Route for submitting a rating
  router.post('/submit', submitRating); // POST /api/ratings/submit

  // Route for getting a film's average rating and total ratings count.
  router.get('/:filmId', getGlobalFilmRatings); // GET /api/ratings/:filmId

  router.get()






  return router; // Return the correct router object
};

export default ratingRoutes;
