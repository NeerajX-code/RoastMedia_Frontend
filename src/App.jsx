import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Sidebar from './components/SideBar/SideBar'

const App = () => {
  return (
    <div className='app'>
      <div className="app_wrapper">
        <Sidebar />
        <MainRoutes /></div>
      <Navbar />
    </div>
  )
}

export default App