"use client";
import React, { useEffect, useState } from "react";
import { getWallet, createPayment } from "@/lib/service/paymentService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/lib/hooks/useUserStore";
const Order = () => {
  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));
  const [confirmPakage, setconfirmPakage] = useState({
    fuCoin: 0,
    price: "",
  });
  const [formData, setformData] = useState({
    walletID: 0,
    productName: "FuCoin",
    description: "Payment for FuCoin",
    price: 0,
    returnUrl: "http://localhost:3000/success",
    cancelUrl: "http://localhost:3000/fail",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWallet(userInfo.id);
      console.log(data.data.data);
      setformData({ ...formData, walletID: data.data.data.id });
    };
    fetchData();
  }, []);
  const handlePackage = (coin: number, price: string) => {
    const data = {
      price: price,
      fuCoin: coin,
    };
    setconfirmPakage(data);
  };
  const handleData = (price: number) => {
    setformData({ ...formData, price: price });
  };
  console.log(formData);

  const handlePayment = async () => {
    const token = userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await createPayment(formData, config);
      const paymentUrl = response.data.data.checkoutUrl
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const err = error.response.data.message;
        console.log(error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center mt-32">
        <Card className="w-[700px] mt-10 px-5">
          <CardHeader>
            <CardTitle>Select Package</CardTitle>
            <CardDescription>
              Choose the amount of coin you want to purchase !
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-10 mt-5 text-white">
              <div
                className="flex space-x-10 p-5 bg-black rounded-2xl w-72"
                onClick={() => {
                  handleData(49000);
                  handlePackage(50, "49.000 VND");
                }}
              >
                <div className="flex justify-between  space-x-2 w-16">
                  <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                    $
                  </div>
                  <div>50</div>
                </div>
                <div className="bg-yellow-700 py-1 px-5 rounded-lg w-36">
                  49.000 VND
                </div>
              </div>
              <div
                className="flex space-x-10 p-5 bg-black rounded-2xl w-72"
                onClick={() => {
                  handleData(99000);
                  handlePackage(100, "99.000 VND");
                }}
              >
                <div className="flex justify-between  space-x-2 w-16">
                  <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                    $
                  </div>
                  <div>100</div>
                </div>
                <div className="bg-yellow-700 py-1 px-5 rounded-lg w-36">
                  99.000 VND
                </div>
              </div>
            </div>
            <div className="flex space-x-10 mt-10 mb-10 text-white">
              <div
                className="flex space-x-10 p-5 bg-black rounded-2xl w-72"
                onClick={() => {
                  handleData(190000);
                  handlePackage(200, "190.000 VND");
                }}
              >
                <div className="flex justify-between  space-x-2 w-16">
                  <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                    $
                  </div>
                  <div>200</div>
                </div>
                <div className="bg-yellow-700 py-1 px-5 rounded-lg w-36">
                  190.000 VND
                </div>
              </div>
              <div
                className="flex space-x-10 p-5 bg-black rounded-2xl w-72"
                onClick={() => {
                  handleData(480000);
                  handlePackage(500, "480.000 VND");
                }}
              >
                <div className="flex justify-between  space-x-2 w-16">
                  <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                    $
                  </div>
                  <div>500</div>
                </div>
                <div className="bg-yellow-700 py-1 px-5 rounded-lg w-36">
                  480.000 VND
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter> */}
        </Card>
      </div>
      <div
        className={
          confirmPakage.fuCoin > 0
            ? "flex justify-center "
            : "hidden justify-center "
        }
      >
        <Card className="w-[700px] mt-10 px-5">
          <CardHeader>
            <CardTitle>Confirm information</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between my-5">
              <div className="flex space-x-10 p-5 bg-black rounded-2xl w-72 text-white">
                <div className="flex justify-between  space-x-2 w-16">
                  <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                    $
                  </div>
                  <div>{confirmPakage.fuCoin}</div>
                </div>
                <div className="bg-yellow-700 py-1 px-5 rounded-lg w-36">
                  {confirmPakage.price}
                </div>
              </div>
              <div className="pr-5">
                <table className="table-auto">
                  {/* <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                  </tr>
                </thead> */}
                  <tbody>
                    <tr>
                      <td>Username:</td>
                      <td>{userInfo.username}</td>
                    </tr>
                    <tr>
                      <td>Pay:</td>
                      <td>PayOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="block space-y-2">
              <div>
                Package {confirmPakage.fuCoin} FuCoin <br /> Note: FuCoin is
                only for <span className="text-red-600">FuStudy</span>
              </div>
              <div className="text-blue-500">
                By clicking the Pay Now button, You agree that this transaction
                is <br /> non-refundable and non-cancelable.
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                handlePayment();
              }}
              className="text-sm text-Blueviolet font-medium w-full py-[12.5px] border-[0] rounded-xl bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
            >
              Pay now
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Order;
