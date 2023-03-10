import React from "react";
import "./NavMenu.css"

function NavMenu() {

    return (
        <>
            <div className="navMenu">
                <ul>
                   <a href="/dashboard"><li className="navMenuItem" id="navMenuItem-1">Home</li></a>
                   <a href="/games"><li className="navMenuItem" id="navMenuItem-2">Games</li></a>
                   <a href="/friends"><li className="navMenuItem" id="navMenuItem-3">Friends</li></a>
                   <a href="/notes"><li className="navMenuItem" id="navMenuItem-4">Notes</li></a>
                   <a href="/communities"><li className="navMenuItem" id="navMenuItem-5">Communities</li></a>
                   <a href="/Logout"><li className="navMenuItem" id="navMenuItem-6">Logout</li></a>
                </ul>
            </div>
        </>
    )
}
export default NavMenu;