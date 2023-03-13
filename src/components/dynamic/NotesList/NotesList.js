import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar"
import "./NotesList.css";

function NotesList({writtenNotes, setWrittenNotes, sharedNotes, setSharedNotes, originalWrittenNotesList, setOriginalWrittenNotesList}) {
    const [originalSharedNotesList, setOriginalSharedNotesList] = useState([])

    const [currentNotes, setCurrentNotes] = useState("writtenNotes");

    // useEffect hook to fetch all notes on page load
    useEffect(() => {
        fetchNotes();
        document.title = `gamerPad - Notes`;
    }, []);

    const fetchNotes = async (event) => {

        try {
            const token = localStorage.getItem("token");

            const result = await fetch("http://localhost:3001/api/notes/currentUserNotes", {
                method: "GET",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();

            setWrittenNotes(data.WrittenNotes);
            setOriginalWrittenNotesList(data.WrittenNotes)
            setSharedNotes(data.SharedNotes);
            setOriginalSharedNotesList(data.SharedNotes)

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        if (event.target.value === "writtenNotes") {
            setWrittenNotes([]);
            setCurrentNotes("writtenNotes");
        } else if (event.target.value === "sharedNotes") {
            setSharedNotes([]);
            setCurrentNotes("sharedNotes");
        }
    }

    const [sideBarVisibility, setsideBarVisibility] = useState('none')

    const handleMoreClick = (event) => {
        if(sideBarVisibility=='none'){
            setsideBarVisibility('block')
        } else {
            setsideBarVisibility('none')
        }
    }

    const handleDelete = async (noteId) => {
        setsideBarVisibility('none')
        console.log(noteId)
        try {
            const token = localStorage.getItem("token");

            let url = `http://localhost:3001/api/notes/${noteId}`;

            if(currentNotes==="sharedNotes"){
                url = `http://localhost:3001/api/notes/removeSharedNote/${noteId}`;
            }

            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            
            if (result.ok) {
                if(currentNotes==="writtenNotes"){
                    setWrittenNotes(writtenNotes.filter((note) =>{
                        if(note.id!==noteId){
                            return note
                        }
                    }))
                    setOriginalWrittenNotesList(writtenNotes.filter((note) =>{
                        if(note.id!==noteId){
                            return note
                        }
                    }))
                } else {
                    setSharedNotes(sharedNotes.filter((note) =>{
                        if(note.id!==noteId){
                            return note
                        }
                    }))
                    setOriginalSharedNotesList(sharedNotes.filter((note) =>{
                        if(note.id!==noteId){
                            return note
                        }
                    }))
                }
                
                
    
                // setNoteTitle("");
                // setNoteContent("");
            }

        } catch (error) {
            console.error(error);
        }
    } 

    const wNotes = writtenNotes.map((note, index) => {
        return (
            <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{ border: `3px solid ${note.color}` }}>
                <div className="noteHeader" style={{ background: `${note.color}` }}>
                    <h2 className="noteTitle">{note.title}</h2>
                    <p className="noteMenu" onClick={handleMoreClick}>...</p>
                    <div className="noteMoreDiv" style={{ background: `${note.color}`, display: `${sideBarVisibility}`}}>
                        <p className="noteMoreBtns">✏️</p>
                        <p className="noteMoreBtns" onClick={() => handleDelete(note.id)}>🗑️</p>
                        <p className="noteMoreBtns">🔗</p>
                    </div>
                </div>
                <div className="noteContent">
                    <p>{note.textContent}</p>
                    <br></br>
                    <p className="bottomNote">On {note.createdAt.slice(0, 10)}</p>
                </div>
            </div>
        )
    })

    const sNotes = sharedNotes.map((note, index) => {
        return (
            <div className="noteCard" key={index} id={`sNote-${index + 1}`} style={{ border: `3px solid ${note.color}` }}>
                <div className="noteHeader" style={{ background: `${note.color}` }}>
                    <h2 className="noteTitle">{note.title}</h2>
                    <p className="noteMoreBtns" onClick={() => handleDelete(note.id)}>🗑️</p>
                </div>
                <div className="noteContent">
                    <p>{note.textContent}</p>
                    <br></br>
                    <p className="bottomNote">- {note.author} on {note.createdAt.slice(0, 10)}</p>
                </div>
            </div>
        )
    })

    const renderNotes = () => {
        if (currentNotes === "writtenNotes") {
            return (
                <div className="notes">{wNotes}</div>
            )
        } else if (currentNotes === "sharedNotes") {
            return (
                <div className="notes">{sNotes}</div>
            )
        } else {
            return(
                <div></div>
            )
        }

    }

    const renderSearchBar = () => {
        if (currentNotes === "writtenNotes") {
            return (
                <SearchBar originalList={originalWrittenNotesList} setList={setWrittenNotes} />
            )
        } else if (currentNotes === "sharedNotes") {
            return (
                <SearchBar originalList={originalSharedNotesList} setList={setSharedNotes} />
            )
        }
    }

    // TODO: filter data from data array
    // TODO: map over data to display 

    return (
        <div className="noteContainer">
            {renderSearchBar()}
            <div className="noteBox">
                <div className="selectNotes" onChange={handleChange}>
                    <div>
                        <input type="radio" id="writtenNotes" name="notes" value="writtenNotes" defaultChecked />
                        <label htmlFor="writtenNotes">Your Notes</label>
                    </div>
                    <div>
                        <input type="radio" id="sharedNotes" name="notes" value="sharedNotes" />
                        <label htmlFor="sharedNotes">Shared With You</label>
                    </div>
                </div>
                {renderNotes()}
            </div>
        </div>
    );
}

export default NotesList;