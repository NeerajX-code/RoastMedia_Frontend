import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Post from '../pages/Post/Post'
import Profile from '../pages/Profile/Profile.'
import SearchUserPage from '../pages/SearchUser/SearchUserPage'
import NotificationPage from '../pages/Notification/NotificationPage'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import AuthWrapper from '../components/AuthWrapper/AuthWrapper'
import UnAuthWrapper from '../components/UnAuthWrapper/UnAuthWrapper'
import OtherProfile from '../pages/Profile/OtherProfile'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Post' element={
                <AuthWrapper>
                    <Post />
                </AuthWrapper>
            } />
            <Route path='/Profile' element={
                <AuthWrapper>
                    <Profile />
                </AuthWrapper>
            } />
            <Route path='/other/profile/:id' element={<OtherProfile />} />
            <Route path='/Search' element={<SearchUserPage />} />
            <Route path='/Notification' element={
                <AuthWrapper>
                    <NotificationPage />
                </AuthWrapper>} />
            <Route path="/Register" element={
                <UnAuthWrapper>
                    <Register />
                </UnAuthWrapper>} />
            <Route path='/Login' element={<UnAuthWrapper><Login /></UnAuthWrapper>} />
        </Routes>
    )
}

export default MainRoutes