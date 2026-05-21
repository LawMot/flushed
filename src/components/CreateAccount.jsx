import './login.css'
//import { useState } from "react";

function CreateAccount() {

    return (
        <>
        <div className='parent'>
        <div className="container info"> 
            <div className='input'>Create An Account</div>
            <form>
                <div className='input'>
                    <label for="name">Display Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
            <div className='input'>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" />
            </div>
            <div className='input'>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"/>
            </div>
            <div className='input'>
                <label for="password"> Confirm Password:</label>
                <input type="password" id="password" name="password"/>
            </div>
            <input type="submit" value="Sign Up"/>
            </form>
            <p className='small-text'>Already have an account?</p>
            <a className='switch' href='/'>Log In</a>
        </div>
        </div>
        </>
    );
}
export default CreateAccount;