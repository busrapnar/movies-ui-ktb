import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `/genre/movie/11?api_key=${tmdbApiKey}`,
    }),
    getPopularMovies: builder.query({
      query: () => `/movie/popular${tmdbApiKey}`,
    }),
    // Diğer endpointler burada olacak
  }),
});

export const { useGetGenresQuery, useGetPopularMoviesQuery } = tmdbApi;