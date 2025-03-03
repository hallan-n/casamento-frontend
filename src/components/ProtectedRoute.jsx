// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("jwt");
    return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
