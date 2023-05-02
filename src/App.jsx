import React from "react"
import {Route, Routes} from "react-router-dom"
import Home from "./assets/Home"
import About from "./assets/About"
import Vans from "./assets/Vans"
import Vandetail from "./assets/Vandetail"
import Layout from "./components/Layout"

import './server'

function App() {
  
  return (
    <>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />}/>
      <Route path="/About" element={<About />}/>
      <Route path="/vans" element={<Vans />}/>
      <Route path="/vans/:id" element={<Vandetail />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
