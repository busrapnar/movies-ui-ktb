import React from 'react';
import { Card, CardDescription, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  director: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  overview: string;
}

type Props = {
  movie: Movie;
  getStarRating: (voteAverage: number) => string;
};
const MovieCard: React.FC<Props> = ({ movie, getStarRating }) => (
  <Card >
    <Link to={`/movie/${movie.id}`} className="flex flex-col min-w-80">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="w-full h-80 rounded-t-lg"
      />
      <div className="flex flex-col max-w-96 gap-1 justify-center px-3 rounded">
        <CardTitle className="text-lg font-medium py-1 flex items-center">{movie.title}</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-xl">{getStarRating(movie.vote_average)}</span>
          <span className="ml-2 text-sm">({movie.vote_count} vote)</span>
        </div>
        <CardDescription className="text-sm h-16 overflow-hidden overflow-ellipsis">{movie.overview}</CardDescription>
      </div>
    </Link>
  </Card>
);

export default MovieCard;