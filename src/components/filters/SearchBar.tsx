import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  filter: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({ filter, handleFilterChange }) => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <Label htmlFor="filter" className="mr-2 text-xl font-medium">
        Filter by Title:
      </Label>
      <Input
        type="text"
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search Movie..."
        className="border rounded-md px-2 py-3 text-primary hover:border-primary "
      />
    </div>
  );
};

export default SearchBar;