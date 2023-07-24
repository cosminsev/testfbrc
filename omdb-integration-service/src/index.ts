import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
const cors = require('cors');


dotenv.config();
const app = express();
const port = 3005;
app.use(cors()); // Enable CORS for all routes

const omdbApiKey = process.env.OMDB_API_KEY;
if (!omdbApiKey) {
  throw new Error('OMDB_API_KEY not found in .env file.');
}

/**
 * Endpoint to search for movies by title.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns JSON response with an array of movies that match the search criteria.
 */
app.get('/api/movies', async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title parameter is missing' });
    }
    const { page } = req.query;
    const pageNumber = page || 1;

    const omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${encodeURIComponent(
      title.toString()
    )}&page=${pageNumber}`;
    const response = await axios.get(omdbApiUrl);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * Endpoint to get movie details by IMDb ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns JSON response with the movie details for the given IMDb ID.
 */
app.get('/api/movies/:imdbId', async (req: Request, res: Response) => {
  try {
    const { imdbId } = req.params;
    const omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbId}`;
    const response = await axios.get(omdbApiUrl);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * Start the Express server to listen on the specified port.
 * @param port - The port number on which the server will listen.
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
