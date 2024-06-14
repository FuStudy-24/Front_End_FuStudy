import Register from "@/app/(auth)/register/Register";
import Footer from "@/pages/LandingPage/Footer/Footer";
import Navbar from "@/pages/LandingPage/Navbar/Navbar";
import React from "react";

export default function LoginPage() {
  return (
    <main>
      <Navbar />
      <Register />
      <Footer />
    </main>
  );
}
