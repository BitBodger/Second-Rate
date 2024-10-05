import express from 'express';
import { searchFilms, getFilmDetails } from '../controllers/filmController.js';  // Import the film controller functions

const router = express.Router();

const filmRoutes = () => {

  // Route for searching film database
  router.get('/search', searchFilms);  // No need for pool here, searchFilms doesn't use it

  // Route for fetching a film by its ID
  router.get('/:filmId', getFilmDetails);  // Ensure getFilmDetails is imported and defined

  return router;
};

export default filmRoutes;
