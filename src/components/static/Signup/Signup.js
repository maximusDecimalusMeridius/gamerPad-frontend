import React from "react";
import "./Signup.css"

function Signup() {
    return (
        <div className="signupContainer">
            <div className="signupContainer">
            <form id="signupForm">
                <input id="signupUsername" required></input>
                <input id="signupPassword" required></input>
                <input id="signupConfirm" required></input>
            </form>
            <div className="signupBuffer"></div>
        </div>
        </div>
    );
}

export default Signup;