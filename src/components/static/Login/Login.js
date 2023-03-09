import React, {useState} from "react";
import "./Login.css"

function Login() {
        
    return (
        <div className="loginContainer">
            <form id="loginForm">
                <input id="loginUsername" required></input>
                <input id="loginPassword" required></input>
            </form>
            <div className="loginBuffer"></div>
        </div>
    );
}

export default Login;