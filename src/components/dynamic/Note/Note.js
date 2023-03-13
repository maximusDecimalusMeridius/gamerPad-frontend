import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar"
import "../NotesList/NotesList.css";

function Note({ id, title, textContent, color, createdAt, index, handleDelete, author, currentNotes, handleEdit }) {

    const [sideBarVisibility, setsideBarVisibility] = useState('none')
    const [isEditing, setIsEditing] = useState(false)

    const [titleInput, setTitleInput] = useState(title)
    const [textInput, setTextInput] = useState(textContent)

    const handleMoreClick = (event) => {
        if (sideBarVisibility == 'none') {
            setsideBarVisibility('block')
        } else {
            setsideBarVisibility('none')
        }
    }

    const handleChange = (e) => {
        if (e.target.className === "noteTitle") {
            setTitleInput(e.target.value)
        } else if (e.target.className === "noteText") {
            setTextInput(e.target.value)
        }
    }

    const renderNotes = () => {
        if (currentNotes === "sharedNotes")  {

            return (
                <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{ border: `3px solid ${color}` }}>
                    <div className="noteHeader" style={{ background: `${color}` }}>
                        <h2 className="noteTitle">{title}</h2>
                        <p className="noteMoreBtns" onClick={() => { handleDelete(id) }}>🗑️</p>
                    </div>
                    <div className="noteContent">
                        <p>{textContent}</p>
                        <br></br>
                        <p className="bottomNote">By {author} On {createdAt.slice(0, 10)}</p>
                    </div>
                </div>
            )
        } else if (!isEditing && currentNotes === "writtenNotes") {
            return (
                <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{ border: `3px solid ${color}` }}>
                    <div className="noteHeader" style={{ background: `${color}` }}>
                        <h2 className="noteTitle">{title}</h2>
                        <p className="noteMenu" onClick={handleMoreClick}>...</p>
                        <div className="noteMoreDiv" style={{ background: `${color}`, display: `${sideBarVisibility}` }}>
                            <p className="noteMoreBtns" onClick={() => setIsEditing(true)}>✏️</p>
                            <p className="noteMoreBtns" onClick={() => { handleDelete(id); setsideBarVisibility('none') }}>🗑️</p>
                            <p className="noteMoreBtns">🔗</p>
                        </div>
                    </div>
                    <div className="noteContent">
                        <p>{textContent}</p>
                        <br></br>
                        <p className="bottomNote">On {createdAt.slice(0, 10)}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{ border: `3px solid ${color}` }}>
                    <div className="noteHeader" style={{ background: `${color}` }}>
                        <input className="noteTitle" value={titleInput} onChange={handleChange}></input>
                        <p className="noteMenu" onClick={() => {
                            setIsEditing(false);
                            setTitleInput(title);
                            setTextInput(textContent);
                            setsideBarVisibility("none")
                            }}>X</p>
                    </div>
                    <div className="noteContent">
                        <textarea className="noteText" value={textInput} onChange={handleChange}></textarea>
                        <button  onClick={() => { 
                            handleEdit(id, titleInput, textInput); 
                            setsideBarVisibility('none');
                            setIsEditing(false);
                             }}>Update</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {renderNotes()}
        </div>
    )

}

export default Note;