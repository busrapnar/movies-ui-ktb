import React from 'react'
import MovieCard from './MovieCard';

const MovieGrid: React.FC<{ filteredMovies: any[]; getStarRating: (voteAverage: number) => string }> = ({ filteredMovies, getStarRating }) => (
    <div >
      {/* Movie Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} getStarRating={getStarRating} />
        ))}
      </div>
    </div>
  );

export default MovieGrid