import React from "react";
import "./NavMenu.css"

function NavMenu() {

    return (
        <>
            <div className="navMenu">
                <div className="navMenuItem" id="navMenuItem-1">Home</div>
                <div className="navMenuItem" id="navMenuItem-2">Games</div>
                <div className="navMenuItem" id="navMenuItem-3">Friends</div>
                <div className="navMenuItem" id="navMenuItem-4">Notes</div>
                <div className="navMenuItem" id="navMenuItem-5">Communities</div>
                <div className="navMenuItem" id="navMenuItem-6">Logout</div>
            </div>
        </>
    )
}
export default NavMenu;