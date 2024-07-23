import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
function App() {
  const {Authuser}=useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
     {/* <Home/> */}
     <Routes>
      <Route path='/' element={Authuser?<Home/>:<Navigate to={'/login'}/>}/>
      <Route path='/login' element={Authuser?<Navigate to='/'/>:<Login/>}/>
      <Route path='/signup' element={Authuser?<Navigate to='/'/>:<Signup/>}/>
     </Routes>
     <Toaster/>
    </div>
  )
}
export default App
