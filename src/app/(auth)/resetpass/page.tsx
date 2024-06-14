import React from 'react'
import ResetPassword from './ResetPassword'
import Navbar from '@/pages/LandingPage/Navbar/Navbar'
import Footer from '@/pages/LandingPage/Footer/Footer'

const page = () => {
  return (
    <main>
      <Navbar />
      <ResetPassword/>
      <Footer />
    </main>
  )
}

export default page