import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Sidebar from './components/SideBar/SideBar'
import Cookies from "js-cookie";
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserProfile } from './store/Actions/userActions'

const App = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    const token = Cookies.get("token");
    console.log(process.env.NODE_ENV)
    if (token) {
      console.log(token);
      dispatch(getUserProfile())
    }
  }, [dispatch])


  return (
    <div className='app'>
      <div className="app_wrapper">
        <Sidebar />
        <MainRoutes />
      </div>
      <Navbar />
    </div>
  )
}

export default App