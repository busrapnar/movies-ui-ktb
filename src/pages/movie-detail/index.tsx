import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchMovieCredits, addMovieRating } from '@/store/movie/movieSlice';
import { Card, CardDescription } from '@/components/ui/card';

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

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Number(e.target.value);
    setUserRating(rating);
  };

  const handleRateSubmit = () => {
    if (userRating !== null && movie) {
      dispatch(addMovieRating({ movieId: movie.id, rating: userRating }));
      setShowNotification(true);
    }
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

  const getStarRating = (voteAverage: number): string => {
    const rating = Math.round((voteAverage / 2) * 10) / 10;
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (!movie || !credits) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="w-64 h-96 rounded-lg"
        />
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center mt-2">
            <span>{getStarRating(movie.vote_average)}</span>
            <span className="ml-2 text-sm">
              ({movie.vote_count} oy)
            </span>
          </div>
          <div>{movie.release_date}</div>
          <p className="text-lg mt-4">{movie.overview}</p>
          
          <div className="mt-4">
            <label className="block text-xl font-medium">
              Oy Ver:
            </label>
            <div className="flex items-center mt-2">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rate) => (
                <label key={rate} className="mr-2 flex gap-2">
                  <input
                    type="radio"
                    name="rating"
                    value={rate}
                    checked={userRating === rate}
                    onChange={handleRatingChange}
                    className="mr-1"
                  />
                  <span>{rate}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleRateSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Gönder
            </button>
            {showNotification && (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white text-gray-600 p-4 rounded shadow-lg">
                  Oy gönderildi!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-5'>
        <h2 className="text-2xl mt-4">Oyuncular</h2>
        <div className='grid grid-cols-6 gap-4'>
          {credits.map((cast: any) => (
            <Card className='flex flex-col gap-2 w-44 h-48' key={cast.id}>
              <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt="" className='w-full h-32 rounded-t-lg' />
              <CardDescription className='px-1'>{cast.name} - {cast.character}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;