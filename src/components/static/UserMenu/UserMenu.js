import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import "./UserMenu.css"

function UserMenu({ showModal, setShowModal, activeModal, setActiveModal, setMenuType, setOpenNav }) {

    //

    const handleModal = (event) => {
        setShowModal(true);
        setActiveModal(event.target.textContent);
        setMenuType(false)
    }
    const handleMenuClick = (event) => {
        if(event.target.classList.contains("modalContainer") || event.target.classList.contains("link") || event.target.id === "exitBox"){
            setMenuType(false)
            setOpenNav(false)
        }
    }

    <Navigate to="/ProfilePage" />
    return (
        <div className="modalContainer" onClick={handleMenuClick}>
            <div className="userMenuContainer">
                <ul className="userMenu">
                    <div id='exitBox' onClick={handleMenuClick}>X</div>
                    <li className="userMenuItem cursor link" id="userMenuItem-2" value="Add Account" onClick={handleModal}>Add Account</li>
                    <li className="userMenuItem cursor link" id="userMenuItem-3" value="Add Friend" onClick={handleModal}>Add Friend</li>
                    <li className="userMenuItem cursor link" id="userMenuItem-4" value="Add Game" onClick={handleModal}>Add Game</li>
                    <li className="userMenuItem cursor link" id="userMenuItem-5" value="Add Note" onClick={handleModal}>Add Note</li>
                    <br /><br />
                    <li className="userMenuItem cursor link" id="userMenuItem-6" onClick={handleMenuClick}>Theme Prefs</li>
                </ul>
            </div>
        </div>
    )
}
export default UserMenu;