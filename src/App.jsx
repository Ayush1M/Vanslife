import React from "react"
import {Route, Routes} from "react-router-dom"
import Home from "./assets/Home"
import About from "./assets/About"
import Vans from "./assets/Vans"
import Vandetail from "./assets/Vandetail"
import Layout from "./components/Layout"
import Hostlayout from "./components/Hostlayout"
import Dashboard from "./Host/Dashboard"
import Income from "./Host/Income"
import Reviews from "./Host/Reviews"
import HostVans from "./Host/HostVans"
import HostVanDetail from "./Host/HostVanDetail"
import HostVanInfo from "./Host/HostVanInfo"
import HostVanPricing from "./Host/HostVanPricing"
import HostVanPhotos from "./Host/HostVanPhotos"

import './server'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About />}/>
      <Route path="vans" element={<Vans />}/>
      <Route path="/vans/:id" element={<Vandetail />}/>

      <Route path="host" element={<Hostlayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
        <Route index element={<HostVanInfo />} />
        <Route path="pricing" element={<HostVanPricing />} />
        <Route path="photos" element={<HostVanPhotos />} />
        </Route>
        <Route path="reviews" element={<Reviews />} />
      </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
