import React, {useState} from "react";
import "./Header.css";
import Modal from "../../dynamic/Modal/Modal.js";
import NavMenu from "../../static/NavMenu/NavMenu.js";

import {Link, useNavigate} from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn, showModal, setShowModal, activeModal, setActiveModal,
                writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                sharedNotes, setSharedNotes, accountsList, setAccountsList, originalAccountsList, 
                setOriginalAccountsList, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList,
                showMenu, setShowMenu, warningMessage, setWarningMessage, 
                profilePicture, setProfilePicture
            }) {
    
    const [menuType, setMenuType] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    //TODO: Pass page prop and setter to Modal with menu type
    let navigate = useNavigate();
   const openProfile = () => {
    let path = "/profile"
    navigate(path)
   }

    const useNavMenu = (event) => {
        setOpenNav(!openNav);
        setMenuType(false);
    }

    return (
        <div className="header">
            <div className="imageContainer">
                
                {isLoggedIn ? (<img src={profilePicture || localStorage.getItem("profilePicture")} className="imagePlaceholder cursor" onClick={openProfile} alt="headshot"></img>) : ""}
            </div>
            <div className="headerTitle">
                {isLoggedIn ? ( <h1 className="loggedInHeader">gamerPad</h1>) : (<h1>gamerPad</h1>)}
                
            </div>
            
            <div className="hamburger cursor" id="hamburger" onClick={useNavMenu}>
                <div className="burger" id="burger-1"></div>
                <div className="burger" id="burger-2"></div>
                <div className="burger" id="burger-3"></div>
            </div>
    
            {showModal && <Modal 
                            showModal={showModal}
                            setShowModal={setShowModal}
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                            writtenNotes={writtenNotes}
                            setWrittenNotes={setWrittenNotes}
                            originalWrittenNotesList={originalWrittenNotesList}
                            setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                            accountsList={accountsList}
                            setAccountsList={setAccountsList}
                            originalAccountsList={originalAccountsList}
                            setOriginalAccountsList={setOriginalAccountsList}
                            friendsList={friendsList}
                            setFriendsList={setFriendsList}
                            originalFriendsList={originalFriendsList}
                            setOriginalFriendsList={setOriginalFriendsList}
                            warningMessage={warningMessage}
                            setWarningMessage={setWarningMessage}
                        />}

            {openNav && <NavMenu
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
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