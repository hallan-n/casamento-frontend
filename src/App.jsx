import AdminLogin from "./pages/AdminLogin";
import ConfirmPresence from "./pages/ConfirmPresence";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestList from "./pages/GuestList";
import AddGuest from "./pages/AddGuest";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-presence/:uuid?" element={<ConfirmPresence />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-list" element={<GuestList />} />
        <Route path="/add-guest" element={<AddGuest />} />
      </Routes>
    </Router>
  );
  
}
export default App
