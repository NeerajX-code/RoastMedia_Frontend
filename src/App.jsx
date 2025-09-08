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

    const handleConnect = () => {
      console.log("✅ Socket connected:", socket.id);

      // 👉 Emit deliveredMessages only when user is available
      if (user) {
        socket.emit("deliveredMessages", {userId: user?.userId._id});
      }
    };

    const handleDisconnect = () => {
      console.log("❌ Socket disconnected");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, [user]);


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




