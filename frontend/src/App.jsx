import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Boats from "./pages/Boats"
import Details from "./pages/Details"
import Navigation from "./components/Navigation"

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boats" element={<Boats />} />
        <Route path="/details/:boatsId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
