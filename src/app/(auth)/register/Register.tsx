import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="dialog" id="dialog">
      <div className="card w-full p-0">
        <div className="card-body w-full p-0">
          <div className="view non-login-view">
            <div className="h-auto flex">
              <div className="flex w-full lg:w-1/2 justify-center items-center bg-white rounded-[8px]">
                <div className="relative flex items-center">
                  <div className="w-full z-10">
                    <div className="text-center">
                      <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Sign up
                      </h2>
                      <p className="mt-2 text-xl text-gray-500">
                        Please regist to your account
                      </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                      <input type="hidden" name="remember" value="true" />

                      <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                          Username
                        </label>
                        <input
                          className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          type=""
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                          Password
                        </label>
                        <input
                          className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="password"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className="relative">
                        {/* <div className="absolute right-0 mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div> */}
                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                          Email
                        </label>
                        <input
                          className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="email"
                          placeholder="mail@gmail.com"
                        />
                      </div>
                      <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                          DOB
                        </label>
                        <input
                          className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          type="date"
                          placeholder="Enter your password"
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          className="w-full flex justify-center text-lg text-Blueviolet font-medium px-[30px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                        >
                          Register
                        </button>
                      </div>
                      <p className="flex items-center justify-center mt-10 text-center text-md text-gray-500 text-xs">
                        Already using FuStudy?{" "}
                        <Link href="/login" passHref>
                          <span className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300 ml-1 ">
                            Log In
                          </span>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className="login-img-section lg:flex w-full lg:w-1/2 justify-around items-center"
                style={{
                  backgroundImage: `url('/image/bg-login.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "50%",
                  height: "650px",
                  opacity: "0.7",
                }}
              >
                <div className="inset-0 z-0"></div>
                <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                  <h1 className="text-black font-bold text-4xl font-sans text-center">
                    FuStudy
                  </h1>
                  <p className="text-black mt-1 text-2xl text-center">
                    Study for the bright future
                  </p>
                  <img
                    className="w-7/12 h-6/12 mx-auto"
                    src="loginShow"
                    alt=""
                  />
                  <div className="flex justify-center mt-6">
                    <Link href="/" passHref>
                      <button
                        type="button"
                        className="text-lg text-Blueviolet font-medium px-[30px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
