import './login.css';
import { useState } from 'react';

function CreateAccount() {
    const [formData, setFormData] = useState({
        dname: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.dname.trim()) {
            Errors.dname = '*Display name is required';
        } else if (formData.dname.trim().length < 4 || formData.dname.trim().length > 16) {
            Errors.dname =
                '*Display name must be between 4 and 16 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            Errors.email = '*Email is required';
        } else if (!emailRegex.test(formData.email)) {
            Errors.email = '*Please enter a valid email address';
        }

        if (!formData.password) {
            Errors.password = '*Password is required';
        } else if (formData.password.length < 8) {
            Errors.password =
                '*Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            Errors.confirmPassword =
                '*Please confirm your password';
        } else if ( formData.password !== formData.confirmPassword) {
            Errors.confirmPassword =
                '*Passwords do not match';
        }

        return Errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log('Form submitted:', formData);

        // Later you'll send the data to your backend here
        /*
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        */
    };

     return (
        <>
        <div className='login-parent'>
            <h2>For finding the best rated public and private restrooms near you!</h2>
            <div id="login-container" className='gradient' style={{height: 574, fontSize: 36}}> 
                <div className='login-center'>Create An Account</div>
                <form id="createAcc"  onSubmit={handleSubmit}>
                    <div className='login-input'>
                        <label htmlFor="dname">Display Name:</label>
                        <div className='input-container'>
                            <input type="text" id="dname" name="dname" className='login-info' value={formData.dname} onChange={handleChange}/>
                            
                                <p className="error-message">
                                    {errors.dname}
                                </p>
                            
                         </div>
                    </div>
                    
                    <div className='login-input'>
                        <label htmlFor="email">Email: </label>
                        <div className='input-container'>
                            <input type="email" id="email" name="email" className='login-info' value={formData.email} onChange={handleChange} />
                                <p className="error-message">
                                    {errors.email}
                                </p>
                        </div>
                    </div>
                    <div className='login-input'>
                        <label htmlFor="password">Password:</label>
                        <div className='input-container'>
                            <input type="password" id="password" name="password"  className='login-info'value={formData.confirmPassword} onChange={handleChange}/>
                                <p className="error-message">
                                    {errors.confirmPassword}
                                </p>
                        </div>
                    </div>
                      
                    <div className='login-input'>
                        <label htmlFor="confirmPassword"> Confirm Password:</label>
                        <div className='input-container'>
                            <input type="password" id="confirmPassword" name="confirmPassword" className='login-info' value={formData.confirmPassword} onChange={handleChange}/>
                            
                                <p className="error-message">
                                    {errors.confirmPassword}
                                </p>
                        </div>
                    </div>
                    
                    <div className='login-center'>
                        <input type="submit" value="Sign Up" className="login"/>
                    </div>
                </form>
                    <p className='login-small-text'>Already have an account?</p>
                    <a className='login-switch' href='/'>Log In</a>
            </div>
        </div>
        </>
    );
}

export default CreateAccount;