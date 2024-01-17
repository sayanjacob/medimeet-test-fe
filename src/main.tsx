import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import PatientInfo from './Pages/Patient Info/PatientInfo'
// import { Elements } from '@stripe/react-stripe-js'
// import PaymentForm from './Pages/Payment/Payment'
// import { loadStripe } from '@stripe/stripe-js';
import Booking from './Pages/Booking/Booking'
import NotFound from './Pages/NotFound/NotFound'
import Signup from './Pages/SignUp/Signup'
import Booking_success from './Pages/Patient Info/Booking_success'
import VideoChat from './Pages/Video Chat/VideoChat'
import DoctorHome from './Pages/DoctorHome/DoctorHome'

// const stripePromise = loadStripe('pk_test_51ODnq2SFyl6IAnvdTDryDD7CaZrIHI5J2psq4QwPUFaEX9u8tdBjiU5MUA46hpHFhPHFvjF59goq2tXYKfhdIuGo00cFccP90j');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/patientinfo" element={<PatientInfo />} />
        <Route path="/success" element={<Booking_success />} />
        <Route path="/videoConnect" element={<VideoChat />} />
        <Route path="/doctorHome" element={<DoctorHome />} />

        {/* <Route path="/paymentform"
          element={<Elements stripe={stripePromise}><PaymentForm /></Elements>}
        /> */}



        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
