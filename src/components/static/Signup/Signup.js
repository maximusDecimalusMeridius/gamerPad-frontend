import React from "react";
import "./Signup.css"

function Signup({activePage, userValue, emailValue, passwordValue, handleChange, isLoggedIn, setIsLoggedIn}) {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const signupObj = {
                username: userValue,
                email: emailValue,
                password: passwordValue
            }
            
            const result = await fetch("http://localhost:3001/api/users", {
                method: "POST",
                body: JSON.stringify(signupObj),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await result.json();
            console.log("Logged In!");
            console.log(data);
            //TODO: store token in localStorage
        } catch (error){
            console.error(error);
        }
    }
    
    return (
        <form id="signupForm" onSubmit={handleSubmit}>
            <input type="text" id="signupUsername" name="username" placeholder="username" onChange={handleChange} value={userValue} required></input>
            <input type="text" id="signupEmail" name="email" placeholder="email" onChange={handleChange} value={emailValue} required></input>
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