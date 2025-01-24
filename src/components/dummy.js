import React from "react";

import { useDispatch } from "react-redux";
import { setJobs } from "../store/jobsSlice";

const jobs = [
  {
    id: 1,
    job_title: "Software Engineer",
    company_name: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    description:
      "Developing scalable web applications using modern frameworks and tools.",
    company_avatar:
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/5bb5ea56538343.59b2653198bcd.png",
  },
  {
    id: 2,
    job_title: "Data Analyst",
    company_name: "Data Insights Corp.",
    location: "New York, NY",
    description:
      "Analyzing large datasets and providing actionable insights to support business decisions.",
    company_avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF7u2kk27h_jXtyRWUjm6uTi7Ms36b-ZD2GA&s",
  },
  {
    id: 3,
    job_title: "Product Manager",
    company_name: "Innovative Designs LLC",
    location: "Austin, TX",
    description:
      "Managing the product lifecycle from concept to launch and ensuring product-market fit.",
    company_avatar:
      "https://png.pngtree.com/png-vector/20220508/ourmid/pngtree-k-letter-modern-logo-design-png-image_4565653.png",
  },
];

function dummy() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setJobs(jobs)); // Save jobs to Redux store
  }, [dispatch]);
  return <div>dummy</div>;
}

export default dummy;
