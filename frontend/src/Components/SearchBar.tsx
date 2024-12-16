import React, { useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

// Type definition for the SearchBar props
interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

// Debounce function definitio
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState("");
  const [location, setLocation] = React.useState("");

  // Define the debounced onSearch function using useCallback
  const debouncedSearch = useCallback(
    debounce((query: string, location: string) => {
      onSearch(query, location); 
    }, 500), 
    [onSearch] 
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location); // Direct call to onSearch on form submit
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <CiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedSearch(e.target.value, query); 
            }}
          />
        </div>

        <div className="flex-1 relative">
          <CiLocationOn
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              debouncedSearch(location, e.target.value); 
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search Jobs
        </button>
      </div>
    </form>
  );
}
