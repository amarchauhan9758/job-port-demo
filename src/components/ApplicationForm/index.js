// components/ApplicationForm.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../../store/slice/appHistorySlice";
import Loader from "../../utils/loader";
import ApiErrorMessage from "../../utils/ApiErrorMessage";

export default function index() {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const [openApiError, setOpenApiError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    experience: "",
    role: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  const data = useSelector((state) => state.jobs); // Get the jobs from Redux
  const selectedJob = data?.jobs?.find((job) => job.id === parseInt(query.id));
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("it working or not");

    setOpenLoader(true);
    // Validate form fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key]; // Get the current field value
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setOpenLoader(false);
      setOpenApiError(true);
      setErrorMessage(newErrors);
    } else {
      setOpenLoader(false);
      setOpenApiError(true);
      setErrorMessage("Your application was submitted successfully!");

      // Create application object
      const application = {
        jobId: selectedJob?.id || null,
        Category: selectedJob?.category || "Unknown",
        Role: selectedJob?.title || formData.role,
        Company: selectedJob?.company_name || "Unknown",
        JobType: selectedJob?.job_type || "Unknown",
        appliedAt: new Date().toISOString(),
        status: "Pending",
        applicantDetails: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          experience: parseInt(formData.experience, 10),
          resume: formData.resume.name,
        },
      };

      dispatch(addApplication(application));
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
        dob: "",
        experience: "",
        role: "",
        resume: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="relative max-w-2xl w-full bg-white shadow-2xl rounded-lg p-8">
        {/* Background Decoration */}
        <div className="absolute -inset-1 bg-gray-300 blur-lg opacity-40 rounded-lg"></div>

        {/* Form Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Aerospace Service India
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData?.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData?.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Enter the role you're applying for"
                value={formData?.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="experience"
              >
                Experience (in years)
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                placeholder="Enter your experience"
                value={formData.experience}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); // Ensure non-negative values
                  setFormData({ ...formData, experience: value });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="resume"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
      <Loader openLoader={openLoader} />
      <ApiErrorMessage
        openApiError={openApiError}
        errorMessage={errorMessage}
        setOpenApiError={setOpenApiError}
      />
    </div>
  );
}
