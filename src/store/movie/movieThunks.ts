import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (page: number) => {
    const response = await axios.get(`${API_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: page,
        language: 'en-US',
      },
    });
    return response.data.results.map((movie: any) => ({
      ...movie,
      release_date: movie.release_date.split('-').reverse().join('-')
    }));
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movie/fetchMovieCredits",
  async (movieId: number) => {
    const response = await axios.get(`${API_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.cast;
  }
);

export const fetchMovieGenres = createAsyncThunk(
  "movie/fetchMovieGenres",
  async () => {
    const response = await axios.get(`${API_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US', 
      },
    });
    return response.data.genres;
  }
);

export const addMovieRating = createAsyncThunk(
  "movie/addMovieRating",
  async ({ movieId, rating }: { movieId: number; rating: number }) => {
    const response = await axios.post(`${API_URL}/movie/${movieId}/rating`, {
      value: rating,
    }, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  }
);