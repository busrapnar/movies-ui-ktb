import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import GenreFilter from "@/components/filters/GenreFilter";
import RatingFilter from "@/components/filters/RatingFilter";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/filters/SearchBar";
import { fetchMovieGenres, fetchMovies } from "@/store/movie/movieThunks";
import Pagination from "@/components/Pagination";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const genres = useSelector((state: RootState) => state.movie.genres);

  const [filter, setFilter] = useState<string>("");
  const [ratings, setRatings] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(20);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
    dispatch(fetchMovieGenres());
  }, [dispatch, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Number(e.target.value);
    if (ratings.includes(rating)) {
      setRatings(ratings.filter((r) => r !== rating));
    } else {
      setRatings([...ratings, rating]);
    }
  };

  const handleGenreChange = (genreId: number) => {
    const genreIndex = selectedGenres.indexOf(genreId);
    if (genreIndex !== -1) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(filter.toLowerCase());
    const ratingMatch =
      ratings.length === 0 ? true : ratings.includes(Math.floor(movie.vote_average / 2));
    const genreMatch =
      selectedGenres.length === 0
        ? true
        : selectedGenres.some((id) => movie.genre_ids.includes(id));
  
    return titleMatch && ratingMatch && genreMatch;
  });

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getStarRating = (voteAverage: number): string => {
    const rating = Math.round((voteAverage / 2) * 10) / 10;
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen min-w-[600px]">

   
    <div className="mt-10">
      <h1 className="text-4xl font-medium mb-4">Popular Movies</h1>
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      <div className="flex gap-8 ">
        <div className="flex flex-col gap-2">
        <RatingFilter ratings={ratings} handleRatingChange={handleRatingChange} />
          <GenreFilter genres={genres} selectedGenres={selectedGenres} handleGenreChange={handleGenreChange} />
        </div>
        <MovieGrid filteredMovies={filteredMovies} getStarRating={getStarRating} />
      </div>
      
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
    </div>
  );
};

export default Home;