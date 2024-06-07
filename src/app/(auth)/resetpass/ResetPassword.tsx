"use client";
import React, { useState } from "react";
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
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [formData, setformData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (key: any, e: any) => {
    setformData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleResetpass = async() => {
    console.log(formData);
    try {
      const res = await resetPass(formData)
      toast.success("Reset Password Success!")
    } catch (error:any) {
      
    }
    
  };
  return (
    <div className="flex justify-center">
      <Card className="w-[450px] block content-center px-7">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-xl">
            Reset Your Password
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
                    handleChange("confirmPassword", e);
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
          <span className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleResetpass}
              className="text-sm text-Blueviolet font-medium px-[70px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
            >
              RESET PASSWORD
            </button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
