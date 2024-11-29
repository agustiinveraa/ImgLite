import Home from "./components/pages/Home"
import Navbar from "./components/layout/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/layout/Footer"
import Docs from "./components/pages/Docs"

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App
