import MainRoutes from './routes/MainRoutes'
import Navbar from './components/Navbar/Navbar'
import "./App.css"
import { Suspense } from "react";
import AppLoader from './components/AppLoader/AppLoader';
import Sidebar from './components/SideBar/SideBar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './store/Actions/userActions'
import socket from "./utils/socket";

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Page load pe ya user null hai → profile fetch karo
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]); // user bhi dependency me add karo

  useEffect(() => {
    if (!socket) return;

    // Connect when app mounts
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.emit("deliveredMessages",{});

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
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




