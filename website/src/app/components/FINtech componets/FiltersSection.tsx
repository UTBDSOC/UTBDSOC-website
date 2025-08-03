"use client";

import React from "react";
import SmoothDropdown from "./SmoothDropdown"; // Import SmoothDropdown component

type FiltersSectionProps = {
  filtersState: {
    topicArea: string[];
    country: string[];
    startDate: string;
    endDate: string;
    duration: string[];
    courseType: string[];
  };
  setFiltersState: React.Dispatch<
    React.SetStateAction<{
      topicArea: string[];
      country: string[];
      startDate: string;
      endDate: string;
      duration: string[];
      courseType: string[];
    }>
  >;
};

const FiltersSection: React.FC<FiltersSectionProps> = ({
  filtersState,
  setFiltersState,
}) => {
  const toggleFilter = (
    category: keyof FiltersSectionProps["filtersState"],
    value: string
  ) => {
    setFiltersState((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? (prev[category] as string[]).filter((item: string) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-1/4">
      <SmoothDropdown title="Topic Areas">
        {["Finance", "Leadership", "Business"].map((topic) => (
          <label key={topic} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filtersState.topicArea.includes(topic)}
              onChange={() => toggleFilter("topicArea", topic)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{topic}</span>
          </label>
        ))}
      </SmoothDropdown>

      <SmoothDropdown title="Location">
        {["London", "Virtual (GMT)", "New York", "Singapore"].map((location) => (
          <label key={location} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filtersState.country.includes(location)}
              onChange={() => toggleFilter("country", location)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{location}</span>
          </label>
        ))}
      </SmoothDropdown>

      <SmoothDropdown title="Date Range">
        <div className="flex gap-2">
          <input
            type="date"
            value={filtersState.startDate}
            className="border border-gray-300 p-2 rounded-md"
            onChange={(e) =>
              setFiltersState((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <input
            type="date"
            value={filtersState.endDate}
            className="border border-gray-300 p-2 rounded-md"
            onChange={(e) =>
              setFiltersState((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>
      </SmoothDropdown>

      <SmoothDropdown title="Duration">
        {["1-3 days", "4-5 days", "6+ days"].map((duration) => (
          <label key={duration} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filtersState.duration.includes(duration)}
              onChange={() => toggleFilter("duration", duration)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{duration}</span>
          </label>
        ))}
      </SmoothDropdown>

      <SmoothDropdown title="Course Type">
        {["Online", "Seminar", "Workshop"].map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filtersState.courseType.includes(type)}
              onChange={() => toggleFilter("courseType", type)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{type}</span>
          </label>
        ))}
      </SmoothDropdown>

      <SmoothDropdown title="Categories">
        {["Finance", "Business", "Technology", "Management", "Marketing"].map((category) => (
          <label key={category} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={filtersState.topicArea.includes(category)}
              onChange={() => toggleFilter("topicArea", category)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{category}</span>
          </label>
        ))}
      </SmoothDropdown>
    </div>
  );
};

export default FiltersSection;
