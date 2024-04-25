import React from 'react'
import { Card } from '../ui/card';

type Props = {}

const GenreFilter: React.FC<{
    genres: any[];
    selectedGenres: number[];
    handleGenreChange: (e: React.ChangeEvent<HTMLInputElement>, genreId: number) => void;
  }> = ({ genres, selectedGenres, handleGenreChange }) => (
    <Card className="border w-72 h-[360px] rounded-sm flex flex-col justify-center gap-2">
      <h1 className="text-xl font-medium px-6 py-2 border-b">Filter by Genre:</h1>
      <div className="flex flex-col px-6 gap-2 overflow-auto">
        {genres.map((genre) => (
          <label key={genre.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={(e) => handleGenreChange(e, genre.id)}
              className="mr-1"
            />
            <span>{genre.name}</span>
          </label>
        ))}
      </div>
    </Card>
  );

export default GenreFilter