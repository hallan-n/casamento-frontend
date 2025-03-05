import AdminLogin from "./pages/AdminLogin";
import ConfirmPresence from "./pages/ConfirmPresence";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminGuestList from "./pages/AdminGuestList";
import AdminAddGuest from "./pages/AdminAddGuest";
import AdminEditGuest from "./pages/AdminEditGuest";
import ProtectedRoute from "./components/ProtectedRoute";
import GiftList from "./pages/GiftList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-presence/:uuid" element={<ConfirmPresence />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/gift-list" element={<GiftList />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/guest-list" element={<ProtectedRoute><AdminGuestList /></ProtectedRoute>} />
        <Route path="/add-guest" element={<ProtectedRoute><AdminAddGuest /></ProtectedRoute>} />
        <Route path="/edit-guest/:id?" element={<ProtectedRoute><AdminEditGuest /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}