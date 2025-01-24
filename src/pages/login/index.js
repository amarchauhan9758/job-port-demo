"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "../../utils/loader";
import ApiErrorMessage from "../../utils/ApiErrorMessage";

import { fetchServerSideData } from "../../utils/getServerSideProps";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../store/slice/userDetails";

export default function LoginPage() {
  const router = useRouter();

  // const session = useSession();
  const { data: session, status } = useSession();
  console.log(session, status, "line no 21");
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [openApiError, setOpenApiError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the jobs page if authenticated
      router.replace("/jobs");
    }
  }, [status, router]);
  const onLogin = async () => {
    setOpenLoader(true);
    try {
      const loginResponse = await axios.post(
        "http://localhost:8080/api/users/login",
        credentials
      );
      console.log(loginResponse, "Login response");
      sessionStorage.setItem("isLogedIn", true);
      dispatch(authentication(loginResponse?.data));
      router.push("/jobs");
    } catch (error) {
      console.log("Login failed", error);
      setOpenLoader(false);
      setOpenApiError(true);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong !!!"
      );
    } finally {
      setOpenLoader(false);
    }
  };

  useEffect(() => {
    if (credentials.username.length > 0 && credentials.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentials]);

  return (
    <>
      <div className="flex h-screen  relative">
        <div
          className="hidden lg:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://t3.ftcdn.net/jpg/07/05/27/06/360_F_705270606_YbDXmSQVPph22Jxpy4hCMkINb3bk4f1d.jpg')",
          }}
        ></div>

        <div className="flex justify-center items-center w-full lg:w-1/2 bg-gray-200 ">
          <div className="w-full max-w-md p-8 rounded shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-blue-500 text-center mb-6">
              Login
            </h1>
            <div className="space-y-4">
              <input
                type="username"
                name="username"
                placeholder="Username"
                className="w-full p-3 border rounded  text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <button
                onClick={() => onLogin()}
                disabled={buttonDisabled}
                className={`w-full p-3 rounded text-white transition-colors ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {" "}
                Sign In{" "}
              </button>
              <div className="flex justify-between mt-4">
                <Link
                  className="text-blue-500 hover:underline text-sm"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
                <Link
                  className="text-blue-500 hover:underline text-sm"
                  href="/signup"
                >
                  Sign Up
                </Link>
              </div>
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={() => signIn("google")}
                  className="flex items-center text-blue-500 space-x-2 px-4 py-2 border rounded-xl  hover:bg-gray-100"
                >
                  <span>Sign in with</span>
                  <br />
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => signIn("github")}
                  className="flex items-center text-blue-500 space-x-2 px-4 py-2 border rounded-xl hover:bg-gray-100"
                >
                  <span>Sign in with</span>
                  <img
                    src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
                    alt="Github"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openLoader && <Loader openLoader={openLoader} />}
      <ApiErrorMessage
        openApiError={openApiError}
        errorMessage={errorMessage}
        setOpenApiError={setOpenApiError}
      />
    </>
  );
}
