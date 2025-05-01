"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    // firstName: "",
    // lastName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false);

  const onSignUp = async () => {
    try {
      setLoader(true);
      const signupResponse = await axios.post(
        "https://backendjob-71xq.onrender.com/api/users/register",
        user
      );
      console.log(signupResponse, "line no 18");
      toast.success(signupResponse.message);
      router.push("/auth/login");
    } catch (error) {
      console.log("Failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const isFormValid =
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0;

    setButtonDisabled(!isFormValid);
  }, [user]);
  return (
    <div className="flex h-screen">
      {/* Left Section with Image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/07/05/27/06/360_F_705270606_YbDXmSQVPph22Jxpy4hCMkINb3bk4f1d.jpg')",
        }}
      >
        {/* You can replace '/your-image.jpg' with the path to your image */}
      </div>

      {/* Right Section with Form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
          <div className="space-y-4">
            {/* <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            /> */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              onClick={onSignUp}
              disabled={buttonDisabled}
              className={`w-full p-3 rounded text-white transition-colors ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loader ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
