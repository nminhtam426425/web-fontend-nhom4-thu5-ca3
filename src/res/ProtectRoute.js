import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const adminId = localStorage.getItem('admin_id');

    if (!adminId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;