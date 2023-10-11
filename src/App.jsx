//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import Navbar from "./components/Navbar"
import Music from "./pages/Music"
import Photobook from "./pages/Gallery"
import Cathartic from "./pages/Cathartic"
import { Route, Routes } from "react-router-dom"

function App() {

  return <>
    <Navbar />
    <Routes>
      <Route path="/music" element={<Music />} />
      <Route path="/photobook" element={<Photobook />} />
      <Route path="/cathartic" element={<Cathartic />} />
    </Routes>
  </>

}

export default App
