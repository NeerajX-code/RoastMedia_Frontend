import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import { Suspense } from "react";
import AppLoader from './components/AppLoader/AppLoader';
import Sidebar from './components/SideBar/SideBar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/Actions/userActions'
import { initSocketListeners, fetchConversations } from './store/Actions/chatActions'

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Fetch profile once on app mount
    if (!user) dispatch(getUserProfile());
  // Initialize socket listeners globally so we don't miss messages on other pages
  dispatch(initSocketListeners());
  // Load conversations list at start (and after auth loads it will refresh as needed)
  dispatch(fetchConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Suspense fallback={<AppLoader />}>
      <div className='app'>
        <div className="app_wrapper">
          <Sidebar />
          <MainRoutes />
        </div>
  <Navbar />
      </div>
    </Suspense>
  )
}

export default App




