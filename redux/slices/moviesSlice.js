import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from 'expo-constants';


// const API_KEY = '45c8b14ab94677d0dd5adaef8384d70e'; 
const API_KEY = Constants.expoConfig.extra.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (category = 'popular') => {
    const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query) => {
    const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return res.data.results;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    category: 'popular',
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(searchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCategory } = moviesSlice.actions;
export default moviesSlice.reducer;
