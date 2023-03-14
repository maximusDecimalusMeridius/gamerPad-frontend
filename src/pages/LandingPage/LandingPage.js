import React, {useState} from "react";
import "./LandingPage.css";
import Login from "../../components/static/Login/Login";
import Signup from "../../components/static/Signup/Signup";

function LandingPage({isLoggedIn, setIsLoggedIn, warningMessage, setWarningMessage}) {
    const [activePage, setActivePage] = useState("Login");
    const [otherPage, setOtherPage] = useState("Signup");
    const [userValue, setUserValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    
    const handleChange = (event) => {
        if(event.target.name === "username"){
            setUserValue(event.target.value);
        } else if (event.target.name === "email") {
            setEmailValue(event.target.value);
        } else if (event.target.name === "password") {
            setPasswordValue(event.target.value);
        } else if (event.target.name === "vPassword") {
            setConfirmValue(event.target.value);
        }
    }

    const renderPage = () => {
        if(activePage === "Login") {
            return <Login 
                    activePage={activePage}
                    userValue={userValue}
                    passwordValue={passwordValue}
                    handleChange={handleChange}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    warningMessage={warningMessage}
                    setWarningMessage={setWarningMessage}
                    />
        } else {
            return <Signup
                    activePage={activePage}
                    userValue={userValue}
                    emailValue={emailValue}
                    passwordValue={passwordValue}
                    confirmValue={confirmValue}
                    handleChange={handleChange}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    warningMessage={warningMessage}
                    setWarningMessage={setWarningMessage}
                    />
        }
    }
    
    const setPage = () => {
        setWarningMessage('');
        if(activePage === "Login"){
            setActivePage("Signup");
            setOtherPage("Login");
        } else {
            setActivePage("Login");
            setOtherPage("Signup");
        }
    }

    return (
        <div className="landingContainer">
            <h2 className="landingTitle">{activePage} Page</h2>
            {renderPage()}
            
            <p id="toggleButton" onClick={setPage}>Click to {otherPage}</p>
        </div>
    );
}

export default LandingPage;