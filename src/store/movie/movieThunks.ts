import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: "65fab0811fedb36f607d9dc186472015",
        page: 1,
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
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: {
        api_key: "65fab0811fedb36f607d9dc186472015",
      },
    });
    
    return response.data.cast;
  }
);

export const fetchMovieGenres = createAsyncThunk(
  "movie/fetchMovieGenres",
  async () => {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: "65fab0811fedb36f607d9dc186472015",
        language: 'en-US', 
      },
    });
    return response.data.genres;
  }
);

export const addMovieRating = createAsyncThunk(
  "movie/addMovieRating",
  async ({ movieId, rating }: { movieId: number; rating: number }) => {
    const response = await axios.post(`https://api.themoviedb.org/3/movie/${movieId}/rating`, {
      value: rating,
    }, {
      params: {
        api_key: "65fab0811fedb36f607d9dc186472015",
      },
    });
    
    return response.data;
  }
);