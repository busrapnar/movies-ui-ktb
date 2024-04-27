import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import GenreFilter from "@/components/filters/GenreFilter";
import RatingFilter from "@/components/filters/RatingFilter";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/filters/SearchBar";
import { fetchMovieGenres, fetchMovies } from "@/store/movie/movieThunks";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const genres = useSelector((state: RootState) => state.movie.genres);

  const [filter, setFilter] = useState<string>("");
  const [ratings, setRatings] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchMovies()).then((action: any) => {
      setTotalPages(action.payload.total_pages);
    });
    dispatch(fetchMovieGenres());
  }, [dispatch]);

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
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
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
    <div className="mt-10">
      <h1 className="text-4xl font-medium mb-4">Popular Movies</h1>
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      <div className="flex gap-8 justify-between ">
        <div className="flex flex-col gap-2">
        <RatingFilter ratings={ratings} handleRatingChange={handleRatingChange} />
          <GenreFilter genres={genres} selectedGenres={selectedGenres} handleGenreChange={handleGenreChange} />
        </div>
        <MovieGrid filteredMovies={filteredMovies} getStarRating={getStarRating} />
      </div>
      <div className="mt-4 flex justify-center bg-black">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;