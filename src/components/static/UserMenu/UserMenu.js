import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import "./UserMenu.css"

function UserMenu({menuType, setMenuType, showModal, setShowModal, activeModal, setActiveModal}) {
    const handleExitClick = () => {
        menuType && setMenuType(false)
    }
    //
    
    const handleModal = (event) => {
        setShowModal(true);
        setActiveModal(event.target.textContent);
    }

    <Navigate to="/ProfilePage" />
    return (
       <div className="userMenuContainer">
            <ul className="userMenu">
                <div id='exitBox' onClick={handleExitClick}>X</div>
                <li className="userMenuItem" id="userMenuItem-1"><Link to="/ProfilePage">Profile Name</Link></li>
                    <br /><br />
                <li className="userMenuItem cursor" id="userMenuItem-2" value="Add Account" onClick={handleModal}>Add Account</li>
                <li className="userMenuItem cursor" id="userMenuItem-3" value="Add Friend" onClick={handleModal}>Add Friend</li>
                <li className="userMenuItem cursor" id="userMenuItem-4" value="Add Game" onClick={handleModal}>Add Game</li>
                <li className="userMenuItem cursor" id="userMenuItem-5" value="Add Note" onClick={handleModal}>Add Note</li>
                    <br /><br />
                <li className="userMenuItem" id="userMenuItem-6">Theme Prefs</li>
            </ul>
            <Routes>
            <Route to="/ProfilePage" element={<ProfilePage/>}/>
            </Routes>
        </div>
    )
}
export default UserMenu;