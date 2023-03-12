import React from "react";
import { Link } from "react-router-dom";

import "./NavMenu.css"

function NavMenu({ isLoggedIn, setIsLoggedIn }) {

    const endSession = () => {
        setIsLoggedIn(false);
        localStorage.token = "";
    }

    return (
        <div className="navMenuContainer">
            <ul className="navMenu">
                {isLoggedIn ? (<>
                    <li className="navMenuItem" id="navMenuItem-1">
                        <Link to="/dashboard">Dashboard</Link>
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
                    <li className="navMenuItem" id="logoutButton" onClick={endSession}>
                        Logout
                    </li>
                </>
                ) : (<>
                    <li className="navMenuItem" id="navMenuItem-1">
                        <Link to="/dashboard">About Us</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-2">
                        <Link to="/games">Something Else!</Link>
                    </li>
                </>
                )}

            </ul>
        </div>
    )
}
export default NavMenu;