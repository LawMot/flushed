import './login.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
     const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const response = await fetch('http://localhost:5000/auth/me', {
                    method: 'GET',
                    credentials: 'include' 
                });
                const data = await response.json();
                
                if (data.isAuthenticated) {
                    if (data.user) {
                        localStorage.setItem('display_name', data.user.display_name);
                        localStorage.setItem('email', data.user.email);
                        localStorage.setItem('userId', data.user._id || data.user.userId || '');
                        localStorage.setItem('pfp', data.user.profile_pic);
                    }
                    navigate('/home');
                }
            } catch (err) {
                console.error("Auth check failed", err);
            }
        }
        
        checkAuthStatus();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const Errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            Errors.email = '*Email is required';
        } else if (!emailRegex.test(formData.email)) {
            Errors.email = '*Please enter a valid email address';
        }

        if (!formData.password) {
            Errors.password = '*Password is required';
        }

        return Errors;
    };

   async function login(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem('display_name', data.display_name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('experience', data.experience);
        localStorage.setItem('password', data.password);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('pfp', data.pfp);
        localStorage.setItem('role', data.role);
        if (data.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/home');
        }
    } else {
        setStatusMessage(data.message || 'Login Failed');
    }
}

 const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
};   
    
    return (
        <>
            <div className='login-parent'>
                <h2>For finding the best rated public and private restrooms near you!</h2>
                <div id="login-container" className='gradient' style={{height: 490}}>
                    <div className='login-center'>Log In</div>
                    <form className='login-center' id="login" onSubmit={login}>
                    <div className='login-input'>
                        <label htmlFor="email">Email: </label>
                        <div className='input-container'>
                            <input type="email" id="email" name="email" className='login-info' value={formData.email} onChange={handleChange} />
                            {errors.email && (
                                <p className="error-message">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                <div className='login-input'>
                        <label htmlFor="password">Password:</label>
                        <div className='input-container'>
                            <input type="password" id="password" name="password"  className='login-info'value={formData.password} onChange={handleChange}/>
                            {errors.password && (
                                <p className="error-message">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="error-message">
                            {statusMessage}
                    </p>
                    <input type="submit" value="Log In" className='login'/>
                    </form>
                    <div className='login-center login-or'>
                        — OR —
                    </div>
                    <div className='login-center'>
                        <button 
                            type="button" 
                            onClick={handleGoogleLogin} 
                            className="login-google" 
                        >
                            Log In with Google
                        </button>
                    </div>
                    <p className='login-small-text'>Don't have an account?</p>
                    <a className='login-switch' href='/signUp'>Create Account</a>
                </div>
            </div>
        </>
    );
}
export default LogIn;
