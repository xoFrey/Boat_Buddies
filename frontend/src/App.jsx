import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Boats from "./pages/Boats"
import Details from "./pages/Details"
import Navigation from "./components/Navigation"
import { AllBoats, AllReservations } from "./Context/Context"
import { useEffect, useState } from "react"
import { backendUrl } from "./Api/api.js"

const App = () => {
  const [allBoats, setAllBoats] = useState([])
  const [allReservations, setAllReservations] = useState([])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats`)
      .then((res) => res.json())
      .then((data) => setAllBoats(data))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/reservations`)
      .then((res) => res.json())
      .then((data) => setAllReservations(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <AllBoats.Provider value={{ allBoats, setAllBoats }}>
      <AllReservations.Provider value={{ allReservations, setAllReservations }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boats" element={<Boats />} />
            <Route path="/details/:boatsId" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </AllReservations.Provider>
    </AllBoats.Provider>
  )
}

export default App
