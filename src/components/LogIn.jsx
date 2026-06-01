import './login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function LogIn() {
    const navigate = useNavigate(); 
     const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

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

    const handleSubmit = (event) => {
        event.preventDefault(); 

         const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        navigate('/home');
    };
    
    return (
        <>
        <div className='login-parent'>
             <h2>For finding the best rated public and private restrooms near you!</h2>
        <div id="login-container" className='gradient' style={{height: 490}}> 
            <div className='login-center'>Log In</div>
            <form className='login-center' id="login" onSubmit={handleSubmit}>
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
            <input type="submit" value="Log In" className='login'/>
            </form>
            <p className='login-small-text'>Don't have an account?</p>
            <a className='login-switch' href='/signUp'>Create Account</a>
        </div>
        </div>
        </>
    );
}
export default LogIn;