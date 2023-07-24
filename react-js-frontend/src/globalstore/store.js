import { configureStore } from '@reduxjs/toolkit';
import  moviesReducer from '../features/movies/MoviesSlice'
import  omdbReducer from '../features/omdbservice/OmdbServiceSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    omdb: omdbReducer,
  
  },
});

export default store;