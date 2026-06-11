import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [authenticated, setAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('http://localhost:5000/check-auth', {
                    credentials: 'include'
                });
                const data = await response.json();
                setAuthenticated(data.authenticated);
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return authenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
