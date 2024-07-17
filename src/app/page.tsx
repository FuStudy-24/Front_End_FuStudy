"use client";
import Banner from "@/pages/LandingPage/Banner/banner";
import Companies from "@/pages/LandingPage/Companies/companies";
import Course from "@/pages/LandingPage/Courses/courses";
import Footer from "@/pages/LandingPage/Footer/Footer";
import Mentor from "@/pages/LandingPage/Mentor/mentor";
import Navbar from "@/pages/LandingPage/Navbar/Navbar";
import Newsletter from "@/pages/LandingPage/Newsletter/newsletter";
import Subcription from "@/pages/LandingPage/Testimonials/subcription";
const page = () => {
  return (
    <main>
      <Navbar />
      <Banner />
      <Companies />
      <Course />
      <Mentor />
      <Newsletter />
      <Subcription />
      <Footer />
    </main>
  );
};

export default page;
