"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { addCoin } from "@/lib/service/paymentService";
import useAuthStore from "@/lib/hooks/useUserStore";

const Success: React.FC = () => {
  const { userInfo, token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      const orderId = localStorage.getItem("orderId");
      //console.log(orderId);
      try {
        const response = await addCoin(orderId, token);
       // console.log(response);
       // console.log(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <div className="bg-gradient-to-r mt-20 from-purple-300 to-blue-200">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-20 h-20 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <h1 className="text-6xl font-medium py-8">Payment Done!</h1>
              <p className="text-2xl pb-8 px-12 font-medium">
                Thank you for completing your secure online payment. <br /> Have a great day!
              </p>
              <Link href="/" passHref>
                <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                  HOME
                </button>
              </Link>
              <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
