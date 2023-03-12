import React, { useState } from "react";
import "./Modal.css";
import AddAccount from "../../static/AddAccount/AddAccount.js"
import AddFriend from "../../static/AddFriend/AddFriend.js"
import AddGame from "../../static/AddGame/AddGame.js"
import AddNote from "../../static/AddNote/AddNote.js"

function Modal({showModal, setShowModal, activeModal, setActiveModal}) {

    
    //TODO: conditionally render display component based on activeModal
    //TODO: pass setter to every component

    const renderForm = () => {
        
        switch(activeModal) {
            case("Add Account"):
                return <AddAccount />
            case("Add Friend"):
                return <AddFriend />
            case("Add Note"):
                return <AddNote />
            case("Add Game"):
                return <AddGame />

            default:
                break;
        }
        
        // if(activeModal === "Add Account") {
        // } else if(activeModal === "Add Friend") {
        //     return <AddFriend
        //             activeModal={activeModal}
        //             setActiveModal={setActiveModal}
        //             />
        //     } else if(activeModal === "Add Game") {
        //         return <AddGame 
        //                 activeModal={activeModal}
        //                 setActiveModal={setActiveModal}
        //                 />
        //         } else if(activeModal === "Add Note") {
        //             return <AddNote
        //                     activeModal={activeModal}
        //                     setActiveModal={setActiveModal}
        //                     />
        // }
    }

    const handleClick = (event) => {
        if(event.target.id === "modalContainer" || event.target.id === "closeModalX"){
            setShowModal(false);
        }
    }

    return (
        <div className="modalContainer cursor" id="modalContainer" onClick={handleClick}>
            <div className="modalWindow">
                <div className="closeModalX cursor" id="closeModalX" onClick={handleClick}>x</div>
                <h2 className="modalTitle">{activeModal} Page</h2>
                {renderForm()}
                <ul className="modalNavMenu">
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Account")}>{activeModal === "Add Account" ? `${activeModal}` : "Account"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Friend")}>{activeModal === "Add Friend" ? `${activeModal}` : "Friend"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Note")}>{activeModal === "Add Note" ? `${activeModal}` : "Note"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Game")}>{activeModal === "Add Game" ? `${activeModal}` : "Game"}</li>
                </ul>
            </div>
        
        </div>
    );
}

export default Modal;