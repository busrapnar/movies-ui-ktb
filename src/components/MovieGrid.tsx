import React from 'react'
import MovieCard from './MovieCard';

type Props = {}

const MovieGrid: React.FC<{ filteredMovies: any[]; getStarRating: (voteAverage: number) => string }> = ({ filteredMovies, getStarRating }) => (
    <div className="flex justify-between">
      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} getStarRating={getStarRating} />
        ))}
      </div>
    </div>
  );

export default MovieGrid