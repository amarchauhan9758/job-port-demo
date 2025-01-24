"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../../store/slice/jobSlice";
import Loader from "../../utils/loader";
import ApiErrorMessage from "../../utils/ApiErrorMessage";
import HeroSection from "../../components/HeroSection/index";
import axios from "axios";
import { useRouter } from "next/router";

export default function JobListingPage({ ...props }) {
  const dispatch = useDispatch();
  // const [jobs, setJobs] = useState(jobs);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [openLoader, setOpenLoader] = useState(false);
  const [openApiError, setOpenApiError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(props.errorMessage);
  const [truncatedJobs, setTruncatedJobs] = useState([]);

  const jobList = props?.jobs?.jobs;

  useEffect(() => {
    dispatch(setJobs(jobList));
  }, []);

  useEffect(() => {
    setOpenLoader(true);
    if (props?.jobs?.jobs?.length > 0) {
      setOpenLoader(false);
    } else if (errorMessage) {
      setOpenLoader(false);
      setOpenApiError(true);
    } else {
      setOpenLoader(false);
      setOpenApiError(false);
    }
  }, [setOpenLoader, errorMessage]);

  const handleSearch = (e) => {
    setSearchTerm(e?.target?.value?.toLowerCase());
  };

  const truncateDescription = (description) => {
    const first120Words = description?.split(/\s+/).slice(0, 50)?.join(" ");
    return `${first120Words}...`;
  };
  // Filter jobs based on search term
  useEffect(() => {
    if (jobList) {
      const updatedJobs = jobList
        .filter(
          (job) =>
            job?.title?.toLowerCase()?.includes(searchTerm) ||
            job?.company_name?.toLowerCase()?.includes(searchTerm) ||
            job?.candidate_required_location
              ?.toLowerCase()
              ?.includes(searchTerm)
        )
        .map((job) => ({
          ...job, // Keep the other properties
          truncatedDescription: truncateDescription(job.description), // Add truncated description
        }));
      setTruncatedJobs(updatedJobs);
    }
  }, [jobList, searchTerm]);

  return (
    <>
      <HeroSection />
      {/* <FilterJobs jobs={jobs} /> */}
      {/* Search Bar */}
      <div className="bg-white p-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for jobs by title, company, or location..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Job Listing */}
      <div className="max-w-4xl mx-auto p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          {truncatedJobs?.length > 0 ? (
            truncatedJobs?.map((job) => (
              <div
                className="block p-4 border rounded shadow hover:shadow-lg transition"
                key={job?.id}
                href={`/jobs/${job.id}`}
              >
                <img
                  src="https://remotive.com/job/1965168/logo"
                  alt={job?.company_name || "Company logo"}
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakQU-MOWgxkPb6H1Bnoeq57BiXesEaYfClg&s"; // Replace with a valid fallback image URL
                  }}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <p className="text-sm text-gray-700"> {job?.company_name}</p>
                <h2 className="text-md font-semibold"> {job?.title}</h2>

                <p className="text-sm text-gray-500">
                  {" "}
                  {job?.candidate_required_location}
                </p>
                <p className="text-sm mt-2 text-gray-600">
                  {/* Render the truncated description with dangerouslySetInnerHTML */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: job?.truncatedDescription,
                    }}
                  />
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => router.push(`/jobs/${job?.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No jobs found.
            </p>
          )}
        </div>
        <Loader openLoader={openLoader} />
        <ApiErrorMessage
          openApiError={openApiError}
          errorMessage={errorMessage}
          setOpenApiError={setOpenApiError}
        />
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     const res = await axios.get("https://remotive.com/api/remote-jobs?limit=5");

//     const jobs = res?.data; // Extract jobs data from the response

//     return { props: { jobs } };
//   } catch (error) {
//     console.error("Error fetching jobs:", error.message);
//     return { props: { jobs: [] } }; // Return an empty array on error
//   }
// }

export async function getServerSideProps(context) {
  let jobs = [];
  let openLoader = true;
  let openApiError = false;
  let errorMessage = "";

  try {
    const res = await axios.get(
      "https://remotive.com/api/remote-jobs?limit=125"
    );

    jobs = res?.data; // Extract jobs data from the response
    if (jobs) {
      openLoader = false;
    }
  } catch (error) {
    openLoader = false;
    openApiError = false;
    errorMessage = "Error fetching jobs. Please try again later.";
  }

  return {
    props: {
      jobs,
      openLoader,
      openApiError,
      errorMessage,
    },
  };
}
