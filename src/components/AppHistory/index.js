import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function ApplicationHistory() {
  const router = useRouter();
  // Access the applications array from Redux state
  const applications = useSelector(
    (state) => state.applicationHistory?.applications || []
  );

  console.log("Applications Data (line no 8):", applications);

  const handleApplicationClick = (id) => {
    router.push(`/application-details/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Your Application History
      </h2>

      <ul className="space-y-4">
        {applications &&
          applications.map((app, index) => (
            <div
              key={index}
              onClick={() => handleApplicationClick(app.jobId)}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <p className="text-lg font-semibold text-blue-600 mb-2">
                {app.Role || "No Role Specified"}
              </p>
              <p className="text-sm text-gray-500">
                Company:{" "}
                <span className="font-medium text-gray-700">{app.Company}</span>
              </p>
              <p className="text-sm text-gray-500">
                Applied on:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </span>
              </p>
              <p
                className={`text-sm mt-1 ${
                  app.status === "Pending"
                    ? "text-yellow-500"
                    : app.status === "Accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {app.status}
              </p>
              <div className="flex justify-end">
                <button className="text-blue-400 underline">Read More</button>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
}
export default dynamic(() => Promise.resolve(ApplicationHistory), {
  ssr: false,
});
