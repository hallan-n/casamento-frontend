import AdminLogin from "./pages/AdminLogin";
import ConfirmPresence from "./pages/ConfirmPresence";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GuestList from "./pages/GuestList";
import AddGuest from "./pages/AddGuest";
import EditGuest from "./pages/EditGuest";
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

        <Route path="/guest-list" element={<ProtectedRoute><GuestList /></ProtectedRoute>} />
        <Route path="/add-guest" element={<ProtectedRoute><AddGuest /></ProtectedRoute>} />
        <Route path="/edit-guest/:id?" element={<ProtectedRoute><EditGuest /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}