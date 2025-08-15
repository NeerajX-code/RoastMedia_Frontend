import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Post from '../pages/Post/Post'
import Profile from '../pages/Profile/Profile.'
import SearchUserPage from '../pages/SearchUser/SearchUserPage'
import NotificationPage from '../pages/Notification/NotificationPage'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Post' element={<Post />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Search' element={<SearchUserPage />} />
            <Route path='/Notification' element={<NotificationPage />} />
            <Route path="/Register" element={<Register />} />
            <Route path='/Login' element={<Login />} />
        </Routes>
    )
}

export default MainRoutes