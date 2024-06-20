import React from 'react'
import Question from '@/app/question/Question'

import Navbar from '@/pages/LandingPage/Navbar/Navbar'
import Footer from '@/pages/LandingPage/Footer/Footer'
const page = () => {
  return (
   <>
   <Navbar/>
   <Question/>
  
   <Footer/>
   </>
  )
}

export default page