"use client"
import Banner from '@/pages/LandingPage/Banner/banner';
import Companies from '@/pages/LandingPage/Companies/companies';
import Course from '@/pages/LandingPage/Courses/courses';
import Footer from '@/pages/LandingPage/Footer/Footer';
import Mentor from '@/pages/LandingPage/Mentor/mentor';
import Navbar from '@/pages/LandingPage/Navbar/Navbar';
import Newsletter from '@/pages/LandingPage/Newsletter/newsletter';
import Testimonials from '@/pages/LandingPage/Testimonials/testimonials';
import React, { useEffect } from 'react'
const page = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "hs-script-loader";
    script.async = true;
    script.defer = true;
    script.src = "//js-na1.hs-scripts.com/46644174.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (

    <main>
      <Navbar/>
      <Banner/>
      <Companies/>
      <Course/>
      <Mentor/>
      <Newsletter/>
      <Testimonials/>
      <Footer/>
    </main>
 
  )
}

export default page