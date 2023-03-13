import React, { useEffect, useState } from "react";
import SearchBar from "../../static/SearchBar/SearchBar"
import "./NotesList.css";

function NotesList({ writtenNotes, setWrittenNotes, sharedNotes, setSharedNotes, originalWrittenNotesList, setOriginalWrittenNotesList }) {
    const [originalSharedNotesList, setOriginalSharedNotesList] = useState([])

    const [currentNotes, setCurrentNotes] = useState("writtenNotes");
    const [selectedNote, setSelectedNote] = useState(null);
    const [friendSearch, setFriendSearch] = useState('')

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
            console.log(data)
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
        } else if (event.target.name === "friendSearch") {
            setFriendSearch(event.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const result = await fetch(`http://localhost:3001/api/notes/${selectedNote}/shareWith/${friendSearch}`, {
                method: "POST",
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    const selectNote = (e) => {
        const currentNote = e.target.parentElement;
        console.log(currentNote);
        setSelectedNote(currentNote.getAttribute(`value`));
        if(selectedNote) {
            const allNotes = document.querySelectorAll(`.noteCard`);
            allNotes.forEach(note => {
                const color = note.getAttribute(`color`);
                console.log(color);
                note.setAttribute(`style`, `border: 3px solid ${color}`)
            })
            const tempNoteStyle = currentNote.getAttribute(`style`);
            currentNote.setAttribute(`style`, `${tempNoteStyle}; box-shadow: 0px 0px 8px rgb(104, 255, 157);`);
            
        }
    }

    let wNotes;
    console.log(writtenNotes)
    if (writtenNotes) {
        wNotes = writtenNotes.map((note, index) => {
            return (
                <div
                    className="noteCard"
                    key={index}
                    id={`wNote-${index + 1}`}
                    color={note.color}
                    style={{ border: `3px solid ${note.color}` }}
                    value={`${note.id}`}
                    onClick={selectNote}
                >
                    <div className="noteHeader" style={{ background: `${note.color}` }}>
                        <h1 className="noteTitle">{note.title}</h1>
                        <p className="noteDate">{note.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="noteContent" value={note.id}>{note.textContent}</div>
                </div>
            )
        })
    }

    let sNotes;
    if (sharedNotes !== [] && sharedNotes !== undefined) {
        sNotes = sharedNotes.map((note, index) => {
            console.log(note);
            return (
                <div
                    className="noteCard"
                    key={index}
                    id={`sNote-${index + 1}`}
                    color={note.color}
                    style={{ border: `3px solid ${note.color}` }}
                    value={`${note.id}`}
                    onClick={selectNote}
                >
                    <div className="noteHeader" style={{ background: `${note.color}` }}>
                        <h1 className="noteTitle">{note.title}</h1>
                        <p className="noteDate">{note.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="noteContent">{note.textContent}</div>
                </div>
            )
        })
    }

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

    const shareNote = () => {
        if (selectedNote) {
            document.querySelector(`#findFriendForm`).classList.remove('hidden');
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
                    <div>
                        <button onClick={shareNote}>Share Note</button>
                    </div>
                </div>
                <form 
                    id="findFriendForm" 
                    className="hidden" 
                    onSubmit={handleSubmit}
                >
                    <input 
                        id="friendSearch" 
                        name="friendSearch" 
                        onChange={handleChange} 
                        value={friendSearch}
                    />
                    <label htmlFor="friendSearch">Find a friend by Id</label>
                    <button className="submitButton">Send</button>
                </form>
                {renderNotes()}
            </div>
        </div>
    );
}

export default NotesList;