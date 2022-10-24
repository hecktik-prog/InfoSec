import React from "react"
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from "./components/AppRouter"
import { NavBar } from "./components/NavBar"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <ToastContainer position="bottom-right"/>
    </BrowserRouter>
  )
}

export default App;
