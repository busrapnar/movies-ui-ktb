import React from 'react';

interface Props {
  userRating: number | null;
  handleRatingChange: (rating: number) => void;
}

export const MovieRating: React.FC<Props> = ({ userRating, handleRatingChange }) => (
  <div className="mt-4 flex flex-col gap-2">
    <label className="block text-xl font-medium">
      Rate the Movie
    </label>
    <div className="flex items-center mt-2">
      {[1, 2, 3, 4, 5].map((rate) => (
        <label key={rate} className="mr-2 flex gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={rate}
            checked={userRating === rate}
            className="sr-only"
            onChange={() => handleRatingChange(rate)} // Değişiklik burada
          />
          <span
            className={`text-3xl ${userRating && rate <= userRating ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={() => handleRatingChange(rate)} // Değişiklik burada
          >
            &#9733;
          </span>
        </label>
      ))}
    </div>
  </div>
);