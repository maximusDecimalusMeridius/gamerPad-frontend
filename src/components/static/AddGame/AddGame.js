import React, { useState } from "react";
import "./AddGame.css"

function AddGame({ setShowModal, warningMessage, setWarningMessage }) {

    const [gameId, setGameId] = useState("");
    const [platformInput, setPlatformInput] = useState("");
    const [contentRating, setContentRating] = useState(3);
    const [valueRating, setValueRating] = useState(3);
    const [replayRating, setReplayRating] = useState(3);

    const [platformList, setPlatformList] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLFM, setIsLFM] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newUserGameObj = {
            favorite: { isFavorite },
            lookingForMore: { isLFM },
            content: { contentRating },
            replay: { valueRating },
            value: { replayRating },
            GameId: { gameId },
            platforms: { platformList }
        }

        try {
            const token = localStorage.getItem("token");

            const newUserGameObj = {
                favorite: isFavorite,
                lookingForMore: isLFM,
                content: contentRating,
                replay: valueRating,
                value: replayRating,
                GameId: gameId,
                platforms: platformList
            }

            const result = await fetch("https://gamerpad-backend.herokuapp.com/api/games/usergame", {
                method: "POST",
                body: JSON.stringify(newUserGameObj),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await result.json();

            if(result.ok){
                setShowModal(false)
            } else if(result.status === 403) {
                setWarningMessage("You must be logged in to add a game");
                setTimeout(() => {
                    setWarningMessage("");
                }, "2000")
            } else if(result.status >= 400){
                  setWarningMessage("Error adding game");
                 setTimeout(() => {
                setWarningMessage("");
            }, "2000")
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleAddPlatform = (e) => {
        e.preventDefault()

        if (!platformList.includes(platformInput)) {
            setPlatformList(platformList => [platformInput, ...platformList])
            setPlatformInput("")
        }

    }

    const handleChange = (event) => {
        if (event.target.id === "gameId") {
            setGameId(event.target.value);
        } else if (event.target.id === "platformInput") {
            setPlatformInput(event.target.value)
        } else if (event.target.id === "contentRating") {
            setContentRating(event.target.value)
        } else if (event.target.id === "valueRating") {
            setValueRating(event.target.value)
        } else if (event.target.id === "replayRating") {
            setReplayRating(event.target.value)
        } else if (event.target.id === "favoriteCheckbox") {
            setIsFavorite(event.target.checked)
        } else if (event.target.id === "LFMCheckbox") {
            setIsLFM(event.target.checked)
        }
    }

    const removePlatform = (platformId) => {
        setPlatformList(platformList.filter((platform) => {
            if (platform !== platformId) {
                return platform
            } else {
                return null
            }
        }))
    }

    return (
        <div className="contentModalWindow">
            <div className="modalForm" id="addGameModal">
                <div className="inputContainer">
                    <input type="text" id="gameId" name="friendName" placeholder="game id" onChange={handleChange} value={gameId} required></input>
                </div>
                <div className="ratingsInput">
                    <label htmlFor="favorite">Favorite</label>
                    <input type="checkbox" name="favorite" checked={isFavorite} id="favoriteCheckbox" onChange={handleChange}></input>
                    <label htmlFor="LFM">Looking for more</label>
                    <input type="checkbox" name="LFM" checked={isLFM} id="LFMCheckbox" onChange={handleChange}></input>
                </div>
                <div className="ratingsInput">
                    <div className="contentRatingContainer">
                        <label htmlFor="content">Content: {contentRating}</label>
                        <input type="range" id="contentRating" name="volume" min="0" max="5" value={contentRating} onChange={handleChange}></input>
                    </div>
                    <div className="valueRatingContainer">
                        <label htmlFor="value">Value: {valueRating}</label>
                        <input type="range" id="valueRating" name="volume" min="0" max="5" value={valueRating} onChange={handleChange}></input>
                    </div>
                    <div className="replayRatingContainer">
                        <label htmlFor="replay">Replay: {replayRating}</label>
                        <input type="range" id="replayRating" name="volume" min="0" max="5" value={replayRating} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="addPlatformContainer">
                    <div className="inputContainer">
                        <input type="text" name="platformName" id="platformInput" placeholder="Platform id" onChange={handleChange} value={platformInput}></input>
                    </div>
                    <button className="addPlatform" onClick={handleAddPlatform}>+</button>
                </div>
                <div className="platformList">
                    {platformList.map((platform, index) => {
                        return (
                            <div className="platformDiv" key={index}>
                                <p>{platform}</p>
                                <p onClick={() => removePlatform(platform)} className={"removePlatformBtn"}>x</p>
                            </div>
                        )
                    })}
                </div>
                <div className="statusWindow">
                    <p className="warningMessage" id="warningMessage">{warningMessage}</p>
                    <button className="addSubmitButton" onClick={handleSubmit}>Add Game</button>
                </div>
            </div>
        </div>
    );
}

export default AddGame;