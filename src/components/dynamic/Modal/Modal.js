import React, {useState} from "react";
import "./Modal.css";
import AddAccount from "../../static/AddAccount/AddAccount.js"
import AddFriend from "../../static/AddFriend/AddFriend.js"
import AddGame from "../../static/AddGame/AddGame.js"
import AddNote from "../../static/AddNote/AddNote.js"

function Modal({menuType}) {

    const [activeModal, setActiveModal] = useState(menuType);
    //TODO: conditionally render display component based on activeModal
    //TODO: pass setter to every component

    return (
        <div className="modalContainer">

        {/* TODO: Add warning bar */}
        {/* TODO: Add button */}
        {/* TODO: Add nav menu that highlights active page */}
        {/* TODO: Add onClick to setActiveModal on menu click */}
        </div>
    );
}

export default Modal;