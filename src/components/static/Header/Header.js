import React, {useState} from "react";
import "./Header.css";
import Modal from "../../dynamic/Modal/Modal.js";
import NavMenu from "../../static/NavMenu/NavMenu.js";
import UserMenu from "../../static/UserMenu/UserMenu.js";
import {Link} from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn, showModal, setShowModal, activeModal, setActiveModal,
                writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                sharedNotes, setSharedNotes, showMenu, setShowMenu}) {
    
    const [menuType, setMenuType] = useState(false);
    const [openNav, setOpenNav] = useState(false);
   
    //TODO: Pass page prop and setter to Modal with menu type

    const openUserMenu = (event) => {
        isLoggedIn && setMenuType(!menuType);
        setOpenNav(false);
        // create a modal when profile picture is clicked
        // on modal have link to profile page
        //  on modal a link to update profile picture is shown (cloudinary?)
        //  on modal a series of options to add things pops up (add gamertag, add friend, add game, add note)
        //  on modal a visual preferances option is shown, when clicked it allows users to change their color scheme
        // create the profile picture element that when clicked opens modal
    }

    const useNavMenu = (event) => {
        setOpenNav(!openNav);
        setMenuType(false);
    }
        // create modal/slideout menu when hamburger menu is clicked
        //  on modal have links to all main pages, and dashboard as home route
        //  on modal/slideout menu have majority of page taken up on mobile layout, slightly under half og page on desktop
        // TODO: add close box on modal/slide out menu

    const handleModal = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }
    const handleMenu = () => {
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <div className="header">
            <div className="imageContainer" onClick={openUserMenu}>
                <div className="imagePlaceholder"></div>
                {/* <a><image onClick={openUserMenu}>{}</image></a> */}
            </div>
            <div className="headerTitle">
                {isLoggedIn ? (<Link to="/dashboard">
                    <h1 className="loggedInHeader">gamerPad</h1>
                </Link>) : (<h1>gamerPad</h1>)}
                
            </div>
            
            <div className="hamburger" id="hamburger" onClick={useNavMenu}>
                <div className="burger" id="burger-1"></div>
                <div className="burger" id="burger-2"></div>
                <div className="burger" id="burger-3"></div>
            </div>
    
            {showModal && <Modal 
                            showModal={showModal}
                            setShowModal={setShowModal}
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                        />}

            {openNav && <NavMenu
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            setMenuType={setMenuType}
                            setOpenNav={setOpenNav}
                            />}
            {menuType && <UserMenu
                            setMenuType={setMenuType}
                            setOpenNav={setOpenNav}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                        />}
        </div>
    )

}
export default Header;