import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RegVerificationPage } from "../pages/RegVerificationPage"
import { AuthVerificationPage } from "../pages/AuthVerificationPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='registration' element={<RegisterPage/>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='/' element={<MainPage/>}/>
            <Route path='registration/verification' element={<RegVerificationPage/>}/>
            <Route path='login/verification' element={<AuthVerificationPage/>}/>
            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    )
}