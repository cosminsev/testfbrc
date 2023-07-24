import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { initialMoviesTable, initialMoviesData } from './MoviesModel'
import { createQueryFromState } from './MoviesUtils'
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_LARAVEL_BASE_URL}/api/`

export const getMovies = createAsyncThunk('Movies/getMovies', async ({ query = '' }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get( BASE_URL + `movies/${query}`)
    return data
  } catch (error) {
    rejectWithValue(true)
  }
})

export const storeMovies = createAsyncThunk('Movies/storeMovies', async ({ request }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post( BASE_URL + `movies`, request)
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error?.response?.message)
  }
})

export const updateMovies = createAsyncThunk('Movies/updateMovies', async ({ updateid, request }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put( BASE_URL + `movies/${updateid}`, request)
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error?.response?.message)
  }
})

export const getMovieData = createAsyncThunk('Movies/getMovieData', async ({ id = '' }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get( BASE_URL + `movies/${id}`)
    return data
  } catch (error) {
    rejectWithValue(true)
  }
})

export const deleteMovie = createAsyncThunk(  'Movies/deleteMovie', async ({ id  }, { rejectWithValue }) => {
    try {
      await axios.delete(BASE_URL + `movies/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.response?.message);
    }
  }
);

const initialState = {
  moviesTable: initialMoviesTable,
  movie: initialMoviesData,
  selectedMovies: {},
}

const moviesSlice = createSlice({
  name: 'Movies',
  initialState,
  reducers: {
    updateMoviesTable(state, action) {
      state.moviesTable = { ...state.moviesTable, ...action.payload }
    },
    setMovie: (state, action) => {
      const { id, value } = action.payload
      return {
        ...state,
        selectedMovies: {
          ...state.selectedMovies,
          [id]: value,
        },
      }
    },
    setMoviesError: (state, action) => {
      state.movie.isError = action.payload
    },
    setFilters(state, action) {
      if (state.moviesTable.page !== 1) state.moviesTable.page = 1
      state.moviesTable.filters = action.payload
      state.moviesTable.apiQuery = createQueryFromState(state.moviesTable)
    },
    setItemsPerPage(state, action) {
      if (state.moviesTable.itemsPerPage !== action.payload) {
        state.moviesTable.itemsPerPage = action.payload
        if (state.moviesTable.page !== 1) state.moviesTable.page = 1
        state.moviesTable.apiQuery = createQueryFromState(state.moviesTable)
      }
    },
    setPage(state, action) {
      if (state.moviesTable.page !== action.payload) {
        state.moviesTable.page = action.payload
        state.moviesTable.apiQuery = createQueryFromState(state.moviesTable)
      }
    },
    setOrdering(state, action) {
      if (state.moviesTable.ordering !== action.payload) {
        state.moviesTable.ordering = action.payload
        state.moviesTable.apiQuery = createQueryFromState(state.moviesTable)
      }
    },
    setSearchQuery(state, action) {
      if (state.moviesTable.searchQuery !== action.payload) {
        if (state.moviesTable.page !== 1) state.moviesTable.page = 1
        state.moviesTable.searchQuery = action.payload
        state.moviesTable.apiQuery = createQueryFromState(state.moviesTable)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.rejected, (state, action) => {
      state.moviesTable.isError = action.payload
      if (state.moviesTable.isLoading) state.moviesTable.isLoading = false
    })
    builder.addCase(getMovies.pending, (state) => {
      state.moviesTable.isLoading = true
      if (state.moviesTable.isError) state.moviesTable.isError = false
    })
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.moviesTable.data = action.payload
      state.moviesTable.totalItems = action.payload?.meta?.total || state.totalItems
      if (state.moviesTable.isLoading) state.moviesTable.isLoading = false
      if (state.moviesTable.isError) state.moviesTable.isError = false
    })
    builder.addCase(storeMovies.rejected, (state, action) => {
      state.errors = action.payload
      if (state.isLoading) state.isLoading = false
      if (state.passedSuccess) state.passedSuccess = false
    })
    builder.addCase(storeMovies.pending, (state) => {
      state.isLoading = true
      if (state.errors) state.errors = null
      if (state.passedSuccess) state.passedSuccess = false
    })
    builder.addCase(storeMovies.fulfilled, (state, action) => {
      state.passedSuccess = true
      if (state.errors) state.errors = null
      if (state.isLoading) state.isLoading = false
    })
    builder.addCase(updateMovies.rejected, (state, action) => {
      state.errors = action.payload
      if (state.isLoading) state.isLoading = false
      if (state.passedSuccess) state.passedSuccess = false
    })
    builder.addCase(updateMovies.pending, (state) => {
      state.isLoading = true
      if (state.errors) state.errors = null
      if (state.passedSuccess) state.passedSuccess = false
    })
    builder.addCase(updateMovies.fulfilled, (state, action) => {
      state.passedSuccess = true
      if (state.errors) state.errors = null
      if (state.isLoading) state.isLoading = false
    })
    builder.addCase(getMovieData.rejected, (state, action) => {
      state.movie.isError = action.error.message
      if (state.movie.isLoading) state.movie.isLoading = false
    })
    builder.addCase(getMovieData.pending, (state) => {
      state.movie.isLoading = true
      if (state.movie.isError) state.movie.isError = false
    })
    builder.addCase(getMovieData.fulfilled, (state, action) => {
      state.movie.data = action.payload.data

      if (state.movie.isError) state.movie.isError = false
      if (state.movie.isLoading) state.movie.isLoading = false
    })
  },
})

export const {
  setMovie,
  updateMoviesTable,
  setMoviesError,
  setFilters,
  setItemsPerPage,
  setPage,
  setOrdering,
  setSearchQuery,
} = moviesSlice.actions

export const { actions } = moviesSlice;
export default moviesSlice.reducer;

