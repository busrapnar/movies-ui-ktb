import React from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';

type Props = {
  ratings: number[];
  handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RatingFilter: React.FC<Props> = ({ ratings, handleRatingChange }) => (
  <Card className="border w-72 rounded-sm flex flex-col justify-center gap-2">
    <Label className="text-xl font-medium px-6 py-2 border-b">
      Filter by Rating:
    </Label>
    <div className="flex flex-col px-6 py-3 gap-2">
      {['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'].map((stars, index) => (
        <label key={index} className="mr-2 flex gap-2">
          <input
            type="checkbox"
            value={5 - index}
            checked={ratings.includes(5 - index)}
            onChange={handleRatingChange}
            className="mr-1 w-6 h-6"
          />
          <span className=''>{stars}</span>
        </label>
      ))}
    </div>
  </Card>
);

export default RatingFilter;