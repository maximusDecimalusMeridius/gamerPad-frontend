import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login({activePage, userValue, passwordValue, handleChange, isLoggedIn, setIsLoggedIn, warningMessage, setWarningMessage}) {
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const loginObj = {
                login: userValue,
                password: passwordValue
            }

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/users/login", {
                method: "POST",
                body: JSON.stringify(loginObj),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await result.json();
            if(result.ok){
                navigate("/", {replace: true})
                setIsLoggedIn(true);
                localStorage.token = data.token;
                localStorage.isLoggedIn = true;
            } else {
                setWarningMessage("Invalid credentials");
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            }
        } catch (error){
            console.error(error);
        }
    }

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <input type="text" id="loginUsername" name="username" placeholder="email or username" value={userValue} onChange={handleChange} required></input>
            <input type="password" id="loginPassword" name="password" placeholder="password" value={passwordValue} onChange={handleChange} required></input>
            <div className="statusWindow">
                <button className="submitButton" data-activepage={activePage}>{activePage}</button>
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
            </div>
        </form>
    );
}

export default Login;