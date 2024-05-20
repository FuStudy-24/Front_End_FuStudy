import Banner from '@/pages/LandingPage/Banner/banner';
import Companies from '@/pages/LandingPage/Companies/companies';
import Course from '@/pages/LandingPage/Courses/courses';
import Mentor from '@/pages/LandingPage/Mentor/mentor';
import Newsletter from '@/pages/LandingPage/Newsletter/newsletter';
import Testimonials from '@/pages/LandingPage/Testimonials/testimonials';
import React from 'react'
const page = () => {
  return (
   
    <main>
      <Banner/>
      <Companies/>
      <Course/>
      <Mentor/>
      <Newsletter/>
      <Testimonials/>
    </main>
 
  )
}

export default page