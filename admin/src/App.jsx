import React, { useContext } from 'react'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext"; 
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import AllAppointments from './pages/Admin/AllAppointments'




const App = () => {

  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
        </Routes>
      </div>
    </div>
  )
  : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App