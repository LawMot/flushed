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
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            Errors.email = '*Email is required';
        } else if (!emailRegex.test(formData.email)) {
            Errors.email = '*Please enter a valid email address';
        }

        if (!formData.password) {
            Errors.password = '*Password is required';
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

    async function signup(event) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log('Form submitted:', formData);

        const dname = document.getElementById('dname').value;
        const password = document.getElementById('password').value;

        const response = await fetch(
            'http://localhost:5000/signup',
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    dname: formData.dname,
                    email: formData.email,
                    password: formData.password

                })
            }
        );

        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Signup failed');
        }
    };

     return (
        <>
        <div className='login-parent'>
            <h2>For finding the best rated public and private restrooms near you!</h2>
            <div id="login-container" className='gradient' style={{height: 574, fontSize: 36}}>
                <div className='login-center'>Create An Account</div>
                <form id="createAcc"  onSubmit={signup}>
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
                            <input type="password" id="password" name="password"  className='login-info'value={formData.password} onChange={handleChange}/>
                                <p className="error-message">
                                    {errors.password}
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
