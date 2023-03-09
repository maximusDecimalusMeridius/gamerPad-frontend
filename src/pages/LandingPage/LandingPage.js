import React, {useState} from "react";
import "./LandingPage.css";
import Login from "../../components/static/Login/Login";
import Signup from "../../components/static/Signup/Signup";

function LandingPage() {
    const [activePage, setActivePage] = useState("Login");
    
    const renderPage = () => {
        if(activePage === "Login") {
            return <Login />
        } else {
            return <Signup />
        }
    }
    
    const setPage = () => {
        if(activePage === "Login"){
            setActivePage("Signup");
        } else {
            setActivePage("Login");
        }
    }

    return (
        <div className="landingContainer">
            <h2 className="landingTitle">{activePage} Page</h2>
            {renderPage()}
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage"></p>
                <button className="submitButton" id="submitButton" data-activepage={activePage}>{activePage}</button>
            </div>
            <p id="toggleButton" onClick={setPage}>Click to {activePage}</p>
        </div>
    );
}

export default LandingPage;