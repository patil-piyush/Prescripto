import React from 'react'
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appointments from './pages/Appointments.jsx'
import MyProfile from './pages/MyProfile.jsx'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import './index.css';
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/doctors' element={<Doctors />} />
          <Route exact path='/doctors/:speciality' element={<Doctors />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/my-profile' element={<MyProfile />} />
          <Route exact path='/my-appointments' element={<MyAppointments />} />
          <Route exact path='/appointments/:docId' element={<Appointments />} />
        </Routes>
        <Footer />
      
    </div>
  )
}

export default App