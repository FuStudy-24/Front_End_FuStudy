
import Login from '@/app/(auth)/login/Login'
import Footer from '@/pages/LandingPage/Footer/Footer'
import Navbar from '@/pages/LandingPage/Navbar/Navbar'
export default function LoginPage() {
  return (
    <div>
      <main>
        <Navbar/>
        <Login/>
        <Footer/>
      </main>
    </div>
  )
}
