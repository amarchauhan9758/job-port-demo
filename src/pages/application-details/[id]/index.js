import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function index() {
  const router = useRouter();
  const { id } = router.query;

  const applications = useSelector(
    (state) => state.applicationHistory?.applications || []
  );
  const application = applications.find((app) => app.jobId === parseInt(id));

  console.log(application, "line no 14");

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Application Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Application Details
      </h2>
      <div className="border rounded-lg shadow-md p-6 bg-white">
        <p className="text-lg font-semibold text-blue-600 mb-2">
          Role: {application.Role}
        </p>
        <p className="text-sm text-gray-500">
          Company:{" "}
          <span className="font-medium text-gray-700">
            {application.Company}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Applied on:{" "}
          <span className="font-medium text-gray-700">
            {new Date(application.appliedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span
            className={`font-medium ${
              application.status === "Pending"
                ? "text-yellow-500"
                : application.status === "Accepted"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {application.status}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <strong>Applicant Name:</strong> {application.applicantDetails.name}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Email:</strong> {application.applicantDetails.email}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Experience:</strong> {application.applicantDetails.experience}{" "}
          years
        </p>
      </div>
    </div>
  );
}
