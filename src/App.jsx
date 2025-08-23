import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import Sidebar from './components/SideBar/SideBar'
import Cookies from "js-cookie";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/Actions/userActions'

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Page load pe ya user null hai → profile fetch karo
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]); // user bhi dependency me add karo


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