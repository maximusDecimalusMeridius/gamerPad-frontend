import React, {useState} from "react";
import "./LandingPage.css";
import Login from "../../components/static/Login/Login";
import Signup from "../../components/static/Signup/Signup";


function LandingPage() {
    
    const [activePage, setActivePage] = useState("login");
    
    function setPage() {
        // TODO: onClick to set active page
    }

    return (
        <div className="landingContainer">
            {/* TODO: Conditionally render login and signup components */}Test
        </div>
    );
}

export default LandingPage;