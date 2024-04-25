export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    overview: string;
    release_date: string;
    profile_path: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieState {
    movies: Movie[];
    credits: any[];
    genres: Genre[]; 
    filteredMovies: Movie[];
    isLoading: boolean;
    search: string;
    error: any;
    showNotification: boolean; 
  }