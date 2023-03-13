import {React, useState} from "react";
import "./Signup.css"

function Signup({activePage, userValue, emailValue, passwordValue, confirmValue, handleChange, isLoggedIn, setIsLoggedIn}) {
    
    const [errorMessage, setErrorMessage] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(passwordValue !== confirmValue){
            document.querySelector(`.warningMessage`).innerText = `Passwords do not match`
            return 
        }

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
            
            if(result.ok){
                setIsLoggedIn(true);
                localStorage.token = data.token;
            }

        } catch (error){
            console.error(error);
        }
    }

    const validateField = (e) => {
        console.log(e)
        const {name, value} = e.target;
        const passwordValidator = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*+?:;])[A-Za-z\d~!@#$%^&*+?:;]/;
        const emailValidator = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/gi
        console.log(value)
        console.log(document.querySelector(`#signupPassword`).innerText)
        if(name === `username`){
            if(value === ''){
                setErrorMessage('Username field is required');
            } else {
                setErrorMessage('');
            }
        } else if(name === `email`){
            if(value === ''){
                setErrorMessage('Email field is required');
            } else if(!emailValidator.test(value)){ 
                setErrorMessage('Please enter a valid email address');
            } else {
                setErrorMessage('');
            }
        } else if(name === `password`){
            if(value === ''){
                setErrorMessage('Password field is required');
            } else if(!(passwordValidator.test(value))){
                setErrorMessage('Passwords require at least 1 uppercase character, 1 lowercase character, 1 number, and 1 special character ds');
            } else if(value.length < 8 || value.length > 128){
                setErrorMessage('Passwords must be between 8 and 128 characters long');
            } else {
                setCurrentPassword(value)
                setErrorMessage('');
            }
        } else if(name === `vPassword`){
            if(value === ''){
                setErrorMessage('Password field is required');
            } else if(value !== currentPassword){
                setErrorMessage('Passwords need to match'); 
            } else {
                setErrorMessage('');
            }
        }
    }
    
    return (
        <form id="signupForm" onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="signupUsername" 
                name="username" 
                placeholder="username" 
                onChange={handleChange} 
                onBlur={validateField} 
                value={userValue} 
                required
            >
            </input>
            <input 
                type="text" 
                id="signupEmail" 
                name="email" 
                placeholder="email" 
                onChange={handleChange} 
                onBlur={validateField} 
                value={emailValue} 
                required
            >
            </input>
            <input 
                type="password" 
                id="signupPassword" 
                name="password" 
                placeholder="password" 
                onChange={handleChange} 
                onBlur={validateField} 
                value={passwordValue} 
                required
            >
            </input>
            <input 
                type="password" 
                id="signupConfirm"
                name="vPassword"
                placeholder="verify password" 
                onChange={handleChange} 
                onBlur={validateField} 
                value={confirmValue}
                required>
                </input>
            <label className="checkboxEl">
                <input 
                    type="checkbox" 
                    id="ageValidation" 
                    className="checkbox" 
                    required
                />
                I certify I am at least 13 years of age.
            </label>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">{errorMessage}</p>
                <button className="submitButton" data-activepage={activePage}>{activePage}</button>
            </div>
        </form>
    );
}

export default Signup;