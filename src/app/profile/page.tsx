import React from "react";
import Profile from "./Profile";
import Navbar from "@/pages/LandingPage/Navbar/Navbar";
import Footer from "@/pages/LandingPage/Footer/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <Footer />
    </>
  );
};

export default page;
