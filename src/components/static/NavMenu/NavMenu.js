import React from "react";
import {Link} from "react-router-dom";

import "./NavMenu.css"

function NavMenu({isLoggedIn, setIsLoggedIn}) {

    const endSession = () => {
        setIsLoggedIn(false);
        localStorage.token = "";
    }

    return (
            <div className="navMenuContainer">
                <ul className="navMenu">
                    <li className="navMenuItem" id="navMenuItem-1">
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-2">
                        <Link to="/games">Games</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-3">
                        <Link to="/social">Friends</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-4">
                        <Link to="/notes">Notes</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-5">
                        <Link to="/communities">Communities</Link>
                    </li>
                    {/* ternary operator to conditionally render the logout button */}
                    { isLoggedIn &&
                            <li className="navMenuItem" id="logoutButton" onClick={endSession}>
                                Logout
                            </li>            
                    }
                </ul>
            </div>
    )
}
export default NavMenu;