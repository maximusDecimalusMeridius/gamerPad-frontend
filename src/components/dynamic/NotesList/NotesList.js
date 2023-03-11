import React, {useEffect, useState} from "react";
import "./NotesList.css";

function NotesList() {

    const [currentNotes, setCurrentNotes] = useState("writtenNotes");
    const [writtenNotes, setWrittenNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]);

    const style = {
        searchbar: {
            width: "100%",
            height: "50px",
            background: "blue",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
        },
        input: {
            width: "500px",
            padding: "2px"
        },
        button: {
            width: "50px",
            height: "25px",
            padding: "0px"
        }
    }

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
        
    const wNotes = writtenNotes.map( note => 
        <div className="noteCard">
            <div>{note.id}</div>
            <div>{note.createdAt}</div>
            <div>{note.color}</div>
            <div>{note.textContent}</div>
            <div>{note.title}</div>
        </div>
    )

    const sNotes = sharedNotes.map( note => 
        <div className="noteCard">
            <div>{note.id}</div>
            <div>{note.createdAt}</div>
            <div>{note.color}</div>
            <div>{note.textContent}</div>
            <div>{note.title}</div>
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
            <div id="test-searchbar" style={style.searchbar}>
                <input style={style.input} placeholder="type to search"></input>
                <button style={style.button}>Add</button>
            </div>

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