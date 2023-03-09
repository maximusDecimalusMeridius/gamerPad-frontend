import React from "react";
import "./UserMenu.css"

function UserMenu() {
    
    //

    return (
        <>
            <div className="userMenu">
                <div className="userMenuItem" id="userMenuItem-1">Profile Name</div>
                <br /><br />
                <div className="userMenuItem" id="userMenuItem-2">Add Account</div>
                <div className="userMenuItem" id="userMenuItem-3">Add Friend</div>
                <div className="userMenuItem" id="userMenuItem-4">Add Game</div>
                <div className="userMenuItem" id="userMenuItem-5">Add Note</div>
                <br /><br />
                <div className="userMenuItem" id="userMenuItem-6">Theme Prefs</div>
                <br /><br />
                <div className="userMenuItem" id="userMenuItem-7">Logout</div>
            </div>
        </>
    )
}
export default UserMenu;