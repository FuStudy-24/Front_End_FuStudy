import Navbar from "@/pages/LandingPage/Navbar/Navbar";
import React from "react";
import Order from "./Order";
import Footer from "@/pages/LandingPage/Footer/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Order />
      <Footer />
    </>
  );
};

export default page;
