"use client";
import "@/lib/service/forgetPassService";
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
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleForgetPass = async () => {
    try {
      const res = await forgetPass({ email });
      toast.success("Forget Password Email Sent!");
    } catch (error: any) {
      toast.error("Failed to send forget password email.");
    }
  };

  return (
    <div className="flex justify-center">
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
                <Label>Email</Label>
                <Input
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
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
              onClick={handleForgetPass}
              className="text-sm text-Blueviolet font-medium px-7 py-2.5 border-0 rounded-100px bg-[#2ba8fb] text-[#ffffff] font-Bold transition-all-0.5s hover:bg-[#6fc5ff] hover:box-shadow-0-0-20px-#6fc5ff50 hover:scale-110 active:bg-[#3d94cf] active:transition-all-0.25s active:box-shadow-none active:scale-0.98"
            >
              FORGET PASSWORD
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
