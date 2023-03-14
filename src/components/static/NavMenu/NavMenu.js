import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


import "./NavMenu.css"

function NavMenu({ isLoggedIn, setIsLoggedIn, setMenuType, setOpenNav }) {

    const navigate = useNavigate();

    const endSession = () => {
        setTimeout(() => {
            navigate("/", {replace: true});
            setIsLoggedIn(false);
            setMenuType(false)
            setOpenNav(false)
            localStorage.token = "";
        }, 250)
    }
    const handleMenuClick = (event) => {
        if(event.target.id === "modalContainer" || event.target.classList.contains("link")){
            setMenuType(false)
            setOpenNav(false)
        }
    }
    return (
      
        <div className="modalContainer" id="modalContainer" onClick={handleMenuClick}>
        <div className="navMenuContainer">
            <ul className="navMenu">
                {isLoggedIn ? (<>
                    <li className="navMenuItem" id="navMenuItem-1" onClick={handleMenuClick}>
                        <Link to="/profile" className="link">Profile Name</Link>
                        </li>
                    <li className="navMenuItem" id="navMenuItem-2" onClick={handleMenuClick}>
                        <Link to="/dashboard" className="link">Dashboard</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-3" onClick={handleMenuClick}>
                        <Link to="/dashboard" className="link">About Us</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-4" onClick={handleMenuClick}>
                        <Link to="/social" className="link">Friends</Link>
                    </li>
                    <li className="navMenuItem" id="logoutButton" onClick={endSession}>
                        Logout
                    </li>
                </>
                ) : (<>
                    <li className="navMenuItem" id="navMenuItem-2">
                        <Link to="/games" onClick={handleMenuClick}>Something Else!</Link>
                    </li>
                 
                </>
                )}

            </ul>
        </div>
        </div>
    )
}
export default NavMenu;