import React, {useState} from "react";
import "./AddGame.css"

function AddGame({setShowModal, warningMessage, setWarningMessage}) {
    
    const [gameId, setGameId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const token = localStorage("token");

            const newUserGameObj = {
                favorite: true,
                lookingForMore: true,
                content: 3,
                replay: 3,
                value: 3,
                GameId: gameId
            }

            const result = await fetch("http://localhost:3001/api/games/usergame", {
                method: "POST",
                body: JSON.stringify(newUserGameObj),
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

        } catch(error) {

        }
    }

    const handleChange = (event) => {
        if(event.target.id === "gameId"){
            setGameId(event.target.value);
        }
    }
    
    return (
        <div className="contentModalWindow">
            <form className="modalForm" id="addGameModal" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <input type="text" id="gameId" name="friendName" placeholder="game id" onChange={handleChange} value={gameId}required></input>
            </div>
            <div className="statusWindow">
                <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                <button className="addSubmitButton">Add Game</button>
            </div>
        </form>
        </div>
    );
}

export default AddGame;