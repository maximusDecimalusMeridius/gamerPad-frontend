import React, {useState} from "react";
import "./Header.css";
import Modal from "../../dynamic/Modal/Modal.js";
import NavMenu from "../../static/NavMenu/NavMenu.js";
import UserMenu from "../../static/UserMenu/UserMenu.js";

function Header() {
    
    const [menuType, setMenuType] = useState("");
    //TODO: Pass page prop and setter to Modal with menu type

    function openUserMenu() {
        // TODO: create a modal when profile picture is clicked
        // TODO: on modal have link to profile page
        // TODO: on modal a link to update profile picture is shown (cloudinary?)
        // TODO: on modal a series of options to add things pops up (add gamertag, add friend, add game, add note)
        // TODO: on modal a visual preferances option is shown, when clicked it allows users to change their color scheme
        // TODO: create the profile picture element that when clicked opens modal
    }

    function openNavMenu() {
        // TODO: Add pseudocode
    }

    return (
        <div className="header">
            <div className="imageContainer">
                <div className="imagePlaceholder"></div>
                {/* <a><image onClick={openUserMenu}>{}</image></a> */}
            </div>
            <div className="headerTitle">
                <h1>gamerPad</h1>
            </div>
            <div className="hamburger" onClick={openNavMenu}>
                <div className="burger" id="burger-1"></div>
                <div className="burger" id="burger-2"></div>
                <div className="burger" id="burger-3"></div>
            </div>
        </div>
    )
}
export default Header;