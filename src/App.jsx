import { Link, Route, Routes} from "react-router-dom"
import Home from "./assets/Home"
import About from "./assets/About"
import Vans from "./assets/Vans"
import Vandetail from "./assets/Vandetail"

import './server'

function App() {
  
  return (
    <>
    <header>
    <Link className="site-logo" to="/Home">#vanlife</Link>
    <nav>
      <Link to="/about">About</Link>
      <Link to="/vans">Vans</Link>
    </nav>
    </header>
    <Routes>
      <Route path="/About" element={<About />}/>
      <Route path="/Home" element={<Home />}/>
      <Route path="/vans" element={<Vans />}/>
      <Route path="/vans/:id" element={<Vandetail />}/>
    </Routes>
    </>
  )
}

export default App
