import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Post from '../pages/Post/Post'
import Profile from '../pages/Profile/Profile.'
import SearchUserPage from '../pages/SearchUser/SearchUserPage'
import NotificationPage from '../pages/Notification/NotificationPage'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Post' element={<Post />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Search' element={<SearchUserPage />} />
            <Route path='/Notification' element={<NotificationPage />} />
        </Routes>
    )
}

export default MainRoutes