import React from "react";
import "./Signup.css"

function Signup({activePage, userValue, passwordValue, handleChange}) {
    return (
        <form id="signupForm">
            <input type="text" id="signupUsername" name="username" placeholder="username" onChange={handleChange} value={userValue} required></input>
            <input type="password" id="signupPassword" name="password" placeholder="password" onChange={handleChange} value={passwordValue} required></input>
            <input type="password" id="signupConfirm" placeholder="verify password" required></input>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">Oh noes!</p>
                <button className="submitButton" data-activepage={activePage}>{activePage}</button>
            </div>
        </form>
    );
}

export default Signup;