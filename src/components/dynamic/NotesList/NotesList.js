import React, {useEffect, useState} from "react";
import SearchBar from "../../static/SearchBar/SearchBar"
import "./NotesList.css";

function NotesList() {

    const [currentNotes, setCurrentNotes] = useState("writtenNotes");
    const [writtenNotes, setWrittenNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]);

    useEffect(() => { fetchNotes() },[]);

    // TODO: Fetch data
    const fetchNotes = async (event) => {
        
        try {
            const token = localStorage.getItem("token");
            
            const result = await fetch("http://localhost:3001/api/notes/currentUserNotes", {
                method: "GET",
                headers:{
                    authorization: token ? `Bearer ${token}` : ''
                }
            })

            const data = await result.json();

            setWrittenNotes(data.WritenNotes);
            setSharedNotes(data.SharedNotes);
            
        } catch (error){
            console.error(error);
        }
    }
    
    const handleChange = (event) => {
        if(event.target.value === "writtenNotes") {
            setCurrentNotes("writtenNotes");
        } else if (event.target.value === "sharedNotes") {
            setCurrentNotes("sharedNotes");
        }
    }
        
    const wNotes = writtenNotes.map( (note, index) => 
        <div className="noteCard" key={index} id={`wNote-${index + 1}`} style={{border: `3px solid ${note.color}`}}>
            <div className="noteHeader" style={{background: `${note.color}`}}>
                <div className="noteTitle">{note.title}</div>
                <div className="noteDate">{note.createdAt.slice(0,10)}</div>
            </div>
            <div className="noteContent">{note.textContent}</div>
        </div>
    )

    const sNotes = sharedNotes.map( (note, index) => 
                
    <div className="noteCard" key={index} id={`sNote-${index + 1}`} style={{border: `3px solid ${note.color}`}}>    <div className="noteHeader" style={{background: `${note.color}`}}>
        <div className="noteTitle">{note.title}</div>
        <div className="noteDate">{note.createdAt.slice(0,10)}</div>
    </div>
    <div className="noteContent">{note.textContent}</div>
</div>
    )

    const renderNotes = () => {
        if(currentNotes === "writtenNotes"){
            console.log(writtenNotes);
            return(
                <div className="notes">{wNotes}</div>
            )
        } else if (currentNotes === "sharedNotes"){
            return(
                <div className="notes">{sNotes}</div>
            )
        }
        
    }
        
    // TODO: filter data from data array
    // TODO: map over data to display 

    return (
        <div className="noteContainer">
            <SearchBar />

            <div className="noteBox">
                <div className="selectNotes" onChange={handleChange}>
                    <div>
                        <input type="radio" id="writtenNotes" name="notes" value="writtenNotes" defaultChecked/>
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