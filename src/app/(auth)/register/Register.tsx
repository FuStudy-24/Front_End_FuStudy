"use client";
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { postRegis } from "@/lib/service/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    avatar: "string",
    gender: "male",
    roleId: 3,
    identityCard: "079202035866",
    phone: "0773850946",
  });

  const handleRegister = async () => {
    console.log(formData);
    try {
      const response = await postRegis(formData);

      console.log(response);
      toast.success("Registration successful!"); // Display success toast
      setTimeout(() => {
        router.push('/login');
      }, 1000)
      // Handle successful registration, e.g., navigate to login page or show a success message
    } catch (error : any) {
      if (error.response && error.response.data && error.response.data.message) {
        const err = error.response.data.message   
        toast.error(err);     
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

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
          <h2 className="mt-3 text-3xl font-bold text-center">Sign up</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please regist to your account
          </p>

          <form
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <RegisterInput formData={formData} setFormData={setFormData} />

            <div className="pb-2 pt-4 px-4 flex items-center justify-center">
              <button
                type="submit"
                className="text-sm text-Blueviolet font-medium px-[70px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
              >
                Register
              </button>
            </div>

            <div className="flex items-center justify-center pb-2 pt-4 text-xs text-gray-400 space-x-1">
              <span>Already have an account? </span>
              <Link
                className="hover:underline hover:text-blue-500 "
                href="/login"
              >
                Log in
              </Link>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

interface FormDataState {
  username: string;
  password: string;
  email: string;
  fullname: string;
  avatar: string;
  gender: string;
  roleId: number;
  identityCard: string;
  phone: string;
}

const RegisterInput = ({
  formData,
  setFormData,
}: {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
}) => {
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, fullname: event.target.value });
  };

  return (
    <>
      <div className="flex items-center justify-center pb-2 pt-8 space-x-10">
        <div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            className="border-b border-gray-300 py-1 focus:border-b-2 focus:text-blue-700 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.username ? "text-xs !-top-4 text-blue-700" : ""
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
            className=" border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.password ? "text-xs !-top-4 text-blue-700" : ""
            }`}
            htmlFor="password"
          >
            Password
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center pb-2 pt-8 space-x-10">
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            value={formData.email}
            onChange={handleEmailChange}
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.email ? "text-xs !-top-4 text-border-blue-70" : ""
            }`}
            htmlFor="email"
          >
            Email
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center pb-2 pt-8">
        <div className="relative">
          <input
            id="fullname"
            name="fullname"
            type="text"
            className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            value={formData.fullname}
            onChange={handleFullNameChange}
          />
          <label
            className={`absolute left-0 top-1.5 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${
              formData.fullname ? "text-xs !-top-4 text-border-blue-70" : ""
            }`}
            htmlFor="fullname"
          >
            FullName
          </label>
        </div>
      </div>
    </>
  );
};
