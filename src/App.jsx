import ConfirmPresence from "./pages/ConfirmPresence";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-presence" element={<ConfirmPresence />} />
      </Routes>
    </Router>
  );
  
}

export default App
