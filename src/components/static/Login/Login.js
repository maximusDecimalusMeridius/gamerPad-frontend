import React, {useState} from "react";
import "./Login.css"

function Login() {
        
    return (
        <form id="loginForm">
            <input id="loginUsername" placeholder="email or username" required></input>
            <input id="loginPassword" placeholder="password" required></input>
        </form>
    );
}

export default Login;