import React, { useState } from "react";

const index = ({ jobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="p-6 md:p-10 bg-white">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
          Job Search
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for jobs..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default index;
