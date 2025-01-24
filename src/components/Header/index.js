"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FiLogOut, FiLogIn } from "react-icons/fi"; // React Icons for Logout/Login
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { setJobs } from "../../store/slice/jobSlice";

const Header = () => {
  const { data: session } = useSession();
  // const dispatch = useDispatch();
  const router = useRouter();
  const applicationsCount = useSelector(
    (state) => state.applicationHistory?.applications?.length || 0
  );
  console.log(applicationsCount, "line no 15");

  const handleLogout = async () => {
    if (session) {
      // Sign out with redirect
      await signOut({ callbackUrl: "/" });
    }
    // dispatch(setJobs()); // Clear user data in Redux
    sessionStorage.clear();
    localStorage.clear();
    router.push("/"); // Navigate to the login page
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/jobs" className="text-xl text-blue-600 font-bold">
          Job Platform
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex text-gray-600 gap-6 font-semibold">
          <Link href="/jobs" className="hover:text-blue-600 transition">
            Start a search
          </Link>
          <Link href="/jobs" className="hover:text-blue-600 transition">
            Job list
          </Link>
          <Link
            href="/applied"
            className="hover:text-blue-600 transition relative"
          >
            Applied
            {applicationsCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                {applicationsCount}
              </span>
            )}
          </Link>
        </div>

        {/* Buttons */}
        <nav className="flex gap-4">
          {/* Logout Button */}
          <button
            onClick={() => handleLogout()}
            className="hidden md:flex bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
          <button
            onClick={() => handleLogout()}
            className="md:hidden flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition"
            aria-label="Logout"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
