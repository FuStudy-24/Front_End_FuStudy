import React from 'react'

import Navbar from '@/pages/LandingPage/Navbar/Navbar'
import Footer from '@/pages/LandingPage/Footer/Footer'
import MyBooking from '@/app/booking/MyBooking'

const page = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8 mt-32 relative pt-20">
    <MyBooking/>
    </div>
  
    <Footer/>
    </>
  )
}

export default page