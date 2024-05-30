
  "use client"
  import React, { useState } from "react";
  import {postLogin} from "@/lib/service/authService"
  import useAuthStore from "@/lib/hooks/useUserStore"
  import { useRouter } from 'next/navigation'
  import { useDispatch } from 'react-redux';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()
    // const dispatch = useDispatch()
    const login = useAuthStore((state) => state.login);
    // Function to handle form submission
    const handleSubmit = async (e : any) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const response = await postLogin({username, password});
    
        const { token, user } = response.data.data;  // Chú ý thay đổi đường dẫn để truy cập `data`
        const userInfo = { ...user, token };
        
    //console.log("userInfo before login:", userInfo);
    login(userInfo);
    // const storedUserInfo = useAuthStore.getState().userInfo;
    // console.log("Stored userInfo:", storedUserInfo);
    // console.log("Stored userInfo username:", storedUserInfo.username);
        router.push('/')

      } catch (error) {
        // Handle login error
        setError("Login failed. Please check your credentials.");
        console.error("Login error:", error);
      }

      setLoading(false);
    };

    return (
      <section className="min-h-screen flex items-stretch">
        {/* Background Image */}
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')`,
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 "></div>
          <div className="w-full px-24">
            <h1 className="text-5xl font-bold text-left tracking-wide text-white">
              FuStudy
            </h1>
            <p className="text-3xl my-4 text-white">
              Study for the bright future
            </p>
          </div>
        </div>
        {/* Login */}
        <section className="bg-gray-50 dark:bg-gray-900 w-[50%]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            FuStudy    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={username} 
                  onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} 
                  onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-sky-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-primary-700 dark:focus:ring-sky-800" disabled={loading}>
                  {loading ? "Logging in..." : "Sign in"}
                </button>
                {error && <p className="text-sm font-light text-red-500">{error}</p>}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      </section>
    );
  };

  export default Login;
