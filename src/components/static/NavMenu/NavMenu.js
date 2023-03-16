import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./NavMenu.css"

function NavMenu({ isLoggedIn, setIsLoggedIn, setMenuType, setOpenNav, showModal, setShowModal, activeModal, setActiveModal, warningMessage, setWarningMessage}) {

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
        if(event.target.id === "modalContainer" || event.target.classList.contains("link") || event.target.classList.contains("modalContainer")) {
            setMenuType(false)
            setOpenNav(false)
        }
    }

    <Navigate to="/ProfilePage"  />
    return (
      
        <div className="modalContainer" id="modalContainer" onClick={handleMenuClick}>
        <div className="navMenuContainer">
            <ul className="navMenu">
                {isLoggedIn ? (<>
                    <li className="navMenuItem" id="navMenuItem-1" onClick={handleMenuClick}>
                        <Link to="/profile" className="link" warningMessage={warningMessage} setWarningMessage={setWarningMessage}>Profile</Link>
                        </li>
                    <li className="navMenuItem" id="navMenuItem-2">
                        <Link to="/dashboard" className="link" onClick={handleMenuClick}>Dashboard</Link>
                    </li>
                    <ul className="dashboardItems">
                        <Link to="/dashboard"><li className="link subitem" onClick={handleMenuClick}>Social</li></Link>
                        <Link to="/dashboard/notes"><li className="link subitem" onClick={handleMenuClick}>Notes</li></Link>
                        <Link to="/dashboard/games"><li className="link subitem" onClick={handleMenuClick}>Games</li></Link>      
                    </ul>
                    <li className="navMenuItem" id="navMenuItem-3" onClick={handleMenuClick}>
                        <Link to="https://docs.google.com/presentation/d/1nZxT10Zg4T0WPLiNUHyoXvCyTMZiRPIb5omz-qwyJ04/edit#slide=id.g1fd4261539c_0_5" target="_blank" referrer="noreferrer" className="link">About Us</Link>
                    </li>
                    {/* <li className="navMenuItem cursor link" id="navMenuItem-9" onClick={handleMenuClick}>Theme Prefs</li> */}
                    <li id="logoutButton" onClick={endSession}>
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