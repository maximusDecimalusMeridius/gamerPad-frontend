import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar"
import "./NotesList.css";
import Note from "../Note/Note"

function NotesList({ writtenNotes, setWrittenNotes, sharedNotes, setSharedNotes, originalWrittenNotesList, setOriginalWrittenNotesList }) {
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



    const handleDelete = async (noteId) => {

        console.log(noteId)
        try {
            const token = localStorage.getItem("token");

            let url = `http://localhost:3001/api/notes/${noteId}`;

            if (currentNotes === "sharedNotes") {
                url = `http://localhost:3001/api/notes/removeSharedNote/${noteId}`;
            }

            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })


            if (result.ok) {
                if (currentNotes === "writtenNotes") {
                    setWrittenNotes(writtenNotes.filter((note) => {
                        if (note.id !== noteId) {
                            return note
                        }
                    }))
                    setOriginalWrittenNotesList(writtenNotes.filter((note) => {
                        if (note.id !== noteId) {
                            return note
                        }
                    }))
                } else {
                    setSharedNotes(sharedNotes.filter((note) => {
                        if (note.id !== noteId) {
                            return note
                        }
                    }))
                    setOriginalSharedNotesList(sharedNotes.filter((note) => {
                        if (note.id !== noteId) {
                            return note
                        }
                    }))
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (noteId, newTitle, newTextContent) => {

        try {
            const token = localStorage.getItem("token");
            const noteObject = {
                title: newTitle,
                textContent: newTextContent
            }
            const result = await fetch(`http://localhost:3001/api/notes/${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    authorization: token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(noteObject)
            })

            if (result.ok) {
                setWrittenNotes(writtenNotes.map((note, index) => {
                    if (note.id === noteId) {
                        let newNote = note
                        note.title = newTitle;
                        note.textContent = newTextContent
                        return newNote
                    } else {
                        return note
                    }
                }))

                setOriginalWrittenNotesList(writtenNotes)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const wNotes = writtenNotes.map((note, index) => {
        return <Note {...note} index={index} handleDelete={handleDelete} key={index} currentNotes={currentNotes} handleEdit={handleEdit}/>
    })

    const sNotes = sharedNotes.map((note, index) => {
        return <Note {...note} index={index} handleDelete={handleDelete} key={index} currentNotes={currentNotes} handleEdit={handleEdit}/>
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
            return (
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