import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "@/store";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
  release_date: string;
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
  movies: Movie[];
  credits: any[];
  genres: Genre[]; 
  filteredMovies: Movie[];
  isLoading: boolean;
  search: string;
  error: any;
  showNotification: boolean; 
}

const initialState: MovieState = {
  movies: [],
  credits: [],
  genres: [],
  filteredMovies: [],
  search: "",
  isLoading: false,
  error: null,
  showNotification: false, // Başlangıçta bildirimi gizli olarak ayarladık
};

// Asenkron thunk'larınız ve action'larınız 
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
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
      state.filteredMovies = state.movies.filter(movie => movie.title.toLowerCase().includes(state.search.toLowerCase()));
    },
    hideNotification: (state) => {
      state.showNotification = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.credits = action.payload;
      })
      .addCase(fetchMovieGenres.fulfilled, (state, action) => {
        state.genres = action.payload; 
      })
      .addCase(addMovieRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovieRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.showNotification = true; // Bildirim popup'ını göster
      })
      .addCase(addMovieRating.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Oy gönderilemedi: Kimlik bilgileri geçersiz veya eksik.";
      });
  },
});

export const { addSearch, hideNotification } = movieSlice.actions; 
export const getMovies = (state: RootState) => state.movie.movies;
export const getFilteredMovies = (state: RootState) => state.movie.filteredMovies;
export const getMovieCredits = (state: RootState) => state.movie.credits;
export const movieDataStore = (state: RootState) => state.movie;
export default movieSlice.reducer;