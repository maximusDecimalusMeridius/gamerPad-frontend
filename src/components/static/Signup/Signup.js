import React from "react";
import "./Signup.css"

function Signup() {
    return (
        <form id="signupForm">
            <input id="signupUsername" placeholder="username" required></input>
            <input id="signupPassword" placeholder="password" required></input>
            <input id="signupConfirm" placeholder="verify password" required></input>
        </form>
    );
}

export default Signup;