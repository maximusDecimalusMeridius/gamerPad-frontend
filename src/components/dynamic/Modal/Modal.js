import React, { useState, useEffect } from "react";
import "./Modal.css";
import AddAccount from "../../static/AddAccount/AddAccount.js"
import AddFriend from "../../static/AddFriend/AddFriend.js"
import AddGame from "../../static/AddGame/AddGame.js"
import AddNote from "../../static/AddNote/AddNote.js"

function Modal({showModal, setShowModal, activeModal, setActiveModal,
                writtenNotes, setWrittenNotes, originalWrittenNotesList, gamesList, setGamesList, originalGameList, setOriginalGameList,
                setOriginalWrittenNotesList, friendsList, setFriendsList, originalFriendsList, setOriginalFriendsList, accountsList, 
                setAccountsList, originalAccountsList, setOriginalAccountsList, setMenuType, warningMessage, setWarningMessage}) {

    const renderForm = () => {
        
        switch(activeModal) {
                        
            case("Add Account"):
                return <AddAccount 
                        accountsList={accountsList}
                        setAccountsList={setAccountsList}
                        originalAccountsList={originalAccountsList}
                        setOriginalAccountsList={setOriginalAccountsList}
                        setShowModal={setShowModal}
                        warningMessage={warningMessage}
                        setWarningMessage={setWarningMessage}
                        />
                        
            case("Add Friend"):
                return <AddFriend 
                        friendsList={friendsList}
                        setFriendsList={setFriendsList}
                        originalFriendsList={originalFriendsList}
                        setOriginalFriendsList={setOriginalFriendsList}
                        setShowModal={setShowModal}
                        warningMessage={warningMessage}
                        setWarningMessage={setWarningMessage}
                            />
            case("Add Note"):
                return <AddNote 
                        writtenNotes={writtenNotes}
                        setWrittenNotes={setWrittenNotes}
                        originalWrittenNotesList={originalWrittenNotesList}
                        setOriginalWrittenNotesList={setOriginalWrittenNotesList}
                        setShowModal={setShowModal}
                        warningMessage={warningMessage}
                        setWarningMessage={setWarningMessage}
                        />
            case("Add Game"):
                return <AddGame 
                        setShowModal={setShowModal}
                        warningMessage={warningMessage}
                        setWarningMessage={setWarningMessage}
                        gamesList={gamesList}
                        setGamesList={setGamesList}
                        originalGameList={setOriginalGameList}
                        setOriginalGameList={setOriginalGameList}
                        />

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
        <div className="modalContainer cursor" id="modalContainer" onMouseDown={handleClick}>
            <div className="modalWindow">
                {activeModal === "Checking Login Info..." || activeModal === "Logged In!" || activeModal === "Logging out..." || activeModal === "Error Logging In - Please Try Again" ? (
                    ""
                ) : <div className="closeModalX cursor" id="closeModalX" onClick={handleClick}>❌</div>}
                <h2 className="modalTitle">{activeModal}</h2>
                {renderForm()}
                {activeModal === "Checking Login Info..." || activeModal === "Logged In!" || activeModal === "Logging out..." || activeModal === "Error Logging In - Please Try Again" ? (
                    ""
                ) : ( <ul className="modalNavMenu">
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Account")}>{activeModal === "Add Account" ? `${activeModal}` : "Account"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Friend")}>{activeModal === "Add Friend" ? `${activeModal}` : "Friend"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Note")}>{activeModal === "Add Note" ? `${activeModal}` : "Note"}</li> |
                    <li className="modalNavItem cursor" onClick={() => setActiveModal("Add Game")}>{activeModal === "Add Game" ? `${activeModal}` : "Game"}</li>
                </ul>
                )}
                
            </div>
        
        </div>
    );
}

export default Modal;