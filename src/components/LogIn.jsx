import './login.css'
//import { useState } from "react";

import { useNavigate } from "react-router-dom"; 

function LogIn() {
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        navigate('/home');
    };
    return (
        <>
        <div className='login-parent'>
             <h2>For finding the best rated public and private restrooms near you!</h2>
        <div className="login-container"> 
            <div className='login-center'>Log In</div>
            <form className='login-center' onSubmit={handleSubmit}>
            <div className='login-input'>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className='login-info'/>
            </div>
            <div className='login-input'>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className='login-info'/>
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