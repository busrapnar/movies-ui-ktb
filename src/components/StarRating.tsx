import React from 'react';

interface Props {
  voteAverage: number;
  voteCount: number;
}

export const StarRating: React.FC<Props> = ({ voteAverage, voteCount }) => (
  <>
    <span>{getStarRating(voteAverage)}</span>
    <span className="ml-2 text-sm">
      ({voteCount} oy)
    </span>
  </>
);

const getStarRating = (voteAverage: number): string => {
  const rating = Math.round((voteAverage / 2) * 10) / 10;
  return "⭐".repeat(rating) + "☆".repeat(5 - rating);
};

