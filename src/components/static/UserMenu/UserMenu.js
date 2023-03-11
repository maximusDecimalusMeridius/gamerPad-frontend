import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import "./UserMenu.css"

function UserMenu({menuType, setMenuType}) {
    const handleExitClick = () => {
        menuType && setMenuType(false)
    }
    //
    
    <Navigate to="/ProfilePage" />
    return (
       <div className="userMenuContainer">
            <ul className="userMenu">
                <div id='exitBox' onClick={handleExitClick}>X</div>
                <li className="userMenuItem" id="userMenuItem-1"><Link to="/ProfilePage">Profile Name</Link></li>
                <br /><br />
                <li className="userMenuItem" id="userMenuItem-2">Add Account</li>
                <li className="userMenuItem" id="userMenuItem-3">Add Friend</li>
                <li className="userMenuItem" id="userMenuItem-4">Add Game</li>
                <li className="userMenuItem" id="userMenuItem-5">Add Note</li>
                <br /><br />
                <li className="userMenuItem" id="userMenuItem-6">Theme Prefs</li>
                <br /><br />
                <li className="userMenuItem" id="userMenuItem-7">Logout</li>
            </ul>
            <Routes>
            <Route to="/ProfilePage" element={<ProfilePage/>}/>
            </Routes>
        </div>
    )
}
export default UserMenu;