import React from "react";
import "./Signup.css"

function Signup({activePage, userValue, emailValue, passwordValue, handleChange, isLoggedIn, setIsLoggedIn, warningMessage, setWarningMessage, setuserInfo}) {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const signupObj = {
                username: userValue,
                email: emailValue,
                password: passwordValue
            }
            
            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/users", {
                method: "POST",
                body: JSON.stringify(signupObj),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await result.json();
            console.log(data);
            setuserInfo(data)

            if(result.ok){
                setIsLoggedIn(true);
                localStorage.token = data.token;
            } else {
                setWarningMessage("Error signing up");
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            }

        } catch (error){
            console.error(error);
        }
    }
    
    return (
        <form id="signupForm" onSubmit={handleSubmit}>
            <input type="text" id="signupUsername" name="username" placeholder="username" onChange={handleChange} value={userValue} required></input>
            <input type="text" id="signupEmail" name="email" placeholder="email" onChange={handleChange} value={emailValue} required></input>
            <div className="passwordContainer">
                <input type="password" id="signupPassword" name="password" placeholder="password" onChange={handleChange} value={passwordValue} required></input>
                <input type="password" id="signupConfirm" placeholder="verify password" required></input>
            </div>
            <div className="statusWindow">
                <button className="submitButton" data-activepage={activePage}>{activePage}</button>
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
            </div>
        </form>
    );
}

export default Signup;