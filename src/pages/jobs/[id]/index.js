import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
function index() {
  const { query } = useRouter();
  const router = useRouter();

  const data = useSelector((state) => state.jobs); // Get the jobs from Redux
  const selectedJob = data?.jobs?.find((job) => job.id === parseInt(query.id));

  if (!selectedJob) {
    return <p className="text-center text-gray-500">Loading job details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Company Avatar */}
        <img
          src="https://remotive.com/job/1965168/logo"
          alt={selectedJob?.company_name || "Company logo"}
          onError={(e) => {
            e.target.src =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakQU-MOWgxkPb6H1Bnoeq57BiXesEaYfClg&s"; // Replace with a valid fallback image URL
          }}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        {/* Job Details */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedJob.title}
          </h1>
          <p className="text-lg text-gray-600">{selectedJob.company_name}</p>
          <p className="text-gray-500">
            {selectedJob.candidate_required_location}
          </p>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-sm mt-2 text-gray-600">
        {/* Render the truncated description with dangerouslySetInnerHTML */}
        <span
          dangerouslySetInnerHTML={{
            __html: selectedJob?.description,
          }}
        />
      </p>

      {/* Apply Now Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push(`/apply/${selectedJob.id}`)} // Navigate to the application page
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default index;
