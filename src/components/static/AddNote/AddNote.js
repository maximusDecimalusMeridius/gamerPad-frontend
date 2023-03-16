import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./AddNote.css"

function AddNote({writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                sharedNotes, setSharedNotes, setShowModal, warningMessage, setWarningMessage}) {
    
    const navigate = useNavigate();

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteColorCode, setNoteColorCode] = useState("#fa8072");

    const handleSubmit = async (event) => {
        
    try {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const newNoteObj = {
            title: noteTitle.trim(),
            textContent: noteContent.trim(),
            color: noteColorCode
        }

        const result = await fetch("https://gamerpad-backend.herokuapp.com/api/notes/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(newNoteObj)
        })

        const data = await result.json();

        if (result.ok) {
            setWrittenNotes([...writtenNotes, {
                color: `${data.color}`,
                createdAt: `${data.createdAt}`,
                id: data.id,
                isShared: `${data.isShared}`,
                textContent: `${data.textContent}`,
                title: data.title
            }])
            setOriginalWrittenNotesList([...originalWrittenNotesList, {
                color: `${data.color}`,
                createdAt: `${data.createdAt}`,
                id: data.id,
                isShared: `${data.isShared}`,
                textContent: `${data.textContent}`,
                title: data.title
            }])
            setShowModal(false);
            navigate("/dashboard/notes", {replace: true})
            // setNoteTitle("");
            // setNoteContent("");
        } else if (result.status >= 400 ){
            setWarningMessage("Error adding note");
            setTimeout(() => {
                setWarningMessage("");
            }, "2000")
        } else if (result.status === 500){
            setWarningMessage("You must be logged in to add notes");
            setTimeout(() => {
                setWarningMessage("");
            }, "2000")
        }


        } catch(error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        if(event.target.id === "formNoteTitle") {
            setNoteTitle(event.target.value)
        } else if (event.target.id === "formNoteContent") {
            setNoteContent(event.target.value)
        } else if (event.target.id === "formNoteColorCode") {
            setNoteColorCode(event.target.value);
        }
    }

    const getPlaceholder = () => {
        const thingsArray = ["thoughts", "ideas", "dreams", "wonders", "wishes", "notes"];
        const index = Math.floor(Math.random() * thingsArray.length);
        return thingsArray[index];        
    }

    return (
        <div className="contentModalWindow">
            <form className="modalForm" id="signupForm" onSubmit={handleSubmit}>
            <input id="formNoteColorCode" type="color" value={noteColorCode} onChange={handleChange}></input>
            <div className="inputContainer">
                <input type="text" id="formNoteTitle" name="noteTitle" placeholder="note title" onChange={handleChange} value={noteTitle} required></input>
                <input type="text" id="formNoteContent" name="noteContent" placeholder={`your ${getPlaceholder()}`} onChange={handleChange} value={noteContent} required></input>
            </div>
            <div className="statusWindowNote">
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                <button className="addSubmitButton">Create Note</button>
            </div>
        </form>
        </div>
    );
}

export default AddNote;