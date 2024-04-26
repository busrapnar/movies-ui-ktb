import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchMovieCredits, addMovieRating } from "@/store/movie/movieThunks";
import { StarRating } from '@/components/StarRating';
import { MovieRating } from '@/components/MovieRating';
import { RatingNotification } from '@/components/RatingNotification';
import { MovieActors } from '@/components/MovieActors';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, credits } = useSelector((state: RootState) => state.movie);
  const movie = movies.find((m) => m.id.toString() === id);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (movie) {
      dispatch(fetchMovieCredits(movie.id));
    }
  }, [dispatch, movie]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    dispatch(addMovieRating({ movieId: movie.id, rating: rating }));
    setShowNotification(true);
  };

  

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  
    return () => {
      clearTimeout(timer);
    };
  }, [showNotification]);

  if (!movie || !credits) {
    console.error("Movie detail data is not provided."); 
    return null;
  }

  return (
    <div className="mt-10">
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="w-64 h-96 rounded-lg"
        />
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center mt-2">
            <StarRating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
          </div>
          <div>{movie.release_date}</div>
          <p className="text-lg mt-4">{movie.overview}</p>
          <p>{movie.director}</p>
          <MovieRating
  userRating={userRating}
  handleRatingChange={handleRatingChange}
/>

          <RatingNotification showNotification={showNotification} />
          
        </div>
      </div>
      <MovieActors credits={credits} />
    </div>
  );
};

export default MovieDetail;