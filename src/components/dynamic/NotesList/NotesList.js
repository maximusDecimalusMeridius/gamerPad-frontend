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

            setWrittenNotes(data.WritenNotes);
            setOriginalWrittenNotesList(data.WritenNotes)
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

    const wNotes = writtenNotes.map((note, index) => {
        return (
            <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{ border: `3px solid ${note.color}` }}>
                <div className="noteHeader" style={{ background: `${note.color}` }}>
                    <h1 className="noteTitle">{note.title}</h1>
                    <p className="noteDate">{note.createdAt.slice(0, 10)}</p>
                </div>
                <div className="noteContent">{note.textContent}</div>
            </div>
        )
    })

    const sNotes = sharedNotes.map((note, index) => {
        return (
            <div className="noteCard" key={index} id={`sNote-${index + 1}`} style={{ border: `3px solid ${note.color}` }}>
                <div className="noteHeader" style={{ background: `${note.color}` }}>
                    <h1 className="noteTitle">{note.title}</h1>
                    <p className="noteDate">{note.createdAt.slice(0, 10)}</p>
                </div>
                <div className="noteContent">{note.textContent}</div>
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