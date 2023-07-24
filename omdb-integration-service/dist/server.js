"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const omdbService_1 = __importDefault(require("./omdbService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3005; // Replace with your desired port number
const apiKey = process.env.OMDB_API_KEY;
if (!apiKey) {
    throw new Error('OMDB_API_KEY not found in .env file.');
}
const omdbService = new omdbService_1.default(apiKey);
app.get('api/movies/search', async (req, res) => {
    const { title } = req.query;
    const movies = await omdbService.searchMovies(title);
    res.json(movies);
});
app.get('api/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await omdbService.getMovieDetails(id);
    res.json(movie);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
