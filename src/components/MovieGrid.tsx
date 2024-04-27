import React from 'react'
import MovieCard from './MovieCard';
interface Movie {
  id: number;
  title: string;
  director: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  overview: string;
}

const MovieGrid: React.FC<{ filteredMovies: Movie[]; getStarRating: (voteAverage: number) => string }> = ({ filteredMovies, getStarRating }) => (
    <div >
      {/* Movie Cards */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} getStarRating={getStarRating} />
        ))}
      </div>
    </div>
  );

export default MovieGrid