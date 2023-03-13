import React, { useState } from "react";
import "./Modal.css";
import AddAccount from "../../static/AddAccount/AddAccount.js"
import AddFriend from "../../static/AddFriend/AddFriend.js"
import AddGame from "../../static/AddGame/AddGame.js"
import AddNote from "../../static/AddNote/AddNote.js"

function Modal({showModal, setShowModal, activeModal, setActiveModal,
                writtenNotes, setWrittenNotes, originalWrittenNotesList,
                setOriginalWrittenNotesList, friendsList, setFriendsList, accountsList, 
                setAccountsList, originalAccountsList, setOriginalAccountsList, setMenuType}) {

    
    //TODO: conditionally render display component based on activeModal
    //TODO: pass setter to every component

    const renderForm = () => {
        
        switch(activeModal) {
            case("Add Account"):
                return <AddAccount 
                        accountsList={accountsList}
                        setAccountsList={setAccountsList}
                        originalAccountsList={originalAccountsList}
                        setOriginalAccountsList={setOriginalAccountsList}
                        setShowModal={setShowModal}/>
            case("Add Friend"):
                return <AddFriend 
                    friendsList={friendsList}
                    setFriendsList={setFriendsList}
                    />
            case("Add Note"):
                return <AddNote 
                        writtenNotes={writtenNotes}
                        setWrittenNotes={setWrittenNotes}
                        originalWrittenNotesList={originalWrittenNotesList}
                        setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                        setShowModal={setShowModal}
                        />
            case("Add Game"):
                return <AddGame />

            default:
                break;
        }
    }

    const handleClick = (event) => {
        if(event.target.id === "modalContainer" || event.target.id === "closeModalX"){
            setShowModal(false) && setMenuType(false);
        }
    }

    return (
        <div className="modalContainer cursor" id="modalContainer" onClick={handleClick}>
            <div className="modalWindow">
                <div className="closeModalX cursor" id="closeModalX" onClick={handleClick}>x</div>
                <h2 className="modalTitle">{activeModal}</h2>
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