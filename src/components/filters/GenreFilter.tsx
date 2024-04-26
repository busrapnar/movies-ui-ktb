import React from 'react';
import { Card } from '../ui/card';

type Props = {
  genres: any[];
  selectedGenres: number[];
  handleGenreChange: (genreId: number) => void;
};

const GenreFilter: React.FC<Props> = ({ genres, selectedGenres, handleGenreChange }) => (
  <Card className="border w-72 py-2 rounded-sm flex flex-col justify-center gap-2">
    <h1 className="text-xl font-medium px-6 py-2 border-b">Filter by Genre:</h1>
    <div className="flex flex-wrap px-6 gap-2 py-2">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`py-1 px-2 rounded-full border ${
            selectedGenres.includes(genre.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleGenreChange(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  </Card>
);

export default GenreFilter;