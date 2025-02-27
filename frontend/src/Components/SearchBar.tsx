import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { Search_by_location_name } from "../Services/Endpont";

export function SearchBar() {
  const [jobname, setJobName] = useState("");
  const [location, setLocation] = useState("");

  const hadndlesearchByLocationAndName = async (jobname, location) => {
    // e.preventDefault();
    console.log("click vayo search");
    const response = await Search_by_location_name(jobname, location);
    console.log(response);
    return response;
  };

  return (
    <div className="w-full max-w-4xl">
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
            value={jobname}
            onChange={(e) => {
              setJobName(e.target.value);
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
            }}
          />
        </div>

        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => hadndlesearchByLocationAndName(jobname, location)}
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
}
