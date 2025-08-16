import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Sidebar from './components/SideBar/SideBar'
import Cookies from "js-cookie";
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {

  const [Cookie, setCookie] = useState(null);

  useEffect(() => {
    if (!Cookie) {
      setCookie(Cookies.get('token'));
    }
    if (Cookie) console.log(Cookie);
  }, [])


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