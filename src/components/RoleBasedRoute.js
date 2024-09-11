// src/components/RoleBasedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Display a loader while checking authentication
    }

    // Check if the user is authenticated and if the user role matches the allowed roles
    const hasAccess = allowedRoles.includes(user?.isAdmin ? 'admin' : 'user');

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!hasAccess) {
        return <Navigate to="/404" />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
