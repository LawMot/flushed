import './login.css'
//import { useState } from "react";

function LogIn() {

    return (
        <>
        <div className='parent'>
        <div className="container info"> 
            <div className='input'>Log In</div>
            <form>
            <div className='input'>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email"/>
            </div>
            <div className='input'>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"/>
            </div>
            <input type="submit" value="Log In"/>
            </form>
            <p className='small-text'>Don't have an account?</p>
            <a className='switch' href='/'>Create Account</a>
        </div>
        </div>
        </>
    );
}
export default LogIn;