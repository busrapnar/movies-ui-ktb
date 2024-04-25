import React from 'react';
import { Card } from "@/components/ui/card";

interface MovieFilterProps {
  title: string;
  values: number[];
  selectedValues: number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ title, values, selectedValues, onChange }) => {
  return (
    <Card className="border w-72 h-[360px] rounded-sm flex flex-col justify-center gap-2">
      <h1 className="text-xl font-medium px-6 py-2 border-b">{title}</h1>
      <div className="flex flex-col px-6 gap-2">
        {values.map((value) => (
          <label key={value} className="mr-2 flex gap-2">
            <input
              type="checkbox"
              value={value}
              checked={selectedValues.includes(value)}
              onChange={(e) => onChange(e, value)}
              className="mr-1 w-6 h-6"
            />
            <span>{value}+</span>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default MovieFilter;