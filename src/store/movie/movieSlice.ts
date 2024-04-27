import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { addMovieRating, fetchMovieCredits, fetchMovieGenres, fetchMovies } from "./movieThunks";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
  release_date: string;
  director: string;
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
  showNotification: false,
};


// Slice oluşturma
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
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
      .addCase(addMovieRating.fulfilled, (state) => {
        state.isLoading = false;
        state.showNotification = true; // Bildirim popup'ını göster
      })
      .addCase(addMovieRating.rejected, (state) => {
        state.isLoading = false;
        state.error = "Oy gönderilemedi: Kimlik bilgileri geçersiz veya eksik.";
      });
  },
});

// Reducer'ı export etme
export const { addSearch, hideNotification } = movieSlice.actions; 

// Selector'ları export etme
export const getMovies = (state: RootState) => state.movie.movies;
export const getFilteredMovies = (state: RootState) => state.movie.filteredMovies;
export const getMovieCredits = (state: RootState) => state.movie.credits;
export const movieDataStore = (state: RootState) => state.movie;

// Reducer'ı export etme
export default movieSlice.reducer;