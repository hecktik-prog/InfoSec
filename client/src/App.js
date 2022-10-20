import React from "react"
import {Route, Routes, Navigate} from 'react-router-dom'
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage"

const App = () => {
  return (
    <Routes>
      <Route path='registration' element={<RegisterPage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='/' element={<MainPage/>}/>
      <Route path='verification' element={<VerificationPage/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App;
