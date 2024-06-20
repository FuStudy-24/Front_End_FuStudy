"use client";
import "@/lib/service/forgetPassService";
import React, { useEffect, useState } from "react";
import { resetPass } from "@/lib/service/forgetPassService";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ResetPassword() {
  const [formData, setformData] = useState({
    newPassword: "",
    confirmedNewPassword: "",
    email: "",
    token: "",
  });

  const handleChange = (key: string, e: any) => {
    setformData((prevFormData) => ({
      ...prevFormData,
      [key]: e.target.value,
    }));
  };

  const handleResetpass = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const updatedFormData = {
      ...formData,
      email: urlParams.get("email") || "",
      token: urlParams.get("token") || "",
    };

    setformData(updatedFormData); // Update state with new formData

    console.log("formData:", updatedFormData); // Log updated formData

    try {
      const res = await resetPass(updatedFormData);
      toast.success("Reset Password Success!");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        const err = error.response.data.message;
        toast.error(err);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  console.log(formData);
  useEffect(() => {
    handleResetpass();
  }, []);
  return (
    <div className="flex justify-center mt-40">
      <Card className="w-[450px] block content-center px-7">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-xl">
            Forget Your Password
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>New Password</Label>
                <Input
                  onChange={(e) => {
                    handleChange("newPassword", e);
                  }}
                  type="password"
                  placeholder="New Password"
                  required
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Confirm Password</Label>
                <Input
                  onChange={(e) => {
                    handleChange("confirmedNewPassword", e);
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="block">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleResetpass}
              className="text-sm text-Blueviolet font-medium px-7 py-2.5 border-0 rounded-100px bg-[#2ba8fb] text-[#ffffff] font-Bold transition-all-0.5s hover:bg-[#6fc5ff] hover:box-shadow-0-0-20px-#6fc5ff50 hover:scale-110 active:bg-[#3d94cf] active:transition-all-0.25s active:box-shadow-none active:scale-0.98"
            >
              RESET PASSWORD
            </button>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}