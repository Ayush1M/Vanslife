import React from "react"
import {createBrowserRouter, createRoutesFromElements,RouterProvider, Route} from "react-router-dom"
import Home from "./assets/Home"
import About from "./assets/About"
import Vans, {loader as vansLoader} from "./assets/Vans"
import Vandetail, {loader as vanDetailLoader} from "./assets/Vandetail"
import Layout from "./components/Layout"
import Hostlayout from "./components/Hostlayout"
import Dashboard from "./Host/Dashboard"
import Income from "./Host/Income"
import Reviews from "./Host/Reviews"
import HostVans, {loader as HostVansLoader} from "./Host/HostVans"
import HostVanDetail, {loader as HostVanDetailLoader} from "./Host/HostVanDetail"
import HostVanInfo from "./Host/HostVanInfo"
import HostVanPricing from "./Host/HostVanPricing"
import HostVanPhotos from "./Host/HostVanPhotos"
import NotFound from "./assets/NotFound"
import Error from "./components/Error"
import Login, {loader as loginLoader} from "./assets/Login"
import { requireAuth } from "./utils"

import "./server"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About />}/>
      <Route path= "login" element={<Login /> }  loader={loginLoader}/>

      <Route path="vans" 
             element={<Vans />} 
             errorElement={ <Error /> } 
             loader={vansLoader}  />

      <Route path="/vans/:id" 
             element={<Vandetail />} 
             errorElement={ <Error /> } 
             loader={vanDetailLoader}/>

      <Route path="host" element={<Hostlayout />} >

        <Route index element={<Dashboard />} loader={async () => await requireAuth()} />
        
        <Route path="income" element={<Income />}  loader={async () => await requireAuth()}/>

        <Route path="vans" 
               element={<HostVans />}  
               loader={HostVansLoader} />

        <Route path="vans/:id" 
               element={<HostVanDetail />} 
               loader={HostVanDetailLoader} >

        <Route index element={<HostVanInfo />} />

        <Route path="pricing" element={<HostVanPricing />} loader={async () => await requireAuth()}/>

        <Route path="photos" element={<HostVanPhotos />} loader={async () => await requireAuth()}/>
        </Route>
        <Route path="reviews" element={<Reviews />} loader={async () => await requireAuth()}/>
      </Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
      </>
  ))
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
