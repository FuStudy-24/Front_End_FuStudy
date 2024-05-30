  "use client";
  import Link from "next/link";
  import React, { useState } from "react";
  import { postRegis } from "@/lib/service/authService";
  import * as Yup from 'yup';
  const Register = () => {
    const [formData, setFormData] = useState({
      email: "",
      fullname: "",
      username: "",
      password: "",
      avatar: "string",
      gender: "male",
      roleId: 3,
      identityCard: "079202035866",
      phone: "0773850946",
    });
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      fullname: Yup.string().required('Full name is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    });

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleRegister = async (e: any) => {
      e.preventDefault();

      // if (formData.password !== formData.confirmPassword) {
      //   alert("Passwords do not match!");
      //   return;
      // }

      try {
            await validationSchema.validate(formData, { abortEarly: false });
        const response = await postRegis(formData);
        
        console.log(response);
        // Handle successful registration, e.g., navigate to login page or show a success message
      } catch (error) {
        console.error(error);
        // Handle registration error, e.g., show an error message
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
            <p className="text-3xl my-4 text-white">Study for the bright future</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center md:px-16 px-0 z-0 bg-white">
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')`,
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <section className="w-[50%] m-[0px]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 p-6">
              <Link
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <img
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                FuStudy
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Full Name"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="hidden">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      Avatar
                      </label>
                      <input
                        type="text"
                        name="Avatar"
                        id="Avatar"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.avatar}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="hidden">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      Gender
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="hidden">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      Role
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.roleId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="hidden">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      IdentityCard
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.identityCard}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="hidden">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                      Phone
                      </label>
                      <input
                        type=""
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <Link
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#"
                          >
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  };

  export default Register;
