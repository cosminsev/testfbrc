"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class OMDbService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async searchMovies(title) {
        try {
            const response = await axios_1.default.get(`http://www.omdbapi.com/?apikey=${this.apiKey}&s=${title}`);
            return response.data.Search;
        }
        catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }
    async getMovieDetails(id) {
        try {
            const response = await axios_1.default.get(`http://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}`);
            return response.data;
        }
        catch (error) {
            console.error('Error getting movie details:', error);
            throw error;
        }
    }
}
exports.default = OMDbService;
