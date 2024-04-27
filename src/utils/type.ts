export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    overview: string;
    release_date: string;
    director: string;
    profile_path: string;
    backdrop_path: string;
  }
  
  export interface Credits {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }