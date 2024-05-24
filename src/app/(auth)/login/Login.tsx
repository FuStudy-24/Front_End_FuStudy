"use client";
import Link from "next/link";
import React, { useState } from "react";
// import "./login.css";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  return (
    <section className="min-h-screen flex items-stretch">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center "
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')`,
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide text-white">
            FuStudy
          </h1>
          <p className="text-3xl my-4 text-white">
            Study for the bright future
          </p>
        </div>
        <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </span>
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </span>
          <span>
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center  md:px-16 px-0 z-0 bg-white">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')`,
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20 text-gray-600">
          <h2 className="mt-3 text-3xl font-bold text-center">
            Welcome to FuStudy!
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please sign in to your account
          </p>

          <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            {/* <div className="pb-2 pt-4 ml-28">
              <div>
                <label className="block text-gray-400 font-semibold text-sm">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    className="block w-56 rounded-full py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>
              </div>
            </div>
            <div className="pb-2 pt-4 ml-28">
              <div>
                <label className="block text-gray-400 font-semibold text-sm">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    className="block w-56 rounded-full py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>
              </div>
            </div> */}

            <LoginInput formData={formData} setFormData={setFormData} />

            {/* <div className="flex items-center justify-center pb-2 pt-8">
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit ${
                    username ? "border-border-blue-700" : ""
                  }`}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label
                  className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-3 transition-all peer-focus:text-blue-700 ${
                    username ? "text-xs -top-3 text-blue-700" : ""
                  }`}
                  htmlFor="username"
                >
                  Username
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center pb-2 pt-8">
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="password"
                  className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit ${
                    username ? "border-border-blue-700" : ""
                  }`}
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label
                  className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-3 transition-all peer-focus:text-blue-700 ${
                    username ? "text-xs -top-3 text-blue-700" : ""
                  }`}
                  htmlFor="username"
                >
                  Password
                </label>
              </div>
            </div> */}

            <div className="ml-24 pb-2 pt-4 text-xs text-gray-400 space-x-10">
              <span>
                {" "}
                <input type="checkbox" id="remember-me" className="mr-2" />
                <label>Remember Me</label>
              </span>
              <a className="hover:underline hover:text-blue-500 " href="#">
                Forgot password?
              </a>
            </div>

            <div className="pb-2 pt-4 px-4 ml-28">
              <button
                type="button"
                className="text-sm text-Blueviolet font-medium px-[70px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
              >
                Log In
              </button>
            </div>

            <div className="ml-28 pb-2 pt-4 text-xs text-gray-400 space-x-1">
              <span>Don’t have an account yet? </span>
              <Link
                className="hover:underline hover:text-blue-500 "
                href="/register"
              >
                Sign up
              </Link>
            </div>

            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

interface FormDataState {
  username: string;
  password: string;
}

const LoginInput = ({ formData, setFormData }: { formData: FormDataState; setFormData: React.Dispatch<React.SetStateAction<FormDataState>> }) => {
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: event.target.value });
  };

  return (
    <>
      <div className="flex items-center justify-center pb-2 pt-8">
        <div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit ${
              formData.username ? "border-border-blue-70 border-b-2" : ""
            }`}
            value={formData.username}
            onChange={handleUsernameChange}
       
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.username ? "text-xs -top-4 text-border-blue-70" : ""
            }`}
            htmlFor="username"
          >
            Username
          </label>
        </div>  
      </div>
      <div className="flex items-center justify-center pb-2 pt-8">
      <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            className={`border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit ${
              formData.password ? "border-border-blue-70 border-b-2" : ""
            }`}
            value={formData.password}
            onChange={handlePasswordChange}
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.password ? "text-xs -top-4 text-border-blue-70" : ""
            }`}
            htmlFor="password"
          >
            Password
          </label>
        </div>
      </div>
    </>
  );
};
