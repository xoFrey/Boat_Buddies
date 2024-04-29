import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Boats from "./pages/Boats"
import Details from "./pages/Details"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boats" element={<Boats />} />
        <Route path="/details/:boatsId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
