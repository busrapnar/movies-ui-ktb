import React from 'react'
import { Card } from '../ui/card';

type Props = {}

const RatingFilter: React.FC<{
    ratings: number[];
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }> = ({ ratings, handleRatingChange }) => (
    <Card className="border w-72 h-[360px] rounded-sm flex flex-col justify-center gap-2">
            <h1 className="text-xl font-medium px-6 py-2 border-b">
              Filter by Rating:
            </h1>
            <div className="flex flex-col px-6 gap-2">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((rate) => (
                <label key={rate} className="mr-2 flex gap-2">
                  <input
                    type="checkbox"
                    value={rate}
                    checked={ratings.includes(rate)}
                    onChange={handleRatingChange}
                    className="mr-1 w-6 h-6"
                  />
                  <span>{rate}+</span>
                </label>
              ))}
            </div>
          </Card>
  );

export default RatingFilter