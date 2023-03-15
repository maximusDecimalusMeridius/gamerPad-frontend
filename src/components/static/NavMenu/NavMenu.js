import React from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";

import "./NavMenu.css"

function NavMenu({ isLoggedIn, setIsLoggedIn, setMenuType, setOpenNav, showModal, setShowModal, activeModal, setActiveModal}) {

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
    const handleModal = (event) => {
        setShowModal(true);
        setActiveModal(event.target.textContent);
        setMenuType(false)
    }
    // const handleMenuClick = (event) => {
    //     if(event.target.classList.contains("modalContainer") || event.target.classList.contains("link") || event.target.id === "exitBox"){
    //         setMenuType(false)
    //         setOpenNav(false)
    //     }
    // }
    <Navigate to="/ProfilePage" />
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
                        <Link to="/dashboard" className="link">Friends</Link>
                    </li>
                    <br/>
                   
        
                    <li className="navMenuItem cursor link" id="navMenuItem-5" value="Add Account" onClick={handleModal}>Add Account</li>
                    <li className="navMenuItem cursor link" id="navMenuItem-6" value="Add Friend" onClick={handleModal}>Add Friend</li>
                    <li className="navMenuItem cursor link" id="navMenuItem-7" value="Add Game" onClick={handleModal}>Add Game</li>
                    <li className="navMenuItem cursor link" id="navMenuItem-8" value="Add Note" onClick={handleModal}>Add Note</li>
                    <li className="navMenuItem cursor link" id="navMenuItem-9" onClick={handleMenuClick}>Theme Prefs</li>
                    <br/>
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