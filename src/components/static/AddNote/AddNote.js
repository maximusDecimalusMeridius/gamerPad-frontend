import React, {useState} from "react";
import "./AddNote.css"

function AddNote({writtenNotes, setWrittenNotes, originalWrittenNotesList, setOriginalWrittenNotesList,
                sharedNotes, setSharedNotes, setShowModal}) {
    
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteColorCode, setNoteColorCode] = useState("#fa8072");

    const handleSubmit = async (event) => {
        
    try {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const newNoteObj = {
            title: noteTitle,
            textContent: noteContent,
            color: noteColorCode
        }

        const result = await fetch("http://localhost:3001/api/notes/", {
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
            // setNoteTitle("");
            // setNoteContent("");
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
            <input id="formNoteColorCode" type="color" onChange={handleChange}></input>
            <div className="inputContainer">
                <input type="text" id="formNoteTitle" name="noteTitle" placeholder="note title" onChange={handleChange} value={noteTitle} required></input>
                <input type="text" id="formNoteContent" name="noteContent" placeholder={`your ${getPlaceholder()}`} onChange={handleChange} value={noteContent} required></input>
            </div>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">Oh noes!</p>
                <button className="submitButton">Create Note</button>
            </div>
        </form>
        </div>
    );
}

export default AddNote;