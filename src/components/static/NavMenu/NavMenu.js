import React from "react";
import { Link, Route, Routes } from "react-router-dom";


import "./NavMenu.css"

function NavMenu({ isLoggedIn, setIsLoggedIn, setMenuType, setOpenNav  }) {

    const endSession = () => {
        setIsLoggedIn(false);
        localStorage.token = "";
        
    }
    const handleMenuClick = (event) => {
        setMenuType(false)
        setOpenNav(false)
    }
    return (
      

        <div className="navMenuContainer" onClick={handleMenuClick}>
            <ul className="navMenu">
                {isLoggedIn ? (<>
                    <li className="userMenuItem" id="navMenuItem-1" onClick={handleMenuClick}>
                        <Link to="/profile" >Profile Name</Link>
                        </li>
                    <li className="navMenuItem" id="navMenuItem-2" onClick={handleMenuClick}>
                        <Link to="/dashboard" >Dashboard</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-3" onClick={handleMenuClick}>
                        <Link to="/dashboard" >About Us</Link>
                    </li>
                    <li className="navMenuItem" id="navMenuItem-4" onClick={handleMenuClick}>
                        <Link to="/social" >Friends</Link>
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
             
    )
}
export default NavMenu;