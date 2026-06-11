import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
    const [authenticated, setAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('http://localhost:5000/check-auth', {
                    credentials: 'include'
                });
                const data = await response.json();
                setAuthenticated(data.authenticated);
                setUserRole(data.role);
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuthenticated(false);
                setUserRole(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/home" />;
    }

    return children;
}

export default ProtectedRoute;
