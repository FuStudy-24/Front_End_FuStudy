
import MyOrder from '@/app/myorder/MyOrder';
import Footer from '@/pages/LandingPage/Footer/Footer';
import Navbar from '@/pages/LandingPage/Navbar/Navbar';
import React from 'react';

const Page = () => {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto py-8 mt-32 relative pt-20">
        <MyOrder />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
