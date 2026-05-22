import './login.css'
//import { useState } from "react";

function CreateAccount() {

    return (
        <>
        <div className='login-parent'>
            <h2>For finding the best rated public and private restrooms near you!</h2>
            <div id="login-container" className='gradient' style={{height: 574, fontSize: 36}}> 
                <div className='login-center'>Create An Account</div>
                <form id="createAcc">
                    <div className='login-input'>
                        <label htmlFor="dname">Display Name:</label>
                        <input type="text" id="dname" name="dname" className='login-info'/>
                    </div>
                    <div className='login-input'>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" className='login-info' />
                    </div>
                    <div className='login-input'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password"  className='login-info'/>
                    </div>
                    <div className='login-input'>
                        <label htmlFor="confirmPassword"> Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className='login-info'/>
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