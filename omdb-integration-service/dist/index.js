"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.get('/api/movies', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: 'Title parameter is missing' });
        }
        const { page } = req.query;
        const pageNumber = page || 1;
        const omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${encodeURIComponent(title.toString())}&page=${pageNumber}`;
        const response = await axios_1.default.get(omdbApiUrl);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
/**
 * Endpoint to get movie details by IMDb ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns JSON response with the movie details for the given IMDb ID.
 */
app.get('/api/movies/:imdbId', async (req, res) => {
    try {
        const { imdbId } = req.params;
        const omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbId}`;
        const response = await axios_1.default.get(omdbApiUrl);
        res.json(response.data);
    }
    catch (error) {
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
