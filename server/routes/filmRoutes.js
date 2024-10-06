import express from 'express';
import { getFilmDetailsWithRatings, searchFilms } from '../controllers/filmController.js';

const router = express.Router();

const filmRoutes = () => {

  // Route for 
  router.get('/search', searchFilms); // GET /api/films/search
  
  // Route for getting details about a film
  router.get('/:filmId', getFilmDetailsWithRatings); // GET /api/films/:filmId

  return router;
};

export default filmRoutes;
