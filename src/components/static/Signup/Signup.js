import {React, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Signup.css"

function Signup({activePage, userValue, emailValue, passwordValue, confirmValue, handleChange, isLoggedIn, setIsLoggedIn, warningMessage, setWarningMessage}) {

    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(passwordValue !== confirmValue){
            setWarningMessage(`Passwords do not match`);
            return 
        }

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

            if(result.ok){
                setIsLoggedIn(true);
                localStorage.token = data.token;
                navigate("/", {replace: true})
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

    const validateField = (e) => {
        console.log(e)
        const {name, value} = e.target;
        const passwordValidator = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*+?:;])[A-Za-z\d~!@#$%^&*+?:;]/;
        const emailValidator = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/gi
        console.log(value)
        console.log(document.querySelector(`#signupPassword`).innerText)
        if(name === `username`){
            if(value === ''){
                setWarningMessage('Username field is required');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            }else if(value.length < 3 || value.length > 20){
                setWarningMessage('Username must be between 3 to 20 characters');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else {
                setWarningMessage('');
            }
        } else if(name === `email`){
            if(value === ''){
                setWarningMessage('Email field is required');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else if(!emailValidator.test(value)){ 
                setWarningMessage('Please enter a valid email address');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else {
                setWarningMessage('');
            }
        } else if(name === `password`){
            if(value === ''){
                setWarningMessage('Password field is required');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else if(!(passwordValidator.test(value))){
                setWarningMessage('Passwords require at least 1 uppercase character, 1 lowercase character, 1 number, and 1 special character ds');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else if(value.length < 8 || value.length > 128){
                setWarningMessage('Passwords must be between 8 and 128 characters long');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else {
                setCurrentPassword(value)
                setWarningMessage('');
            }
        } else if(name === `vPassword`){
            if(value === ''){
                setWarningMessage('Password field is required');
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else if(value !== currentPassword){
                setWarningMessage('Passwords need to match'); 
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else {
                setWarningMessage('');
            }
        }
    }
    
    return (
        <form id="signupForm" onSubmit={handleSubmit}>
            <input type="text" id="signupUsername" name="username" placeholder="username" onChange={handleChange} onBlur={validateField} value={userValue} required></input>
            <input type="text" id="signupEmail" name="email" placeholder="email" onChange={handleChange} onBlur={validateField} value={emailValue} required></input>
            <input type="password" id="signupPassword" name="password" placeholder="password" onChange={handleChange} onBlur={validateField} value={passwordValue} required></input>
            <input type="password" id="signupConfirm"name="vPassword"placeholder="verify password" onChange={handleChange} onBlur={validateField} value={confirmValue}required></input>
            <div className="checkboxEl">
                <input type="checkbox" id="ageValidation" className="checkbox" required/>
                <label htmlFor="ageVaildation">I certify I am at least 13 years of age.</label>
            </div>
            <div className="statusWindow">
                <button className="submitButton" data-activepage={activePage}>{activePage}</button>
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
            </div>
        </form>
    );
}

export default Signup;