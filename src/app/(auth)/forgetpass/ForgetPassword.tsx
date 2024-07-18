"use client";
import React, { useState } from "react";
import { forgetPass } from "@/lib/service/forgetPassService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [data, setdata] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    setdata((prev) => (prev = { email: e.target.value }));
  };

  const handleForgetPass = async () => {
    //(data);
    try {
      const reponse = await forgetPass(data);
      toast.success("Please check your email!");
    } catch (error: any) {
     // (error);
      
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const err = error.response.data.message;
        toast.error("Your email not exist in the system");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <div className="flex justify-center mt-40">
      <Card className="w-[450px] block content-center px-7">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-xl">
            Forgot your password?
          </CardTitle>
          <CardDescription>
            Please fill in the email that you used to register. You will be sent
            an email with instructions on how to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="block">
          <span className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleForgetPass}
              className="text-sm text-Blueviolet font-medium px-[70px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
            >
              SEND EMAIL
            </button>
          </span>
          <div className="flex items-center justify-center pb-2 pt-4 text-sm text-gray-400 space-x-1">
            <span>Remeber your password? </span>
            <Link
              className="hover:underline hover:text-blue-500 "
              href="/login"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
