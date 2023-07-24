import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_OMDB_BASE_URL}/api/movies/`

export const fetchOMDBDataByImdbId = createAsyncThunk(
  'omdb/fetchByImdbId',
  async (imdbId) => {
    try {
      const response = await axios.get(BASE_URL + `${imdbId}`);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch OMDB data by IMDb ID');
    }
  }
);

export const fetchOMDBDataByTitle = createAsyncThunk(
  'omdb/fetchByTitle',
  async ({ title, page = 1, appendData = false }) => {
    try {
      const response = await axios.get(BASE_URL + `?title=${title}&page=${page}`);
      return {data: response.data, appendData};
    } catch (error) {
      throw Error('Failed to fetch OMDB data by title');
    }
  }
);

const initialState = {
  data: null,
  searchdata: null,
  searchresno: 0,
  appendData: false,
  status: 'idle',
  error: null,
};

const omdbSlice = createSlice({
  name: 'omdb',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOMDBDataByImdbId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOMDBDataByImdbId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchOMDBDataByImdbId.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(fetchOMDBDataByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOMDBDataByTitle.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchdata = action.payload;
      })
      .addCase(fetchOMDBDataByTitle.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export default omdbSlice.reducer;