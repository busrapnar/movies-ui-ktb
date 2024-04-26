import React from 'react'
import { Card, CardDescription, CardTitle } from './ui/card';
import { Link } from 'react-router-dom';

type Props = {}

const MovieCard: React.FC<{ movie: any; getStarRating: (voteAverage: number) => string }> = ({ movie, getStarRating }) => (
    <Card>
      <Link to={`/movie/${movie.id}`} className="flex flex-col gap-2">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="w-full h-80 rounded-t-lg"
        />
        <div className="flex flex-col gap-1 px-2 rounded">
          <CardTitle className="text-lg font-medium ">{movie.title}</CardTitle>
          <CardDescription>{movie.director}</CardDescription>
          <div className="flex items-center">
            <span className="text-xl">{getStarRating(movie.vote_average)}</span>
            <span className="ml-2 text-sm">({movie.vote_count} oy)</span>
          </div>
          <CardDescription className="text-sm h-16 w-72 overflow-hidden overflow-ellipsis">{movie.overview}</CardDescription>
        </div>
      </Link>
    </Card>
  );

export default MovieCard