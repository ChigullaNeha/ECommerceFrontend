import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const jwtToken = Cookies.get('jwt-token');
    if (!jwtToken) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
}

export default ProtectedRoute;
